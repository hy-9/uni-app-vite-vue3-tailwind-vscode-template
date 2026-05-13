<script setup lang="ts">
const props = defineProps<{ item: string }>();
</script>

<template>
	<div class="p-4">
		<text class="text-lg font-bold">详情页 - {{ props.item }}</text>
	</div>
</template>

<style scoped></style>
