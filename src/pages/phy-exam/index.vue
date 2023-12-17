<template>
	<view class="tijian-nav">
		<view class="nav-item" v-for="(item,index) in phy_term" :key="index" @click="shaixuan(index,item.filter_val)">
			<text>{{item.query_val}}</text>
			<image :src="index==0?'/static/other/shaixuan-jiantou.png':'/static/other/shaixuan.png'"></image>
		</view>
	</view>
	<!-- 下拉列表 -->
	<view class="down-list" v-if="down_show">
		<view class="down-item">
			<text v-if="phy_term.length>0" v-for="(item,index) in phy_term[0].filter_val" :key="index" @click="changeSelect(item)">{{item}}</text>
		</view>
		<view class="mask"></view>
	</view>
	<!-- 体检套餐 -->
	<view style="height: 140rpx;"></view>
	<view class="tijian-list" @click="goDetails(item._id,item.title)" v-for="(item,index) in phy_data" :key="index">
		<text class="list-tit text-black">{{item.title}}</text>
		<view class="list-img">
			<image :src="item.image" mode="aspectFill"></image>
			<view class="desc">
				<text class="text-black">{{item.be_suit}}</text>
				<view class="descs">{{item.describe}}</view>
			</view>
		</view>
		<view class="list-price">
			<text>已约 {{item.sales}}</text>
			<text>￥{{item.price}}</text>
		</view>
	</view>
	<Skeleton v-if="s_show"/>
</template>

<script setup lang="ts">
	import {onMounted,reactive,ref} from 'vue'
	import {RequestApi} from '@/public/request'
	import {PhyTerm,PhyData} from '@/public/decl-type'
	import Skeleton from '@/skeleton/phy-exam-index.vue'
	// 骨架屏的显示
	let s_show = ref(true)
	let phy_term = ref<PhyTerm[]>([])
	let phy_data = ref<PhyData[]>([])
	onMounted(async ()=> {
		const res:any = await Promise.all([RequestApi.PhyTerm(),RequestApi.PhysGet()])
		phy_term.value = res[0].data.data
		phy_data.value = res[1].data.data
		s_show.value = false
	})
	const down_show = ref(false)
	const filterData = reactive({type:'',sales:'',price:''})
	const shaixuan = (index:number,value :string[]) => {
		if(index==0) {
			down_show.value = down_show.value?false:true
		}else if(index ==1) {
			// 按销量
			filterData.sales = value[0]
			phy_term.value[index].filter_val[0] =value[0] == 'desc'?'asc':'desc'
			QueryData()
		} else {
			// 按价格
			filterData.price = value[0]
			phy_term.value[index].filter_val[0] =value[0] == 'desc'?'asc':'desc'
			QueryData()
		}
	}
	// 查询筛选后的数据
	const QueryData = async () => {
		const res:any = await RequestApi.PhyQuery(filterData)
		phy_data.value = res.data.data
		
	}
	const changeSelect = (value: string) => {
		phy_term.value[0].query_val = value
		down_show.value = false
		filterData.type = value
		QueryData()
	}
	// 点击套餐列表，跳转到套餐详情页
	const goDetails = (id:string,title:string) => {
		uni.navigateTo({
			url:'/pages/phy-exam/Details?id='+id+'&title='+title
		})
	}
</script>

<style scoped>
	.tijian-nav {
		 position: fixed;
		top: 0;
		right: 0;
		left: 0;
		padding: 40rpx 50rpx;
		box-shadow: #f7f7f7 0 0 20rpx 10rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #fff;
	}
	.nav-item {
		font-size: 28rpx;
	}
	.nav-item image {
		width: 20rpx;
		height: 20rpx;
		margin-left: 10rpx;
	}
	.tijian-list {
		margin: 20rpx;
		padding: 20rpx;
		box-shadow: #f7f7f7 0 0 20rpx 10rpx;
	}
	.list-tit {
		height: 80rpx;
		line-height: 80rpx;
		font-size: 34rpx;
	}
	.text-black {
		font-weight: 600;
		color: black;
	}
	.list-img {
		display: flex;
		align-items: center;
	}
	.list-img image {
		width: 200rpx;
		height: 180rpx;
	}
	.desc {
		width: 800rpx;
		height: 200rpx;
		display: flex;
		flex-direction: column;
		font-size: 30rpx;
		color:#cccccc;
		margin-left: 20rpx;
	}
	.desc text {
		margin: 10rpx 0;
	}
	.descs {
		 display: inline-block;
		  width: 490rpx;
		  word-wrap: break-word;
	}
	.list-price {
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #ff9900;
		font-size: 32rpx;
	}
	.list-price text {
		margin: 40rpx 0 10rpx 0;
	}
	.down-item {
		 background-color: #ffffff;
		    padding: 0 50rpx;
		    position: fixed;
		    top: 98rpx;
		    left: 0;
		    right: 0;
			z-index: 10;
	}
	.down-item text {
		display: block;
		width: 100%;
		height: 40rpx;
		line-height: 40rpx;
		margin: 20rpx 0;
	}
	.mask {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		top: 100rpx;
		background-color: rgba(0,0,0,0.5);
	}
</style>