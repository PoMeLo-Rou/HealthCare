<template>
	<page-container :show="submitData.show" @clickoverlay="hide">
		<view class="page">
			<text class="page-tit">选择成员</text>
			<view class="page-text">
				<view class="page-l">
					<image src="/static/other/touxiang.svg" mode="widthFix"></image>
					<text>{{name}}</text>
				</view>
				<view class="page-r" @click="choosePatient">{{name==''?'选择成员':'重新选择'}}</view>
			</view>
			<view class="page-submit" @click="Submit">提交预约</view>
		</view>
	</page-container>
</template>

<script setup lang="ts">
	import {ref,reactive} from 'vue'
	import {RequestApi} from '@/public/request'
	import {mydata} from '@/store/index'
	export interface SData {
		phy_name:string
		phy_time:string
		show:boolean
	}
	const store = mydata()
	const submitData = reactive({
		phy_name:'',
		phy_time:'',
		patient_id:'',
		show:false
	})
	const trigger = (value:SData) => {
		submitData.phy_name = value.phy_name
		submitData.phy_time = value.phy_time
		submitData.show = value.show
	}
	defineExpose({trigger})
	
	const choosePatient = () => {
		uni.navigateTo({
			url:"/pages/my-service/my-patient/my-patient"
		})
	}
	let name = ref('')
	
	store.$subscribe((mutayion,state) => {
		name.value = state.patient.name
		submitData.patient_id = state.patient._id
	})
	
	const Submit = async() => {
		uni.showLoading({
			title:"提交中",
			mask:true
		})
		const res:any = await RequestApi.ResPhy(submitData)
		if(res.statusCode == 200) {
			uni.hideLoading()
			uni.redirectTo({
				url:'/pages/my-service/phy-exam/index'
			})
		}
	}
	
	const hide = () => {
		submitData.show = false
	}
</script>

<style scoped>
	.page {
		padding: 20rpx;
		background-color: #fff;
		height: 300rpx;
	}
	.page-tit {
		height: 76rpx;
		line-height: 76rpx;
		text-align: center;
		font-weight: 600;
	    font-size: 36rpx;
		display: block;
	}
	.page-text {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 40rpx;
	}
	.page-l {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.page-l image {
		width: 90rpx;
		height: 90rpx;
		border-radius: 50%;
		margin-right: 10rpx;
	}
	.page-submit {
		height: 80rpx;
		line-height: 80rpx;
		width: 100%;
		background-color: #0066ff;
		color: #fff;
		text-align: center;
	}
</style>