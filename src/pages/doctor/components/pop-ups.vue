<template>
	<page-container :show="show" @clickoverlay="clickoverlay">
		<view class="pop">
			<text class="pop-tit">请选择预约时段</text>
			<view class="pop-time">
				<text v-for="(item,index) in the_time" :key="index" :class="index==curIndex?'selected':''"
				@click="curIndex = index,submitData.the_time = item"
				>{{item}}</text>
			</view>
			<text class="pop-tit">选择成员</text>
			<view class="pop-choice">
				<view class="img">
					<image src="/static/other/touxiang.svg" mode="widthFix"></image>
				<text>{{name}}</text>
				</view>
				<view class="patient-choose" @click="choosePatient">{{name==''?'选择就诊人':'重新选择'}}</view>
			</view>
			<view class="reserve" @click="Submit">提交预约</view>
		</view>
	</page-container>
</template>

<script setup lang="ts">
	export interface Data {
		show:boolean
		week:string
		the_time:string[]
		when:number
		_id:string
	}
	import {reactive, ref} from 'vue'
	import {mydata} from '@/store/index'
	import {RequestApi} from '@/public/request'
	import {Regappoin} from '@/public/decl-type'
	const store = mydata()
	var show = ref(false)
	var curIndex = ref(-1)
	// 时间段 
	var the_time = ref<string[]>([])
	
	// 提交的数据
	const submitData = reactive<Regappoin>({
		week:'',
		the_time:'',
		when:0,
		_id:'',
		patient_id:''
	})
	
	const trigger = (value:Data) =>{
		show.value = value.show
		the_time.value = value.the_time
		submitData.week = value.week
		submitData.when = value.when
		submitData._id = value._id
	}
	
	// 点击黑屏区域
	const clickoverlay = () => {
		show.value = false
		curIndex.value = -1
		submitData.the_time = ''
		the_time.value = []
	}
	// 选择成员
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
	
	// 提交预约
	const Submit = async() => {
		uni.showLoading({
			title:"提交中"
		})
		const res:any = await RequestApi.RegAppoin(submitData)
		if(res.statusCode==200) {
			uni.showToast({
				title:'提交成功',icon:'none',duration:1000
			})
			uni.redirectTo({
				url:'/pages/my-service/my-registration/index'
			})
		}
	}
	
	
	defineExpose({trigger})
	
</script>

<style>
	.pop {
		padding: 20rpx;
		
	}
	.pop-tit {
		display: block;
		text-align: center;
		height: 80rpx;
		line-height: 80rpx;
		font-weight: 600;
	}
	.pop-time {
		display: flex;
		align-items: center;
		color: #3399ff;
	}
	.pop-time text {
		display: block;
		width: 260rpx;
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
		
		border: 1px solid #e4e4e4;
		margin: 20rpx 0;
	}
	.pop-choice {
		margin-top: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #3399ff;
	}
	.img {
		display: flex;
		align-items: center;
		
	}
	.img image {
		width: 80rpx;
		height: 80rpx;
		margin-right: 10rpx;
	}
	.reserve {
		margin-top:60rpx;
		height: 90rpx;
		line-height: 90rpx;
		width: 100%;
		background-color: #3399ff;
		color: #ffffff;
		text-align: center;
	}
	.selected {
		background-color: #3399ff;
		color: #ffffff;
	}
</style>