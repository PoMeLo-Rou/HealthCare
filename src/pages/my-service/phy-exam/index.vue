<template>
	<view class="vaccine-order" v-for="(item,index) in order" :key="index">
		<view class="order-message">
			<text>体检套餐: </text>
			<text class="message">{{item.phy_name}}</text>
		</view>
		<view class="order-message">
			<text>体检人: </text>
			<text class="message">{{item.name}}</text>
		</view>
		<view class="order-message">
			<text>体检时间: </text>
			<text class="message">{{item.phy_time}}</text>
		</view>
		<view class="order-message">
			<text>体检地点: </text>
			<text class="message">{{item.address}}</text>
		</view>
		<view class="order-message">
			<text>订单编号: </text>
			<text class="message">{{item.order_number}}</text>
		</view>
		<view class="order-price">
			<text>￥{{item.price}}</text>
		</view>
		<view class="cancel-btn">
			<text @click="Cancel(item._id,index)" :class="item.cancel?'to-cancel':'canceled'">{{item.cancel?'取消预约':'已取消预约'}}</text>
		</view>
	</view>
	<Point :show="show"/>
	<view style="height: 300rpx;"></view>
</template>

<script setup lang="ts">
	import {ref} from 'vue'
	import {RequestApi} from '@/public/request'
	import {PhyUserorder} from '@/public/decl-type'
	import {onShow} from '@dcloudio/uni-app'
	import Point from '@/com-components/point.vue'
	// 接收新冠疫苗预约订单
	let order = ref<PhyUserorder[]>([])
	// 定义组件是否显示
	let show = ref(false)
	onShow(async() => {
		const res:any = await RequestApi.PhyuserOrder()
		order.value = res.data.data
		if(res.data.data.length == 0) {
			show.value = true
		}
	})
	// 取消预约
	const Cancel = async(id:string,index:number) => {
		await RequestApi.PhyCancel({_id:id}) 
		order.value[index].cancel = false
	}
</script>

<style scoped>
	.vaccine-order {
		margin: 20rpx;
		padding: 20rpx;
		box-shadow: #f7f7f7 0px 0px 20rpx 10rpx;
	}
	.order-tit {
		width: 100%;
		font-weight: 700;
		font-size: 32rpx;
		height: 80rpx;
		line-height: 80rpx;
		border-bottom: 1px solid  #e4e4e4;
	}
	.order-message {
		display: flex;
		align-items: center;
		height: 80rpx;
		line-height: 80rpx;
	}
	.message {
		margin-left: 14rpx;
	}
	.cancel-btn {
		text-align: right;
		height: 90rpx;
		padding-top: 30rpx;
	}
	.cancel-btn text {
		padding: 20rpx;
		border-radius: 20rpx;
	}
	.to-cancel {
		border: 1px solid #3399ff;
		color: #3399ff;
	}
	.canceled {
		border: 1px solid #e4e4e4;
		color: #e4e4e4;
	}
	.order-price {
		text-align: right;
	}
</style>