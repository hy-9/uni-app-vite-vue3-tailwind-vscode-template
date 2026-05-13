<script setup lang="ts">
import ItemList from "@/components/ItemList/ItemList.vue";

const itemListRef = ref<InstanceType<typeof ItemList>>();
const allDataList = Array.from({ length: 100 }, (_, i) => `数据项 ${i + 1}`);
const dataList = ref<string[]>([]);
const scrollTop = ref<number>(0);

async function getListData(
	pageNum: number,
	pageSize: number,
	isRefresh: boolean,
) {
	if (isRefresh) {
		dataList.value = [];
	}
	// 模拟网络请求延迟
	await new Promise((resolve) => setTimeout(resolve, 1000));

	const start = (pageNum - 1) * pageSize;
	const end = start + pageSize;
	const listLength = Math.min(end, allDataList.length) - start;
	dataList.value = [...dataList.value, ...allDataList.slice(start, end)];

	return {
		total: allDataList.length,
		listLength,
	};
}

async function gotoDetail(item: string) {
	uni.navigateTo({
		url: `/pages/case/list-cache/detail?item=${encodeURIComponent(item)}`,
	});
}

onShow(async () => {
	const page = getCurrentPages()[0] as {
		buffer?: { scrollTop: number; length: number; type: string };
	};
	if (page.buffer) {
		await itemListRef.value?.loadData(page.buffer.length);
		scrollTop.value = page.buffer.scrollTop;
		delete page.buffer;
	} else {
		itemListRef.value?.refresh();
	}
});
onMounted(async () => {
	if (itemListRef.value) {
		await itemListRef.value.refresh();
		return;
	}
	while (!itemListRef.value) {
		await nextTick();
	}
	await (itemListRef.value as InstanceType<typeof ItemList>).refresh();
});
onHide(() => {
	// @ts-expect-error
	getCurrentPages()[0].buffer = {
		scrollTop: itemListRef.value?.listScrollTop || 0,
		length: dataList.value?.length || 0,
	};
});
</script>

<template>
	<ItemList ref="itemListRef" :get-list-data="getListData">
		<div
			v-for="item in dataList"
			:key="item"
			class="bg-reminder/15 m-2 rounded-lg px-6 py-8 text-sm text-slate-700"
			@click="gotoDetail(item)"
		>
			{{ item }}
		</div>
	</ItemList>
</template>

<style scoped></style>
