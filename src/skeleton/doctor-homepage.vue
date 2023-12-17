<template name="skeleton">
  <view class="sk-container">
    <view class="structure top">
      <view class="doctor-info">
        <image mode="aspectFill" class="sk-image"></image>
        <view class="info">
          <view class="name">
            <text class="text-black sk-transparent sk-text-18-3333-648 sk-text">刘爱玲</text>
            <text class="sk-transparent sk-text-23-3333-762 sk-text">主任医师</text>
          </view>
          <view class="hospital sk-transparent sk-text-23-3333-175 sk-text">云南省第一人民医院</view>
        </view>
      </view>
      <text class="sk-transparent sk-text-23-3333-676 sk-text">擅长儿童神经系统疾病及高危儿生长发育监测。</text>
    </view>
    <view class="reserve structure">
      <view class="reserve-tit sk-transparent sk-text-14-2857-763 sk-text">预约挂号</view>
      <view class="reserve-scroll">
        <view class="reserve-l">
          <text class="border sk-transparent sk-text-40-4762-25 sk-text" style="background-position-x: 50%;">日期</text>
          <text class="border sk-transparent sk-text-40-4762-911 sk-text" style="background-position-x: 50%;">上午</text>
          <text class="border sk-transparent sk-text-40-4762-737 sk-text" style="background-position-x: 50%;">下午</text>
        </view>
        <scroll-view class="scroll" enable-flex="true" scroll-x="true">
          <view class="date-item">
            <view class="date border">
              <text class="sk-transparent sk-text-14-2857-992 sk-text">今天</text>
              <text class="sk-transparent sk-text-14-2857-460 sk-text">12-17</text>
            </view>
            <view class="order border selected sk-transparent sk-text-40-4762-119 sk-text" style="background-position-x: 50%;">预约</view>
            <view class="order border dis"></view>
          </view>
          <view class="date-item">
            <view class="date border">
              <text class="sk-transparent sk-text-14-2857-882 sk-text">周一</text>
              <text class="sk-transparent sk-text-14-2857-477 sk-text">12-18</text>
            </view>
            <view class="order border selected sk-transparent sk-text-40-4762-789 sk-text" style="background-position-x: 50%;">预约</view>
            <view class="order border selected sk-transparent sk-text-40-4762-886 sk-text" style="background-position-x: 50%;">预约</view>
          </view>
          <view class="date-item">
            <view class="date border">
              <text class="sk-transparent sk-text-14-2857-543 sk-text">周二</text>
              <text class="sk-transparent sk-text-14-2857-445 sk-text">12-19</text>
            </view>
            <view class="order border selected sk-transparent sk-text-40-4762-746 sk-text" style="background-position-x: 50%;">预约</view>
            <view class="order border selected sk-transparent sk-text-40-4762-915 sk-text" style="background-position-x: 50%;">预约</view>
          </view>
          <view class="date-item">
            <view class="date border">
              <text class="sk-transparent sk-text-14-2857-473 sk-text">周三</text>
              <text class="sk-transparent sk-text-14-2857-222 sk-text">12-20</text>
            </view>
            <view class="order border selected sk-transparent sk-text-40-4762-541 sk-text" style="background-position-x: 50%;">预约</view>
            <view class="order border selected sk-transparent sk-text-40-4762-556 sk-text" style="background-position-x: 50%;">预约</view>
          </view>
        </scroll-view>
      </view>
    </view>
    <view class="warning">
      <view class="important sk-transparent sk-text-14-2857-33 sk-text">重要提示</view>
    </view>
  </view>
</template>

<script>
</script>

