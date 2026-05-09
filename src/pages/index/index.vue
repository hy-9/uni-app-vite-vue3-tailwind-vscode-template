<script setup lang="ts">
import CapabilityShowcase from "@/components/sections/CapabilityShowcase.vue";
import ExperienceLab from "@/components/sections/ExperienceLab.vue";
import GradientFeature from "@/components/sections/GradientFeature.vue";
import HeroShowcase from "@/components/sections/HeroShowcase.vue";
import IconGallery from "@/components/sections/IconGallery.vue";
import MacroShowcase from "@/components/sections/MacroShowcase.vue";

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
