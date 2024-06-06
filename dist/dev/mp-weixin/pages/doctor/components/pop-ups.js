"use strict";
var common_vendor = require("../../../common/vendor.js");
var store_index = require("../../../store/index.js");
var public_request = require("../../../public/request.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "pop-ups",
  setup(__props, { expose }) {
    const store = store_index.mydata();
    var show = common_vendor.ref(false);
    var curIndex = common_vendor.ref(-1);
    var the_time = common_vendor.ref([]);
    const submitData = common_vendor.reactive({
      week: "",
      the_time: "",
      when: 0,
      _id: "",
      patient_id: ""
    });
    const trigger = (value) => {
      show.value = value.show;
      the_time.value = value.the_time;
      submitData.week = value.week;
      submitData.when = value.when;
      submitData._id = value._id;
    };
    const clickoverlay = () => {
      show.value = false;
      curIndex.value = -1;
      submitData.the_time = "";
      the_time.value = [];
    };
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
        title: "\u63D0\u4EA4\u4E2D"
      });
      const res = await public_request.RequestApi.RegAppoin(submitData);
      if (res.statusCode == 200) {
        common_vendor.index.showToast({
          title: "\u63D0\u4EA4\u6210\u529F",
          icon: "none",
          duration: 1e3
        });
        common_vendor.index.redirectTo({
          url: "/pages/my-service/my-registration/index"
        });
      }
    };
    expose({ trigger });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(the_time), (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index,
            c: common_vendor.n(index == common_vendor.unref(curIndex) ? "selected" : ""),
            d: common_vendor.o(($event) => (common_vendor.isRef(curIndex) ? curIndex.value = index : curIndex = index, submitData.the_time = item), index)
          };
        }),
        b: common_vendor.t(common_vendor.unref(name)),
        c: common_vendor.t(common_vendor.unref(name) == "" ? "\u9009\u62E9\u5C31\u8BCA\u4EBA" : "\u91CD\u65B0\u9009\u62E9"),
        d: common_vendor.o(choosePatient),
        e: common_vendor.o(Submit),
        f: common_vendor.unref(show),
        g: common_vendor.o(clickoverlay)
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/pages/doctor/components/pop-ups.vue"]]);
wx.createComponent(Component);
