"use strict";
var common_vendor = require("../../common/vendor.js");
var public_request = require("../../public/request.js");
var public_testing = require("../../public/testing.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "result",
  setup(__props) {
    let type_id = common_vendor.ref("");
    let choice_id = common_vendor.ref([]);
    common_vendor.onLoad((event) => {
      const { type, topic_id } = JSON.parse(event.value);
      type_id.value = type;
      choice_id.value = topic_id;
    });
    let test_res = common_vendor.ref([]);
    common_vendor.onShow(async () => {
      if (type_id.value == "001") {
        var res = await public_request.RequestApi.Depression({ value: choice_id.value });
      } else if (type_id.value == "002") {
        var res = await public_request.RequestApi.PreMature({ value: choice_id.value });
      } else {
        var res = await public_request.RequestApi.InsoMnia({ value: choice_id.value });
      }
      test_res.value = res.data.data;
      share_data.value = public_testing.TEST.filter((item) => item.type == type_id.value);
    });
    const again = () => {
      common_vendor.index.navigateBack({
        delta: 1
      });
    };
    var share_data = common_vendor.ref([]);
    common_vendor.onShareAppMessage(() => {
      return {
        title: share_data.value[0].share_title,
        path: share_data.value[0].share_path,
        imageUrl: share_data.value[0].share_url
      };
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(test_res), (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.scope),
            b: common_vendor.t(item.result),
            c: common_vendor.t(item.suggest),
            d: common_vendor.f(item.outline, (item_a, index_a, i1) => {
              return {
                a: common_vendor.t(index_a + 1),
                b: common_vendor.t(item_a),
                c: index_a
              };
            }),
            e: item.recommend.length > 0
          }, item.recommend.length > 0 ? {
            f: common_vendor.f(item.recommend, (item_a, index_a, i1) => {
              return {
                a: common_vendor.t(item_a.dep_name),
                b: common_vendor.t(item_a.hospital),
                c: index_a
              };
            })
          } : {}, {
            g: index
          });
        }),
        b: common_vendor.o(again)
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/pages/self-test/result.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
