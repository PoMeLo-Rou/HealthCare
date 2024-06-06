"use strict";
var common_vendor = require("../../common/vendor.js");
var public_request = require("../../public/request.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const login = () => {
      common_vendor.index.getUserProfile({
        desc: "\u83B7\u53D6\u7528\u6237\u4FE1\u606F",
        success: (res) => {
          const { avatarUrl, nickName } = res.userInfo;
          common_vendor.index.login({
            success(code) {
              common_vendor.index.showLoading({ title: "\u767B\u9646\u4E2D", mask: true });
              loginApi(avatarUrl, nickName, code.code);
            },
            fail(err) {
              common_vendor.index.showToast({ title: "\u767B\u5F55\u5931\u8D25", icon: "none", duration: 1e3 });
            }
          });
        },
        fail: (err) => {
          common_vendor.index.showToast({ title: "\u767B\u5F55\u5931\u8D25", icon: "none", duration: 1e3 });
        }
      });
    };
    const loginApi = async (avatarUrl, nickName, code) => {
      try {
        const obj = { appid: "wxf64cebafedb21c58", secret: "6b1185c47a149f70c66f7b0f85b6d395", nickName, avatarUrl, code };
        const res = await public_request.RequestApi.WxLogin(obj);
        common_vendor.index.setStorageSync("wxuser", res.data.data);
        setTimeout(() => {
          common_vendor.index.navigateBack({ delta: 1 });
          common_vendor.index.showToast({ title: "\u767B\u5F55\u6210\u529F", icon: "none", duration: 1e3 });
        }, 600);
      } catch (err) {
        common_vendor.index.showToast({ title: "\u767B\u5F55\u5931\u8D25", icon: "none", duration: 1e3 });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(login)
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/pages/login-page/index.vue"]]);
wx.createPage(MiniProgramPage);
