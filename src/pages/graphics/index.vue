<template>
	<view class="detail">
		<text class="detail-tit">请详细描述你的病情</text>
		<textarea placeholder="为了更好获得医生帮助,请尽可能详细描述病情"
		maxlength="300"
		placeholder-style="color:#00c8c8;font-size: 32rpx;"
		:auto-focus="true"
		v-model="submitData.illness"
		/>
	</view>
	<view class="checkbox">
		<checkbox-group @change="changeCheck">
			<label>
				<checkbox value="cb" :checked="submitData.guide"/>需要医生指导用药
			</label>
		</checkbox-group>
	</view>
	<!-- 上传检查报告或患处照片 -->
	<view class="upload">
		<text class="upload-tit">上传检查报告或患处照片</text>
		<view class="upload-img">
			<view class="img" v-for="(item,index) in submitData.ins_report" :key="index">
				<image :src="item" mode="aspectFill"></image>
				<image @click="submitData.ins_report.splice(index,1)" src="../../static/other/shanchu-goods.svg" mode="widthFix"></image>
			</view>
			<view class="img">
				<image @click="upload" src="../../static/other/shuxing-img.png" mode="aspectFill"></image>
			</view>
		</view>
	</view>
	<!-- 选择就诊人 -->
	<view class="choose">
		<text class="upload-tit">选择就诊人</text>
		<view class="patient">
			<view class="patient-img">
				<image src="../../static/other/touxiang.svg" mode="aspectFill"></image>
				<text>{{name}}</text>
			</view>
			<view class="patient-choose" @click="choosePatient">{{name==''?'选择就诊人':'重新选择'}}</view>
		</view>
	</view>
	<!-- 按钮 -->
	<view style="height: 300rpx;"></view>
	<view class="btn">
		<text class="cancel" @click="Cancel">取消</text>
		<text class="submit" @click="Submit">提交预约</text>
	</view>
</template>

<script setup lang="ts">
	import {reactive, ref} from 'vue'
	import {uploadImage} from '@/public/misc'
	import {ImgUrl,RequestApi} from '@/public/request'
	import {Graphics} from '@/public/decl-type'
	import {mydata} from '@/store/index'
	const store = mydata()
	const submitData = reactive<Graphics>({
		illness: '',
		guide: false,
		ins_report: [],
		patient_id: ''
	})
	
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
	
	const upload = async() => {
		const res:any = await uploadImage(ImgUrl,'上传中','上传失败')
		submitData.ins_report.push(JSON.parse(res.data).data)
	}
	const changeCheck = (event:any) => {
		submitData.guide = event.detail.value.length==0?false:true
	}
	
	const Cancel = () => {
		uni.navigateBack({delta:1})
	}
	const Submit = async() => {
		uni.showLoading({
			title:"提交中"
		})
		const res:any = await RequestApi.GraPhics(submitData)
		if(res.statusCode==200) {
			uni.showToast({
				title:'提交成功',icon:'none',duration:1000
			})
		}
	}
</script>

<style scoped>
	.detail {
		padding: 20rpx;
		height: 290rpx;
		box-shadow: #f7f7f7 0 0 20rpx 10rpx;
	}
	.detail-tit {
		height: 90rpx;
		line-height: 90rpx;
		font-weight: 700;
		font-size: 32rpx;
	}
  textarea{
    width: 100%;
    height: 250rpx;
  }
  .checkbox {
	  height: 60rpx;
	  line-height: 60rpx;
	  margin: 20rpx;
	  padding: 20rpx;
	  box-shadow: #f7f7f7 0 0 20rpx 10rpx;
  }
  .upload {
	  margin: 20rpx;
	  padding: 20rpx;
	  box-shadow: #f7f7f7 0 0 20rpx 10rpx;
  }
  .upload-tit {
	  height: 60rpx;
	  line-height: 60rpx;
	  font-weight: 700;
	  font-size: 32rpx;
  }
  .upload-img {
	  margin-top: 20rpx;
	  display: flex;
	  flex-wrap: wrap;
  }
  .img {
	  width: 200rpx;
	  height: 200rpx;
	  position: relative;
	  margin-right: 20rpx;
  }
  .img image {
	  position: absolute;
	  right: 0;
	  top: 0;
	  width: 100%;
	  height: 100%;
  }
  .img image:nth-child(2) {
	  
	  width: 30rpx;
	  height: 40rpx;
  }
  .choose {
	  margin: 20rpx;
	  padding: 20rpx;
	  box-shadow: #f7f7f7 0 0 20rpx 10rpx;
  }
  .patient {
	  margin-top: 20rpx;
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
  }
  .patient-img {
	  display: flex;
	  align-items: center;
  }
  .patient-img image {
	  width: 110rpx;
	  height: 110rpx;
	  border-radius: 50%;
  }
  .patient-img text {
	  margin-left: 20rpx;
  }
  .btn {
  	position: fixed;
  	bottom: 0;
  	left: 0;
  	background-color: #fff;
  	width: 100%;
  	padding: 30rpx;
  	text-align: center;
  	box-shadow: #f7f7f7 0px 0px 20rpx 10rpx;
  }
  .btn text {
  	width: 380rpx;
  	height: 20rpx;
  	line-height: 20rpx;
  	border-radius: 10rpx;
  	margin: 0 30rpx;
  	padding: 20rpx;
  }
  .btn .cancel {
  	background-color: #e5faff;
  	padding: 20rpx 60rpx;
  	color: #3383ff;
  }
  .btn .submit {
  	background-color: #3383ff;
  	color: #fff;
  }
</style>