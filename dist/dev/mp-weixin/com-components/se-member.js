"use strict";
var common_vendor = require("../common/vendor.js");
var public_request = require("../public/request.js");
var store_index = require("../store/index.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "se-member",
  setup(__props, { expose }) {
    const store = store_index.mydata();
    const submitData = common_vendor.reactive({
      phy_name: "",
      phy_time: "",
      patient_id: "",
      show: false
    });
    const trigger = (value) => {
      submitData.phy_name = value.phy_name;
      submitData.phy_time = value.phy_time;
      submitData.show = value.show;
    };
    expose({ trigger });
    const choosePatient = () => {
      common_vendor.index.navigateTo({
        url: "/pages/my-service/my-patient/my-patient"
      });
    };
    let name = common_vendor.ref("");
    store.$subscribe((mutayion, state) => {
      name.value = state.patient.name;
      submitData.patient_id = state.patient._id;
    });
    const Submit = async () => {
      common_vendor.index.showLoading({
        title: "\u63D0\u4EA4\u4E2D",
        mask: true
      });
      const res = await public_request.RequestApi.ResPhy(submitData);
      if (res.statusCode == 200) {
        common_vendor.index.hideLoading();
        common_vendor.index.redirectTo({
          url: "/pages/my-service/phy-exam/index"
        });
      }
    };
    const hide = () => {
      submitData.show = false;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(name)),
        b: common_vendor.t(common_vendor.unref(name) == "" ? "\u9009\u62E9\u6210\u5458" : "\u91CD\u65B0\u9009\u62E9"),
        c: common_vendor.o(choosePatient),
        d: common_vendor.o(Submit),
        e: submitData.show,
        f: common_vendor.o(hide)
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e186633e"], ["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/com-components/se-member.vue"]]);
wx.createComponent(Component);
