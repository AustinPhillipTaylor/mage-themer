
<template>
	<div class="select-input">
		<template v-if="label">
			<label
				:for="id"
				@click="setFocus"
			>{{ label }}</label>
		</template>
		<template v-if="optionsCount > 0">
			<div
				:id="id"
				ref="selectRef"
				class="custom-select"
				:tabindex="tabindex"
				@blur="isOpen = false"
			>
				<div
					:class="['selected', { open: isOpen }]"
					@click="isOpen = !isOpen"
				>
					{{ selectedText }}
				</div>
				<div
					class="items"
					:class="{ selectHide: !isOpen }"
				>
					<div
						v-for="option of options"
						:key="option.value"
						@click="
							isOpen = false;
							$emit('update:modelValue', option.value);
						"
					>
						{{ option.text }}
					</div>
				</div>
			</div>
		</template>
		<template v-else >
			<span>{{ emptyText }}</span>
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, computed, PropType } from 'vue'
import { SelectOption } from '../../types/SelectOption'
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
			type: String,
			required: false,
			default: '',
		},
		unset: {
			type: Object,
			required: true,
		},
		options: {
			type: Array as PropType<SelectOption[]>,
			required: true,
		},
		emptyText: {
			type: String,
			required: true,
		},
		tabindex: {
			type: Number,
			required: false,
			default: 0,
		},
	},
	setup( props ) {

		const selectRef: Ref<HTMLElement | null> = ref( null )

		const optionsCount = computed( () => {
			return props.options.length
		} )

		const isOpen = ref( false )

		const selectedText = computed( ()=> {
			const curOption = props.options.find( ( opt ) => props.modelValue === opt.value )
			if( curOption ) {
				return curOption.text
			}
			return props.unset.text
		} )

		const setFocus = () => {
			if( selectRef.value ) {
				isOpen.value = true
				selectRef.value.focus()
			}
		}

		return {
			selectedText,
			optionsCount,
			isOpen,
			selectRef,
			setFocus,
		}
	},
} )
</script>

<style lang="sass" scoped>
@use '../../styles/mixins/fonts'
@use '../../styles/mixins/colors'

.select-input
	margin: 24px 0
	label
		@include fonts.input-label
		display: block
		padding: 0
		margin: 0 0 4px 0
	.custom-select
		@include fonts.default-input
		position: relative
		width: 100%
		text-align: left
		outline: none
		.selected
			padding: 8px 42px 8px 16px
			white-space: nowrap
			overflow-x: hidden
			text-overflow: ellipsis
			background-color: colors.$input-select-bg
			border-radius: 4px
			border: 2px solid colors.$input-select-border
			cursor: pointer
			user-select: none
			&.open
				border: 2px solid colors.$orange
				border-bottom: none
				padding-bottom: 10px
				border-radius: 4px 4px 0px 0px
			&:after
				position: absolute
				content: ""
				top: calc(50% - 2px)
				right: 16px
				width: 0
				height: 0
				border: 5px solid transparent
				border-color: colors.$input-select-arrow transparent transparent transparent
		.items
			border-radius: 0px 0px 4px 4px
			overflow: hidden
			border: 2px solid colors.$input-select-border-focus
			border-top: none
			position: absolute
			background-color:  colors.$input-select-bg
			left: 0
			right: 0
			top: 100%
			z-index: 1
			div
				cursor: pointer
				user-select: none
				padding: 8px 16px
				border-radius: 4px
				white-space: nowrap
				overflow-x: hidden
				text-overflow: ellipsis
				&:hover
					background-color: colors.$input-select-item-hover-bg
		.selectHide
			display: none
</style>
