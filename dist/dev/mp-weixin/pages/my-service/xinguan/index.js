"use strict";
var common_vendor = require("../../../common/vendor.js");
var public_request = require("../../../public/request.js");
if (!Math) {
  Point();
}
const Point = () => "../../../com-components/point.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    let order = common_vendor.ref([]);
    let show = common_vendor.ref(false);
    common_vendor.onShow(async () => {
      const res = await public_request.RequestApi.CoviduserOrder();
      order.value = res.data.data;
      if (res.data.data.length == 0) {
        show.value = true;
      }
    });
    const Cancel = async (id, index) => {
      await public_request.RequestApi.CovidCancel({ _id: id });
      order.value[index].cancel = false;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(order), (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.address),
            c: common_vendor.t(item.company),
            d: common_vendor.t(item.date),
            e: common_vendor.t(item.period),
            f: common_vendor.t(item.cancel ? "\u53D6\u6D88\u9884\u7EA6" : "\u5DF2\u53D6\u6D88\u9884\u7EA6"),
            g: common_vendor.o(($event) => Cancel(item._id, index)),
            h: common_vendor.n(item.cancel ? "to-cancel" : "canceled"),
            i: index
          };
        }),
        b: common_vendor.p({
          show: common_vendor.unref(show)
        })
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4e24fc04"], ["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/pages/my-service/xinguan/index.vue"]]);
wx.createPage(MiniProgramPage);
