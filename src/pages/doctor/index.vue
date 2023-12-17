<template>
	<view class="top">
		<view class="all" :class="curIndex==-1?'selected':''" @click="selectAll">全部</view>
		<scroll-view class="scroll" scroll-x="true">
			<view class="items" @click="selectDate(index,item.dep_id,item.date)" v-for="(item,index) in doctor_time" :key="index">
				<view class="date-item">
					<text>{{item.date}}</text>
					<text :class="index==curIndex?'selected':''">{{item.week}}</text>
					<text>{{item.nu_source==1?'可约':'无号'}}</text>
				</view>
			</view>
		</scroll-view>
	</view>
	<!-- 高度 -->
	<view style="height: 170rpx;"></view>
	<!-- 医生预约 -->
	<view class="doctor" v-for="(item,index) in doctor_list" :key="index" @click="jumpRoute(item._id)">
		<view class="doctor-l">
			<image :src="item.avatar" mode="aspectFill"></image>
			<view class="desc">
				<text class="text-black">{{item.name}}</text>
				<text>{{item.post}}</text>
				<text>{{item.good_at}}</text>
			</view>
		</view>
		<view class="doctor-r">
			<text class="reserve">预约</text>
		</view>
	</view>
	<point :show="show" :title="title"/>
	<Skeleton v-if="s_show"/>
</template>

<script setup lang="ts">
	import { ref, onMounted} from 'vue'
	import {RequestApi} from '@/public/request'
	import {DoctorTime,DoctorList} from '@/public/decl-type'
	import {onLoad} from '@dcloudio/uni-app'
	import Point from '@/com-components/point.vue'
	import Skeleton from '@/skeleton/s-doctor-index.vue'
	// 骨架屏的显示与隐藏
	const s_show = ref(true)
	// 存储科室的id
	const depId = ref<string>('')
	// 日期的数据
	const doctor_time = ref<DoctorTime[]>([])
	// 医生的数据
	const doctor_list = ref<DoctorList[]>([])
	const show = ref(false)
	const title = ref('没有医生数据')
	onLoad(async(event:any)=> {
		const {id} = event
		depId.value = id
		const res:any = await Promise.all([RequestApi.TimeSele({dep_id:id}),RequestApi.AlldList({dep_id:id})])
		doctor_time.value = res[0].data.data
		doctor_list.value = res[1].data.data
		if(doctor_list.value.length < 1) {
			show.value = true
		}
		s_show.value= false
	})
	
	// 日期选中的索引值
	let curIndex = ref(-1)
	// 选择全部时的医生数据
	const selectAll = async() => {
		const res:any = await RequestApi.AlldList({dep_id:depId.value})
		doctor_list.value = res.data.data
	}
	
	//根据时间选择
	const selectDate = async (index:number,dep_id:string,date:string) => {
		curIndex.value = index
		const res:any = await RequestApi.EverydList({dep_id,week:date})
		doctor_list.value = res.data.data
		
	}
	//跳转到医生详情
	const jumpRoute = (_id:string) => {
		uni.navigateTo({
			url:"/pages/doctor/doctor-Homepage?id=" + _id
		})
	}
	
</script>

<style>
	.top {
		border-top: 1px solid #d3d3d8;
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		width: 100%;
		display: flex;
		box-shadow: #f7f7f7 0 0 20rpx 10rpx;
	}
	.all {
		width: 150rpx;
		height: 150rpx;
		line-height: 150rpx;
		text-align: center;
		
		border-right: 1px solid #d3d3d8;
	}
	.scroll {
		width: 100%;
		flex: 1;
		height: 150rpx;
		line-height:50rpx;
		white-space: nowrap;
		overflow: scroll;
	}
	.date-item {
		width: 150rpx;
		height: 150rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.items {
		display: inline-block;
		font-size: 30rpx;
	}
	.doctor {
		display: flex;
		padding: 40rpx 20rpx;
		justify-content: space-between;
		/* align-items: center; */
		box-shadow: #f7f7f7 0 0 20rpx 10rpx;
	}
	.doctor-l {
		display: flex;
		align-items: center;
	}
	.doctor-l image {
		width: 160rpx;
		height: 160rpx;
		border-radius: 50%;
		margin-right: 8rpx;
	}
	.desc {
		display: flex;
		flex-direction: column;
		/* align-items: center; */
	}
	.doctor-r {
		margin-top: 80rpx;
		width: 190rpx;
		height: 80rpx;
	}
	.reserve {
		margin-top: 20rpx;
		width: 100%;
		padding: 10rpx 30rpx;
		border: 1px solid #0099ff;
		border-radius: 40rpx;
	}
	.text-black {
		font-size: 38rpx;
		font-weight: 600;
	}
	.selected {
		color: #0099ff;
	}
</style>