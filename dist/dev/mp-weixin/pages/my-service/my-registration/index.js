"use strict";
var common_vendor = require("../../../common/vendor.js");
var public_request = require("../../../public/request.js");
if (!Array) {
  const _component_View = common_vendor.resolveComponent("View");
  _component_View();
}
if (!Math) {
  (Point + Skeleton)();
}
const Point = () => "../../../com-components/point.js";
const Skeleton = () => "../../../skeleton/service-my-registration.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    let s_show = common_vendor.ref(true);
    let order = common_vendor.ref([]);
    let show = common_vendor.ref(false);
    common_vendor.onShow(async () => {
      const res = await public_request.RequestApi.UserRegistrat();
      console.log(res);
      order.value = res.data.data;
      if (res.data.data.length == 0) {
        show.value = true;
      }
      s_show.value = false;
    });
    const Cancel = async (id, index) => {
      await public_request.RequestApi.RegistCancel({ _id: id });
      order.value[index].cancel = false;
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(common_vendor.unref(order), (item, index, i0) => {
          return {
            a: item.avatar,
            b: common_vendor.t(item.tre_doctor),
            c: common_vendor.t(item.tre_place),
            d: "38934ddd-0-" + i0,
            e: common_vendor.t(item.se_number),
            f: common_vendor.t(item.patient_name),
            g: common_vendor.t(item.tre_time),
            h: common_vendor.t(item.the_time),
            i: common_vendor.t(item.dep_ment),
            j: common_vendor.t(item.que_number),
            k: common_vendor.t(item.remark),
            l: common_vendor.t(item.reg_cost),
            m: common_vendor.t(item.cancel ? "\u53D6\u6D88\u9884\u7EA6" : "\u5DF2\u53D6\u6D88\u9884\u7EA6"),
            n: common_vendor.o(($event) => Cancel(item._id, index)),
            o: common_vendor.n(item.cancel ? "to-cancel" : "canceled"),
            p: index
          };
        }),
        b: common_vendor.p({
          show: common_vendor.unref(show)
        }),
        c: common_vendor.unref(s_show)
      }, common_vendor.unref(s_show) ? {} : {});
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/pages/my-service/my-registration/index.vue"]]);
wx.createPage(MiniProgramPage);
