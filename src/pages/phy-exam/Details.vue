<template>
	<!-- 顶部图片区域 -->
	<view class="detail-top" v-for="(item,index) in phy_detail" :key="index">
		<image :src="item.image" mode="aspectFill"></image>
		<view class="top-num">
			<text class="top-price">￥{{item.price}}</text>
			<text>已约{{item.sales}}</text>
		</view>
		<text class="top-tit">{{item.title}}</text>
		<view style="height: 20rpx;"></view>
	</view>
	<!-- 体检时间选择 -->
	<view class="reserve-time">
		<text class="reserve-tit text-black">体检时间选择</text>
		<scroll-view scroll-x="true" class="scroll-view_H">
			<view @click="activeIndex=index,s_data.phy_time = item.date" v-if="phy_detail.length > 0" :class="index==activeIndex?'selected':''" class="scroll" v-for="(item,index) in phy_detail[0].date" :key="index">
				<view class="scroll-item">
					<text>{{item.date}}</text>
					<text>{{item.week}}</text>
				</view>
			</view>
		</scroll-view>
	</view>
	<!-- 适用人群 -->
	<view class="structure">
		<text class="fit-tit text-black">适用人群</text>
		<view class="fit-items">
			<block v-for="(item,index) in phy_detail" :key="index">
				<view class="fit-item" v-for="(item_a,index_a) in item.crowd" :key="index_a">
					<image :src="item_a.image" mode="aspectFill"></image>
					<text>{{item_a.name}}</text>
				</view>
			</block>
		</view>
	</view>
	<!-- 套餐项目 -->
	<view class="structure">
		<text class="structure-tit text-black">套餐项目</text>
		<view class="projects">
			<view v-if="phy_detail.length>0" class="project-item" v-for="(item,index) in phy_detail[0].project" :key="index">
				<text class="project-tit">{{item.title}}</text>
				<view class="project-table" v-for="(item_a,index_a) in item.content" :key="index_a">
					<text class="table-l">{{item_a.thing}}</text>
					<text class="table-r">{{item_a.details}}</text>
				</view>
			</view>
		</view>
	</view>
	<Semember ref="member"/>
	<view style="height: 300rpx;"></view>
	<!-- 按钮 -->
	<view class="btn">
		<text v-if="phy_detail.length>0" class="check-price">检测费用: ￥{{phy_detail[0].price}}</text>
		<text class="submit" @click="chooseMember">选择成员</text>
	</view>
</template>

<script setup lang="ts">
	
	import {onLoad} from '@dcloudio/uni-app'
	import {reactive, ref} from 'vue'
	import {RequestApi} from '@/public/request'
	import {PhyDetailData} from '@/public/decl-type'
	import Semember,{SData} from '@/com-components/se-member.vue'
	const phy_detail = ref<PhyDetailData[]>([])
	const activeIndex = ref(-1)
	const member = ref()
	const s_data = reactive<SData>({
		phy_name:'',
		phy_time:'',
		show:true
	})
	onLoad(async(event:any)=> {
		s_data.phy_name = event.title
		const res:any = await RequestApi.PhyDateil({id:event.id})
		phy_detail.value = res.data.data
	})
	const chooseMember = () => {
		member.value.trigger(s_data)
	}
	
</script>

<style scoped>
	.detail-top {
		width: 100%;
		box-shadow: #f7f7f7 0 0 20rpx 10rpx;
	}
	.detail-top image {
		width: 100%;
		height: 440rpx;
	}
	.top-num {
		padding: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 34rpx;
	}
	.top-price {
		color: #ff9933;
	}
	.top-tit {
		padding: 20rpx;
		font-size: 38rpx;
		font-weight: 600;
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
	.selected {
		background-color: #3383ff;
		color: #ffffff;
	}
	.structure {
		padding: 20rpx;
		margin: 20rpx;
		box-shadow: #f7f7f7 0 0 20rpx 10rpx;
	}
	.fit-tit {
		height: 38rpx;
		line-height: 38rpx;
	}
	.fit-items {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.fit-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		padding: 20rpx 0 20rpx 0;
	}
	.fit-item image {
		width: 140rpx;
		height: 140rpx;
		margin-bottom: 20rpx;
	}
	.structure-tit {
		height: 38rpx;
		line-height: 38rpx;
	}
	.project-item {
		margin: 20rpx 0 20rpx 0;
		font-size: 38rpx;
	}
	.project-tit {
		display: block;
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
		background-color: #d1e0e0;
		margin-bottom: 20rpx;
	}
	.project-table {
		display: flex;
		justify-content: space-between;
		margin-bottom: 10rpx;
	}
	.table-l {
		width: 260rpx;
		background-color: #d1e0e0;
		text-align: center;
		padding: 20rpx;
		padding-top: 40rpx;
		box-sizing: border-box;
		margin-right: 6rpx;
	}
	.table-r {
		display: inline-block;
		flex: 1;
		width: 176rpx;
		background-color: #d1e0e0;
		padding: 4rpx;
		word-wrap: break-word;
		height: auto;
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