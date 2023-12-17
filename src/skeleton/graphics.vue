<template name="skeleton">
  <view class="sk-container">
    <view class="detail data-v-562c90d2">
      <text class="detail-tit data-v-562c90d2 sk-transparent sk-text-32-2222-494 sk-text">请详细描述你的病情</text>
      <view auto-focus="true" class="data-v-562c90d2 sk-image" maxlength="300" placeholder="为了更好获得医生帮助,请尽可能详细描述病情" placeholder-style="color:#00c8c8;font-size: 16px;" value="true" selection-start="-1" selection-end="-1" cursor="-1"></view>
    </view>
    <view class="checkbox data-v-562c90d2">
      <checkbox-group class="data-v-562c90d2">
        <label class="data-v-562c90d2 sk-transparent">
          <checkbox class="data-v-562c90d2" value="cb" color="#EFEFEF"></checkbox>需要医生指导用药 </label>
      </checkbox-group>
    </view>
    <view class="upload data-v-562c90d2">
      <text class="upload-tit data-v-562c90d2 sk-transparent sk-text-23-3333-20 sk-text">上传检查报告或患处照片</text>
      <view class="upload-img data-v-562c90d2">
        <view class="img data-v-562c90d2">
          <image class="data-v-562c90d2 sk-image" mode="aspectFill"></image>
        </view>
      </view>
    </view>
    <view class="choose data-v-562c90d2">
      <text class="upload-tit data-v-562c90d2 sk-transparent sk-text-23-3333-132 sk-text">选择就诊人</text>
      <view class="patient data-v-562c90d2">
        <view class="patient-img data-v-562c90d2">
          <image class="data-v-562c90d2 sk-image" mode="aspectFill"></image>
          <text class="data-v-562c90d2"></text>
        </view>
        <view class="patient-choose data-v-562c90d2 sk-transparent sk-text-14-2857-977 sk-text">选择就诊人</view>
      </view>
    </view>
    <view class="data-v-562c90d2" style="height:150px"></view>
    <view class="btn data-v-562c90d2">
      <text class="cancel data-v-562c90d2 sk-transparent sk-text--30-0000-886 sk-text">取消</text>
      <text class="submit data-v-562c90d2 sk-transparent sk-text--30-0000-818 sk-text">提交预约</text>
    </view>
  </view>
</template>

<script>
</script>

<style>
	.sk-transparent {
	    color: transparent !important;
	  }
	.sk-text-32-2222-494 {
	    background-image: linear-gradient(transparent 32.2222%, #EEEEEE 0%, #EEEEEE 67.7778%, transparent 0%) !important;
	    background-size: 100% 90.0000rpx;
	    position: relative !important;
	  }
	.sk-text {
	    background-origin: content-box !important;
	    background-clip: content-box !important;
	    background-color: transparent !important;
	    color: transparent !important;
	    background-repeat: repeat-y !important;
	  }
	.sk-text-23-3333-20 {
	    background-image: linear-gradient(transparent 23.3333%, #EEEEEE 0%, #EEEEEE 76.6667%, transparent 0%) !important;
	    background-size: 100% 60.0000rpx;
	    position: relative !important;
	  }
	.sk-text-23-3333-132 {
	    background-image: linear-gradient(transparent 23.3333%, #EEEEEE 0%, #EEEEEE 76.6667%, transparent 0%) !important;
	    background-size: 100% 60.0000rpx;
	    position: relative !important;
	  }
	.sk-text-14-2857-977 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 44.8000rpx;
	    position: relative !important;
	  }
	.sk-text--30-0000-886 {
	    background-image: linear-gradient(transparent -30.0000%, #EEEEEE 0%, #EEEEEE 130.0000%, transparent 0%) !important;
	    background-size: 100% 20.0000rpx;
	    position: relative !important;
	  }
	.sk-text--30-0000-818 {
	    background-image: linear-gradient(transparent -30.0000%, #EEEEEE 0%, #EEEEEE 130.0000%, transparent 0%) !important;
	    background-size: 100% 20.0000rpx;
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