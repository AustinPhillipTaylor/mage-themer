
<template>
	<div class="toggle-wrapper" >
		<input
			:id="id"
			:checked="modelValue"
			class="hidden-checkbox"
			@input="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
			type="checkbox"
		>
		<label :for="id">
			<template v-if="label">
				<div class="text-label">{{ label }}</div>
			</template>
			<div class="toggle-switch" ></div>
		</label>


	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
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
			type: Boolean,
			required: false,
			default: false,
		},
	},
} )
</script>

<style lang="sass" scoped>
@use '../../styles/mixins/fonts'
@use '../../styles/mixins/colors'

.toggle-wrapper
	display: block
	margin: 24px 0
	position: relative
	label
		.toggle-switch
			display: inline-block
			height: 28px
			width: 52px
			border: 2px solid colors.$input-toggle-border-off
			border-radius: 14px
			background: colors.$input-toggle-track-off
			position: relative
			transition: all .2s ease
			&:before
				content: ''
				width: 22px
				height: 22px
				border-radius: 12px
				background: colors.$input-toggle-handle-off
				display: block
				position: absolute
				top: 1px
				left: 1px
				transition: all .2s ease
			&:after
				font-size: 12px
				font-weight: 800
				content: 'Off'
				display: block
				position: absolute
				top: 50%
				left: 24px
				transform: translateY(-50%)
				transition: all .2s ease
		.text-label
			@include fonts.input-label
			padding: 0
			margin: 0 0 4px 0
	.hidden-checkbox
		position: absolute
		visibility: hidden
		opacity: 0
		&:checked
			&+label
				.toggle-switch
					border-color: colors.$input-toggle-border-on
					background: colors.$input-toggle-track-on
					&:before
						content: ''
						width: 22px
						height: 22px
						border-radius: 12px
						background: colors.$input-toggle-handle-on
						display: block
						position: absolute
						top: 1px
						left: 25px
						transition: all .2s ease
					&:after
						color: colors.$input-toggle-handle-on
						content: 'On'
						left: 5px
						transition: all .2s ease
</style>
