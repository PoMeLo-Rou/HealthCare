<template>
	<!-- 顶部 -->
	<view class="nav-gation">
		<view class="nav-top"></view>
		<view class="nav-height">某某省第一人民医院</view>
	</view>
	<view class="yuyue" @click="RouteTo('抑郁测评专业版',0,'001')">
		<image mode="widthFix" src="https://diancan-1252107261.cos.accelerate.myqcloud.com/yiliao/nav-yiyu.png"></image>
	</view>
	<!-- 疫苗预约 -->
	<view class="reserve">
		<view class="reserve-item" v-for="(item,index) in vaccine" :key="index" @click="reserve_route(index)">
			<image :src="item.image" mode="aspectFill"></image>
			<text>{{item.title}}</text>
		</view>
	</view>
	<!-- 挂号和体检 -->
	<view class="guahao">
		<view class="guahao-item" v-for="(item,index) in reserve" :key="index" @click="guahao_route(index)">
			<text style="font-size: 38rpx;">{{item.title}}</text>
			<text class="text-small">{{item.describe}}</text>
			<image :src="item.image" mode="widthFix"></image>
		</view>
	</view>
	<!-- 热门挂号 -->
	<view class="hot-tit">
		<text class="tit-left">热门挂号</text>
		<view class="tit-right">
			<text @click="guahao_route(0)">查看更多</text>
			<image src="../../static/other/gengduo.svg" mode=""></image>
		</view>
	</view>
	<view class="hot-guahao">
		<view class="hot-item">
			<view class="item" @click="HotGuahao_route(item.dep_id)"  v-for="(item,index) in popular" :key="index" :style="'background-color:'+item.background">
				<text>{{item.title}}</text>
				<image :src="item.image" mode="aspectFill"></image>
			</view>
		</view>
	</view>
	<!-- 健康自测 -->
	<view class="health-tit">
		<text>健康自测</text>
	</view>
	<view class="health-profess" v-if="self_test.length > 0">
		<view class="health-item" v-for="(item,index) in [self_test[0]]" :key="index"
		@click="RouteTo(item.name,index,'001')"
		>
			<text class="health-big">{{item.name}}</text>
			<text class="health-small">{{item.describe}}</text>
			<view>
				<text class="health-big">{{item.number_of_people}}</text>
				<text class="health-small">人测过/{{item.question}}题/{{item.minute}}分钟</text>
			</view>
			<image :src="item.image" mode="widthFix"></image>
		</view>
	</view>
	<view class="health-other">
		<view class="health-item" v-for="(item,index) in self_test.slice(1)" :key="index"
		@click="RouteTo(item.name,index,'002')"
		>
			<text class="health-big">{{item.name}}</text>
			<text class="health-small">{{item.question}}题/{{item.minute}}分钟</text>
			<view>
				<text class="health-big">{{item.number_of_people}}</text>
				<text class="health-small">人测过</text>
			</view>
			<image :src="item.image" mode="widthFix"></image>
		</view>
	</view>
	<view style="height: 100rpx;"></view>
	<Skeleton v-if="s_show"/>
</template>


<script setup lang="ts">
	import { ref , onMounted } from 'vue';
	import { RequestApi } from '@/public/request'
	import {Vaccine, Reserve, Popular, Selftest} from '@/public/decl-type'
	import Skeleton from '@/skeleton/s-index.vue'
	// 骨架屏的显示
	const s_show = ref(true)
	// 记录获取胶囊距离顶部高度
	let menu_top = ref('');
	// 记录获取胶囊高度
	let menu_height = ref('');
	onMounted(() => {
		let menu = uni.getStorageSync("MenuButton") as {top:number,height:number};
		menu_top.value = menu.top + 'px';
		menu_height.value = menu.height + 'px';
		page_data()
		s_show.value = false
	})
	
	// 疫苗预约的数据
	let vaccine = ref<Vaccine[]>([])
	// 挂号和体检的数据
	let reserve = ref<Reserve[]>([])
	// 热门挂号的数据
	let popular = ref<Popular[]>([])
	// 健康自测的数据
	let self_test = ref<Selftest[]>([])
	
	const page_data = async() => {
		const res:any = await RequestApi.FrontPage()
		vaccine.value = res.data.data[0].vaccine
		reserve.value = res.data.data[1].reserve
		popular.value = res.data.data[2].popular
		self_test.value = res.data.data[3].self_test
	}
	// 路由跳转
	const RouteTo = (name:string,index:number,type:string) => {
		if(type=='001') {
			uni.navigateTo({
				url:'/pages/self-test/topic?type=001'+'&name='+name
			})
		} else {
			if(index==0) {
				uni.navigateTo({
					url:'/pages/self-test/topic?type=002'+'&name='+name
				})
			} else {
				uni.navigateTo({
					url:'/pages/self-test/topic?type=003'+'&name='+name
				})
			}
		}
	}
	// 预约疫苗跳转
	const reserve_route = (index:number) => {
		switch(index) {
			case 0 : 
			uni.navigateTo({url:"/pages/xinguan-vaccine/xinguan-vaccine"}) 
			break;
			case 1 :
			uni.navigateTo({url:"/pages/hpv-vaccine/hpv-vaccine"}) 
			break;
			case 2 :
			uni.navigateTo({url:"/pages/nucleic-acid/index"}) 
			break;
			case 3 :
			uni.navigateTo({url:"/pages/graphics/index"});
		}
	}
	// 挂号和体检的路由跳转
	const guahao_route = (index :number) => {
		switch(index) {
			case 0 : 
			uni.switchTab({url:"/pages/registered/registered"}) 
			break;
			case 1 :
			uni.navigateTo({url:"/pages/phy-exam/index"})
		}
	}
	//热门挂号路由跳转
	const HotGuahao_route = (dep_id:string) => {
		uni.navigateTo({
			url:"/pages/doctor/index?id=" + dep_id
		})
	}
