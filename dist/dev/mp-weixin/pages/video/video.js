"use strict";
var common_vendor = require("../../common/vendor.js");
var public_request = require("../../public/request.js");
if (!Math) {
  Skeleton();
}
const Skeleton = () => "../../skeleton/video.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "video",
  setup(__props) {
    const video_data = common_vendor.ref([]);
    let s_show = common_vendor.ref(true);
    common_vendor.onMounted(() => {
      getData(0);
      s_show.value = false;
    });
    async function getData(page) {
      const res = await public_request.RequestApi.VideoList({ page });
      video_data.value = [...video_data.value, ...res.data.data];
    }
    const loading = common_vendor.ref(false);
    const pager = common_vendor.ref(0);
    common_vendor.onReachBottom(async () => {
      loading.value = true;
      pager.value++;
      await getData(pager.value);
      loading.value = false;
    });
    let Index = common_vendor.ref(-1);
    let Id = common_vendor.ref("");
    const toPlay = (index, _id) => {
      video_data.value[index].controls = true;
      video_data.value[index].play_but = false;
      if (Id.value == "") {
        Index.value = index;
        Id.value = _id;
        common_vendor.index.createVideoContext(Id.value).play();
      } else {
        if (index != Index.value) {
          var preId = common_vendor.index.createVideoContext(Id.value);
          preId.pause();
          video_data.value[Index.value].controls = false;
          video_data.value[Index.value].play_but = true;
        }
        Index.value = index;
        Id.value = _id;
        common_vendor.index.createVideoContext(Id.value).play();
      }
    };
    common_vendor.onShow(() => {
      common_vendor.index.createVideoContext(Id.value).pause();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(video_data.value, (item, index, i0) => {
          return common_vendor.e({
            a: item.video_url,
            b: item._id,
            c: item.controls,
            d: item.video_title,
            e: common_vendor.t(item.video_title),
            f: item.play_but
          }, item.play_but ? {
            g: common_vendor.o(($event) => toPlay(index, item._id))
          } : {}, {
            h: item.avatar,
            i: common_vendor.t(item.name),
            j: index
          });
        }),
        b: loading.value
      }, loading.value ? {} : {}, {
        c: common_vendor.unref(s_show)
      }, common_vendor.unref(s_show) ? {} : {});
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/pages/video/video.vue"]]);
wx.createPage(MiniProgramPage);
