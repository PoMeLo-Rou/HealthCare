"use strict";
var common_vendor = require("../../common/vendor.js");
var public_request = require("../../public/request.js");
if (!Math) {
  (popus + Skeleton)();
}
const popus = () => "./components/pop-ups.js";
const Skeleton = () => "../../skeleton/doctor-homepage.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "doctor-Homepage",
  setup(__props) {
    let s_show = common_vendor.ref(true);
    let Id = common_vendor.ref("");
    let doctor_data = common_vendor.ref([]);
    common_vendor.onLoad(async (event) => {
      const { id } = event;
      Id.value = id;
      const res = await public_request.RequestApi.DoctorHome({ _id: id });
      doctor_data.value = res.data.data;
      s_show.value = false;
    });
    let component = common_vendor.ref();
    const selectTime = (week, the_time, when) => {
      const value = {
        week,
        the_time,
        when,
        _id: Id.value,
        show: true
      };
      component.value.trigger(value);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(common_vendor.unref(doctor_data), (item, index, i0) => {
          return {
            a: item.avatar,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.post),
            d: common_vendor.t(item.hospital),
            e: common_vendor.t(item.good_at),
            f: common_vendor.f(item.App_ment, (item_a, index_a, i1) => {
              return {
                a: common_vendor.t(item_a.day),
                b: common_vendor.t(item_a.week),
                c: common_vendor.t(item_a.time[0].nu_source <= 0 ? "" : "\u9884\u7EA6"),
                d: common_vendor.n(item_a.time[0].nu_source <= 0 ? "dis" : "selected"),
                e: common_vendor.o(($event) => selectTime(item_a.week, item_a.time[0].the_time, item_a.time[0].when)),
                f: common_vendor.t(item_a.time[1].nu_source <= 0 ? "" : "\u9884\u7EA6"),
                g: common_vendor.n(item_a.time[1].nu_source <= 0 ? "dis" : "selected"),
                h: index_a
              };
            }),
            g: index
          };
        }),
        b: common_vendor.sr(component, "67db8f27-0", {
          "k": "component"
        }),
        c: common_vendor.unref(s_show)
      }, common_vendor.unref(s_show) ? {} : {});
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/pages/doctor/doctor-Homepage.vue"]]);
wx.createPage(MiniProgramPage);
