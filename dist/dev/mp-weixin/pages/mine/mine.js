"use strict";
var common_vendor = require("../../common/vendor.js");
if (!Math) {
  Skeleton();
}
const Skeleton = () => "../../skeleton/mine.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "mine",
  setup(__props) {
    var s_show = common_vendor.ref(true);
    const user_data = common_vendor.reactive({
      url: "",
      nickName: ""
    });
    common_vendor.onShow(() => {
      const user = common_vendor.index.getStorageSync("wxuser");
      if (!user) {
        user_data.nickName = "";
        user_data.url = "";
      } else {
        user_data.nickName = user.nickName;
        user_data.url = user.avatarUrl;
      }
      s_show.value = false;
    });
    const Login = () => {
      common_vendor.index.navigateTo({
        url: "/src/pages/login-page/index"
      });
    };
    const jumpPoute = (path) => {
      common_vendor.index.navigateTo({
        url: path
      });
    };
    const List = common_vendor.reactive([
      {
        type: "\u5065\u5EB7\u5206",
        number: 5
      },
      {
        type: "\u4F18\u60E0\u5238",
        number: 5
      },
      {
        type: "\u6D88\u606F",
        number: 8
      }
    ]);
    const OrderList = common_vendor.reactive([
      {
        title: "\u5C31\u8BCA\u4EBA\u7BA1\u7406",
        icon: "/static/mine/jiuzhenren.svg",
        path: "/pages/my-service/my-patient/my-patient"
      },
      {
        title: "\u6211\u7684\u6302\u53F7",
        icon: "/static/mine/guahao.svg",
        path: "/pages/my-service/my-registration/index"
      },
      {
        title: "\u65B0\u51A0\u75AB\u82D7",
        icon: "/static/mine/xinguanyimiao.svg",
        path: "/pages/my-service/xinguan/index"
      },
      {
        title: "HPV\u75AB\u82D7",
        icon: "/static/mine/hpvyimiao.svg",
        path: "/pages/my-service/hpv-view/index"
      },
      {
        title: "\u6838\u9178\u68C0\u6D4B",
        icon: "/static/mine/hesuan.svg",
        path: "/pages/my-service/nucleic-acid/index"
      },
      {
        title: "\u6211\u7684\u4F53\u68C0",
        icon: "/static/mine/tijianbaogao.svg",
        path: "/pages/my-service/phy-exam/index"
      }
    ]);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: user_data.url == "" ? "/static/other/touxiang.svg" : user_data.url,
        b: common_vendor.t(user_data.nickName == "" ? "\u767B\u5F55" : user_data.nickName),
        c: common_vendor.o(Login),
        d: common_vendor.n(user_data.nickName == "" ? "none" : "logined"),
        e: common_vendor.f(List, (item, index, i0) => {
          return {
            a: common_vendor.t(item.number),
            b: common_vendor.t(item.type),
            c: index
          };
        }),
        f: common_vendor.f(OrderList, (item, index, i0) => {
          return {
            a: item.icon,
            b: common_vendor.t(item.title),
            c: index,
            d: common_vendor.o(($event) => jumpPoute(item.path), index)
          };
        }),
        g: common_vendor.unref(s_show)
      }, common_vendor.unref(s_show) ? {} : {});
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/pages/mine/mine.vue"]]);
wx.createPage(MiniProgramPage);
