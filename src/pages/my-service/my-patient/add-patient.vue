<template>
	<view class="identify" @click="upload">
		<image src="/static/other/AI-shibie.svg" mode="widthFix"></image>
		<text>身份智能识别</text>
	</view>
	<view class="xinguan-form">
		<view class="form">
			<text>真实姓名</text>
			<input v-model="submitData.name" type="text" placeholder="请输入真实姓名" 	placeholder-style="place-style"/>
		</view>
		<view class="form">
			<text>性别</text>
			<picker mode="selector" :range="['男','女']" @change="changeSex">
				<view class="choose-address">
					<text>{{submitData.sex==''?'请选择性别':submitData.sex}}</text>
					<image src="../../static/other/gengduo.svg" mode="widthFix"></image>
				</view>
			</picker>
		</view>
		<view class="form">
			<text>出生日期</text>
			<picker mode="date" @change="changeDate">
				<view class="choose-address">
					<text>{{submitData.born==''?'请选择出生日期':submitData.born}}</text>
					<image src="../../static/other/gengduo.svg" mode="widthFix"></image>
				</view>
			</picker>
		</view>
		<view class="form">
			<text>成员关系</text>
			<picker mode="selector" :range="['自己','父母','其他']" @change="changeRelation">
				<view class="choose-address">
					<text>{{submitData.relation==''?'请选择成员关系':submitData.relation}}</text>
					<image src="../../static/other/gengduo.svg" mode="widthFix"></image>
				</view>
			</picker>
		</view>
		<view class="form">
			<text>身份证</text>
			<input v-model="submitData.id_card" type="text" placeholder="请输入身份证" placeholder-style="place-style"/>
		</view>
		<view class="form">
			<text>手机号</text>
			<input v-model="submitData.phone" placeholder="请输入手机号" type="number" placeholder-style="place-style"/>
		</view>
	</view>
	<!-- 按钮 -->
	<view style="height: 300rpx;"></view>
	<view class="btn">
		<text class="cancel" @click="Cancel">取消</text>
		<text class="submit" @click="sure_add">确认添加</text>
	</view>
</template>

<script setup lang="ts">
	import {ref,reactive} from 'vue'
	import {uploadImage} from '@/public/misc'
	import {RequestApi,AiCard} from '@/public/request'
	import {AddPatient} from '@/public/decl-type'
	
	let submitData = reactive({
		name:'',
		sex:'',
		born:'',
		relation:'',
		id_card:'',
		phone:''
	})
	const changeSex = (event:any) => {
		submitData.sex = event.detail.value == '0'?'男':'女'
	}
	const changeDate = (event:any) => {
		submitData.born = event.detail.value
	}
	const changeRelation = (event:any) => {
		submitData.relation = event.detail.value == '0'? '自己': event.detail.value == '1'? '父母':'其他'
	}
	
	const upload = async() => {
		const res:any = await uploadImage(AiCard,'识别中','识别失败')
		const data = JSON.parse(res.data)
		if(res.statusCode == 200) {
			submitData.name = data.data.name
			submitData.born = data.data.born
			submitData.id_card = data.data.id_card
			submitData.sex = data.data.sex
		} else {
			uni.showToast({
				title:data.data,
				icon:'none',
				duration:1000
			})
		}
	}
	
	const sure_add = async() => {
		const res:any = await RequestApi.PatientRes(submitData)
		if(res.statusCode == 200){
		    uni.navigateBack({delta:1})
		  }
	}
	
	const Cancel = () => {
		uni.navigateBack({delta:1})
	}
</script>

<style scoped>
	.identify {
		margin: 20rpx;
		padding: 20rpx;
		height: 100rpx;
		line-height: 100rpx;
		display: flex;
		align-items: center;
		box-shadow: #f7f7f7 0 0 20rpx 10rpx;
	}
	.identify image {
		width: 90rpx;
		height: 90rpx;
		margin-right: 10rpx;
	}
	.xinguan-form {
			box-shadow: #f7f7f7 0px 0px 20rpx 10rpx;
		}
	.form {
		display: flex;
		margin: 0 20rpx;
		padding: 30rpx 0;
		align-items: center;
		justify-content: space-between;
		font-size: 28rpx;
		border-bottom: 1px solid #e4e4e4;
	}
	.form input {
		text-align: right;
		flex: 1;
	}
	.form:last-child {
		border-bottom: none;
	}
	.place-style {
		color: #e4e4e4;
	}
	.choose-address {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.choose-address image {
		width: 30rpx;
		height: 30rpx;
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