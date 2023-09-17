<template>
	<div v-if="show" class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
		@click="closeOnOutsideClick">
		<div class="bg-white w-4/12 p-8 rounded flex flex-col gap-y-6" ref="modalContent">
			<div class="flex justify-between items-center">
				<h2>{{ title }}</h2>
				<button class="bg-red-300 p-2 hover:bg-red-400 rounded-lg" @click="$emit('close')">Close</button>
			</div>
			<slot></slot>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';

export default defineComponent({
	props: {
		show: {
			type: Boolean,
			default: false,
		},
		title: {
			type: String,
			default: 'Modal Title',
		},
		type: {
			type: String
		}
	},
	emits: ['close'],
	setup(props, { emit }) {
		// Reactive ref to hold modal's content element.
		const modalContent = ref(null);
		
		// Close modal if clicked outside of it.
		const closeOnOutsideClick = (event) => {
			if (modalContent.value && !modalContent.value.contains(event.target)) {
				emit('close'); // Emit close event
			}
		};

		// Expose ref and function for template use.
		return {
			modalContent,
			closeOnOutsideClick,
		};
	},
});
</script>
