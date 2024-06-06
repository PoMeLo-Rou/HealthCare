"use strict";
var common_vendor = require("../../common/vendor.js");
var public_request = require("../../public/request.js");
if (!Math) {
  Skeleton();
}
const Skeleton = () => "../../skeleton/hpv-vaccine.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "hpv-vaccine",
  setup(__props) {
    let s_show = common_vendor.ref(true);
    let hpv_list = common_vendor.ref([]);
    let hpv_select = common_vendor.ref([]);
    let hpv_all = common_vendor.ref([]);
    let currIndex = common_vendor.ref(0);
    common_vendor.onMounted(async () => {
      const res = await public_request.RequestApi.OtuHpv();
      hpv_select.value = res.data.data[0].hpv_select;
      hpv_list.value = res.data.data[0].hpv_list;
      hpv_all.value = res.data.data[0].hpv_list;
      s_show.value = false;
    });
    const changeList = (id, index) => {
      currIndex.value = index;
      if (id == "26da8e4962dc565503df9629704f1700") {
        hpv_list.value = hpv_all.value;
      } else {
        hpv_list.value = hpv_all.value.filter((item) => item.hpv_id == id);
      }
    };
    const reserve = (_id, name, price, describe) => {
      let obj = JSON.stringify({ _id, name, price, describe });
      common_vendor.index.navigateTo({
        url: "/pages/hpv-vaccine/hpv-buy?value=" + obj
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(common_vendor.unref(hpv_select), (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.n(index == common_vendor.unref(currIndex) ? "selected" : ""),
            c: index,
            d: common_vendor.o(($event) => changeList(item._id, index), index)
          };
        }),
        b: common_vendor.f(common_vendor.unref(hpv_list), (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.f(item.describe, (item_a, index_a, i1) => {
              return {
                a: common_vendor.t(item_a),
                b: index_a
              };
            }),
            c: common_vendor.t(item.price[0]),
            d: common_vendor.t(item.price[1]),
            e: common_vendor.o(($event) => reserve(item._id, item.name, item.price, item.describe)),
            f: index
          };
        }),
        c: common_vendor.unref(s_show)
      }, common_vendor.unref(s_show) ? {} : {});
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/pages/hpv-vaccine/hpv-vaccine.vue"]]);
wx.createPage(MiniProgramPage);
