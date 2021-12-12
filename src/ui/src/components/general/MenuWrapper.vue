<template>
	<ul
		class="item-list"
		ref="itemList"
	>
		<li
			v-for="(option, index) in options"
			:key="index"
			class="single-item"
			@click="() => option.callback(option.text)"
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
	setup() {
		const itemList = ref( null )
		function getRef() {
			return itemList.value
		}

		return {
			itemList,
			getRef,
		}
	},
} )
</script>