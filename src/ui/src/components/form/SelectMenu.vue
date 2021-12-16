<template>
	<div
		class="select-menu"
	>
		<template v-if="label">
			<label
				:for="id"
				class="section-title"
				@click="selectButton?.focus()"
			>{{ label }}</label>
		</template>
		<div
			:class="[ 'select-menu-field-wrapper',
				{
					'select-error': selectError
				}]"
		>
			<button
				class="select-menu__button"
				:id="id"
				ref="selectButton"
				@click="isOpen = true"
				@focus="isOpen = true"
				@blur="resolveFocus"
				tabindex="0"
				:disabled="isDisabled"
			>
				<span
					v-if="buttonIcon"
					class="icon select-menu__icon"
					:class="`icon--${buttonIcon}`"
				/>
				<span
					:class="[ 'select-menu__button__label',
						{
							'select-menu__button__label--placeholder': !modelValue
						}]"
				>
					<slot
						name="before-selected"
						v-if="!selectError"
						:value="modelValue"
					></slot>
					<span class="selected-text">{{ selectedText }}</span>
					<slot
						name="after-selected"
						v-if="!selectError"
						:value="modelValue"
					></slot>
				</span>
				<span class="select-menu__chevron" />
			</button>
			<ul
				ref="selectList"
				:class="[ 'select-menu__input', {
					'select-menu__input--active': isOpen
				}]"
			>
				<template
					v-for="(option, index) in options"
					:key="option.value || index"
				>
					<div
						v-if="option.divider === true"
						class="select-menu__input__divider"
					/>
					<li
						v-else
						:class="[ 'select-menu__input__item', {
							'select-menu__input__item--selected':
								option.value === modelValue
						}]"
						@blur="resolveFocus"
						@click="updateModel( option.value || '' )"
						@keydown.space="updateModel( option.value || '' )"
						@keydown.enter="updateModel( option.value || '' )"
						tabindex="0"
					>
						<span class="select-menu__input__item__icon" />
						<span class="select-menu__input__item__label">{{
							option && option.text
						}}</span>
					</li>
				</template>
			</ul>
		</div>
	</div>
</template>

<script lang="ts">
import { SelectOption, SelectOptionDivider } from '@/types/SelectOption'
import { defineComponent, ref, Ref, watch, computed, PropType } from 'vue'

export default defineComponent( {
	props: {
		options: {
			type: Array as PropType<( Partial<SelectOption & SelectOptionDivider> )[]>,
			default: () => [
				{
					text: 'Item 1',
					value: 'item-1',
				},
				{
					divider: true,
				},
				{
					text: 'Item 2',
					value: 'item-2',
				},
				{
					text: 'Item 3',
					value: 'item-3',
				},
			],
		},
		unset: {
			type: Object,
			required: true,
		},
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
			default: '',
		},
		placeholder: {
			type: String,
			default: undefined,
		},
		open: {
			type: Boolean,
			default: undefined,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		buttonIcon: {
			type: String,
			default: '',
		},
		noOptionsText: {
			type: String,
			required: true,
		},
		selectError: {
			type: Boolean,
			required: false,
			default: false,
		},
		errorText: {
			type: String,
			required: false,
			default: 'Error',
		},
	},
	setup( props, { emit } ) {
		const isOpen = ref( false )
		const selectList: Ref<HTMLElement | null> = ref( null )
		const selectButton: Ref<HTMLElement | null> = ref( null )

		const optionsCount = computed( () => {
			return props.options.length
		} )

		function updateModel( value: string ) {
			isOpen.value = false
			emit( 'update:modelValue', value )
		}

		const isDisabled = computed( () => {
			if( props.disabled || optionsCount.value < 1 ) {
				return true
			}
			return false
		} )

		const selectedText = computed( ()=> {
			if( props.selectError ) {
				return props.errorText
			}
			if( ( !props.modelValue || props.modelValue === '' ) && optionsCount.value < 1 ) {
				return props.noOptionsText
			}
			const curOption = props.options.find( ( opt ) => props.modelValue === opt.value )
			if( curOption ) {
				return curOption.text
			}
			return props.unset.text
		} )

		function resolveFocus( e: Event ) {
			const docFocus = document.activeElement
			const nextFocus = ( e as FocusEvent ).relatedTarget
			const contextFocus = nextFocus || docFocus
			if( contextFocus && !( selectList.value?.contains( contextFocus as Node ) ) ) {
				isOpen.value = false
			} else {
				/** If clicked outside of the window */
				if( nextFocus === null ) {
					isOpen.value = false
				} else {
					isOpen.value = true
				}
			}
		}


		return {
			isOpen,
			updateModel,
			selectList,
			selectButton,
			selectedText,
			optionsCount,
			isDisabled,
			resolveFocus,
		}
	},
} )
</script>