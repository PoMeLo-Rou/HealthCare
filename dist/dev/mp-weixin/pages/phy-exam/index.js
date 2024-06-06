"use strict";
var common_vendor = require("../../common/vendor.js");
var public_request = require("../../public/request.js");
if (!Math) {
  Skeleton();
}
const Skeleton = () => "../../skeleton/phy-exam-index.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    let s_show = common_vendor.ref(true);
    let phy_term = common_vendor.ref([]);
    let phy_data = common_vendor.ref([]);
    common_vendor.onMounted(async () => {
      const res = await Promise.all([public_request.RequestApi.PhyTerm(), public_request.RequestApi.PhysGet()]);
      phy_term.value = res[0].data.data;
      phy_data.value = res[1].data.data;
      s_show.value = false;
    });
    const down_show = common_vendor.ref(false);
    const filterData = common_vendor.reactive({ type: "", sales: "", price: "" });
    const shaixuan = (index, value) => {
      if (index == 0) {
        down_show.value = down_show.value ? false : true;
      } else if (index == 1) {
        filterData.sales = value[0];
        phy_term.value[index].filter_val[0] = value[0] == "desc" ? "asc" : "desc";
        QueryData();
      } else {
        filterData.price = value[0];
        phy_term.value[index].filter_val[0] = value[0] == "desc" ? "asc" : "desc";
        QueryData();
      }
    };
    const QueryData = async () => {
      const res = await public_request.RequestApi.PhyQuery(filterData);
      phy_data.value = res.data.data;
    };
    const changeSelect = (value) => {
      phy_term.value[0].query_val = value;
      down_show.value = false;
      filterData.type = value;
      QueryData();
    };
    const goDetails = (id, title) => {
      common_vendor.index.navigateTo({
        url: "/pages/phy-exam/Details?id=" + id + "&title=" + title
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(common_vendor.unref(phy_term), (item, index, i0) => {
          return {
            a: common_vendor.t(item.query_val),
            b: index == 0 ? "/static/other/shaixuan-jiantou.png" : "/static/other/shaixuan.png",
            c: index,
            d: common_vendor.o(($event) => shaixuan(index, item.filter_val), index)
          };
        }),
        b: down_show.value
      }, down_show.value ? common_vendor.e({
        c: common_vendor.unref(phy_term).length > 0
      }, common_vendor.unref(phy_term).length > 0 ? {
        d: common_vendor.f(common_vendor.unref(phy_term)[0].filter_val, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index,
            c: common_vendor.o(($event) => changeSelect(item), index)
          };
        })
      } : {}) : {}, {
        e: common_vendor.f(common_vendor.unref(phy_data), (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: item.image,
            c: common_vendor.t(item.be_suit),
            d: common_vendor.t(item.describe),
            e: common_vendor.t(item.sales),
            f: common_vendor.t(item.price),
            g: common_vendor.o(($event) => goDetails(item._id, item.title), index),
            h: index
          };
        }),
        f: common_vendor.unref(s_show)
      }, common_vendor.unref(s_show) ? {} : {});
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fd81419c"], ["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/pages/phy-exam/index.vue"]]);
wx.createPage(MiniProgramPage);
