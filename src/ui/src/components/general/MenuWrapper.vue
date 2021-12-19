<template>
	<ul
		class="item-list"
		ref="itemList"
	>
		<li
			v-for="(option, index) in options"
			:key="index"
			class="single-item"
			@click="handleClick( option )"
		>
			<span class="item-icon"></span>
			<span class="item-label">{{ option.text }}</span>
		</li>
	</ul>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import { MenuOption } from '@/types/MenuOptions'

export default defineComponent( {
	props: {
		options: {
			type: Array as PropType<MenuOption[]>,
			required: true,
		},
	},
	setup( props, { emit } ) {
		const itemList = ref( null )
		function getRef() {
			return itemList.value
		}

		function handleClick( option: MenuOption ) {
			emit( 'item-selected', option )
			option.callback( option.text )
		}

		return {
			itemList,
			getRef,
			handleClick,
		}
	},
} )
</script>