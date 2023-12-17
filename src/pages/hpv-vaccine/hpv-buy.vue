<template>
	<view class="taocan-top">
		<view class="top-left">
			<text class="hpv-name">{{router_data.name}}</text>
			<view class="hpv-desc">
				<text class="desc-item" v-for="(item,index) in router_data.describe" :key="index">{{item}}</text>
			</view>
		</view>
		<view class="top-right">
			<text class="hpv-price">￥{{router_data.price[0]}}-￥{{router_data.price[1]}}</text>
		</view>
	</view>
	<!-- 预约hpv，表单填写 -->
	<view class="hpv-form">
		<view class="form">
			<text>真实姓名</text>
			<input v-model="submitData.name" placeholder="请输入真实姓名" placeholder-style="place-style" type="text" />
		</view>
		<view class="form">
			<text>身份证</text>
			<input v-model="submitData.id_card" placeholder="请输入身份证" placeholder-style="place-style" type="text" />
		</view>
		<view class="form">
			<text>性别</text>
			<picker mode="selector" :range="['男','女']" @change="changeSelector">
				<view class="choose-picker">
					<text>{{gender==''?'请选择性别':gender}}</text>
					<image src="../../static/other/gengduo.svg" mode=""></image>
				</view>
			</picker>
		</view>
		<view class="form">
			<text>出生日期</text>
			<picker mode="date" @change="changeDate">
				<view class="choose-picker">
					<text>{{born_date==''?'请选择出生日期':born_date}}</text>
					<image src="../../static/other/gengduo.svg" mode=""></image>
				</view>
			</picker>
		</view>
		<view class="form">
			<text>手机号</text>
			<input v-model="submitData.phone" type="number" placeholder="请输入手机号" placeholder-style="place-style"/>
		</view>
	</view>
	<!-- 套餐名称，接种时间的选择 -->
	<view class="hpv-choose">
		<!-- 套餐名称 -->
		<block v-for="(item,index) in combo_name" :key="index">
			<text class="choose-tit">{{item.title}}</text>
			<view class="choose-name">
				<text :class="index_a==Name?'selected':''" class="name-item" 
				v-for="(item_a,index_a) in item.name" :key="index_a"
				@click="selectName(index_a,item_a.combo_id,item_a.combo)"
				>{{item_a.combo}}</text>
			</view>
		</block>
		<!-- 接种时间 -->
		<block v-for="(item,index) in combo_time" :key="index">
			<text class="choose-tit">{{item.title}}</text>
			<view class="choose-name">
				<text :class="index_a==Time?'selected':''" class="name-item" 
				v-for="(item_a,index_a) in item.name" :key="index_a"
				@click="selectTime(index_a,item_a.time_id,item_a.time)"
				>{{item_a.time}}</text>
			</view>
		</block>
	</view>
	<!-- 底部按钮，合计，提交 -->
	<view class="footer">
		<text class="all-price">合计：￥{{price}}</text>
		<text class="submit" @click="Submit">提交</text>
	</view>
	<view style="height: 300rpx;"></view>
</template>

