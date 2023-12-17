<template name="skeleton">
  <view class="sk-container">
    <view class="top">
      <view class="all selected sk-transparent sk-text-39-3333-996 sk-text" style="background-position-x: 50%;">全部</view>
      <scroll-view class="scroll" scroll-x="true">
        <view class="items">
          <view class="date-item">
            <text class="sk-transparent sk-text-20-0000-421 sk-text">12-17</text>
            <text class="sk-transparent sk-text-20-0000-207 sk-text">周日</text>
            <text class="sk-transparent sk-text-20-0000-739 sk-text">无号</text>
          </view>
        </view>
        <view class="items">
          <view class="date-item">
            <text class="sk-transparent sk-text-20-0000-163 sk-text">12-18</text>
            <text class="sk-transparent sk-text-20-0000-848 sk-text">周一</text>
            <text class="sk-transparent sk-text-20-0000-789 sk-text">无号</text>
          </view>
        </view>
        <view class="items">
          <view class="date-item">
            <text class="sk-transparent sk-text-20-0000-789 sk-text">12-19</text>
            <text class="sk-transparent sk-text-20-0000-923 sk-text">周二</text>
            <text class="sk-transparent sk-text-20-0000-652 sk-text">无号</text>
          </view>
        </view>
        <view class="items">
          <view class="date-item">
            <text class="sk-transparent sk-text-20-0000-489 sk-text">12-20</text>
            <text class="sk-transparent sk-text-20-0000-569 sk-text">周三</text>
            <text class="sk-transparent sk-text-20-0000-254 sk-text">无号</text>
          </view>
        </view>
      </scroll-view>
    </view>
    <view style="height:85px"></view>
    <view is="com-components/point">
      <view class="box point--box">
        <image mode="aspectFill" class="sk-image"></image>
        <text style="margin-top:20px" class="sk-transparent sk-text-14-2857-239 sk-text">没有医生数据</text>
      </view>
    </view>
  </view>
</template>

<script>
</script>

<style>
	.sk-transparent {
	    color: transparent !important;
	  }
	.sk-text-39-3333-996 {
	    background-image: linear-gradient(transparent 39.3333%, #EEEEEE 0%, #EEEEEE 60.6667%, transparent 0%) !important;
	    background-size: 100% 150.0000rpx;
	    position: relative !important;
	  }
	.sk-text {
	    background-origin: content-box !important;
	    background-clip: content-box !important;
	    background-color: transparent !important;
	    color: transparent !important;
	    background-repeat: repeat-y !important;
	  }
	.sk-text-20-0000-421 {
	    background-image: linear-gradient(transparent 20.0000%, #EEEEEE 0%, #EEEEEE 80.0000%, transparent 0%) !important;
	    background-size: 100% 50.0000rpx;
	    position: relative !important;
	  }
	.sk-text-20-0000-207 {
	    background-image: linear-gradient(transparent 20.0000%, #EEEEEE 0%, #EEEEEE 80.0000%, transparent 0%) !important;
	    background-size: 100% 50.0000rpx;
	    position: relative !important;
	  }
	.sk-text-20-0000-739 {
	    background-image: linear-gradient(transparent 20.0000%, #EEEEEE 0%, #EEEEEE 80.0000%, transparent 0%) !important;
	    background-size: 100% 50.0000rpx;
	    position: relative !important;
	  }
	.sk-text-20-0000-163 {
	    background-image: linear-gradient(transparent 20.0000%, #EEEEEE 0%, #EEEEEE 80.0000%, transparent 0%) !important;
	    background-size: 100% 50.0000rpx;
	    position: relative !important;
	  }
	.sk-text-20-0000-848 {
	    background-image: linear-gradient(transparent 20.0000%, #EEEEEE 0%, #EEEEEE 80.0000%, transparent 0%) !important;
	    background-size: 100% 50.0000rpx;
	    position: relative !important;
	  }
	.sk-text-20-0000-789 {
	    background-image: linear-gradient(transparent 20.0000%, #EEEEEE 0%, #EEEEEE 80.0000%, transparent 0%) !important;
	    background-size: 100% 50.0000rpx;
	    position: relative !important;
	  }
	.sk-text-20-0000-923 {
	    background-image: linear-gradient(transparent 20.0000%, #EEEEEE 0%, #EEEEEE 80.0000%, transparent 0%) !important;
	    background-size: 100% 50.0000rpx;
	    position: relative !important;
	  }
	.sk-text-20-0000-652 {
	    background-image: linear-gradient(transparent 20.0000%, #EEEEEE 0%, #EEEEEE 80.0000%, transparent 0%) !important;
	    background-size: 100% 50.0000rpx;
	    position: relative !important;
	  }
	.sk-text-20-0000-489 {
	    background-image: linear-gradient(transparent 20.0000%, #EEEEEE 0%, #EEEEEE 80.0000%, transparent 0%) !important;
	    background-size: 100% 50.0000rpx;
	    position: relative !important;
	  }
	.sk-text-20-0000-569 {
	    background-image: linear-gradient(transparent 20.0000%, #EEEEEE 0%, #EEEEEE 80.0000%, transparent 0%) !important;
	    background-size: 100% 50.0000rpx;
	    position: relative !important;
	  }
	.sk-text-20-0000-254 {
	    background-image: linear-gradient(transparent 20.0000%, #EEEEEE 0%, #EEEEEE 80.0000%, transparent 0%) !important;
	    background-size: 100% 50.0000rpx;
	    position: relative !important;
	  }
	.sk-text-14-2857-239 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 44.8000rpx;
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