<template>
	<!-- 价格和服务 -->
	<view class="nucleic-top">
		<view class="nucleic-price">
			<view class="price-left">
				<image :src="nucleic_data.data.logo" mode="aspectlete"></image>
			</view>
			<view class="price-right">
				<text class="price-tit">{{nucleic_data.data.name}}</text>
				<text class="price-num">￥{{nucleic_data.data.price}}</text>
			</view>
		</view>
		<view class="nucleic-service">
			<view class="service-item" v-for="(item,index) in nucleic_data.data.boon" :key="index">
				<icon class="icon-box-img" type="success" size="15"></icon>
				<text>{{item}}</text>
			</view>
		</view>
	</view>
	<!-- 地址 -->
	<view class="nucleic-address">
		<view class="address-item">
			<text class="text-weight">{{nucleic_data.data.hospital}}</text>
			<text>{{nucleic_data.data.address}}</text>
		</view>
		<view class="address-item" @click="makePhoneCall">
			<image src="../../static/other/dianhua.svg" mode="widthFix"></image>
			<text class="font-phone ">电话</text>
		</view>
	</view>
	<!-- 表单 -->
	<view class="xinguan-form">
		<view class="form">
			<text>真实姓名</text>
			<input v-model="submitData.name" type="text" placeholder="请输入真实姓名" placeholder-style="place-style"/>
		</view>
		<view class="form">
			<text>身份证</text>
			<input v-model="submitData.id_card" type="text" placeholder="请输入身份证" placeholder-style="place-style"/>
		</view>
		<view class="form">
			<text>手机号</text>
			<input v-model="submitData.phone" type="text" placeholder="请输入手机号" 	placeholder-style="place-style"/>
		</view>
	</view>
	<!-- 预约时段 -->
	<view class="reserve-time">
		<text class="reserve-tit text-black">选择预约时段</text>
		<scroll-view scroll-x="true" class="scroll-view_H">
			<view @click="to_reserve(index,item.date)" :class="index==activeIndex?'selected':''" class="scroll" v-for="(item,index) in nucleic_data.data.date" :key="index">
				<view class="scroll-item">
					<text>{{item.date}}</text>
					<text>{{item.week}}</text>
				</view>
			</view>
		</scroll-view>
	</view>
	<!-- 采样方式 -->
	<view class="nucleic-method">
		<text class="text-black">咽拭子采样方式</text>
		<view class="method-item" v-for="(item,index) in nucleic_data.data.style" :key="index">
			<text class="method">{{item.title}}</text>
			<view class="method-txt" v-for="(item_a,index_a) in item.desc" :key="index_a">{{item_a}}</view>
		</view>
	</view>
	<view style="height: 300rpx;"></view>
	<!-- 按钮 -->
	<view class="btn">
		<text class="check-price">检测费用: ￥{{nucleic_data.data.price}}</text>
		<text class="submit" @click="Submit">提交</text>
	</view>
	<Skeleton v-if="s_show"/>
</template>

<script setup lang="ts">
	import {ref,onMounted,reactive} from 'vue'
	import {RequestApi} from '@/public/request'
	import {Nucleicacid, Resnuata} from '@/public/decl-type'
	import Skeleton from '@/skeleton/nucleic-acid.vue'
	let s_show = ref(true)
	let nucleic_data = reactive<{data:Nucleicacid}>({
		data:{
			address: '',
			boon: [],
			date: [],
			hospital: '',
			logo: '',
			name: '',
			phone: '',
			price: 0,
			style: []
		}
	})
	onMounted(async() => {
		const res:any = await RequestApi.NuataGet()
		nucleic_data.data = res.data.data[0]
		s_show.value = false
	})
	const activeIndex = ref(0)
	const makePhoneCall = () => {
		uni.makePhoneCall({
			phoneNumber:nucleic_data.data.phone
		})
	}
	// 提交预约的参数
	const submitData = reactive<Resnuata>({
		name:'',
		phone:'',
		id_card:'',
		time:''
	})
	const to_reserve = (index:number,date:string) => {
		activeIndex.value = index
		submitData.time = date
	}
	const Submit = async() => {
		uni.showLoading({
			title:'提交中',
			mask:true
		})
		const res:any = await RequestApi.ResNuata(submitData)
		console.log(res)
		if(res.statusCode == 200) {
			uni.hideLoading()
			uni.navigateTo({
				url:'/pages/my-service/nucleic-acid/index'
			})
		}
	}
</script>

<style scoped>
	.nucleic-top {
		padding: 20rpx;
		height: 170rpx;
		box-shadow: #f7f7f7 0 0 20rpx 10rpx;
	}
	.nucleic-price {
		display: flex;
		align-items: center;
	}
	.price-left {
		width: 100rpx;
		height: 100rpx;
	}
	.price-left image {
		width: 100%;
		height: 100%;
	}
	.price-right {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.price-tit {
		font-size: 36rpx;
		font-weight: 700;
	}
	.price-num {
		font-size: 26rpx;
		color: #ff9900;
		margin-top: 20rpx;
	}
	.nucleic-service {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 25rpx;
	}
	.nucleic-address {
		margin: 20rpx;
		padding: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 60px;
		box-shadow: #f7f7f7 0 0 20rpx 10rpx;
	}
	.address-item {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.address-item .font-phone {
		margin-top: 20rpx;
		font-size: 26rpx;
	}
	.address-item text:first-child {
		margin-bottom: 20rpx;
	}
	.address-item image {
		width: 50rpx;
		height: 50rpx;
	}
	.text-weight {
		font-size: 36rpx;
		font-weight: 700;
	}
	.xinguan-form {
		margin: 20rpx;
		padding: 20rpx;
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
	.reserve-time {
		margin: 20rpx;
		padding: 20rpx;
		box-shadow: #f7f7f7 0px 0px 20rpx 10rpx;
		height: 150rpx;
	}
	.reserve-tit {
		margin-bottom: 20rpx;
	}
	.text-black {
		font-size: 30rpx;
		font-weight: 700;
	}
	scroll-view {
		margin-top: 20rpx;
	}
	.scroll-item {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.scroll-view_H {
		white-space: nowrap;
	}
	.scroll {
		display: inline-block;
		width: 100rpx;
		height: 75rpx;
		padding: 12rpx;
		font-size: 30rpx;
		border-radius: 10rpx;
	}
	.nucleic-method {
		margin: 20rpx;
		padding: 20rpx;
		box-shadow: #f7f7f7 0 0 20rpx 10rpx;
		height: 600rpx;
	}
	.method-item {
		margin-top: 22rpx;
		margin-bottom: 14rpx;
		font-size: 28rpx;
		
	}
	.method {
		display: inline-block;
		padding: 10rpx;
		background-color: #3366ff;
		border-radius: 10rpx;
		color: #ffffff;
	}
	.method-txt {
		padding: 10rpx;
		margin-top: 5rpx;
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
		/* width: 208rpx; */
		height:150rpx;
		box-sizing: border-box;
	}
	.check-price {
		float: left;
		color: #ff9900;
		font-size: 30rpx;
		height: 80rpx;
		line-height: 80rpx;
	}
	.btn .submit {
		box-sizing: border-box;
		float: right;
		background-color: #3383ff;
		color: #fff;
		margin: 0 30rpx;
		padding: 20rpx 50rpx;
		border-radius: 10rpx;
	}
	.selected {
		background-color: #3383ff;
		color: #ffffff;
	}
</style>
