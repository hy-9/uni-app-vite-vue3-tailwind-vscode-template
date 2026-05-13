<script setup lang="ts">
import CapabilityShowcase from "@/components/sections/CapabilityShowcase.vue";
import ExperienceLab from "@/components/sections/ExperienceLab.vue";
import GradientFeature from "@/components/sections/GradientFeature.vue";
import HeroShowcase from "@/components/sections/HeroShowcase.vue";
import IconGallery from "@/components/sections/IconGallery.vue";
import MacroShowcase from "@/components/sections/MacroShowcase.vue";

interface CaseItem {
	title: string;
	package: string;
}

const caseList: CaseItem[] = [
	{
		title: "列表缓存",
		package: "/pages/case/list-cache/index",
	},
];

async function toCasePackage(item: CaseItem) {
	uni.navigateTo({
		url: item.package,
	});
}

onLoad(() => {
	console.log("欢迎使用 weapp-tailwindcss 模板");
});
</script>

<template>
	<view
		class="bg-primary flex min-h-screen w-full justify-center px-0 py-6 text-slate-800"
	>
		<view
			class="flex w-full flex-col space-y-5 px-4 sm:px-5 md:w-[94vw] md:max-w-[960px]"
		>
			<view class="grid grid-cols-4 gap-4">
				<view
					v-for="item in caseList"
					:key="item.package"
					class="cursor-pointer items-center justify-center rounded-lg bg-white/90 px-2 py-4 text-center shadow-xl"
					@click="toCasePackage(item)"
				>
					<text class="text-sm font-medium">{{ item.title }}</text>
				</view>
			</view>
			<view>
				<HeroShowcase />
			</view>
			<view>
				<CapabilityShowcase />
			</view>
			<view>
				<ExperienceLab />
			</view>
			<view>
				<IconGallery />
			</view>
			<view>
				<GradientFeature />
			</view>
			<view>
				<MacroShowcase />
			</view>
		</view>
	</view>
</template>
