<template>
	<div
		:class="[ 'block-notice', level ]"
	>

		<div class="notice-icon">
			<div
				v-if="level === 'success'"
				class="success-icon"
			>
				<Icon type="resolve" ></Icon>
			</div>
			<div
				v-else-if="level === 'warning'"
				class="warning-icon"
			>
				<Icon type="warning" ></Icon>
			</div>
			<div
				v-else-if="level === 'danger'"
				class="danger-icon"
			>
				<Icon type="close" ></Icon>
			</div>
		</div>
		<div class="type--small type--medium">
			<slot></slot>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import Icon from './Icon.vue'

export default defineComponent( {
	components: {
		Icon,
	},
	props: {
		level: {
			type: String as PropType<'danger' | 'warning' | 'success'>,
			required: false,
			default: 'warning',
		},
	},
} )
</script>