<script setup lang="ts">
	import {ref,watch,reactive, toRefs} from 'vue'
	import {onLoad} from '@dcloudio/uni-app'
	import { RequestApi } from '@/public/request'
	import {Combotime,Comboname} from '@/public/decl-type'
	// 套餐名称
	let combo_name = ref<Comboname[]>([])
	// 接种时间
	let combo_time = ref<Combotime[]>([])
	// 选中套餐的索引
	let Name = ref(-1)
	// 选中接种时间的索引
	let Time = ref(-1)
	let router_data = reactive({
		_id:'',
		name:'',
		price:['0'],
		describe:['0']
	})
	
	onLoad(async(event:any) => {
		console.log(event)
		const {_id,name,price,describe} = JSON.parse(event.value)
		router_data._id = _id
		router_data.name = name
		router_data.price = price
		router_data.describe = describe
		const res:any = await RequestApi.HpvPack()
		combo_name.value = [res.data.data[0]]
		combo_time.value = [res.data.data[1]]
	})
	
	// 选中套餐名称的id
	let name_id = ref('')
	// 选中套餐名称的名字
	let comboName = ref('')
	// 选中接种时间的id
	let time_id = ref('')
	// 选中具体接种时间
	let comboTime = ref('')
	
	const selectName = (index:number,id:string,combo:string) => {
		Name.value = index
		name_id.value = id
		comboName.value = combo
	}
	const selectTime = (index:number,id:string,time:string) => {
		Time.value = index
		time_id.value = id
		comboTime.value = time
	}
	watch([name_id,time_id],(newVal,oldVal) => {
		if(newVal[0]!=''&&newVal[1]!='') {
			name_id.value = newVal[0]
			time_id.value = newVal[1]
			uni.showLoading({
				title:"计算价格中",
				mask:true
			})
			getPrice()
		}
	})
	//记录hpv套餐价格
	let price = ref(0)
	// 8d33255162dc5b22001ef71c302a450b
	const getPrice = async() => {
		const res:any = await RequestApi.HpvPrice({hpv_id:router_data._id,combo_id:name_id.value,time_id:time_id.value})
		price.value = res.data.data[0].price
		uni.hideLoading()
	}
	
	let gender = ref('')
	const changeSelector = (event:any) => {
		gender.value = event.detail.value=='0'?'男':'女'
	}
	
	let born_date = ref('')
	const changeDate = (event:any) => {
		born_date.value = event.detail.value
	}
	
	let submitData = reactive({
		name:'',
		id_card:'',
		gender,
		born_date,
		phone:'',
		combo:comboName,
		ino_time:comboTime,
		price,
		hpv_name:toRefs(router_data).name
	})
	
	const Submit = async() => {
		uni.showLoading({
			title:'提交中',
			mask:true
		})
		const res:any = await RequestApi.ResHpv(submitData)
		if(res.statusCode==200) {
			uni.hideLoading()
			uni.redirectTo({
				url:'/pages/my-service/hpv-view/index'
			})
		}
	}
	
	
</script>

<style scoped>
	.taocan-top {
		padding: 24rpx;
		margin-bottom: 40rpx;
		height: 90rpx;
		box-shadow: #f7f7f7 0 0 20rpx 10rpx;
	}
	.top-left {
		float: left;
	}
	.top-right {
		float: right;
	}
	.hpv-name {
		font-size: 34rpx;
		font-weight: 700;
	}
	.hpv-desc {
		font-size: 24rpx;
		margin: 18rpx 0;
	}
	.desc-item {
		width: 50rpx;
		height: 25rpx;
		line-height: 25rpx;
		background-color: #e4e4e4;
		color: #000000;
		margin-right: 10rpx;
		padding: 4rpx;
	}
	.hpv-price {
		color: #ff9900;
		font-size: 28rpx;
	}
	.hpv-form {
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
	.choose-picker {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.choose-picker image {
		width: 30rpx;
		height: 30rpx;
	}
	.hpv-choose {
		padding: 24rpx;
		margin-top: 20rpx;
		box-shadow: #f7f7f7 0 0 20rpx 10rpx;
		height: 300rpx;
	}
	.choose-tit {
		font-size: 30rpx;
		font-weight: 700;
		height: 80rpx;
	}
	.choose-name {
		height: 80rpx;
		font-size: 28rpx;
		color: #000000;
		margin-top: 36rpx;
	}
	.name-item {
		
		margin-right: 10rpx;
		padding: 20rpx;
		background-color: #e4e4e4;
	}
	.footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 700rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		padding:35rpx;
		box-shadow: #f7f7f7 0 0 20rpx 10rpx;
	}
	.all-price {
		color: #ff9900;
		font-size: 28rpx;
	}
	.submit {
		text-align: center;
		width: 100rpx;
		height: 10rpx;
		line-height: 10rpx;
		padding: 30rpx;
		background-color: #3383ff;
		color: #fff;
	}
	.selected {
		background-color: #3383ff;
		color: #fff;
	}
</style>