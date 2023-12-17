<template>
	<view class="info" v-for="(item,index) in patient" :key="index" @click="choose(item._id,item.name)">
		<view class="info-item">
			<view class="info-flex">
				<text class="name">{{item.name}}</text>
				<text class="tag">{{item.relation}}</text>
			</view>
			<view class="info-flex">
				<text>{{item.sex}}</text>
				<text>{{item.age}}岁</text>
				<text>{{item.phone}}</text>
			</view>
		</view>
	</view>
	<!-- 按钮 -->
	<Point :show="show" :titlt="title"/>
	<view style="height: 300rpx;"></view>
	<view class="btn">
		<text class="cancel" @click="Cancel">取消</text>
		<text class="submit" @click="Add">添加就诊人</text>
	</view>
</template>

<script setup lang="ts">
	import {ref} from 'vue'
	import {onShow} from '@dcloudio/uni-app'
	import {RequestApi} from '@/public/request'
	import {Patient} from '@/public/decl-type'
	import {mydata} from '@/store/index'
	import Point from '@/com-components/point.vue'
	const store = mydata()
	const show = ref(false)
	const title = ref('没有就诊人数据')
	const patient = ref<Patient[]>([])
	onShow(async()=> {
		const res:any = await RequestApi.GetPatient()
		patient.value = res.data.data
		if(res.data.data.length==0) {
			show.value = true
		}
	})
	
	const choose = (_id:string,name:string) => {
		store.addPatien({name,_id})
		uni.navigateBack({delta:1})
	}
	
	
	
	const Cancel = () => {
		uni.navigateBack({delta:1})
	}
	const Add = () => {
		uni.navigateTo({
			url:"/pages/my-service/my-patient/add-patient"
		})
	}
	
</script>

<style scoped>
	.info-item {
		margin: 20rpx;
		padding: 20rpx;
		box-shadow: #f7f7f7 0 0 20rpx 10rpx;
	}
	.info-flex {
		display: flex;
		margin: 16rpx;
	}
	.name {
		font-size: 34rpx;
		font-weight: 600;
		margin-right: 10rpx;
	}
	.tag {
		font-size: 28rpx;
		background-color: #ccffff;
		padding: 6rpx;
		color: #00ffff;
	}
	.info-flex:nth-child(2) {
		color: #a6a6a6;
		font-size: 26rpx;
	}
	.info-flex:nth-child(2) text {
		margin-right: 14rpx;
	}
	.btn {
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: #fff;
		width: 100%;
		padding: 30rpx;
		/* text-align: center; */
		box-shadow: #f7f7f7 0px 0px 20rpx 10rpx;
	}
	.btn text {
		width: 480rpx;
		height: 20rpx;
		line-height: 20rpx;
		border-radius: 10rpx;
		margin: 0 30rpx;
		padding: 20rpx 60rpx;
	}
	.btn .cancel {
		background-color: #e5faff;
		padding: 20rpx 90rpx;
		color: #3383ff;
		margin-right: 120rpx;
	}
	.btn .submit {
		background-color: #3383ff;
		color: #fff;
	}
</style>