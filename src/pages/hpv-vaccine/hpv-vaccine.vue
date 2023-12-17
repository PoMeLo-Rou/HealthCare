<template>
	<view class="hpv-top">
		<image src="https://qita-1252107261.cos.ap-chengdu.myqcloud.com/yiliao/gongjinai.jpg" mode="aspectFill"></image>
		<view class="hpv-tab">
			<view class="tab-item" v-for="(item,index) in hpv_select" :key="index" @click="changeList(item._id,index)">
				<text>{{item.name}}</text>
				<text :class="index == currIndex ? 'selected':''"></text>
			</view>
		</view>
	</view>
	<!-- hpv疫苗列表 -->
	<view class="hpv-list">
		<view class="list-item" v-for="(item,index) in hpv_list" :key="index">
			<view class="list-left">
				<text class="hpv-name">{{item.name}}</text>
				<view class="hpv-desc">
					<text class="desc-item" v-for="(item_a,index_a) in item.describe" :key="index_a">{{item_a}}</text>
				</view>
				<text class="hpv-price">￥{{item.price[0]}}-￥{{item.price[1]}}</text>
			</view>
			<view class="list-right">
				<button @click="reserve(item._id,item.name,item.price,item.describe)">去预约</button>
			</view>
		</view>
	</view>
	<Skeleton v-if="s_show"/>
</template>

<script setup lang="ts">
	import {onMounted,ref} from 'vue'
	import {RequestApi} from '@/public/request'
	import {Hpvlist,Hpvselect} from '@/public/decl-type'
	import Skeleton from '@/skeleton/hpv-vaccine.vue'
	// 骨架屏的显示
	let s_show = ref(true)
	let hpv_list = ref<Hpvlist[]>([])
	let hpv_select = ref<Hpvselect[]>([])
	// 复制一份list数据
	let hpv_all = ref<Hpvlist[]>([])
	// 定义当前选中的导航索引
	let currIndex = ref(0)
	
	
	onMounted(async() => {
		const res:any = await RequestApi.OtuHpv()
		hpv_select.value = res.data.data[0].hpv_select
		hpv_list.value = res.data.data[0].hpv_list
		hpv_all.value = res.data.data[0].hpv_list
		s_show.value = false
	})
	
	// 点击导航，筛选出的hpv疫苗列表
	const changeList = (id:string,index:number) => {
		currIndex.value = index
		if(id=='26da8e4962dc565503df9629704f1700') {
			hpv_list.value = hpv_all.value
		} else {
			hpv_list.value = hpv_all.value.filter(item=>item.hpv_id == id)
		}
	}
	// 跳转到hpv疫苗预约详情页
	const reserve = (_id:string,name:string,price:string[],describe:string[]) => {
		let obj = JSON.stringify({_id,name,price,describe})
		uni.navigateTo({
			url:"/pages/hpv-vaccine/hpv-buy?value=" + obj
		})
	}
	
	
</script>

<style>
	.hpv-top image {
		width: 100%;
		height: 480rpx;
	}
	.hpv-tab {
		padding: 40rpx 40rpx 0 40rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.tab-item {
		display: flex;
		flex-direction: column;
	}
	.tab-item :nth-child(2) {
		margin-top: 20rpx;
	}
	.selected {
		display: block;
		width: 100%;
		height: 10rpx;
		background-color: #0066ff;
	}
	.list-item {
		margin: 30rpx 20rpx;
		padding: 20rpx;
		height: 140rpx;
		box-shadow: #f7f7f7 0 0 20rpx 10rpx;
	}
	.list-left {
		float: left;
	}
	.hpv-name {
		font-size: 34rpx;
		font-weight: 700;
	}
	.hpv-desc {
		font-size: 24rpx;
		margin: 18rpx 0;
	}
	.desc-item {
		width: 50rpx;
		height: 25rpx;
		line-height: 25rpx;
		background-color: #e4e4e4;
		color: #000000;
		margin-right: 10rpx;
		padding: 4rpx;
	}
	.hpv-price {
		color: #ff9900;
		font-size: 28rpx;
	}
	.list-right {
		float: right;
		padding-top: 80rpx;
	}
	.list-right button {
		width: 160rpx;
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
		color: #ffffff;
		background-color: #0066ff;
		border-radius: 30rpx;
		font-size: 30rpx;
	}
</style>
