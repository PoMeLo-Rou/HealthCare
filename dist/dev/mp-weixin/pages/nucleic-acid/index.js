"use strict";
var common_vendor = require("../../common/vendor.js");
var public_request = require("../../public/request.js");
if (!Math) {
  Skeleton();
}
const Skeleton = () => "../../skeleton/nucleic-acid.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    let s_show = common_vendor.ref(true);
    let nucleic_data = common_vendor.reactive({
      data: {
        address: "",
        boon: [],
        date: [],
        hospital: "",
        logo: "",
        name: "",
        phone: "",
        price: 0,
        style: []
      }
    });
    common_vendor.onMounted(async () => {
      const res = await public_request.RequestApi.NuataGet();
      nucleic_data.data = res.data.data[0];
      s_show.value = false;
    });
    const activeIndex = common_vendor.ref(0);
    const makePhoneCall = () => {
      common_vendor.index.makePhoneCall({
        phoneNumber: nucleic_data.data.phone
      });
    };
    const submitData = common_vendor.reactive({
      name: "",
      phone: "",
      id_card: "",
      time: ""
    });
    const to_reserve = (index, date) => {
      activeIndex.value = index;
      submitData.time = date;
    };
    const Submit = async () => {
      common_vendor.index.showLoading({
        title: "\u63D0\u4EA4\u4E2D",
        mask: true
      });
      const res = await public_request.RequestApi.ResNuata(submitData);
      console.log(res);
      if (res.statusCode == 200) {
        common_vendor.index.hideLoading();
        common_vendor.index.navigateTo({
          url: "/pages/my-service/nucleic-acid/index"
        });
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(nucleic_data).data.logo,
        b: common_vendor.t(common_vendor.unref(nucleic_data).data.name),
        c: common_vendor.t(common_vendor.unref(nucleic_data).data.price),
        d: common_vendor.f(common_vendor.unref(nucleic_data).data.boon, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index
          };
        }),
        e: common_vendor.t(common_vendor.unref(nucleic_data).data.hospital),
        f: common_vendor.t(common_vendor.unref(nucleic_data).data.address),
        g: common_vendor.o(makePhoneCall),
        h: submitData.name,
        i: common_vendor.o(($event) => submitData.name = $event.detail.value),
        j: submitData.id_card,
        k: common_vendor.o(($event) => submitData.id_card = $event.detail.value),
        l: submitData.phone,
        m: common_vendor.o(($event) => submitData.phone = $event.detail.value),
        n: common_vendor.f(common_vendor.unref(nucleic_data).data.date, (item, index, i0) => {
          return {
            a: common_vendor.t(item.date),
            b: common_vendor.t(item.week),
            c: common_vendor.o(($event) => to_reserve(index, item.date), index),
            d: common_vendor.n(index == activeIndex.value ? "selected" : ""),
            e: index
          };
        }),
        o: common_vendor.f(common_vendor.unref(nucleic_data).data.style, (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.f(item.desc, (item_a, index_a, i1) => {
              return {
                a: common_vendor.t(item_a),
                b: index_a
              };
            }),
            c: index
          };
        }),
        p: common_vendor.t(common_vendor.unref(nucleic_data).data.price),
        q: common_vendor.o(Submit),
        r: common_vendor.unref(s_show)
      }, common_vendor.unref(s_show) ? {} : {});
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3382da42"], ["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/pages/nucleic-acid/index.vue"]]);
wx.createPage(MiniProgramPage);
