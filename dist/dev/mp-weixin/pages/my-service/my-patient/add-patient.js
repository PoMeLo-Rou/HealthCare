"use strict";
var common_vendor = require("../../../common/vendor.js");
var public_misc = require("../../../public/misc.js");
var public_request = require("../../../public/request.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "add-patient",
  setup(__props) {
    let submitData = common_vendor.reactive({
      name: "",
      sex: "",
      born: "",
      relation: "",
      id_card: "",
      phone: ""
    });
    const changeSex = (event) => {
      submitData.sex = event.detail.value == "0" ? "\u7537" : "\u5973";
    };
    const changeDate = (event) => {
      submitData.born = event.detail.value;
    };
    const changeRelation = (event) => {
      submitData.relation = event.detail.value == "0" ? "\u81EA\u5DF1" : event.detail.value == "1" ? "\u7236\u6BCD" : "\u5176\u4ED6";
    };
    const upload = async () => {
      const res = await public_misc.uploadImage(public_request.AiCard, "\u8BC6\u522B\u4E2D", "\u8BC6\u522B\u5931\u8D25");
      const data = JSON.parse(res.data);
      if (res.statusCode == 200) {
        submitData.name = data.data.name;
        submitData.born = data.data.born;
        submitData.id_card = data.data.id_card;
        submitData.sex = data.data.sex;
      } else {
        common_vendor.index.showToast({
          title: data.data,
          icon: "none",
          duration: 1e3
        });
      }
    };
    const sure_add = async () => {
      const res = await public_request.RequestApi.PatientRes(submitData);
      if (res.statusCode == 200) {
        common_vendor.index.navigateBack({ delta: 1 });
      }
    };
    const Cancel = () => {
      common_vendor.index.navigateBack({ delta: 1 });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(upload),
        b: common_vendor.unref(submitData).name,
        c: common_vendor.o(($event) => common_vendor.unref(submitData).name = $event.detail.value),
        d: common_vendor.t(common_vendor.unref(submitData).sex == "" ? "\u8BF7\u9009\u62E9\u6027\u522B" : common_vendor.unref(submitData).sex),
        e: ["\u7537", "\u5973"],
        f: common_vendor.o(changeSex),
        g: common_vendor.t(common_vendor.unref(submitData).born == "" ? "\u8BF7\u9009\u62E9\u51FA\u751F\u65E5\u671F" : common_vendor.unref(submitData).born),
        h: common_vendor.o(changeDate),
        i: common_vendor.t(common_vendor.unref(submitData).relation == "" ? "\u8BF7\u9009\u62E9\u6210\u5458\u5173\u7CFB" : common_vendor.unref(submitData).relation),
        j: ["\u81EA\u5DF1", "\u7236\u6BCD", "\u5176\u4ED6"],
        k: common_vendor.o(changeRelation),
        l: common_vendor.unref(submitData).id_card,
        m: common_vendor.o(($event) => common_vendor.unref(submitData).id_card = $event.detail.value),
        n: common_vendor.unref(submitData).phone,
        o: common_vendor.o(($event) => common_vendor.unref(submitData).phone = $event.detail.value),
        p: common_vendor.o(Cancel),
        q: common_vendor.o(sure_add)
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-583272b5"], ["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/pages/my-service/my-patient/add-patient.vue"]]);
wx.createPage(MiniProgramPage);
