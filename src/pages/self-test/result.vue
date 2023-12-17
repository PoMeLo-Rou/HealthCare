<template>
	<view class="result-title text-black" style="font-size: 36rpx;">结果分析</view>
	<view class="texts">本测试及结果由AI得出，仅供参考，不能作为诊断及诊疗的依据</view>
	<view class="result" v-for="(item,index) in test_res" :key='index'>
		<text class="result-tit-b">{{item.scope}}:{{item.result}}</text>
		<text class="result-tit-s">{{item.suggest}}</text>
		<view class="result-txt">
			<view class="txt-title text-black">测评结果概述：</view>
			<view>
				<text class="text-item" v-for="(item_a,index_a) in item.outline" :key="index_a">
				{{index_a + 1}}. {{item_a}}</text>
			</view>
		</view>
		<!-- AI推荐 -->
		<block v-if="item.recommend.length>0">
			<view class="txt-title text-black">AI为您推荐以下科室：</view>
			<view class="keshi" v-for="(item_a,index_a) in item.recommend" :key="index_a">
				<view class="keshi-item">
					<text class="text-black">{{item_a.dep_name}}</text>
					<text class="keshi-address">{{item_a.hospital}}</text>
				</view>
				<text class="guahao">去挂号</text>
			</view>
		</block>
	</view>
	<!-- 按钮 -->
	<view style="height: 200rpx;"></view>
	<view class="btn">
		<button class="cancel" open-type="share">邀请朋友测一测</button>
		<button class="submit" @click="again">再测一次</button>
	</view>
</template>

<script setup lang="ts">
	import {reactive, ref, watch} from 'vue'
	import {onLoad,onShow,onShareAppMessage} from '@dcloudio/uni-app'
	import {RequestApi} from '@/public/request'
	import {Testres,ShareData} from '@/public/decl-type'
	import {TEST} from '@/public/testing'
	let type_id = ref('')
	let choice_id = ref<string[]>([])
	onLoad((event:any)=> {
		const {type,topic_id} = JSON.parse(event.value)
		type_id.value = type
		choice_id.value = topic_id
	})
	let test_res = ref<Testres[]>([])
	onShow(async()=> {
		if(type_id.value == '001') {
			var res:any = await RequestApi.Depression({value:choice_id.value})
		} else if (type_id.value == '002') {
			var res:any = await RequestApi.PreMature({value:choice_id.value})
		} else {
			var res:any = await RequestApi.InsoMnia({value:choice_id.value})
		}
		test_res.value = res.data.data
		share_data.value = TEST.filter((item) => item.type == type_id.value)
	})
	const again = () => {
		uni.navigateBack({
			delta:1
		})
	}
	// 定义分享给朋友时的标题和特定图片
	var share_data = ref<ShareData[]>([])
	onShareAppMessage(() => {
		 return {
		      title: share_data.value[0].share_title,
		      path: share_data.value[0].share_path,
			  imageUrl:share_data.value[0].share_url
		    }
	})
</script>

<style>
	page{
	      background: linear-gradient(to bottom,#d6e8ff 30%,#f2f7fb 55%, #f0f5f9 90%);
		  padding: 20rpx;
		  width: 100%;
		  box-sizing: border-box;
	  }
	  .texts {
		  line-height: 50rpx;
		  margin-bottom: 40rpx;
	  }
	  .result-title {
		  margin-bottom: 20rpx;
	  }
	  .text-black {
		  font-weight: 600;
	  }
	  .result {
		  padding: 20rpx;
		  background-color: #fff;
	  }
	  .result-tit-b {
		  display: block;
		  color: #0066ff;
		  margin-bottom: 20rpx;
		  font-size: 40rpx;
	  }
	  .result-tit-s {
		  display: block;
		  color: #66ccff;
		  margin-bottom: 20rpx;
	  }
	  .txt-title {
		  margin-bottom: 30rpx;
	  }
	  .text-item {
		  width: 100%;
		  margin-bottom: 20rpx;
		  display: inline-block;
		  word-wrap: break-word;
	  }
	  .keshi {
		  padding: 20rpx;
		  background-color: #e4e6e7;
		  display: flex;
		  justify-content: space-between;
		  align-items: center;
		  margin-bottom: 20rpx;
	  }
	  .keshi-item {
		  
		  display: flex;
		  flex-direction: column;
		  /* align-items: center; */
	  }
	  .keshi-address {
		  color: #afb9bf;
	  }
	  .guahao {
		  color: #fff;
		  padding: 10rpx;
		  background-color: #0066ff;
	  }
	  .btn {
	  	position: fixed;
	  	bottom: 0;
	  	left: 0;
	  	background-color: #fff;
		box-sizing: border-box;
	  	width: 100%;
	  	padding: 20rpx;
	  	text-align: center;
	  	box-shadow: #f7f7f7 0px 0px 20rpx 10rpx;
		display: flex;
		justify-content: space-between;
	  }
	  .btn button{
		  font-size: 28rpx;
		width: 280rpx;
	  	height: 70rpx;
	  	lighting-color: 70rpx;
	  	margin: 0 20rpx;
	  	/* padding: 20rpx; */
	  }
	  .btn .cancel {
	  	background-color: #e5faff;
	  	color: #3383ff;
	  }
	  .btn .submit {
	  	background-color: #3383ff;
	  	color: #fff;
	  }
</style>