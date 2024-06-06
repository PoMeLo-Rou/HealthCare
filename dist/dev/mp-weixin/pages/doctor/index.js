"use strict";
var common_vendor = require("../../common/vendor.js");
var public_request = require("../../public/request.js");
if (!Math) {
  (Point + Skeleton)();
}
const Point = () => "../../com-components/point.js";
const Skeleton = () => "../../skeleton/s-doctor-index.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const s_show = common_vendor.ref(true);
    const depId = common_vendor.ref("");
    const doctor_time = common_vendor.ref([]);
    const doctor_list = common_vendor.ref([]);
    const show = common_vendor.ref(false);
    const title = common_vendor.ref("\u6CA1\u6709\u533B\u751F\u6570\u636E");
    common_vendor.onLoad(async (event) => {
      const { id } = event;
      depId.value = id;
      const res = await Promise.all([public_request.RequestApi.TimeSele({ dep_id: id }), public_request.RequestApi.AlldList({ dep_id: id })]);
      doctor_time.value = res[0].data.data;
      doctor_list.value = res[1].data.data;
      if (doctor_list.value.length < 1) {
        show.value = true;
      }
      s_show.value = false;
    });
    let curIndex = common_vendor.ref(-1);
    const selectAll = async () => {
      const res = await public_request.RequestApi.AlldList({ dep_id: depId.value });
      doctor_list.value = res.data.data;
    };
    const selectDate = async (index, dep_id, date) => {
      curIndex.value = index;
      const res = await public_request.RequestApi.EverydList({ dep_id, week: date });
      doctor_list.value = res.data.data;
    };
    const jumpRoute = (_id) => {
      common_vendor.index.navigateTo({
        url: "/pages/doctor/doctor-Homepage?id=" + _id
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.n(common_vendor.unref(curIndex) == -1 ? "selected" : ""),
        b: common_vendor.o(selectAll),
        c: common_vendor.f(doctor_time.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.date),
            b: common_vendor.t(item.week),
            c: common_vendor.n(index == common_vendor.unref(curIndex) ? "selected" : ""),
            d: common_vendor.t(item.nu_source == 1 ? "\u53EF\u7EA6" : "\u65E0\u53F7"),
            e: common_vendor.o(($event) => selectDate(index, item.dep_id, item.date), index),
            f: index
          };
        }),
        d: common_vendor.f(doctor_list.value, (item, index, i0) => {
          return {
            a: item.avatar,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.post),
            d: common_vendor.t(item.good_at),
            e: index,
            f: common_vendor.o(($event) => jumpRoute(item._id), index)
          };
        }),
        e: common_vendor.p({
          show: show.value,
          title: title.value
        }),
        f: s_show.value
      }, s_show.value ? {} : {});
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/pages/doctor/index.vue"]]);
wx.createPage(MiniProgramPage);
