<template>
	<view class="register">
		<view class="register-l">
			<text @click="changeList(index,item._id)" :class="curIndex==index?'selected':''" class="l-item" v-for="(item,index) in parent" :key="index">{{item.dep_ment}}</text>
		</view>
		<view class="register-r">
			<block v-for="(item,index) in children" :key="index">
				<text @click="jumpRoute(item._id)" class="r-item" v-for="(item_a,index_a) in item.dep_ment_list" :key="index_a">{{item_a.dep_name}}</text>
			</block>
			
		</view>
	</view>
	<Skeleton v-if="s_show"/>
</template>


<script setup lang="ts">
	import { ref, onMounted} from 'vue'
	import {RequestApi} from '@/public/request'
	import {DepartmentData,RegListData} from '@/public/decl-type'
	import Skeleton from '@/skeleton/s-registered.vue'
	// 骨架屏的显示
	const s_show = ref(true)
	// 存储父科室
	const parent = ref<DepartmentData[]>([])
	// 存储子科室
	const children = ref<RegListData[]>([])
	// 存储选中的父科室索引
	const curIndex = ref(0)
	onMounted(async()=> {
		const res:any = await RequestApi.Department()
		parent.value = res.data.data
		changeList(0,res.data.data[0]._id)
		s_show.value = false
	})
	const changeList = async (index:number,id:string) => {
		const res:any = await RequestApi.RegList({id})
		curIndex.value = index
		children.value = res.data.data
	}
	// 路由跳转到选择医生的界面
	const jumpRoute = (id :string) => {
		uni.navigateTo({
			url:"/pages/doctor/index?id="+id
		})
	}
</script>


<style>
	.register {
		width: 100%;
		display: flex;
	}
	.register-l {
		width: 200rpx;
		display: flex;
		flex-direction: column;
		height: auto;
	}
	.l-item {
		box-sizing: border-box;
		padding-left: 8rpx;
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		background-color: #f3f2f2;
		color: #000000;
	}
	.register-r {
		flex: 1;
		display: flex;
		flex-direction: column;
	}
	.r-item {
		background-color: #fff;
		height: 80rpx;
		line-height: 80rpx;
		color: #000000;
	}
	.selected {
		background-color: #fff;
		color: #2c76ef;
	}
</style>