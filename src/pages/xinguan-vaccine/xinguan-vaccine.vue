<template>
	<view class="xinguan-form">
		<view class="form">
			<text>姓名</text>
			<input v-model="submitData.name" type="text" placeholder="请输入姓名" 	placeholder-style="place-style"/>
		</view>
		<view class="form">
			<text>身份证</text>
			<input v-model="submitData.id_card" type="text" placeholder="请输入身份证" 	placeholder-style="place-style"/>
		</view>
		<view class="form">
			<text>手机号</text>
			<input v-model='submitData.phone' type="text" placeholder="请输入手机号" 	placeholder-style="place-style"/>
		</view>
		<view class="form">
			<text>现居地址</text>
			<picker mode="region" @change="changeRegion">
				<view class="choose-address">
					<text>{{submitData.address==''?'请选择现居地址':submitData.address}}</text>
					<image src="../../static/other/gengduo.svg" mode="widthFix"></image>
				</view>
			</picker>
		</view>
		<view class="form">
			<text>现居详细地址</text>
			<input v-model="submitData.de_address" type="text" placeholder="请输入现居详细地址" 	placeholder-style="place-style"/>
		</view>
		<view class="form">
			<text>疫苗人群分类</text>
			<picker mode="selector" :range="selector_data" @change="changeSelector">
				<view class="choose-address">
					<text>{{submitData.crowd_sort==''?'请选择疫苗人群分类':submitData.crowd_sort}}</text>
					<image src="../../static/other/gengduo.svg" mode="widthFix"></image>
				</view>
			</picker>
		</view>
	</view>
	<!-- 地址 -->
	<view class="xinguan-address border">
		<text class="font-black">{{time_data.data.Hospital}}</text>
		<text>{{time_data.data.address}}</text>
		<view class="xinguan-firm">
			<text class="font-small firm" v-for="(item,index) in time_data.data.company" :key="index">{{item}}</text>
		</view>
	</view>
	<!-- 星期 -->
	<view class="xinguan-week border">
		<block v-for="(item,index) in time_data.data.week" :key="index">
			<view class="week-item" @click="changeWeek(item.date)" :class="submitData.date == item.date? 'checked':''">
				<text>{{item.day}}</text>
				<text>{{item.date}}</text>
				<text>{{item.Have}}</text>
			</view>
		</block>
	</view>
	<!-- 上午时段,下午时段 -->
	<view class="border xinguan-time" v-for="(item,index) in time_data.data.lasting" :key="index" v-if="time_data.data.lasting.length>0">
		<text>{{item.period}}</text>
		<block>
			<view class="time-flex">
				<view class="time" 
				 v-for="(item_a,index_a) in item.time" :key="index_a"
				:class="timeIndex==index+'-'+index_a?'checked':''"
				@click="changeTime(index+'-'+index_a,item.period,item_a.start_time,item_a.end_time,item_a.when)">
					<text>{{item_a.start_time}}-{{item_a.end_time}}</text>
					<text>剩余{{item_a.over}}</text>
				</view>
			</view>
		</block>
	</view>
	<!-- 按钮 -->
	<view style="height: 200rpx;"></view>
	<view class="btn">
		<text class="cancel" @click="cancel">取消</text>
		<text class="submit" @click="submit">提交预约</text>
	</view>
</template>

<script setup lang="ts">
	import {ref,onMounted,reactive} from 'vue'
	import { RequestApi } from '@/public/request'
	import {Newapptime,Subimtdata} from '@/public/decl-type'
	// 定义选中的上午或下午时段的索引字符串
	let timeIndex = ref('')
	let time_data = reactive<{data:Newapptime}>({
		data: {
			Hospital: '',
			address: '',
			company: [],
			lasting: [],
			week: [],
			_id: ''
		}
	})
	let submitData = reactive<Subimtdata>({
		name: '',
		id_card: '',
		phone:'',
		address: '',
		de_address: '',
		crowd_sort:'',
		date:'',
		period:'',
		reserve_time:'',
		when:0
	})
	onMounted(async() => {
		const res:any = await RequestApi.NewappTime()
		time_data.data = res.data.data[0]
		
	})
	// 地址选择器
	const changeRegion = (event:any) => {
		submitData.address = event.detail.value.join('')
	}
	// 疫苗人群选择器
	const changeSelector = (event:any) => {
		submitData.crowd_sort = selector_data.value[event.detail.value]
	}
	// 选择星期，日期
	const changeWeek = (date:string) => {
		submitData.date = date
	}
	// 选择上午或者下午时段
	const changeTime = (index:string,period:string,start_time:string,end_time:string,when:number) => {
		timeIndex.value = index
		submitData.period = period
		submitData.reserve_time = start_time + '-' + end_time
		submitData.when = when
	}
	
	// 取消新冠疫苗预约
	const cancel = () => {
		uni.navigateBack({
			delta:1
		})
	}
	// 提交新冠疫苗预约
	const submit = async() => {
		const res:any =  await RequestApi.ResCovid(submitData)
		if(res.statusCode == 200) {
			uni.navigateTo({
				url:'/pages/my-service/xinguan/index'
			})
		}
	}
	
	//选择疫苗人群分类
	let selector_data = ref(['医疗卫生人员','卫生系统内工作的其他人员','因公出国人员',
	'对外劳务派遣人员','留学生','因私出国人员','海关边检人员','公安系统,消防人员',
	'党政机关,事业单位人员','社区工作者','教育工作者','小学和中学学生','其他人员'
	])
</script>

<style>
.xinguan-form {
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
.choose-address {
	display: flex;
	justify-content: center;
	align-items: center;
}
.choose-address image {
	width: 30rpx;
	height: 30rpx;
}
.xinguan-address {
	display: flex;
	flex-direction: column;
	/* align-items: center; */
	font-size: 28rpx;
}
.font-black {
	font-weight: 700;
}
.font-small {
	font-size: 24rpx;
}
.firm {
	width: 100rpx;
	height: 40rpx;
	line-height: 40rpx;
	background-color: #e4e4e4;
	text-align: center;
	margin-right: 10rpx;
}
.border {
	margin: 20rpx;
	padding: 20rpx;
	box-shadow: #f7f7f7 0px 0px 20rpx 10rpx;
}
.xinguan-week {
	height: 150rpx;
}
.week-item {
	float: left;
	width: 170rpx;
	height: 160rpx;
	background-color: #e4e4e4;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 5rpx;
}
.week-item text {
	margin: 5rpx 0;
}
.xinguan-time {
	height: 200rpx;
	display: flex;
	flex-direction: column;
}
.time-flex {
	display: flex;
}
.time {
	/* float: left; */
	width: 180rpx;
	height: 120rpx;
	background-color: #e4e4e4;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 10rpx;
	margin-top: 20rpx;
	margin-right: 20rpx;
}
.checked {
	background-color: #3383ff;
	color: #fff;
}
.time text {
	margin: 5rpx 0;
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
}
.btn text {
	width: 208rpx;
	height: 100rpx;
	line-height: 100rpx;
	
	margin: 0 30rpx;
	padding: 40rpx;
}
.btn .cancel {
	background-color: #e5faff;
	padding: 40rpx 75rpx;
	color: #3383ff;
}
.btn .submit {
	background-color: #3383ff;
	color: #fff;
}
</style>
