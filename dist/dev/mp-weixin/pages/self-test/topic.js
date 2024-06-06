"use strict";
var common_vendor = require("../../common/vendor.js");
var public_request = require("../../public/request.js");
if (!Math) {
  Skeleton();
}
const Skeleton = () => "../../skeleton/self-test-topic.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "topic",
  setup(__props) {
    const s_show = common_vendor.ref(true);
    let Type = common_vendor.ref("");
    let Title = common_vendor.ref("");
    common_vendor.onLoad((event) => {
      const { type, name } = event;
      Type.value = type;
      Title.value = name;
      common_vendor.index.setNavigationBarTitle({
        title: Title.value
      });
    });
    let all_data = common_vendor.ref([]);
    let cur_data = common_vendor.reactive({
      options: [],
      topic: "",
      _id: ""
    });
    let data_length = common_vendor.ref(0);
    common_vendor.onShow(async () => {
      cur_index.value = 1;
      cur_index_s.value = 0;
      cur_percent.value = 0;
      question_id.value = [];
      if (Type.value == "001") {
        var res = await public_request.RequestApi.DepressionTopics();
      } else if (Type.value == "002") {
        var res = await public_request.RequestApi.PrematureTopics();
      } else {
        var res = await public_request.RequestApi.InsomniaTopics();
      }
      all_data.value = res.data.data;
      data_length.value = res.data.data.length;
      cur_data = res.data.data[0];
      cur_percent.value = 100 / data_length.value;
      s_show.value = false;
    });
    let cur_index = common_vendor.ref(1);
    let cur_index_s = common_vendor.ref(0);
    let cur_percent = common_vendor.ref(0);
    let question_id = common_vendor.reactive({ value: [] });
    const changeNextPage = (son_id) => {
      cur_index_s.value++;
      if (cur_index_s.value < data_length.value) {
        cur_index.value++;
        cur_data = all_data.value[cur_index_s.value];
        cur_percent.value = 100 * cur_index.value / data_length.value;
      }
      question_id.value.push(son_id);
    };
    common_vendor.watch([cur_index_s, data_length], (newVal, oldVal) => {
      let obj = JSON.stringify({ type: Type.value, topic_id: question_id.value });
      if (newVal[0] == newVal[1]) {
        common_vendor.index.navigateTo({
          url: "/pages/self-test/result?value=" + obj
        });
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(cur_percent),
        b: common_vendor.t(common_vendor.unref(cur_index)),
        c: common_vendor.t(common_vendor.unref(data_length)),
        d: common_vendor.t(common_vendor.unref(cur_data).topic),
        e: common_vendor.unref(cur_data).options.length > 0
      }, common_vendor.unref(cur_data).options.length > 0 ? {
        f: common_vendor.f(common_vendor.unref(cur_data).options, (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: index,
            c: common_vendor.o(($event) => changeNextPage(item.son_id), index)
          };
        })
      } : {}, {
        g: s_show.value
      }, s_show.value ? {} : {});
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/pages/self-test/topic.vue"]]);
wx.createPage(MiniProgramPage);