</script>


<style>
	.nav-gation{
	  position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 99;
	}
	.nav-top{
	  height: v-bind('menu_top');
	}
	.nav-height{
	  height: v-bind('menu_height');
	  line-height: v-bind('menu_height');
	  padding-left: 20rpx;
	  color: #fff;
	  font-weight: bold;
	  font-size: 35rpx;
	}
	.yuyue image{
	  width: 100%;
	  display: block;
	  height: 550rpx;
	}
	.reserve {
		margin-top: 40rpx;
		padding: 0 20rpx;
		display: flex;
		justify-content: space-between;
	}
	.reserve-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 28rpx;
	}
	.reserve-item image {
		display: block;
		width: 50rpx;
		height: 50rpx;
		margin-bottom: 10rpx;
	}
	.guahao {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 10rpx;
		width: 100%;
		margin-top: 40rpx;
	}
	.guahao-item {
		position: relative;
		display: flex;
		flex-direction: column;
		width: 46%;
		height: 200rpx;
		border-radius: 20rpx;
		padding: 10rpx;
	}
	.guahao-item image {
		display: block;
		width: 150rpx;
		position: absolute;
		bottom: 0;
		right: 20rpx;
	}
	.guahao-item .text-small {
		margin-top: 8rpx; 
		color: #ffffff;
		font-size: 28rpx;
	}
	.guahao-item text {
		margin: 10rpx 0;
	}
	.guahao-item:nth-child(1) {
		background-color: #66ccff;
		color: #0000ff;
	}
	.guahao-item:nth-child(2) {
		background-color: #ffcc66;
		color: #ff9900;
	}
	.hot-tit {
		padding: 0 20rpx;
		margin-top: 40rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.tit-left {
		font-size: 28rpx;
		font-weight: 700;
	}
	.tit-right {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 28rpx;
		font-weight: 700;
	}
	.tit-right  image {
		width: 20rpx;
		height: 20rpx;
	}
	.hot-guahao {
		margin-top: 40rpx;
		padding: 0 10rpx;
	}
	.hot-item {
		display: flex;
		flex-wrap: wrap;
		
	}
	.hot-item .item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 25%;
		padding: 20rpx;
		margin: 10rpx;
	}
	.hot-item image {
		width: 50rpx;
		height: 70rpx;
	}
	.health-tit {
		margin-top: 40rpx;
		font-weight: 700;
		font-size: 30rpx;
		padding: 0 20rpx;
	}
	.health-other {
		display: flex;
		justify-content: space-between;
	}
	.health-profess {
		margin: 20rpx;
	}
	.health-profess .health-item {
		width: 100%;
	}
	.health-item {
		width: 40%;
		height: 190rpx;
		position: relative;
		display: flex;
		flex-direction: column;
		padding: 20rpx;
		background-color: #ffffff;
		box-shadow: #f7f7f7 0px 0px 20rpx 10rpx;
	}
	.health-item image {
		display: block;
		width: 220rpx;
		height: 70rpx;
		position: absolute;
		bottom: 0;
		right: 10rpx;
	}
	.health-item text {
		margin: 10rpx 0;
	}
	.health-big {
		font-size: 28rpx;
		font-weight: 700;
	}
	.health-small {
		font-size: 20rpx;
		color: #669999;
	}
	.health-other .health-item image {
		display: block;
		width: 140rpx;
		height: 60rpx;
	}
</style>
