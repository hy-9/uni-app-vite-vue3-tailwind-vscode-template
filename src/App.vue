<script setup lang="ts">
onLaunch(() => {
	// 检查微信小程序是否更新
	// #ifdef MP-WEIXIN
	const updateManager = uni.getUpdateManager();
	// 检测新版本
	updateManager.onCheckForUpdate((res) => {
		if (res.hasUpdate) {
			console.log("发现新版本");
		}
	});
	// 下载新版本成功
	updateManager.onUpdateReady(() => {
		uni.showModal({
			title: "更新提示",
			content: "新版本已准备就绪，是否重启应用？",
			success: (res) => {
				if (res.confirm) {
					// 应用新版本
					updateManager.applyUpdate();
				}
			},
		});
	});
	// 下载新版本失败
	updateManager.onUpdateFailed(() => {
		uni.showModal({
			title: "更新提示",
			content: "新版本下载失败，请检查网络后重试",
			showCancel: false,
		});
	});
	// #endif
});

onShow(() => {
	console.log("App Show");
});
onHide(() => {
	console.log("App Hide");
});
</script>

<style lang="scss">
@use "tailwindcss/base";
@use "tailwindcss/components";
@use "tailwindcss/utilities";

/*  #ifdef  H5  */
svg {
	display: initial;
}

/*  #endif  */

/* 全局样式 */
page {
	box-sizing: border-box;
	height: 100%;
	font-family:
		-apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica,
		"Segoe UI", Arial, Roboto, "PingFang SC", miui, "Hiragino Sans GB",
		"Microsoft Yahei", sans-serif;
	font-size: 28rpx;
	color: #333;
	background-color: #f8f8f8;

	/* 行为相关颜色 */
	--color-primary: #03ab92;
	--color-reminder: #1989fa; /* 提醒色 */
	--color-success: #4cd963;
	--color-warning: #f0ad4e;
	--color-error: #dd524d;

	/* -tw 变量给 tailwindcss 使用，需为 现代rgb 格式 */
	--color-primary-tw: 3 171 146;
	--color-reminder-tw: 25 137 250;
	--color-success-tw: 76 217 99;
	--color-warning-tw: 240 173 78;
	--color-error-tw: 221 82 77;
}
</style>
