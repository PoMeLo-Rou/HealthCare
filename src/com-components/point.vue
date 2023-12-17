<template>
	<view v-if="show" class="box">
		<image src="/static/other/kongshuju.jpg" mode="aspectFill"></image>
		<text style="margin-top: 40rpx;">{{title}}</text>
	</view>
</template>

<script setup lang="ts">
	withDefaults(defineProps<{show:boolean,title?:string}>(),{
		show:false,
		title:'没有更多的数据'
	})
</script>

<style>
	image {
		width: 400rpx;
		height: 400rpx;
	}
	.box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>