<template>
	<view class="login">
		<image src="https://diancan-1252107261.cos.accelerate.myqcloud.com/yiliao/denglu-yemian.jpg" mode="aspectFill"></image>
		<button @click="login">授权登录</button>
	</view>
</template>

<script setup lang="ts">
	import {RequestApi} from '@/public/request'
	const login = () => {
		uni.getUserProfile({
			desc:'获取用户信息',
			success: (res) => {
				const {avatarUrl,nickName} = res.userInfo
				// 获取code
				uni.login({
					success(code) {
						uni.showLoading({title:"登陆中",mask:true})
						loginApi(avatarUrl,nickName,code.code)
					},
					fail(err) {
						uni.showToast({title:"登录失败",icon:'none',duration:1000})
					}
				})
			},
			fail: (err) => {
				uni.showToast({title:"登录失败",icon:'none',duration:1000})
			}
		})
	};
	const loginApi = async(avatarUrl:string,nickName:string,code:string) => {
		try {
			const obj = {appid:'wxf64cebafedb21c58',secret:'6b1185c47a149f70c66f7b0f85b6d395',nickName,avatarUrl,code}
			const res:any = await RequestApi.WxLogin(obj)
			uni.setStorageSync('wxuser',res.data.data)
			setTimeout(() => {
				uni.navigateBack({delta:1})
				uni.showToast({title:"登录成功",icon:'none',duration:1000})
			},600)
		} catch(err) {
			uni.showToast({title:"登录失败",icon:'none',duration:1000})
		}
	}
</script>

<style>
	.login {
		position: relative;
		width: 100%;
		height: 1200rpx;
	}
	image {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 1200rpx;
	}
	button {
		position: absolute;
		left: 30%;
		top: 70%;
		width: 350rpx;
		background-color: #0066ff;
		color: #ffffff;
		text-align: center;
		line-height: 90rpx;
		height: 90rpx;
	}
</style>