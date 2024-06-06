"use strict";
var common_vendor = require("../../common/vendor.js");
var public_misc = require("../../public/misc.js");
var public_request = require("../../public/request.js");
var store_index = require("../../store/index.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const store = store_index.mydata();
    const submitData = common_vendor.reactive({
      illness: "",
      guide: false,
      ins_report: [],
      patient_id: ""
    });
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
    const upload = async () => {
      const res = await public_misc.uploadImage(public_request.ImgUrl, "\u4E0A\u4F20\u4E2D", "\u4E0A\u4F20\u5931\u8D25");
      submitData.ins_report.push(JSON.parse(res.data).data);
    };
    const changeCheck = (event) => {
      submitData.guide = event.detail.value.length == 0 ? false : true;
    };
    const Cancel = () => {
      common_vendor.index.navigateBack({ delta: 1 });
    };
    const Submit = async () => {
      common_vendor.index.showLoading({
        title: "\u63D0\u4EA4\u4E2D"
      });
      const res = await public_request.RequestApi.GraPhics(submitData);
      if (res.statusCode == 200) {
        common_vendor.index.showToast({
          title: "\u63D0\u4EA4\u6210\u529F",
          icon: "none",
          duration: 1e3
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: submitData.illness,
        b: common_vendor.o(($event) => submitData.illness = $event.detail.value),
        c: submitData.guide,
        d: common_vendor.o(changeCheck),
        e: common_vendor.f(submitData.ins_report, (item, index, i0) => {
          return {
            a: item,
            b: common_vendor.o(($event) => submitData.ins_report.splice(index, 1)),
            c: index
          };
        }),
        f: common_vendor.o(upload),
        g: common_vendor.t(common_vendor.unref(name)),
        h: common_vendor.t(common_vendor.unref(name) == "" ? "\u9009\u62E9\u5C31\u8BCA\u4EBA" : "\u91CD\u65B0\u9009\u62E9"),
        i: common_vendor.o(choosePatient),
        j: common_vendor.o(Cancel),
        k: common_vendor.o(Submit)
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-562c90d2"], ["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/pages/graphics/index.vue"]]);
wx.createPage(MiniProgramPage);
