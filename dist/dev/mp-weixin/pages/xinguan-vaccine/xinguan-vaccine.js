"use strict";
var common_vendor = require("../../common/vendor.js");
var public_request = require("../../public/request.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "xinguan-vaccine",
  setup(__props) {
    let timeIndex = common_vendor.ref("");
    let time_data = common_vendor.reactive({
      data: {
        Hospital: "",
        address: "",
        company: [],
        lasting: [],
        week: [],
        _id: ""
      }
    });
    let submitData = common_vendor.reactive({
      name: "",
      id_card: "",
      phone: "",
      address: "",
      de_address: "",
      crowd_sort: "",
      date: "",
      period: "",
      reserve_time: "",
      when: 0
    });
    common_vendor.onMounted(async () => {
      const res = await public_request.RequestApi.NewappTime();
      time_data.data = res.data.data[0];
    });
    const changeRegion = (event) => {
      submitData.address = event.detail.value.join("");
    };
    const changeSelector = (event) => {
      submitData.crowd_sort = selector_data.value[event.detail.value];
    };
    const changeWeek = (date) => {
      submitData.date = date;
    };
    const changeTime = (index, period, start_time, end_time, when) => {
      timeIndex.value = index;
      submitData.period = period;
      submitData.reserve_time = start_time + "-" + end_time;
      submitData.when = when;
    };
    const cancel = () => {
      common_vendor.index.navigateBack({
        delta: 1
      });
    };
    const submit = async () => {
      const res = await public_request.RequestApi.ResCovid(submitData);
      if (res.statusCode == 200) {
        common_vendor.index.navigateTo({
          url: "/pages/my-service/xinguan/index"
        });
      }
    };
    let selector_data = common_vendor.ref([
      "\u533B\u7597\u536B\u751F\u4EBA\u5458",
      "\u536B\u751F\u7CFB\u7EDF\u5185\u5DE5\u4F5C\u7684\u5176\u4ED6\u4EBA\u5458",
      "\u56E0\u516C\u51FA\u56FD\u4EBA\u5458",
      "\u5BF9\u5916\u52B3\u52A1\u6D3E\u9063\u4EBA\u5458",
      "\u7559\u5B66\u751F",
      "\u56E0\u79C1\u51FA\u56FD\u4EBA\u5458",
      "\u6D77\u5173\u8FB9\u68C0\u4EBA\u5458",
      "\u516C\u5B89\u7CFB\u7EDF,\u6D88\u9632\u4EBA\u5458",
      "\u515A\u653F\u673A\u5173,\u4E8B\u4E1A\u5355\u4F4D\u4EBA\u5458",
      "\u793E\u533A\u5DE5\u4F5C\u8005",
      "\u6559\u80B2\u5DE5\u4F5C\u8005",
      "\u5C0F\u5B66\u548C\u4E2D\u5B66\u5B66\u751F",
      "\u5176\u4ED6\u4EBA\u5458"
    ]);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(submitData).name,
        b: common_vendor.o(($event) => common_vendor.unref(submitData).name = $event.detail.value),
        c: common_vendor.unref(submitData).id_card,
        d: common_vendor.o(($event) => common_vendor.unref(submitData).id_card = $event.detail.value),
        e: common_vendor.unref(submitData).phone,
        f: common_vendor.o(($event) => common_vendor.unref(submitData).phone = $event.detail.value),
        g: common_vendor.t(common_vendor.unref(submitData).address == "" ? "\u8BF7\u9009\u62E9\u73B0\u5C45\u5730\u5740" : common_vendor.unref(submitData).address),
        h: common_vendor.o(changeRegion),
        i: common_vendor.unref(submitData).de_address,
        j: common_vendor.o(($event) => common_vendor.unref(submitData).de_address = $event.detail.value),
        k: common_vendor.t(common_vendor.unref(submitData).crowd_sort == "" ? "\u8BF7\u9009\u62E9\u75AB\u82D7\u4EBA\u7FA4\u5206\u7C7B" : common_vendor.unref(submitData).crowd_sort),
        l: common_vendor.unref(selector_data),
        m: common_vendor.o(changeSelector),
        n: common_vendor.t(common_vendor.unref(time_data).data.Hospital),
        o: common_vendor.t(common_vendor.unref(time_data).data.address),
        p: common_vendor.f(common_vendor.unref(time_data).data.company, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index
          };
        }),
        q: common_vendor.f(common_vendor.unref(time_data).data.week, (item, index, i0) => {
          return {
            a: common_vendor.t(item.day),
            b: common_vendor.t(item.date),
            c: common_vendor.t(item.Have),
            d: common_vendor.o(($event) => changeWeek(item.date)),
            e: common_vendor.n(common_vendor.unref(submitData).date == item.date ? "checked" : ""),
            f: index
          };
        }),
        r: common_vendor.unref(time_data).data.lasting.length > 0
      }, common_vendor.unref(time_data).data.lasting.length > 0 ? {
        s: common_vendor.f(common_vendor.unref(time_data).data.lasting, (item, index, i0) => {
          return {
            a: common_vendor.t(item.period),
            b: common_vendor.f(item.time, (item_a, index_a, i1) => {
              return {
                a: common_vendor.t(item_a.start_time),
                b: common_vendor.t(item_a.end_time),
                c: common_vendor.t(item_a.over),
                d: index_a,
                e: common_vendor.n(common_vendor.unref(timeIndex) == index + "-" + index_a ? "checked" : ""),
                f: common_vendor.o(($event) => changeTime(index + "-" + index_a, item.period, item_a.start_time, item_a.end_time, item_a.when), index_a)
              };
            }),
            c: index
          };
        })
      } : {}, {
        t: common_vendor.o(cancel),
        v: common_vendor.o(submit)
      });
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/pages/xinguan-vaccine/xinguan-vaccine.vue"]]);
wx.createPage(MiniProgramPage);