<style>
	.sk-transparent {
	    color: transparent !important;
	  }
	.sk-text-18-3333-648 {
	    background-image: linear-gradient(transparent 18.3333%, #EEEEEE 0%, #EEEEEE 81.6667%, transparent 0%) !important;
	    background-size: 100% 60.0000rpx;
	    position: relative !important;
	  }
	.sk-text {
	    background-origin: content-box !important;
	    background-clip: content-box !important;
	    background-color: transparent !important;
	    color: transparent !important;
	    background-repeat: repeat-y !important;
	  }
	.sk-text-23-3333-762 {
	    background-image: linear-gradient(transparent 23.3333%, #EEEEEE 0%, #EEEEEE 76.6667%, transparent 0%) !important;
	    background-size: 100% 60.0000rpx;
	    position: relative !important;
	  }
	.sk-text-23-3333-175 {
	    background-image: linear-gradient(transparent 23.3333%, #EEEEEE 0%, #EEEEEE 76.6667%, transparent 0%) !important;
	    background-size: 100% 60.0000rpx;
	    position: relative !important;
	  }
	.sk-text-23-3333-676 {
	    background-image: linear-gradient(transparent 23.3333%, #EEEEEE 0%, #EEEEEE 76.6667%, transparent 0%) !important;
	    background-size: 100% 60.0000rpx;
	    position: relative !important;
	  }
	.sk-text-14-2857-763 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 53.2000rpx;
	    position: relative !important;
	  }
	.sk-text-40-4762-25 {
	    background-image: linear-gradient(transparent 40.4762%, #EEEEEE 0%, #EEEEEE 59.5238%, transparent 0%) !important;
	    background-size: 100% 168.0000rpx;
	    position: relative !important;
	  }
	.sk-text-40-4762-911 {
	    background-image: linear-gradient(transparent 40.4762%, #EEEEEE 0%, #EEEEEE 59.5238%, transparent 0%) !important;
	    background-size: 100% 168.0000rpx;
	    position: relative !important;
	  }
	.sk-text-40-4762-737 {
	    background-image: linear-gradient(transparent 40.4762%, #EEEEEE 0%, #EEEEEE 59.5238%, transparent 0%) !important;
	    background-size: 100% 168.0000rpx;
	    position: relative !important;
	  }
	.sk-text-14-2857-992 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 44.8000rpx;
	    position: relative !important;
	  }
	.sk-text-14-2857-460 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 44.8000rpx;
	    position: relative !important;
	  }
	.sk-text-40-4762-119 {
	    background-image: linear-gradient(transparent 40.4762%, #EEEEEE 0%, #EEEEEE 59.5238%, transparent 0%) !important;
	    background-size: 100% 168.0000rpx;
	    position: relative !important;
	  }
	.sk-text-14-2857-882 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 44.8000rpx;
	    position: relative !important;
	  }
	.sk-text-14-2857-477 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 44.8000rpx;
	    position: relative !important;
	  }
	.sk-text-40-4762-789 {
	    background-image: linear-gradient(transparent 40.4762%, #EEEEEE 0%, #EEEEEE 59.5238%, transparent 0%) !important;
	    background-size: 100% 168.0000rpx;
	    position: relative !important;
	  }
	.sk-text-40-4762-886 {
	    background-image: linear-gradient(transparent 40.4762%, #EEEEEE 0%, #EEEEEE 59.5238%, transparent 0%) !important;
	    background-size: 100% 168.0000rpx;
	    position: relative !important;
	  }
	.sk-text-14-2857-543 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 44.8000rpx;
	    position: relative !important;
	  }
	.sk-text-14-2857-445 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 44.8000rpx;
	    position: relative !important;
	  }
	.sk-text-40-4762-746 {
	    background-image: linear-gradient(transparent 40.4762%, #EEEEEE 0%, #EEEEEE 59.5238%, transparent 0%) !important;
	    background-size: 100% 168.0000rpx;
	    position: relative !important;
	  }
	.sk-text-40-4762-915 {
	    background-image: linear-gradient(transparent 40.4762%, #EEEEEE 0%, #EEEEEE 59.5238%, transparent 0%) !important;
	    background-size: 100% 168.0000rpx;
	    position: relative !important;
	  }
	.sk-text-14-2857-473 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 44.8000rpx;
	    position: relative !important;
	  }
	.sk-text-14-2857-222 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 44.8000rpx;
	    position: relative !important;
	  }
	.sk-text-40-4762-541 {
	    background-image: linear-gradient(transparent 40.4762%, #EEEEEE 0%, #EEEEEE 59.5238%, transparent 0%) !important;
	    background-size: 100% 168.0000rpx;
	    position: relative !important;
	  }
	.sk-text-40-4762-556 {
	    background-image: linear-gradient(transparent 40.4762%, #EEEEEE 0%, #EEEEEE 59.5238%, transparent 0%) !important;
	    background-size: 100% 168.0000rpx;
	    position: relative !important;
	  }
	.sk-text-14-2857-33 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 36.4000rpx;
	    position: relative !important;
	  }
	.sk-image {
	    background: #EFEFEF !important;
	  }
	.sk-container {
	    position: absolute;
	    left: 0;
	    top: 0;
	    width: 100%;
	    height: 100%;
	    overflow: hidden;
	    background-color: transparent;
	  }
</style>