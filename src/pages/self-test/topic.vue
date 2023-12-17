<template>
	<view class="test-tit">
		<text>测评进度</text>
		<progress :percent="cur_percent"  class="progress" border-radius="30" activeColor="#0066ff" stroke-width="10"/>
		<text>{{cur_index}}/{{data_length}}</text>
	</view>
	<!-- 题目 -->
	<view class="test-problem structure">{{cur_data.topic}}</view>
	<!-- 选项 -->
	<view class="test-choices structure">
		<view class="choices-type">
			<text class="line"></text>
			<text>单选题</text>
		</view>
		<view class="choices">
			<view class="choices-item"  hover-class="hover-style" hover-stay-time="300"
			 v-for="(item,index) in cur_data.options" :key="index"
			 @click="changeNextPage(item.son_id)"
			 v-if="cur_data.options.length>0"
			 >{{item.title}}</view>
		</view>
	</view>
	<Skeleton v-if="s_show"/>
</template>

<script setup lang="ts">
	import {reactive, ref, watch} from 'vue'
	import {onLoad,onShow} from '@dcloudio/uni-app'
	import {RequestApi} from '@/public/request'
	import {TestResult} from '@/public/decl-type'
	import Skeleton from '@/skeleton/self-test-topic.vue'
	//骨架屏的显示
	const s_show = ref(true)
	// 001 抑郁症 002 男性功能 003 失眠
	let Type = ref('')
	let Title = ref('')
	onLoad((event:any) => {
		const {type,name} = event
		Type.value = type
		Title.value = name
		uni.setNavigationBarTitle({
			title:Title.value
		})
	})
	// 存储所有数据
	let all_data = ref<TestResult[]>([])
	// 存储当前页面的数据
	let cur_data = reactive<TestResult>({
		options: [],
		topic: '',
		_id: ''
	})
	// 存储所有数据的长度
	let data_length = ref(0)
	onShow(async()=> {
		cur_index.value = 1
		cur_index_s.value = 0
		cur_percent.value = 0
		question_id.value = []
		if(Type.value=='001') {
			var res:any = await RequestApi.DepressionTopics()
		} else if(Type.value == '002') {
			var res:any = await RequestApi.PrematureTopics()
		} else {
			var res:any = await RequestApi.InsomniaTopics()
		}
		all_data.value = res.data.data
		data_length.value = res.data.data.length
		cur_data = res.data.data[0]
		cur_percent.value = (100 / data_length.value)
		s_show.value = false
	})
	// 存储当前的题目的索引
	let cur_index = ref(1)
	// 存储当前加入题目选项的索引
	let cur_index_s = ref(0)
	// 存储进度条的百分比
	let cur_percent = ref(0)
	// 存储所有题目选项的ID
	let question_id = reactive<{value:string[]}>({value:[]})
	const changeNextPage = (son_id:string) => {
		cur_index_s.value++ 
		if(cur_index_s.value < data_length.value) {
			cur_index.value++
			cur_data = all_data.value[cur_index_s.value]
			cur_percent.value = 100*(cur_index.value)/(data_length.value)
		}
		question_id.value.push(son_id)
	}
	watch([cur_index_s,data_length],(newVal,oldVal)=> {
		let obj = JSON.stringify({type:Type.value,topic_id:question_id.value})
		if(newVal[0] == newVal[1]) {
			uni.navigateTo({
				url:"/pages/self-test/result?value=" + obj
			})
		}
	})
	
</script>

<style>
	  page{
	        background: linear-gradient(to bottom,#d6e8ff 30%,#f2f7fb 55%, #f0f5f9 90%);
	    }
	  .test-tit {
		  display: flex;
		  justify-content: space-between;
		  padding: 20rpx;
	  }
	  .progress {
		  flex: 1;
		  margin: 0 20rpx;
	  }
	  .structure {
		  padding: 20rpx;
		  margin: 20rpx;
	  }
	  .test-problem {
		  display: block;
		  background-color: #fff;
		  color: #000;
		  border-radius: 20rpx;
	  }
	  .test-choices {
		  background-color: #e2eaf5;
		  color: #000;
	  }
	  .choices-type {
		  display: flex;
		  align-items: center;
	  }
	  .line {
		  display: inline-block;
		  width: 6rpx;
		  height: 26rpx;
		  background-color: #0066ff;
		  margin-right: 10rpx;
	  }
	  .choices-item {
		  padding: 20rpx;
		  background-color: #fff;
		  margin: 20rpx 0 20rpx 0;
	  }
	  .hover-style {
		  background-color: #ebf4ff;
		  color: #298cff;
	  }
</style>