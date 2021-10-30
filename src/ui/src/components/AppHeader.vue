<template>
	<div class="header" >
		<span class="material-icons-outlined header-icon">
			add
		</span>
		<span class="title" > {{ header }} </span>
	</div>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia'
import { defineComponent, ref } from 'vue'
import { useAppStore } from '../stores/app'

export default defineComponent( {
	setup() {

		const appStore = useAppStore()
		const { header } = storeToRefs( appStore )

		return { header }
	},
} )
</script>

<style lang="sass" scoped>
@use '../styles/mixins/fonts' as fonts

.header
	display: grid
	grid-template-columns: 32px 32px [header-title] 1fr 32px 32px
	border-bottom: 1px solid #E9EDF0
	.header-icon
		align-self: center
		justify-self: center
		padding: 2px
		font-size: 20px
		background: transparent
		border-radius: 4px
		&:hover
			background: #E9EDF0
			cursor: pointer
	.title
		@include fonts.font-header
		height: 32px
		width: 100%
		display: inline-block
		line-height: 24px
		vertical-align: middle
		text-align: center
		padding: 4px 32px
		grid-column: header-title
</style>
