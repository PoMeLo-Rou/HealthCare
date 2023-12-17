<template>
	<view class="video-item" v-for="(item,index) in video_data" :key="index">
		<video :src="item.video_url"
		  :id="item._id"
		  :controls="item.controls"
		  :show-center-play-btn="false"
		  object-fit="cover"
		  :title="item.video_title" class="video">
		</video>
		<text class="title">{{item.video_title}}</text>
		<image v-if="item.play_but" @click="toPlay(index,item._id)" class="play" src="/static/other/video-bofang.png" mode="widthFix"></image>
		<view class="doctor">
			<image :src="item.avatar" mode="widthFix"></image>
			<text>{{item.name}}</text>
		</view>
	</view>
	<!-- 加载符号 -->
	<view class="loading">
		<image v-if="loading" src="/static/other/loading.svg" mode="widthFix"></image>
	</view>
	<Skeleton v-if="s_show"/>
</template>


<script setup lang="ts">
	import {onMounted,ref} from 'vue'
	import {RequestApi} from '@/public/request'
	import {VideoData} from '@/public/decl-type'
	import {onReachBottom,onShow} from '@dcloudio/uni-app'
	import Skeleton from '@/skeleton/video.vue'
	const video_data = ref<VideoData[]>([])
	let s_show = ref(true)
	onMounted(()=> {
		getData(0)
		s_show.value = false
	})
	async function getData (page:number){
		 const res:any = await RequestApi.VideoList({page})
		video_data.value = [...video_data.value,...res.data.data]
	}
	const loading = ref(false)
	const pager = ref(0)
	onReachBottom(async()=> {
		loading.value = true
		pager.value++
		await getData(pager.value)
		loading.value = false
	})
	let Index = ref(-1)
	let Id = ref('')
	// 点击视频中的播放按钮，暂停上一个播放的视频，播放点击的视频
	const toPlay = (index:number,_id :string) => {
		video_data.value[index].controls = true
		video_data.value[index].play_but = false
		if(Id.value == '') {
			// 首次播放的视频
			Index.value = index
			Id.value = _id
			uni.createVideoContext(Id.value).play()
		} else {
			// 判断两次点击的是否是同一个视频
			if(index!=Index.value) {
				var preId = uni.createVideoContext(Id.value)
				preId.pause()
				video_data.value[Index.value].controls = false
				video_data.value[Index.value].play_but = true
			}
			Index.value = index
			Id.value = _id
			uni.createVideoContext(Id.value).play()
		}
	}
	
	// 离开当前页面后重新进入时，暂停视频
	onShow(()=> {
		uni.createVideoContext(Id.value).pause()
	})
	
	
	
	
</script>


<style>
	.video-item {
		position: relative;
		box-shadow: #f7f7f7 0 0 20rpx 10rpx;
	}
	.video {
		width: 100%;
	}
	.title {
		position: absolute;
		left: 20rpx;
		top: 20rpx;
		color: #fff;
		font-size: 36rpx;
	}
	.play {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 100rpx;
		height: 100rpx;
		transform: translate(-50%,-60%);
	}
	.doctor {
		padding: 20rpx;
		display: flex;
		align-items: center;
	}
	.doctor image {
		width: 40rpx;
		height: 40rpx;
		margin-right: 10rpx;
	}
	.loading {
		text-align: center;
	}
	.loading image {
		width: 60rpx;
		height: 60rpx;
	}
</style>