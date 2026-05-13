<script setup lang="ts">
import { ref } from "vue";

const props = withDefaults(
	defineProps<{
		/** 列表数据获取函数 */
		getListData: (
			/** 页码 */
			pageNum: number,
			/** 每页数量 */
			pageSize: number,
			/** 是否刷新 */
			isRefresh: boolean,
		) => Promise<{
			/** 总条数 */
			total: number;
			/** 列表长度 */
			listLength: number;
		}>;
		/** 列表高度 */
		height?: string;
		/** 滚动位置 */
		scrollTop?: number;
		/** 配置选项 */
		option?: {
			/** 是否开启下拉刷新 默认为 true */
			refresher?: boolean;
			/** 打印日志 默认为 false */
			log?: boolean;
			/** 是否没有更多数据 */
			noMore?: boolean;
		};
	}>(),
	{
		height: undefined,
		option: () => ({ refresher: true, log: false, noMore: false }),
		listData: () => [],
	},
);

const { getListData, height, option } = props;

// 分页器
const page = ref({ pageNum: 1, pageSize: 10, total: 0 });
// 加载状态
const loading = ref(false);
// 刷新状态
const refresherTriggered = ref(false);
// 是否还有更多数据
const hasMore = ref(true);
// 设置滚动位置
const _scrollTop = ref(0);
// 当前滚动位置
const listScrollTop = ref(0);

// 加载更多
async function loadMore() {
	if (loading.value || !hasMore.value) {
		return;
	}
	if (option.log) {
		console.log("加载更多", page.value.pageNum);
	}
	await getList(false);
}
// 刷新
async function refresh() {
	if (option.log) {
		console.log("刷新列表", page.value.pageNum);
	}
	await Promise.all([
		getList(true),
		new Promise((resolve) => {
			setTimeout(() => {
				resolve(null);
			}, 500);
		}),
	]);
}
/** 加载数据  load: 加载指定条数 */
async function loadData(load: number) {
	await getList(true, load);
}
// 下拉刷新
async function refreshList() {
	refresherTriggered.value = true;
	await refresh();
	refresherTriggered.value = false;
}

// 获取列表
async function getList(isRefresh: boolean = true, load?: number) {
	if (loading.value) {
		return;
	}
	loading.value = true;
	hasMore.value = true;
	if (isRefresh) {
		page.value.pageNum = 1;
	} else {
		page.value.pageNum++;
	}
	if (load) {
		page.value.pageNum = Math.ceil(load / page.value.pageSize);
	}

	const res = await getListData(
		load ? 1 : page.value.pageNum,
		load ? page.value.pageNum * page.value.pageSize : page.value.pageSize,
		load ? true : isRefresh,
	);
	page.value.total = res.total;
	loading.value = false;
	hasMore.value = res.listLength < page.value.total;
}

async function handleScroll(e: any) {
	listScrollTop.value = e.target.scrollTop;
}

watch(
	() => props.scrollTop,
	async (newVal) => {
		if (newVal && _scrollTop.value !== newVal) {
			_scrollTop.value = 0;
			await nextTick();
			await nextTick();
			await nextTick();
			nextTick(() => {
				_scrollTop.value = newVal;
			});
		}
	},
	{
		immediate: true,
		deep: true,
	},
);

if (option.log) {
	console.log("ItemList 组件初始化", option);
}

defineExpose({
	/** 刷新列表 */
	refresh,
	/** 加载数据  load: 加载指定条数 */
	loadData,
	page,
	listScrollTop,
});
</script>

<template>
	<scroll-view
		:style="{ height: height ? height : '100%' }"
		scroll-y
		:scroll-top="_scrollTop"
		:lower-threshold="90"
		:refresher-enabled="option.refresher"
		:refresher-triggered="option.refresher ? refresherTriggered : false"
		@scrolltolower="loadMore()"
		@refresherrefresh="option.refresher ? refreshList() : null"
		@scroll="handleScroll"
	>
		<slot></slot>

		<!-- 加载更多 -->
		<slot v-if="hasMore" name="loading"
			><view class="loading">
				<uni-icons
					type="spinner-cycle"
					size="20"
					color="#999"
				></uni-icons>
				<text class="loading-text">加载中...</text></view
			>
		</slot>
		<!-- 没有更多提示 -->
		<slot v-else-if="page.total !== 0" name="noMore">
			<view v-if="option.noMore" class="loading">
				<text class="loading-text">没有更多了</text>
			</view>
			<view v-else class="h-5"> </view>
		</slot>
		<!-- 无数据提示 -->
		<slot v-else name="empty">
			<view class="empty">
				<text class="empty-text">暂无数据</text>
			</view>
		</slot>
		<!-- 底部间距 -->
		<slot name="bottom"></slot>
	</scroll-view>
</template>

<style scoped>
/* 加载状态 */
.loading-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 400rpx;
}

.loading-text {
	margin-top: 20rpx;
	font-size: 28rpx;
	color: #666;
}

.loading {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 40rpx 0;
	margin: 0 auto;
}

/* 空状态 */
.loading,
.empty {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 40rpx 0;
}

.empty-text {
	margin-bottom: 40rpx;
	font-size: 30rpx;
	color: #999;
}
</style>
