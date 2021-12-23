<template>
	<div class="import-step" >

		<div class="import-step-icon">
			<div
				v-if="!done && !failed && !interrupted"
				class="signal-icon waiting-icon"
			>
				<Icon type="spinner" ></Icon>
			</div>
			<div
				v-else-if="done"
				class="signal-icon success-icon"
			>
				<Icon type="resolve" ></Icon>
			</div>
			<div
				v-else-if="failed"
				class="signal-icon failed-icon"
			>
				<Icon type="close" ></Icon>
			</div>
			<div
				v-else-if="interrupted"
				class="signal-icon interrupted-icon"
			>
				<Icon type="notice" ></Icon>
			</div>
		</div>
		<div class="text type type--16">
			<div
				v-if="!done && !failed && !interrupted"
				class="waiting-text"
			>
				{{ waitingText }}
			</div>
			<div
				v-else-if="done"
				class="success-text"
			>
				{{ doneText }}
			</div>
			<div
				v-else-if="failed"
				class="failed-text"
			>
				{{ failedText }}
			</div>
			<div
				v-else-if="interrupted"
				class="interrupted-text"
			>
				{{ interruptedText }}
			</div>
		</div>


	</div>
</template>
<script lang="ts">
import { defineComponent, toRefs, ref, watch, Ref, WatchStopHandle, computed, PropType } from 'vue'
import Icon from '@/components/general/Icon.vue'

export default defineComponent( {
	components: {
		Icon,
	},
	props: {
		done: {
			type: Boolean,
			required: true,
			default: false,
		},
		failed: {
			type: Boolean,
			required: true,
			default: false,
		},
		interrupted: {
			type: Boolean,
			required: true,
			default: false,
		},
		waitingText: {
			type: String,
			required: true,
		},
		doneText: {
			type: String,
			required: true,
		},
		failedText: {
			type: String,
			required: true,
		},
		interruptedText: {
			type: String,
			required: true,
		},
	},
	setup( props ) {


		return {
		}
	},
} )
</script>