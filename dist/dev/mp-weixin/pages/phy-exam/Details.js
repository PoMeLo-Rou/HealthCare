"use strict";
var common_vendor = require("../../common/vendor.js");
var public_request = require("../../public/request.js");
if (!Math) {
  Semember();
}
const Semember = () => "../../com-components/se-member.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "Details",
  setup(__props) {
    const phy_detail = common_vendor.ref([]);
    const activeIndex = common_vendor.ref(-1);
    const member = common_vendor.ref();
    const s_data = common_vendor.reactive({
      phy_name: "",
      phy_time: "",
      show: true
    });
    common_vendor.onLoad(async (event) => {
      s_data.phy_name = event.title;
      const res = await public_request.RequestApi.PhyDateil({ id: event.id });
      phy_detail.value = res.data.data;
    });
    const chooseMember = () => {
      member.value.trigger(s_data);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(phy_detail.value, (item, index, i0) => {
          return {
            a: item.image,
            b: common_vendor.t(item.price),
            c: common_vendor.t(item.sales),
            d: common_vendor.t(item.title),
            e: index
          };
        }),
        b: phy_detail.value.length > 0
      }, phy_detail.value.length > 0 ? {
        c: common_vendor.f(phy_detail.value[0].date, (item, index, i0) => {
          return {
            a: common_vendor.t(item.date),
            b: common_vendor.t(item.week),
            c: common_vendor.o(($event) => (activeIndex.value = index, s_data.phy_time = item.date), index),
            d: common_vendor.n(index == activeIndex.value ? "selected" : ""),
            e: index
          };
        })
      } : {}, {
        d: common_vendor.f(phy_detail.value, (item, index, i0) => {
          return {
            a: common_vendor.f(item.crowd, (item_a, index_a, i1) => {
              return {
                a: item_a.image,
                b: common_vendor.t(item_a.name),
                c: index_a
              };
            }),
            b: index
          };
        }),
        e: phy_detail.value.length > 0
      }, phy_detail.value.length > 0 ? {
        f: common_vendor.f(phy_detail.value[0].project, (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.f(item.content, (item_a, index_a, i1) => {
              return {
                a: common_vendor.t(item_a.thing),
                b: common_vendor.t(item_a.details),
                c: index_a
              };
            }),
            c: index
          };
        })
      } : {}, {
        g: common_vendor.sr(member, "08088682-0", {
          "k": "member"
        }),
        h: phy_detail.value.length > 0
      }, phy_detail.value.length > 0 ? {
        i: common_vendor.t(phy_detail.value[0].price)
      } : {}, {
        j: common_vendor.o(chooseMember)
      });
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-08088682"], ["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/pages/phy-exam/Details.vue"]]);
wx.createPage(MiniProgramPage);
