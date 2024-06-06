"use strict";
var common_vendor = require("../../common/vendor.js");
var public_request = require("../../public/request.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "hpv-buy",
  setup(__props) {
    let combo_name = common_vendor.ref([]);
    let combo_time = common_vendor.ref([]);
    let Name = common_vendor.ref(-1);
    let Time = common_vendor.ref(-1);
    let router_data = common_vendor.reactive({
      _id: "",
      name: "",
      price: ["0"],
      describe: ["0"]
    });
    common_vendor.onLoad(async (event) => {
      console.log(event);
      const { _id, name, price: price2, describe } = JSON.parse(event.value);
      router_data._id = _id;
      router_data.name = name;
      router_data.price = price2;
      router_data.describe = describe;
      const res = await public_request.RequestApi.HpvPack();
      combo_name.value = [res.data.data[0]];
      combo_time.value = [res.data.data[1]];
    });
    let name_id = common_vendor.ref("");
    let comboName = common_vendor.ref("");
    let time_id = common_vendor.ref("");
    let comboTime = common_vendor.ref("");
    const selectName = (index, id, combo) => {
      Name.value = index;
      name_id.value = id;
      comboName.value = combo;
    };
    const selectTime = (index, id, time) => {
      Time.value = index;
      time_id.value = id;
      comboTime.value = time;
    };
    common_vendor.watch([name_id, time_id], (newVal, oldVal) => {
      if (newVal[0] != "" && newVal[1] != "") {
        name_id.value = newVal[0];
        time_id.value = newVal[1];
        common_vendor.index.showLoading({
          title: "\u8BA1\u7B97\u4EF7\u683C\u4E2D",
          mask: true
        });
        getPrice();
      }
    });
    let price = common_vendor.ref(0);
    const getPrice = async () => {
      const res = await public_request.RequestApi.HpvPrice({ hpv_id: router_data._id, combo_id: name_id.value, time_id: time_id.value });
      price.value = res.data.data[0].price;
      common_vendor.index.hideLoading();
    };
    let gender = common_vendor.ref("");
    const changeSelector = (event) => {
      gender.value = event.detail.value == "0" ? "\u7537" : "\u5973";
    };
    let born_date = common_vendor.ref("");
    const changeDate = (event) => {
      born_date.value = event.detail.value;
    };
    let submitData = common_vendor.reactive({
      name: "",
      id_card: "",
      gender,
      born_date,
      phone: "",
      combo: comboName,
      ino_time: comboTime,
      price,
      hpv_name: common_vendor.toRefs(router_data).name
    });
    const Submit = async () => {
      common_vendor.index.showLoading({
        title: "\u63D0\u4EA4\u4E2D",
        mask: true
      });
      const res = await public_request.RequestApi.ResHpv(submitData);
      if (res.statusCode == 200) {
        common_vendor.index.hideLoading();
        common_vendor.index.redirectTo({
          url: "/pages/my-service/hpv-view/index"
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(router_data).name),
        b: common_vendor.f(common_vendor.unref(router_data).describe, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index
          };
        }),
        c: common_vendor.t(common_vendor.unref(router_data).price[0]),
        d: common_vendor.t(common_vendor.unref(router_data).price[1]),
        e: common_vendor.unref(submitData).name,
        f: common_vendor.o(($event) => common_vendor.unref(submitData).name = $event.detail.value),
        g: common_vendor.unref(submitData).id_card,
        h: common_vendor.o(($event) => common_vendor.unref(submitData).id_card = $event.detail.value),
        i: common_vendor.t(common_vendor.unref(gender) == "" ? "\u8BF7\u9009\u62E9\u6027\u522B" : common_vendor.unref(gender)),
        j: ["\u7537", "\u5973"],
        k: common_vendor.o(changeSelector),
        l: common_vendor.t(common_vendor.unref(born_date) == "" ? "\u8BF7\u9009\u62E9\u51FA\u751F\u65E5\u671F" : common_vendor.unref(born_date)),
        m: common_vendor.o(changeDate),
        n: common_vendor.unref(submitData).phone,
        o: common_vendor.o(($event) => common_vendor.unref(submitData).phone = $event.detail.value),
        p: common_vendor.f(common_vendor.unref(combo_name), (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.f(item.name, (item_a, index_a, i1) => {
              return {
                a: common_vendor.t(item_a.combo),
                b: common_vendor.n(index_a == common_vendor.unref(Name) ? "selected" : ""),
                c: index_a,
                d: common_vendor.o(($event) => selectName(index_a, item_a.combo_id, item_a.combo), index_a)
              };
            }),
            c: index
          };
        }),
        q: common_vendor.f(common_vendor.unref(combo_time), (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.f(item.name, (item_a, index_a, i1) => {
              return {
                a: common_vendor.t(item_a.time),
                b: common_vendor.n(index_a == common_vendor.unref(Time) ? "selected" : ""),
                c: index_a,
                d: common_vendor.o(($event) => selectTime(index_a, item_a.time_id, item_a.time), index_a)
              };
            }),
            c: index
          };
        }),
        r: common_vendor.t(common_vendor.unref(price)),
        s: common_vendor.o(Submit)
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c4e399cc"], ["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/pages/hpv-vaccine/hpv-buy.vue"]]);
wx.createPage(MiniProgramPage);
