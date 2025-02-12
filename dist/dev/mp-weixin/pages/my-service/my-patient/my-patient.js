"use strict";
var common_vendor = require("../../../common/vendor.js");
var public_request = require("../../../public/request.js");
var store_index = require("../../../store/index.js");
if (!Math) {
  Point();
}
const Point = () => "../../../com-components/point.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "my-patient",
  setup(__props) {
    const store = store_index.mydata();
    const show = common_vendor.ref(false);
    const title = common_vendor.ref("\u6CA1\u6709\u5C31\u8BCA\u4EBA\u6570\u636E");
    const patient = common_vendor.ref([]);
    common_vendor.onShow(async () => {
      const res = await public_request.RequestApi.GetPatient();
      patient.value = res.data.data;
      if (res.data.data.length == 0) {
        show.value = true;
      }
    });
    const choose = (_id, name) => {
      store.addPatien({ name, _id });
      common_vendor.index.navigateBack({ delta: 1 });
    };
    const Cancel = () => {
      common_vendor.index.navigateBack({ delta: 1 });
    };
    const Add = () => {
      common_vendor.index.navigateTo({
        url: "/pages/my-service/my-patient/add-patient"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(patient.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.relation),
            c: common_vendor.t(item.sex),
            d: common_vendor.t(item.age),
            e: common_vendor.t(item.phone),
            f: index,
            g: common_vendor.o(($event) => choose(item._id, item.name), index)
          };
        }),
        b: common_vendor.p({
          show: show.value,
          titlt: title.value
        }),
        c: common_vendor.o(Cancel),
        d: common_vendor.o(Add)
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-71152d90"], ["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/pages/my-service/my-patient/my-patient.vue"]]);
wx.createPage(MiniProgramPage);
