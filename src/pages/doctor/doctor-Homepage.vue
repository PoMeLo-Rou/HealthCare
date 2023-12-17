<template>
	<block v-for="(item,index) in doctor_data" :key="index">
		<view class="structure top">
			<view class="doctor-info">
				<image :src="item.avatar" mode="aspectFill"></image>
				<view class="info">
					<view class="name">
						<text class="text-black">{{item.name}}</text>
						<text>{{item.post}}</text>
					</view>
					<view class="hospital">{{item.hospital}}</view>
				</view>
			</view>
			<text>{{item.good_at}}</text>
		</view>
		<!-- 预约挂号 -->
		<view class="reserve structure">
			<view class="reserve-tit">预约挂号</view>
			<view class="reserve-scroll">
				<view class="reserve-l">
					<text class="border">日期</text>
					<text class="border">上午</text>
					<text class="border">下午</text>
				</view>
				<scroll-view scroll-x="true" class="scroll" enable-flex="true">
					<view class="date-item" v-for="(item_a,index_a) in item.App_ment" :key="index_a">
						<view class="date border">
							<text>{{item_a.day}}</text>
							<text>{{item_a.week}}</text>
						</view>
						<view class="order border" :class="item_a.time[0].nu_source<=0?'dis':'selected'"
						@click="selectTime(item_a.week,item_a.time[0].the_time,item_a.time[0].when)">
						{{item_a.time[0].nu_source<=0?'':'预约'}}</view>
						<view class="order border" :class="item_a.time[1].nu_source<=0?'dis':'selected'">
							{{item_a.time[1].nu_source<=0?'':'预约'}}
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</block>
	<!-- 重要提示 -->
	<view class="warning">
		<view class="important">重要提示</view>
		<view class="tip">1.本次预约就诊当天不可以取消预约，如需取消，请在就诊前一天24：00之前操作，累计取消或爽约三次可能会被列入医院黑名单，请按需预约</view>
		<view>2.预约挂号暂不支持医保支付，若本次挂号使用手机在线支付，就诊过程中的门诊检验检查，处方费用可能不支持医保支付</view>
	</view>
	<!-- 弹窗 -->
	<popus ref="component"/>
	<Skeleton v-if="s_show"/>
</template>

<script setup lang="ts">
	import {ref} from 'vue'
	import {onLoad} from '@dcloudio/uni-app'
	import {RequestApi} from '@/public/request'
	import {DoctorData} from '@/public/decl-type'
	import popus,{Data} from './components/pop-ups.vue'
	import Skeleton from '@/skeleton/doctor-homepage.vue'
	// 骨架屏的显示
	let s_show = ref(true)
	// 存储挂号医生的id
	let Id = ref('')
	// 存储医生的数据
	let doctor_data = ref<DoctorData[]>([])
	onLoad(async(event:any) => {
		const {id} = event
		Id.value = id
		const res:any = await RequestApi.DoctorHome({_id:id})
		doctor_data.value = res.data.data
		s_show.value = false
		
	})
	//弹窗实例
	let component = ref()
	// component.value.trigger()
	// 点击日期中的预约，弹窗出现
	const selectTime = (week:string,the_time:string[],when:number) => {
		const value:Data = {
			week, 
			the_time, 
			when,
			 _id: Id.value,
			show: true,
		}
		component.value.trigger(value)
	}
</script>

<style>
	page{
	      background: linear-gradient(to bottom,#d6e8ff 30%,#f2f7fb 55%, #f0f5f9 90%);
	  }
	.structure {
		margin: 20rpx;
		padding: 20rpx;
		background-color: #fff;
		box-shadow: #f7f7f7 0 0 20rpx 10rpx;
	}
	.top {
		line-height: 60rpx;
	}
	.doctor-info {
		display: flex;
		align-items: center;
	}
	.doctor-info image {
		width: 160rpx;
		height: 160rpx;
		margin-right: 10rpx;
	}
	.hospital {
		text-align: left;
	}
	.text-black {
		font-size: 38rpx;
		font-weight: 600;
		margin-right: 6rpx;
	}
	.reserve {
		border-collapse: collapse;
	}
	.reserve-tit {
		font-size: 38rpx;
	}
	.reserve-scroll {
		display: flex;
	}
	.reserve-l {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.reserve-l text {
		width: 100rpx;
		height: 168rpx;
		line-height: 168rpx;
		text-align: center;
	}
	.scroll {
		/* height: 516rpx; */
		white-space: nowrap;
		width: 556rpx;
		flex: 1;
		overflow: auto;
		/* width: 100%; */
	}
	.date-item {
		display: inline-block;
		width: 180rpx;
	}
	.date-item:first-child {
		transform: translateY(-172rpx);
	}
	.date {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 168rpx;
		/* line-height: 168rpx; */
	}
	.date text:first-child {
		margin-top: 42rpx;
	}
	.order {
		width: 100%;
		height: 168rpx;
		line-height: 168rpx;
		text-align: center;
	}
	.border {
		border: 1px solid #f0f3f5;
	}
	.warning {
		padding: 20rpx;
		font-size: 26rpx;
	}
	.important {
		margin: 10rpx 0;
	}
	.tip {
		margin-bottom: 10rpx;
	}
	.selected {
		background-color: #0075ff;
		color: #fff;
	}
	.dis {
	/* 禁止点击 */
		pointer-events: none;
	}
</style>