
<template>
	<div class="template-input">
		<template v-if="label">
			<label :for="id">{{ label }}</label>
		</template>
		<div
			:class="[
				'input-wrapper',
				{
					'disabled': disabled
				}
			]"
		>
			<div
				:id="id"
				ref="inputField"
				class="input-container"
				@input="updateModel"
				@keydown.enter.prevent
				:contenteditable="!disabled"
				@focus="blurAddTemplate"
				spellcheck="false"
			>
			</div>
			<span
				v-if="placeholder && !modelValue.length"
				class="placeholder"
			>{{ placeholder }}</span>
			<div
				class="add-template-element"
				tabindex="0"
				@blur="blurAddTemplate"
				@click="focusAddTemplate"
			>
				<span class="material-icons-outlined">
					add_box
				</span>
				<div
					:class="['options', { 'open': isOpen }]"
				>
					<template
						v-for="(item, index) in templates"
						:key="index"
					>
						<span @click.stop="addTemplate(item.template)" > {{ item.text }} </span>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, Ref, PropType, watch, onMounted } from 'vue'
import { ItemTemplate, PropTemplates } from '../../types/TemplateInput'
import { NamingScheme } from '../../types/Theme'
export default defineComponent( {
	props: {
		id: {
			type: String,
			required: true,
		},
		label: {
			type: String,
			required: false,
		},
		modelValue: {
			type: Array as PropType<NamingScheme>,
			required: false,
			default: () => [],
		},
		placeholder: {
			type: String,
			required: false,
		},
		templates: {
			type: Array as PropType<PropTemplates[]>,
			required: true,
		},
		disabled: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	setup( props, { emit } ) {
		const inputField: Ref<HTMLElement | null> = ref( null )

		let focusNode: Node | null = null
		let focusOffset = 0
		let rootOffset = -1

		const isOpen = ref( false )

		watch( () => props.modelValue, setFieldValue )

		onMounted( () => {
			setFieldValue( props.modelValue )
		} )

		const defaultEmptyNode = computed( ()=> {
			const node = document.createElement( 'span' )
			node.className = 'empty-template-area'
			/**
			 * Append zero-width-space, this way we have text at all times so the height of the input won't change
			 * if disabled, and we can still leave it variable height relative to text size
			 */
			node.appendChild( document.createTextNode( '\u200B' ) )
			node.contentEditable = 'false'
			return node
		} )

		function focusAddTemplate() {
			isOpen.value = !isOpen.value
			storeCursorPosition()
		}

		function blurAddTemplate() {
			isOpen.value = false
			restoreCursorPosition()
		}

		function getRangeAtEnd() {
			const range = document.createRange()
			range.selectNodeContents( inputField.value! )
			range.collapse( false ) // false = collapse to end
			return range
		}

		function addTemplate( template: string ) {
			const newNode = generateTemplateElement( template )
			restoreCursorPosition()

			const selection = window.getSelection()
			if( selection?.focusNode ) {
				const range = selection.getRangeAt( 0 )
				range.insertNode( newNode )
			} else {
				getRangeAtEnd().insertNode( newNode )
			}

			updateModel()
		}

		function generateTemplateElement( template: string ) {
			const nodeInner = document.createElement( 'span' )
			nodeInner.className = 'template-inner'
			nodeInner.innerText = getTemplate( template )?.text || template

			const nodeOuter = document.createElement( 'span' )
			nodeOuter.className = 'template-item'
			nodeOuter.dataset.templateType = template
			nodeOuter.contentEditable = 'false'

			// Inserting spaces into wrapper text node prevents cursor from
			// visually appearing inside template tag
			nodeOuter.appendChild( document.createTextNode( '\u202F' ) )
			nodeOuter.appendChild( nodeInner )
			nodeOuter.appendChild( document.createTextNode( '\u202F' ) )

			return nodeOuter
		}

		function setFieldValue( val: NamingScheme ) {
			if( !val.length ) {
				inputField.value?.replaceChildren( defaultEmptyNode.value )
			} else {
				const nodeList: Node[] = []
				for( const elm of val ) {
					let node: HTMLElement | Text | null = null
					switch( elm.type ) {
						case 'text':
							node = document.createTextNode( elm.text )
							break
						case 'template':
							node = generateTemplateElement( elm.template )
							break
					}
					if( node ) {
						nodeList.push( node )
					}
				}
				inputField.value?.replaceChildren( ...nodeList )
			}
			restoreCursorPosition()

		}

		function restoreCursorPosition() {
			const selection = window.getSelection()!
			const nodes = Array.from( inputField.value!.childNodes )
			selection.removeAllRanges()
			if( focusNode !== null && focusOffset > -1 ) {
				if( rootOffset > -1 ) {
					// Can't see why the nodes wouldn't be equal, but we'll check just in case
					if( nodes[rootOffset] && nodes[rootOffset].isEqualNode( focusNode ) ) {
						const range = new Range()
						range.setStart( nodes[rootOffset], focusOffset )
						selection.addRange( range )
					} else {
						selection.addRange( getRangeAtEnd() )
					}
				} else if( rootOffset === -2 ) {
					const range = new Range()
					range.setStart( inputField.value!, focusOffset )
					selection.addRange( range )
				}
			}
			rootOffset = -1
			focusNode = null
			focusOffset = 0
		}

		function storeCursorPosition() {
			const selection = window.getSelection()!
			rootOffset = Array.from( inputField.value!.childNodes ).indexOf( selection.focusNode as ChildNode )
			if( rootOffset < 0 && inputField.value === selection.focusNode ) {
				// Special case, we'll check for this later to see if the focus node is the root node
				rootOffset = -2
			}
			focusNode = selection.focusNode
			focusOffset = selection.focusOffset
		}

		function updateModel() {
			// Remove empty text nodes and merge adjacent text nodes
			inputField.value!.normalize()
			/**
			 * This occurs after the input and after normalization. Cursor is accurate until we update
			 * the field html by emitting a new model value (We must update from model value just in case
			 * a parent element modifies the value). As a result, we can just grab the cursor right now,
			 * and then later we can set it back to the exact position by doing a little checking of
			 * node positions and equivalence.
			*/
			storeCursorPosition()

			const contents = Array.from( inputField.value!.childNodes )
			const filteredContents = contents.filter( ( node ) => {
				// if the node type is text (3) or an element (1) with a data-template-type attribute
				return node.nodeType === 3 || ( node.nodeType === 1 && ( node as HTMLDivElement ).dataset.templateType )
			} )
			const model: any = filteredContents.map( ( node ) => {
				if( node.nodeType === 3 ) {
					return {
						type: 'text',
						text: node.nodeValue,
					}
				} else {
					return {
						type: 'template',
						template: ( node as HTMLDivElement ).dataset.templateType,
					}
				}
			} )
			emit( 'update:modelValue', model )
		}

		function getTemplate( type: string ) {
			return props.templates.find( ( template ) => {
				return template.template === type
			} )
		}


		return {
			isOpen,
			inputField,
			addTemplate,
			updateModel,
			getTemplate,
			focusAddTemplate,
			blurAddTemplate,
		}
	},
} )
</script>

<style lang="sass" scoped>
@use '../../styles/mixins/fonts'
@use '../../styles/mixins/colors'

.template-input
	margin: 24px 0
	label
		@include fonts.input-label
		display: block
		padding: 0
		margin: 0 0 4px 0
	.input-wrapper
		white-space: nowrap
		display: block
		position: relative
		width: 100%
		padding: 8px 58px 8px 16px
		border-radius: 4px
		border: 2px solid colors.$input-text-border
		background: colors.$input-template-bg
		&.disabled
			background: colors.$input-disabled-bg
			color: colors.$input-disabled-text
			border-color: colors.$input-disabled-border
		&:focus,
		&:focus-within
			border: 2px solid colors.$orange
		.input-container
			outline: none
			overflow-x: auto
			scrollbar-width: none
			-ms-overflow-style: none
			padding: 4px 0
			&::-webkit-scrollbar
				width: 0
				height: 0
			&:deep(.template-item)
				display: inline-block
				.template-inner
					@include fonts.input-template-tag
					display: inline-block
					padding: 2px 6px
					margin: -2px 0
					border-radius: 4px
					background: colors.$warning-light
					color: colors.$warning
		.placeholder
			position: absolute
			top: 50%
			left: 16px
			transform: translateY(-50%)
			color: colors.$placeholder
			user-select: none
			pointer-events: none
		.add-template-element
			display: inline-block
			font-size: 0
			height: auto
			position: absolute
			right: 16px
			top: 50%
			transform: translateY(-50%)
			z-index: 9999
			.material-icons-outlined
				@include fonts.material-icons-large
				color: colors.$input-template-add-button
				cursor: pointer
				&:hover
					color: colors.$input-template-add-button-hover
			.options
				position: absolute
				top: 100%
				right: 0
				background: colors.$main-dark
				color: white
				padding: 4px
				border-radius: 4px 0 4px 4px
				display: none
				&:before
					content: ""
					display: block
					width: 0
					height: 0
					border: 8px solid transparent
					border-right: 8px solid #3d404c
					position: absolute
					top: -8px
					right: 0px
				&.open
					display: block
				span
					@include fonts.header-options
					white-space: nowrap
					padding: 4px 8px
					display: block
					border-radius: 2px
					color: colors.$main-light
					&:hover
						background: rgba(colors.$main-light, .1)
						cursor: pointer

</style>
