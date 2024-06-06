"use strict";
var common_vendor = require("../../common/vendor.js");
var public_request = require("../../public/request.js");
if (!Math) {
  Skeleton();
}
const Skeleton = () => "../../skeleton/s-index.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    common_vendor.useCssVars((_ctx) => ({
      "1badc801-menu_top": common_vendor.unref(menu_top),
      "1badc801-menu_height": common_vendor.unref(menu_height)
    }));
    const s_show = common_vendor.ref(true);
    let menu_top = common_vendor.ref("");
    let menu_height = common_vendor.ref("");
    common_vendor.onMounted(() => {
      let menu = common_vendor.index.getStorageSync("MenuButton");
      menu_top.value = menu.top + "px";
      menu_height.value = menu.height + "px";
      page_data();
      s_show.value = false;
    });
    let vaccine = common_vendor.ref([]);
    let reserve = common_vendor.ref([]);
    let popular = common_vendor.ref([]);
    let self_test = common_vendor.ref([]);
    const page_data = async () => {
      const res = await public_request.RequestApi.FrontPage();
      vaccine.value = res.data.data[0].vaccine;
      reserve.value = res.data.data[1].reserve;
      popular.value = res.data.data[2].popular;
      self_test.value = res.data.data[3].self_test;
    };
    const RouteTo = (name, index, type) => {
      if (type == "001") {
        common_vendor.index.navigateTo({
          url: "/pages/self-test/topic?type=001&name=" + name
        });
      } else {
        if (index == 0) {
          common_vendor.index.navigateTo({
            url: "/pages/self-test/topic?type=002&name=" + name
          });
        } else {
          common_vendor.index.navigateTo({
            url: "/pages/self-test/topic?type=003&name=" + name
          });
        }
      }
    };
    const reserve_route = (index) => {
      switch (index) {
        case 0:
          common_vendor.index.navigateTo({ url: "/pages/xinguan-vaccine/xinguan-vaccine" });
          break;
        case 1:
          common_vendor.index.navigateTo({ url: "/pages/hpv-vaccine/hpv-vaccine" });
          break;
        case 2:
          common_vendor.index.navigateTo({ url: "/pages/nucleic-acid/index" });
          break;
        case 3:
          common_vendor.index.navigateTo({ url: "/pages/graphics/index" });
      }
    };
    const guahao_route = (index) => {
      switch (index) {
        case 0:
          common_vendor.index.switchTab({ url: "/pages/registered/registered" });
          break;
        case 1:
          common_vendor.index.navigateTo({ url: "/pages/phy-exam/index" });
      }
    };
    const HotGuahao_route = (dep_id) => {
      common_vendor.index.navigateTo({
        url: "/pages/doctor/index?id=" + dep_id
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.s(_ctx.__cssVars()),
        b: common_vendor.o(($event) => RouteTo("\u6291\u90C1\u6D4B\u8BC4\u4E13\u4E1A\u7248", 0, "001")),
        c: common_vendor.s(_ctx.__cssVars()),
        d: common_vendor.f(common_vendor.unref(vaccine), (item, index, i0) => {
          return {
            a: item.image,
            b: common_vendor.t(item.title),
            c: index,
            d: common_vendor.o(($event) => reserve_route(index), index)
          };
        }),
        e: common_vendor.s(_ctx.__cssVars()),
        f: common_vendor.f(common_vendor.unref(reserve), (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.t(item.describe),
            c: item.image,
            d: index,
            e: common_vendor.o(($event) => guahao_route(index), index)
          };
        }),
        g: common_vendor.s(_ctx.__cssVars()),
        h: common_vendor.o(($event) => guahao_route(0)),
        i: common_vendor.s(_ctx.__cssVars()),
        j: common_vendor.f(common_vendor.unref(popular), (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: item.image,
            c: common_vendor.o(($event) => HotGuahao_route(item.dep_id), index),
            d: index,
            e: common_vendor.s("background-color:" + item.background)
          };
        }),
        k: common_vendor.s(_ctx.__cssVars()),
        l: common_vendor.s(_ctx.__cssVars()),
        m: common_vendor.unref(self_test).length > 0
      }, common_vendor.unref(self_test).length > 0 ? {
        n: common_vendor.f([common_vendor.unref(self_test)[0]], (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.describe),
            c: common_vendor.t(item.number_of_people),
            d: common_vendor.t(item.question),
            e: common_vendor.t(item.minute),
            f: item.image,
            g: index,
            h: common_vendor.o(($event) => RouteTo(item.name, index, "001"), index)
          };
        }),
        o: common_vendor.s(_ctx.__cssVars())
      } : {}, {
        p: common_vendor.f(common_vendor.unref(self_test).slice(1), (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.question),
            c: common_vendor.t(item.minute),
            d: common_vendor.t(item.number_of_people),
            e: item.image,
            f: index,
            g: common_vendor.o(($event) => RouteTo(item.name, index, "002"), index)
          };
        }),
        q: common_vendor.s(_ctx.__cssVars()),
        r: common_vendor.s(_ctx.__cssVars()),
        s: s_show.value
      }, s_show.value ? {
        t: common_vendor.s(_ctx.__cssVars())
      } : {});
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
