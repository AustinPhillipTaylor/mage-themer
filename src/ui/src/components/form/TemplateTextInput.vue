
<template>
	<div class="template-input">
		<template v-if="label">
			<label
				:for="id"
				class="section-title"
			>{{ label }}</label>
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
				class="input-container type"
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
			<button-with-menu
				:options="menuOptions"
				:menu-margin="8"
				tabindex="0"
				@blur="blurAddTemplate"
				@focus="focusAddTemplate"
				:disabled="disabled"
			>
				<template #display>
					<contained-button
						:disabled="disabled"
						button-height="medium"
						:chevron="true"
					>
						<div class="icon icon--plus" />
					</contained-button>
				</template>
			</button-with-menu>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, Ref, PropType, watch, onMounted } from 'vue'
import { ItemTemplate, PropTemplates } from '@/types/TemplateInput'
import { NamingScheme } from '@/types/Theme'
import ButtonWithMenu from '@/components/general/ButtonWithMenu.vue'
import ContainedButton from '@/components/general/ContainedButton.vue'

export default defineComponent( {
	components: {
		ButtonWithMenu,
		ContainedButton,
	},
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

		watch( () => props.modelValue, setFieldValue )

		onMounted( () => {
			setFieldValue( props.modelValue )
		} )

		const menuOptions = computed( () => {
			const options = []
			for( let option of props.templates ) {
				options.push( {
					text: option.text,
					callback: () => {
						addTemplate( option.template )
					},
				} )
			}
			return options
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
			console.log( 'focused' )
			storeCursorPosition()
		}

		function blurAddTemplate() {
			console.log( 'blurred' )
			//restoreCursorPosition()
		}

		function getRangeAtEnd() {
			const range = document.createRange()
			range.selectNodeContents( inputField.value! )
			range.collapse( false ) // false = collapse to end
			return range
		}

		function scrollField( range: Range ) {
			const rect = range.getClientRects()[0]
			inputField.value?.scrollTo( {
				top: 0,
				left: rect.left,
				behavior: 'smooth',
			} )
		}

		function addTemplate( template: string ) {
			const newNode = generateTemplateElement( template )
			restoreCursorPosition()

			const selection = window.getSelection()
			if( selection?.focusNode ) {
				const range = selection.getRangeAt( 0 )
				range.insertNode( newNode )
			} else {
				const range = getRangeAtEnd()
				range.insertNode( newNode )
				scrollField( range )
			}

			updateModel()
		}

		function generateTemplateElement( template: string ) {
			const nodeInner = document.createElement( 'span' )
			nodeInner.className = 'template-inner type--medium'
			nodeInner.innerText = getTemplate( template )?.text || template

			const nodeInnerLeft = document.createElement( 'span' )
			nodeInnerLeft.appendChild( document.createTextNode( '\u200B' ) )
			nodeInnerLeft.className = 'template-inner-padding'

			const nodeInnerRight = nodeInnerLeft.cloneNode( true )

			const nodeOuter = document.createElement( 'span' )
			nodeOuter.className = 'template-item'
			nodeOuter.dataset.templateType = template
			nodeOuter.contentEditable = 'false'

			// Inserting spaces into wrapper text node prevents cursor from
			// visually appearing inside template tag
			nodeOuter.appendChild( nodeInnerLeft )
			nodeOuter.appendChild( nodeInner )
			nodeOuter.appendChild( nodeInnerRight )


			//TODO:
			nodeOuter.addEventListener( 'click', ( e ) => {
				const rect = nodeOuter.getBoundingClientRect()
				const nodeX = rect.x
				const nodeW = rect.width
				const clickX = e.x
				let add = 0
				// If we click over half way through the node, add one to caret position
				if( clickX - nodeX > nodeW / 2 ) {
					add = 1
				}

				setCaretPosition( inputField.value!, getNodePosition( nodeOuter ) + add )
			} )

			return nodeOuter
		}

		function setCaretPosition( target: HTMLElement, offset: number ) {
			if( target && offset > -1  ) {
				const selection = window.getSelection()!
				selection.removeAllRanges()
				const range = new Range()
				range.setStart( target, offset )
				selection.addRange( range )
			}
			rootOffset = -1
			focusNode = null
			focusOffset = 0
		}

		function getNodePosition( target: EventTarget | null ) {
			if( !target ) {
				return -1
			}
			const nodeOffset = Array.from( inputField.value!.childNodes ).indexOf( target as ChildNode )
			return nodeOffset
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
					try {
						range.setStart( inputField.value!, focusOffset )
					} catch ( error ) {
						range.selectNodeContents( inputField.value! )
						range.collapse( false ) // false = collapse to end
					}
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
			inputField,
			addTemplate,
			updateModel,
			getTemplate,
			focusAddTemplate,
			blurAddTemplate,
			menuOptions,
		}
	},
} )
</script>