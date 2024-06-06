"use strict";
var common_vendor = require("../../common/vendor.js");
var public_request = require("../../public/request.js");
if (!Math) {
  Skeleton();
}
const Skeleton = () => "../../skeleton/s-registered.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "registered",
  setup(__props) {
    const s_show = common_vendor.ref(true);
    const parent = common_vendor.ref([]);
    const children = common_vendor.ref([]);
    const curIndex = common_vendor.ref(0);
    common_vendor.onMounted(async () => {
      const res = await public_request.RequestApi.Department();
      parent.value = res.data.data;
      changeList(0, res.data.data[0]._id);
      s_show.value = false;
    });
    const changeList = async (index, id) => {
      const res = await public_request.RequestApi.RegList({ id });
      curIndex.value = index;
      children.value = res.data.data;
    };
    const jumpRoute = (id) => {
      common_vendor.index.navigateTo({
        url: "/pages/doctor/index?id=" + id
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(parent.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.dep_ment),
            b: common_vendor.o(($event) => changeList(index, item._id), index),
            c: common_vendor.n(curIndex.value == index ? "selected" : ""),
            d: index
          };
        }),
        b: common_vendor.f(children.value, (item, index, i0) => {
          return {
            a: common_vendor.f(item.dep_ment_list, (item_a, index_a, i1) => {
              return {
                a: common_vendor.t(item_a.dep_name),
                b: common_vendor.o(($event) => jumpRoute(item._id), index_a),
                c: index_a
              };
            }),
            b: index
          };
        }),
        c: s_show.value
      }, s_show.value ? {} : {});
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/pages/registered/registered.vue"]]);
wx.createPage(MiniProgramPage);
