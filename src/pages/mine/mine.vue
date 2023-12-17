<template>
	<view class="img">
		<image :src="user_data.url ==''?'/static/other/touxiang.svg':user_data.url" mode="aspectFill"></image>
		<text @click="Login" :class="user_data.nickName ==''?'none':'logined'">{{user_data.nickName ==''?'登录':user_data.nickName}}</text>
	</view>
	<view class="info">
		<view class="info-item" v-for="(item,index) in List" :key="index">
			<text>{{item.number}}</text>
			<text>{{item.type}}</text>
		</view>
	</view>
	<!-- 路由跳转 -->
	<view class="orders">
		<view class="order" v-for="(item,index) in OrderList" :key="index" @click="jumpPoute(item.path)">
			<view class="order-item">
				<image :src="item.icon" mode="widthFix"></image>
				<text>{{item.title}}</text>
			</view>
		</view>
	</view>
	<Skeleton v-if="s_show"/>
</template>


<script setup lang="ts">
	import { onShow} from '@dcloudio/uni-app'
    import { reactive, ref } from 'vue';
	import Skeleton from '@/skeleton/mine.vue'
	var s_show = ref(true)
	const user_data = reactive({
		url:'',
		nickName:''
	})
	onShow(()=> {
		const user = uni.getStorageSync('wxuser')
		if(!user) {
			user_data.nickName = ''
			user_data.url = ''
		} else {
			user_data.nickName = user.nickName
			user_data.url = user.avatarUrl
		}
		s_show.value = false
	})
	const Login = () => {
		uni.navigateTo({
			url:"/src/pages/login-page/index"
		})
	}
	
	const jumpPoute = (path:string) => {
		uni.navigateTo({
			url:path
		})
	}
	
	const List = reactive([
		{
			type:'健康分',
			number: 5
		},
		{
			type:'优惠券',
			number: 5
		},
		{
			type:'消息',
			number: 8
		}
	])
	const OrderList = reactive([
		{
			title:'就诊人管理',
			icon:'/static/mine/jiuzhenren.svg',
			path:'/pages/my-service/my-patient/my-patient'
		},
		{
			title:'我的挂号',
			icon:'/static/mine/guahao.svg',
			path:'/pages/my-service/my-registration/index'
		},
		{
			title:'新冠疫苗',
			icon:'/static/mine/xinguanyimiao.svg',
			path:'/pages/my-service/xinguan/index'
		},
		{
			title:'HPV疫苗',
			icon:'/static/mine/hpvyimiao.svg',
			path:'/pages/my-service/hpv-view/index'
		},
		{
			title:'核酸检测',
			icon:'/static/mine/hesuan.svg',
			path:'/pages/my-service/nucleic-acid/index'
		},
		{
			title:'我的体检',
			icon:'/static/mine/tijianbaogao.svg',
			path:'/pages/my-service/phy-exam/index'
		},
	])

</script>


<style>
	page {
		background: linear-gradient(to bottom,#e3efff 30%,#f6f6f6 40%);
	}
	.img {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.img image {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		margin-bottom: 10rpx;
	}
	.info {
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin-top: 30rpx;
	}
	.info-item {
		font-size: 26rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.info-item  text {
		margin: 6rpx;
	}
	.none {
		background: #0176ff;
		color: #ffffff;
	}
	.logined {
		pointer-events: none;
	}
	.orders {
		margin-top: 20rpx;
		padding: 20rpx;
		margin: 20rpx;
		background-color: #fff;
        display: flex;
		flex-wrap: wrap;
		/* justify-content: space-between; */
		border-radius: 20rpx;
	}
	.order {
		width: 110rpx;
		height: 100rpx;
		margin-right: 70rpx;
		margin-top: 10rpx;
	}
	.order:nth-child(4n) {
		margin-right: 0;
	}
	.order-item {
		
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 22rpx;
	}
	.order-item image {
		width: 60rpx;
		height: 60rpx;
		margin-bottom: 10rpx;
	}
</style>