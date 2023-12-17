<template>
	<view class="register-item" v-for="(item,index) in order" :key="index">
		<View class="item-top">
			<image :src="item.avatar" mode="aspectFill"></image>
			<view class="desc">
				<text class="weight">{{item.tre_doctor}}</text>
				<text>{{item.tre_place}}</text>
			</view>
		</View>
		<view class="info-item first">
			<text>预约流水号</text>
			<text>{{item.se_number}}</text>
		</view>
		<view class="info-item">
			<text>就诊人</text>
			<text>{{item.patient_name}}</text>
		</view>
		<view class="info-item">
			<text>就诊时间</text>
			<text>{{item.tre_time}} {{item.the_time}}</text>
		</view>
		<view class="info-item">
			<text>科室</text>
			<text>{{item.dep_ment}}</text>
		</view>
		<view class="info-item">
			<text>排队号</text>
			<text>{{item.que_number}}</text>
		</view>
		<view class="info-item">
			<text>科室楼层</text>
			<text>{{item.remark}}</text>
		</view>
		<view class="info-item">
			<text>挂号费用</text>
			<text>{{item.reg_cost}}</text>
		</view>
		<view class="cancel">
			<text @click="Cancel(item._id,index)" :class="item.cancel?'to-cancel':'canceled'">{{item.cancel?'取消预约':'已取消预约'}}</text>
		</view>
	</view>
	<!-- 没有数据 -->
	<Point :show="show"/>
	<view style="height: 300rpx;"></view>
	<Skeleton v-if="s_show"/>
</template>

<script setup lang="ts">
	import {ref} from 'vue'
	import {RequestApi} from '@/public/request'
	import {Userregister} from '@/public/decl-type'
	import {onShow} from '@dcloudio/uni-app'
	import Point from '@/com-components/point.vue'
	import Skeleton from '@/skeleton/service-my-registration.vue'
	// 骨架屏的显示
	let s_show = ref(true)
	// 接收新冠疫苗预约订单
	let order = ref<Userregister[]>([])
	// 定义组件是否显示
	let show = ref(false)
	onShow(async() => {
		const res:any = await RequestApi.UserRegistrat()
		console.log(res)
		order.value = res.data.data
		if(res.data.data.length == 0) {
			show.value = true
		}
		s_show.value = false
	})
	// 取消预约
	const Cancel = async(id:string,index:number) => {
		await RequestApi.RegistCancel({_id:id}) 
		order.value[index].cancel = false
	}
</script>

<style>
	page {
		background-color: #f8f8f8;
	}
	.register-item {
		margin: 20rpx;
		padding: 20rpx;
		box-shadow: #f7f7f7 0 0 20rpx 10rpx;
		background-color: #fff;
	}
	.item-top {
		display: flex;
		align-items: center;
	}
	.item-top image {
		width: 100rpx;
		height: 100rpx;
		margin-right: 10rpx;
	}
	.desc {
		display: flex;
		flex-direction: column;
		line-height: 40rpx;
	}
	.weight {
		font-weight: 600;
		font-size: 34rpx;
	}
	.info-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		line-height: 50rpx;
	}
	.first text{
		margin-top: 28rpx;
	}
	.info-item {
		margin: 20rpx 0;
		font-size: 26rpx;
	}
	.cancel {
		text-align: right;
		margin-top: 30rpx;
		margin-bottom: 8rpx;
	}
	.cancel text {
		padding: 10rpx 18rpx;
		
		border-radius: 10rpx;
	}
	.canceled {
		border: 1px solid #e6e6e6;
		color: #e6e6e6;
	}
	.to-cancel {
		border: 1px solid #3399ff;
		color: #3399ff;
	}
</style>