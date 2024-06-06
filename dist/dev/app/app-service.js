if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global2 = uni.requireGlobal();
  ArrayBuffer = global2.ArrayBuffer;
  Int8Array = global2.Int8Array;
  Uint8Array = global2.Uint8Array;
  Uint8ClampedArray = global2.Uint8ClampedArray;
  Int16Array = global2.Int16Array;
  Uint16Array = global2.Uint16Array;
  Int32Array = global2.Int32Array;
  Uint32Array = global2.Uint32Array;
  Float32Array = global2.Float32Array;
  Float64Array = global2.Float64Array;
  BigInt64Array = global2.BigInt64Array;
  BigUint64Array = global2.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue, shared) {
  "use strict";
  const version = "3.7.5";
  const VERSION = version;
  const _hasatob = typeof atob === "function";
  const _hasbtoa = typeof btoa === "function";
  const _hasBuffer = typeof Buffer === "function";
  const _TD = typeof TextDecoder === "function" ? new TextDecoder() : void 0;
  const _TE = typeof TextEncoder === "function" ? new TextEncoder() : void 0;
  const b64ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  const b64chs = Array.prototype.slice.call(b64ch);
  const b64tab = ((a) => {
    let tab = {};
    a.forEach((c, i) => tab[c] = i);
    return tab;
  })(b64chs);
  const b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
  const _fromCC = String.fromCharCode.bind(String);
  const _U8Afrom = typeof Uint8Array.from === "function" ? Uint8Array.from.bind(Uint8Array) : (it) => new Uint8Array(Array.prototype.slice.call(it, 0));
  const _mkUriSafe = (src) => src.replace(/=/g, "").replace(/[+\/]/g, (m0) => m0 == "+" ? "-" : "_");
  const _tidyB64 = (s) => s.replace(/[^A-Za-z0-9\+\/]/g, "");
  const btoaPolyfill = (bin) => {
    let u32, c0, c1, c2, asc = "";
    const pad = bin.length % 3;
    for (let i = 0; i < bin.length; ) {
      if ((c0 = bin.charCodeAt(i++)) > 255 || (c1 = bin.charCodeAt(i++)) > 255 || (c2 = bin.charCodeAt(i++)) > 255)
        throw new TypeError("invalid character found");
      u32 = c0 << 16 | c1 << 8 | c2;
      asc += b64chs[u32 >> 18 & 63] + b64chs[u32 >> 12 & 63] + b64chs[u32 >> 6 & 63] + b64chs[u32 & 63];
    }
    return pad ? asc.slice(0, pad - 3) + "===".substring(pad) : asc;
  };
  const _btoa = _hasbtoa ? (bin) => btoa(bin) : _hasBuffer ? (bin) => Buffer.from(bin, "binary").toString("base64") : btoaPolyfill;
  const _fromUint8Array = _hasBuffer ? (u8a) => Buffer.from(u8a).toString("base64") : (u8a) => {
    const maxargs = 4096;
    let strs = [];
    for (let i = 0, l = u8a.length; i < l; i += maxargs) {
      strs.push(_fromCC.apply(null, u8a.subarray(i, i + maxargs)));
    }
    return _btoa(strs.join(""));
  };
  const fromUint8Array = (u8a, urlsafe = false) => urlsafe ? _mkUriSafe(_fromUint8Array(u8a)) : _fromUint8Array(u8a);
  const cb_utob = (c) => {
    if (c.length < 2) {
      var cc = c.charCodeAt(0);
      return cc < 128 ? c : cc < 2048 ? _fromCC(192 | cc >>> 6) + _fromCC(128 | cc & 63) : _fromCC(224 | cc >>> 12 & 15) + _fromCC(128 | cc >>> 6 & 63) + _fromCC(128 | cc & 63);
    } else {
      var cc = 65536 + (c.charCodeAt(0) - 55296) * 1024 + (c.charCodeAt(1) - 56320);
      return _fromCC(240 | cc >>> 18 & 7) + _fromCC(128 | cc >>> 12 & 63) + _fromCC(128 | cc >>> 6 & 63) + _fromCC(128 | cc & 63);
    }
  };
  const re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
  const utob = (u) => u.replace(re_utob, cb_utob);
  const _encode = _hasBuffer ? (s) => Buffer.from(s, "utf8").toString("base64") : _TE ? (s) => _fromUint8Array(_TE.encode(s)) : (s) => _btoa(utob(s));
  const encode = (src, urlsafe = false) => urlsafe ? _mkUriSafe(_encode(src)) : _encode(src);
  const encodeURI = (src) => encode(src, true);
  const re_btou = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g;
  const cb_btou = (cccc) => {
    switch (cccc.length) {
      case 4:
        var cp = (7 & cccc.charCodeAt(0)) << 18 | (63 & cccc.charCodeAt(1)) << 12 | (63 & cccc.charCodeAt(2)) << 6 | 63 & cccc.charCodeAt(3), offset = cp - 65536;
        return _fromCC((offset >>> 10) + 55296) + _fromCC((offset & 1023) + 56320);
      case 3:
        return _fromCC((15 & cccc.charCodeAt(0)) << 12 | (63 & cccc.charCodeAt(1)) << 6 | 63 & cccc.charCodeAt(2));
      default:
        return _fromCC((31 & cccc.charCodeAt(0)) << 6 | 63 & cccc.charCodeAt(1));
    }
  };
  const btou = (b) => b.replace(re_btou, cb_btou);
  const atobPolyfill = (asc) => {
    asc = asc.replace(/\s+/g, "");
    if (!b64re.test(asc))
      throw new TypeError("malformed base64.");
    asc += "==".slice(2 - (asc.length & 3));
    let u24, bin = "", r1, r2;
    for (let i = 0; i < asc.length; ) {
      u24 = b64tab[asc.charAt(i++)] << 18 | b64tab[asc.charAt(i++)] << 12 | (r1 = b64tab[asc.charAt(i++)]) << 6 | (r2 = b64tab[asc.charAt(i++)]);
      bin += r1 === 64 ? _fromCC(u24 >> 16 & 255) : r2 === 64 ? _fromCC(u24 >> 16 & 255, u24 >> 8 & 255) : _fromCC(u24 >> 16 & 255, u24 >> 8 & 255, u24 & 255);
    }
    return bin;
  };
  const _atob = _hasatob ? (asc) => atob(_tidyB64(asc)) : _hasBuffer ? (asc) => Buffer.from(asc, "base64").toString("binary") : atobPolyfill;
  const _toUint8Array = _hasBuffer ? (a) => _U8Afrom(Buffer.from(a, "base64")) : (a) => _U8Afrom(_atob(a).split("").map((c) => c.charCodeAt(0)));
  const toUint8Array = (a) => _toUint8Array(_unURI(a));
  const _decode = _hasBuffer ? (a) => Buffer.from(a, "base64").toString("utf8") : _TD ? (a) => _TD.decode(_toUint8Array(a)) : (a) => btou(_atob(a));
  const _unURI = (a) => _tidyB64(a.replace(/[-_]/g, (m0) => m0 == "-" ? "+" : "/"));
  const decode = (src) => _decode(_unURI(src));
  const isValid = (src) => {
    if (typeof src !== "string")
      return false;
    const s = src.replace(/\s+/g, "").replace(/={0,2}$/, "");
    return !/[^\s0-9a-zA-Z\+/]/.test(s) || !/[^\s0-9a-zA-Z\-_]/.test(s);
  };
  const _noEnum = (v) => {
    return {
      value: v,
      enumerable: false,
      writable: true,
      configurable: true
    };
  };
  const extendString = function() {
    const _add = (name, body) => Object.defineProperty(String.prototype, name, _noEnum(body));
    _add("fromBase64", function() {
      return decode(this);
    });
    _add("toBase64", function(urlsafe) {
      return encode(this, urlsafe);
    });
    _add("toBase64URI", function() {
      return encode(this, true);
    });
    _add("toBase64URL", function() {
      return encode(this, true);
    });
    _add("toUint8Array", function() {
      return toUint8Array(this);
    });
  };
  const extendUint8Array = function() {
    const _add = (name, body) => Object.defineProperty(Uint8Array.prototype, name, _noEnum(body));
    _add("toBase64", function(urlsafe) {
      return fromUint8Array(this, urlsafe);
    });
    _add("toBase64URI", function() {
      return fromUint8Array(this, true);
    });
    _add("toBase64URL", function() {
      return fromUint8Array(this, true);
    });
  };
  const extendBuiltins = () => {
    extendString();
    extendUint8Array();
  };
  const gBase64 = {
    version,
    VERSION,
    atob: _atob,
    atobPolyfill,
    btoa: _btoa,
    btoaPolyfill,
    fromBase64: decode,
    toBase64: encode,
    encode,
    encodeURI,
    encodeURL: encodeURI,
    utob,
    btou,
    decode,
    isValid,
    fromUint8Array,
    toUint8Array,
    extendString,
    extendUint8Array,
    extendBuiltins
  };
  const baseUrl = "https://meituan.thexxdd.cn/api/";
  const getToken = () => {
    const token = uni.getStorageSync("wxuser").user_Token || "";
    const base64_token = gBase64.encode(token + ":");
    return "Basic " + base64_token;
  };
  const request = (url, method, data) => {
    return new Promise((resolve, reject) => {
      uni.request({
        url: baseUrl + url,
        method,
        data,
        header: { Authorization: getToken() },
        success: (res) => {
          if (res.statusCode == 200) {
            resolve(res);
          } else if (res.statusCode == 401) {
            uni.navigateTo({
              url: "/pages/login-page/index"
            });
            reject(res);
          } else if (res.statusCode == 400) {
            uni.showToast({
              title: "\u5F00\u53D1\u8005\u76F8\u5173\u53C2\u6570\u6216\u8005\u5B57\u6BB5\u9519\u8BEF",
              icon: "none"
            });
            reject(res);
          } else if (res.statusCode == 500) {
            uni.showToast({
              title: "\u670D\u52A1\u5668\u53D1\u751F\u672A\u77E5\u9519\u8BEF",
              icon: "none"
            });
            reject(res);
          } else if (res.statusCode == 202) {
            uni.showToast({
              title: res.data.msg,
              icon: "none"
            });
            reject(res);
          } else {
            uni.showToast({
              title: "\u51FA\u73B0\u76F8\u5173\u95EE\u9898",
              icon: "none"
            });
            reject(res);
          }
        },
        fail: (err) => {
          reject(err);
        }
      });
    });
  };
  const RequestApi = {
    FrontPage: () => request("frontpage ", "GET", {}),
    NewappTime: () => request("newapptime", "GET", {}),
    ResCovid: (data) => request("rescovid", "POST", data),
    WxLogin: (data) => request("wx_login", "POST", data),
    CoviduserOrder: () => request("coviduser_order", "GET", {}),
    CovidCancel: (data) => request("covidcancel", "GET", data),
    OtuHpv: () => request("otuhpv", "GET", {}),
    HpvPack: () => request("hpv_pack ", "GET", {}),
    HpvPrice: (data) => request("hpv_price", "POST", data),
    ResHpv: (data) => request("reshpv", "POST", data),
    HpvuserOrder: () => request("hpvuser_order", "GET", {}),
    HpvCancel: (data) => request("hpvcancel", "GET", data),
    NuataGet: () => request("nuataget", "GET", {}),
    ResNuata: (data) => request("resnuata", "POST", data),
    NuatauserOrder: () => request("nuatauser_order", "GET", {}),
    NuataCancel: (data) => request("nuatacancel", "GET", data),
    GetPatient: () => request("get_patient", "GET", {}),
    PatientRes: (data) => request("patient_res", "POST", data),
    GraPhics: (data) => request("graphics", "POST", data),
    PhyTerm: () => request("phyterm", "GET", {}),
    PhysGet: () => request("physget", "GET", {}),
    PhyQuery: (data) => request("phyquery", "POST", data),
    PhyDateil: (data) => request("phydateil", "GET", data),
    ResPhy: (data) => request("resphy", "POST", data),
    PhyuserOrder: () => request("phyuser_order", "GET", {}),
    PhyCancel: (data) => request("phycancel", "GET", data),
    DepressionTopics: () => request("depression_topics", "GET", {}),
    Depression: (data) => request("depression", "GET", data),
    PrematureTopics: () => request("premature_topics", "GET", {}),
    PreMature: (data) => request("premature", "GET", data),
    InsomniaTopics: () => request("insomnia_topics", "GET", {}),
    InsoMnia: (data) => request("insomnia", "GET", data),
    VideoList: (data) => request("video_list", "GET", data),
    Department: () => request("department", "GET", {}),
    RegList: (data) => request("reglist", "GET", data),
    TimeSele: (data) => request("timesele", "GET", data),
    AlldList: (data) => request("alldlist", "GET", data),
    EverydList: (data) => request("everydlist", "GET", data),
    DoctorHome: (data) => request("doctorhome", "GET", data),
    RegAppoin: (data) => request("regappoin", "POST", data),
    UserRegistrat: () => request("user_registrat", "GET", {}),
    RegistCancel: (data) => request("regist_cancel", "GET", data)
  };
  const ImgUrl = baseUrl + "upload_picture ";
  const AiCard = baseUrl + "ai_card";
  var _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$B = {};
  function _sfc_render$a(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "sk-container" }, [
      vue.createElementVNode("view", {
        class: "nav-gation",
        style: { "--1badc801-menu_top": "24px", "--1badc801-menu_height": "32px" }
      }, [
        vue.createElementVNode("view", { class: "nav-top" }),
        vue.createElementVNode("view", { class: "nav-height sk-transparent sk-text-23-4375-132 sk-text" }, "\u67D0\u67D0\u7701\u7B2C\u4E00\u4EBA\u6C11\u533B\u9662")
      ]),
      vue.createElementVNode("view", {
        class: "yuyue",
        style: { "--1badc801-menu_top": "24px", "--1badc801-menu_height": "32px" }
      }, [
        vue.createElementVNode("image", {
          mode: "widthFix",
          style: { "height": "275.241px" },
          class: "sk-image"
        })
      ]),
      vue.createElementVNode("view", {
        class: "reserve",
        style: { "--1badc801-menu_top": "24px", "--1badc801-menu_height": "32px" }
      }, [
        vue.createElementVNode("view", { class: "reserve-item" }, [
          vue.createElementVNode("image", {
            mode: "aspectFill",
            class: "sk-image"
          }),
          vue.createElementVNode("text", { class: "sk-transparent sk-text-14-2857-862 sk-text" }, "\u65B0\u51A0\u75AB\u82D7")
        ]),
        vue.createElementVNode("view", { class: "reserve-item" }, [
          vue.createElementVNode("image", {
            mode: "aspectFill",
            class: "sk-image"
          }),
          vue.createElementVNode("text", { class: "sk-transparent sk-text-14-2857-822 sk-text" }, "HPV\u75AB\u82D7")
        ]),
        vue.createElementVNode("view", { class: "reserve-item" }, [
          vue.createElementVNode("image", {
            mode: "aspectFill",
            class: "sk-image"
          }),
          vue.createElementVNode("text", { class: "sk-transparent sk-text-14-2857-285 sk-text" }, "\u6838\u9178\u68C0\u6D4B")
        ]),
        vue.createElementVNode("view", { class: "reserve-item" }, [
          vue.createElementVNode("image", {
            mode: "aspectFill",
            class: "sk-image"
          }),
          vue.createElementVNode("text", { class: "sk-transparent sk-text-14-2857-629 sk-text" }, "\u56FE\u6587\u54A8\u8BE2")
        ])
      ]),
      vue.createElementVNode("view", {
        class: "guahao",
        style: { "--1badc801-menu_top": "24px", "--1badc801-menu_height": "32px" }
      }, [
        vue.createElementVNode("view", { class: "guahao-item" }, [
          vue.createElementVNode("text", { class: "sk-transparent sk-text-14-2857-678 sk-text" }, "\u9884\u7EA6\u6302\u53F7"),
          vue.createElementVNode("text", {
            style: { "margin-top": "4px" },
            class: "sk-transparent sk-text-14-2857-549 sk-text"
          }, "\u6BCF\u5468\u51C6\u65F6\u5F00\u53F7"),
          vue.createElementVNode("image", {
            mode: "widthFix",
            style: { "height": "59.0956px" },
            class: "sk-image"
          })
        ]),
        vue.createElementVNode("view", { class: "guahao-item" }, [
          vue.createElementVNode("text", { class: "sk-transparent sk-text-14-2857-421 sk-text" }, "\u5065\u5EB7\u4F53\u68C0"),
          vue.createElementVNode("text", {
            style: { "margin-top": "4px" },
            class: "sk-transparent sk-text-14-2857-356 sk-text"
          }, "\u5F53\u5929\u51FA\u62A5\u544A"),
          vue.createElementVNode("image", {
            mode: "widthFix",
            style: { "height": "59.0956px" },
            class: "sk-image"
          })
        ])
      ]),
      vue.createElementVNode("view", {
        class: "hot-tit",
        style: { "--1badc801-menu_top": "24px", "--1badc801-menu_height": "32px" }
      }, [
        vue.createElementVNode("text", { class: "tit-left sk-transparent sk-text-14-2857-740 sk-text" }, "\u70ED\u95E8\u6302\u53F7"),
        vue.createElementVNode("view", { class: "tit-right" }, [
          vue.createElementVNode("text", { class: "sk-transparent sk-text-14-2857-380 sk-text" }, "\u67E5\u770B\u66F4\u591A"),
          vue.createElementVNode("image", {
            mode: "true",
            class: "sk-image"
          })
        ])
      ]),
      vue.createElementVNode("view", {
        class: "hot-guahao",
        style: { "--1badc801-menu_top": "24px", "--1badc801-menu_height": "32px" }
      }, [
        vue.createElementVNode("view", { class: "hot-item" }, [
          vue.createElementVNode("view", {
            class: "item",
            style: { "background-color": "#d5e2ff" }
          }, [
            vue.createElementVNode("text", { class: "sk-transparent sk-text-14-2857-231 sk-text" }, "\u513F\u79D1"),
            vue.createElementVNode("image", {
              mode: "aspectFill",
              class: "sk-image"
            })
          ]),
          vue.createElementVNode("view", {
            class: "item",
            style: { "background-color": "#fff5e9" }
          }, [
            vue.createElementVNode("text", { class: "sk-transparent sk-text-14-2857-716 sk-text" }, "\u6D88\u5316\u79D1"),
            vue.createElementVNode("image", {
              mode: "aspectFill",
              class: "sk-image"
            })
          ]),
          vue.createElementVNode("view", {
            class: "item",
            style: { "background-color": "#dce0fb" }
          }, [
            vue.createElementVNode("text", { class: "sk-transparent sk-text-14-2857-721 sk-text" }, "\u4EA7\u79D1"),
            vue.createElementVNode("image", {
              mode: "aspectFill",
              class: "sk-image"
            })
          ]),
          vue.createElementVNode("view", {
            class: "item",
            style: { "background-color": "#ffe9ce" }
          }, [
            vue.createElementVNode("text", { class: "sk-transparent sk-text-14-2857-422 sk-text" }, "\u76AE\u80A4\u79D1"),
            vue.createElementVNode("image", {
              mode: "aspectFill",
              class: "sk-image"
            })
          ]),
          vue.createElementVNode("view", {
            class: "item",
            style: { "background-color": "#ccdcff" }
          }, [
            vue.createElementVNode("text", { class: "sk-transparent sk-text-14-2857-166 sk-text" }, "\u795E\u7ECF\u5185\u79D1"),
            vue.createElementVNode("image", {
              mode: "aspectFill",
              class: "sk-image"
            })
          ]),
          vue.createElementVNode("view", {
            class: "item",
            style: { "background-color": "#ccf2df" }
          }, [
            vue.createElementVNode("text", { class: "sk-transparent sk-text-14-2857-378 sk-text" }, "\u4E2D\u533B\u79D1"),
            vue.createElementVNode("image", {
              mode: "aspectFill",
              class: "sk-image"
            })
          ])
        ])
      ])
    ]);
  }
  var Skeleton$a = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["render", _sfc_render$a], ["__scopeId", "data-v-4616d00f"], ["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/skeleton/s-index.vue"]]);
  const _sfc_main$A = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props) {
      vue.useCssVars((_ctx) => ({
        "1badc801-menu_top": vue.unref(menu_top),
        "1badc801-menu_height": vue.unref(menu_height)
      }));
      const s_show = vue.ref(true);
      let menu_top = vue.ref("");
      let menu_height = vue.ref("");
      vue.onMounted(() => {
        let menu = uni.getStorageSync("MenuButton");
        menu_top.value = menu.top + "px";
        menu_height.value = menu.height + "px";
        page_data();
        s_show.value = false;
      });
      let vaccine = vue.ref([]);
      let reserve = vue.ref([]);
      let popular = vue.ref([]);
      let self_test = vue.ref([]);
      const page_data = async () => {
        const res = await RequestApi.FrontPage();
        vaccine.value = res.data.data[0].vaccine;
        reserve.value = res.data.data[1].reserve;
        popular.value = res.data.data[2].popular;
        self_test.value = res.data.data[3].self_test;
      };
      const RouteTo = (name, index, type) => {
        if (type == "001") {
          uni.navigateTo({
            url: "/pages/self-test/topic?type=001&name=" + name
          });
        } else {
          if (index == 0) {
            uni.navigateTo({
              url: "/pages/self-test/topic?type=002&name=" + name
            });
          } else {
            uni.navigateTo({
              url: "/pages/self-test/topic?type=003&name=" + name
            });
          }
        }
      };
      const reserve_route = (index) => {
        switch (index) {
          case 0:
            uni.navigateTo({ url: "/pages/xinguan-vaccine/xinguan-vaccine" });
            break;
          case 1:
            uni.navigateTo({ url: "/pages/hpv-vaccine/hpv-vaccine" });
            break;
          case 2:
            uni.navigateTo({ url: "/pages/nucleic-acid/index" });
            break;
          case 3:
            uni.navigateTo({ url: "/pages/graphics/index" });
        }
      };
      const guahao_route = (index) => {
        switch (index) {
          case 0:
            uni.switchTab({ url: "/pages/registered/registered" });
            break;
          case 1:
            uni.navigateTo({ url: "/pages/phy-exam/index" });
        }
      };
      const HotGuahao_route = (dep_id) => {
        uni.navigateTo({
          url: "/pages/doctor/index?id=" + dep_id
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createCommentVNode(" \u9876\u90E8 "),
          vue.createElementVNode("view", { class: "nav-gation" }, [
            vue.createElementVNode("view", { class: "nav-top" }),
            vue.createElementVNode("view", { class: "nav-height" }, "\u67D0\u67D0\u7701\u7B2C\u4E00\u4EBA\u6C11\u533B\u9662")
          ]),
          vue.createElementVNode("view", {
            class: "yuyue",
            onClick: _cache[0] || (_cache[0] = ($event) => RouteTo("\u6291\u90C1\u6D4B\u8BC4\u4E13\u4E1A\u7248", 0, "001"))
          }, [
            vue.createElementVNode("image", {
              mode: "widthFix",
              src: "https://diancan-1252107261.cos.accelerate.myqcloud.com/yiliao/nav-yiyu.png"
            })
          ]),
          vue.createCommentVNode(" \u75AB\u82D7\u9884\u7EA6 "),
          vue.createElementVNode("view", { class: "reserve" }, [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(vaccine), (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "reserve-item",
                key: index,
                onClick: ($event) => reserve_route(index)
              }, [
                vue.createElementVNode("image", {
                  src: item.image,
                  mode: "aspectFill"
                }, null, 8, ["src"]),
                vue.createElementVNode("text", null, vue.toDisplayString(item.title), 1)
              ], 8, ["onClick"]);
            }), 128))
          ]),
          vue.createCommentVNode(" \u6302\u53F7\u548C\u4F53\u68C0 "),
          vue.createElementVNode("view", { class: "guahao" }, [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(reserve), (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "guahao-item",
                key: index,
                onClick: ($event) => guahao_route(index)
              }, [
                vue.createElementVNode("text", { style: { "font-size": "38rpx" } }, vue.toDisplayString(item.title), 1),
                vue.createElementVNode("text", { class: "text-small" }, vue.toDisplayString(item.describe), 1),
                vue.createElementVNode("image", {
                  src: item.image,
                  mode: "widthFix"
                }, null, 8, ["src"])
              ], 8, ["onClick"]);
            }), 128))
          ]),
          vue.createCommentVNode(" \u70ED\u95E8\u6302\u53F7 "),
          vue.createElementVNode("view", { class: "hot-tit" }, [
            vue.createElementVNode("text", { class: "tit-left" }, "\u70ED\u95E8\u6302\u53F7"),
            vue.createElementVNode("view", { class: "tit-right" }, [
              vue.createElementVNode("text", {
                onClick: _cache[1] || (_cache[1] = ($event) => guahao_route(0))
              }, "\u67E5\u770B\u66F4\u591A"),
              vue.createElementVNode("image", {
                src: "/static/other/gengduo.svg",
                mode: ""
              })
            ])
          ]),
          vue.createElementVNode("view", { class: "hot-guahao" }, [
            vue.createElementVNode("view", { class: "hot-item" }, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(popular), (item, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: "item",
                  onClick: ($event) => HotGuahao_route(item.dep_id),
                  key: index,
                  style: vue.normalizeStyle("background-color:" + item.background)
                }, [
                  vue.createElementVNode("text", null, vue.toDisplayString(item.title), 1),
                  vue.createElementVNode("image", {
                    src: item.image,
                    mode: "aspectFill"
                  }, null, 8, ["src"])
                ], 12, ["onClick"]);
              }), 128))
            ])
          ]),
          vue.createCommentVNode(" \u5065\u5EB7\u81EA\u6D4B "),
          vue.createElementVNode("view", { class: "health-tit" }, [
            vue.createElementVNode("text", null, "\u5065\u5EB7\u81EA\u6D4B")
          ]),
          vue.unref(self_test).length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "health-profess"
          }, [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList([vue.unref(self_test)[0]], (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "health-item",
                key: index,
                onClick: ($event) => RouteTo(item.name, index, "001")
              }, [
                vue.createElementVNode("text", { class: "health-big" }, vue.toDisplayString(item.name), 1),
                vue.createElementVNode("text", { class: "health-small" }, vue.toDisplayString(item.describe), 1),
                vue.createElementVNode("view", null, [
                  vue.createElementVNode("text", { class: "health-big" }, vue.toDisplayString(item.number_of_people), 1),
                  vue.createElementVNode("text", { class: "health-small" }, "\u4EBA\u6D4B\u8FC7/" + vue.toDisplayString(item.question) + "\u9898/" + vue.toDisplayString(item.minute) + "\u5206\u949F", 1)
                ]),
                vue.createElementVNode("image", {
                  src: item.image,
                  mode: "widthFix"
                }, null, 8, ["src"])
              ], 8, ["onClick"]);
            }), 128))
          ])) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("view", { class: "health-other" }, [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(self_test).slice(1), (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "health-item",
                key: index,
                onClick: ($event) => RouteTo(item.name, index, "002")
              }, [
                vue.createElementVNode("text", { class: "health-big" }, vue.toDisplayString(item.name), 1),
                vue.createElementVNode("text", { class: "health-small" }, vue.toDisplayString(item.question) + "\u9898/" + vue.toDisplayString(item.minute) + "\u5206\u949F", 1),
                vue.createElementVNode("view", null, [
                  vue.createElementVNode("text", { class: "health-big" }, vue.toDisplayString(item.number_of_people), 1),
                  vue.createElementVNode("text", { class: "health-small" }, "\u4EBA\u6D4B\u8FC7")
                ]),
                vue.createElementVNode("image", {
                  src: item.image,
                  mode: "widthFix"
                }, null, 8, ["src"])
              ], 8, ["onClick"]);
            }), 128))
          ]),
          vue.createElementVNode("view", { style: { "height": "100rpx" } }),
          s_show.value ? (vue.openBlock(), vue.createBlock(Skeleton$a, { key: 1 })) : vue.createCommentVNode("v-if", true)
        ], 64);
      };
    }
  });
  var PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/pages/index/index.vue"]]);
  const _sfc_main$z = {};
  function _sfc_render$9(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "sk-container" }, [
      vue.createElementVNode("view", { class: "register" }, [
        vue.createElementVNode("view", { class: "register-l" }, [
          vue.createElementVNode("text", { class: "selected l-item sk-transparent sk-text-30-0000-935 sk-text" }, "\u513F\u79D1"),
          vue.createElementVNode("text", { class: "l-item sk-transparent sk-text-30-0000-591 sk-text" }, "\u6D88\u5316\u79D1"),
          vue.createElementVNode("text", { class: "l-item sk-transparent sk-text-30-0000-292 sk-text" }, "\u4EA7\u79D1"),
          vue.createElementVNode("text", { class: "l-item sk-transparent sk-text-30-0000-368 sk-text" }, "\u76AE\u80A4\u79D1"),
          vue.createElementVNode("text", { class: "l-item sk-transparent sk-text-30-0000-643 sk-text" }, "\u795E\u7ECF\u5185\u79D1"),
          vue.createElementVNode("text", { class: "l-item sk-transparent sk-text-30-0000-300 sk-text" }, "\u4E2D\u533B\u79D1"),
          vue.createElementVNode("text", { class: "l-item sk-transparent sk-text-30-0000-444 sk-text" }, "\u5987\u79D1"),
          vue.createElementVNode("text", { class: "l-item sk-transparent sk-text-30-0000-927 sk-text" }, "\u8033\u9F3B\u54BD\u5589\u79D1"),
          vue.createElementVNode("text", { class: "l-item sk-transparent sk-text-30-0000-86 sk-text" }, "\u9AA8\u79D1"),
          vue.createElementVNode("text", { class: "l-item sk-transparent sk-text-30-0000-470 sk-text" }, "\u809B\u80A0\u79D1"),
          vue.createElementVNode("text", { class: "l-item sk-transparent sk-text-30-0000-510 sk-text" }, "\u795E\u7ECF\u5916\u79D1"),
          vue.createElementVNode("text", { class: "l-item sk-transparent sk-text-30-0000-224 sk-text" }, "\u5FC3\u7406\u79D1"),
          vue.createElementVNode("text", { class: "l-item sk-transparent sk-text-30-0000-103 sk-text" }, "\u5FC3\u8840\u7BA1\u5185\u79D1"),
          vue.createElementVNode("text", { class: "l-item sk-transparent sk-text-30-0000-904 sk-text" }, "\u773C\u79D1")
        ]),
        vue.createElementVNode("view", { class: "register-r" }, [
          vue.createElementVNode("text", { class: "r-item sk-transparent sk-text-30-0000-602 sk-text" }, "\u65B0\u751F\u513F\u968F\u8BBF\u95E8\u8BCA"),
          vue.createElementVNode("text", { class: "r-item sk-transparent sk-text-30-0000-464 sk-text" }, "\u513F\u79D1\u65B0\u751F\u513F\u95E8\u8BCA"),
          vue.createElementVNode("text", { class: "r-item sk-transparent sk-text-30-0000-236 sk-text" }, "\u513F\u79D1\u5185\u5206\u6CCC\u95E8\u8BCA"),
          vue.createElementVNode("text", { class: "r-item sk-transparent sk-text-30-0000-541 sk-text" }, "\u513F\u79D1\u98CE\u6E7F\u514D\u75AB\u75BE\u75C5"),
          vue.createElementVNode("text", { class: "r-item sk-transparent sk-text-30-0000-522 sk-text" }, "\u513F\u79D1\u6D88\u5316\u7CFB\u7EDF\u75BE\u75C5")
        ])
      ])
    ]);
  }
  var Skeleton$9 = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["render", _sfc_render$9], ["__scopeId", "data-v-6054d195"], ["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/skeleton/s-registered.vue"]]);
  const _sfc_main$y = /* @__PURE__ */ vue.defineComponent({
    __name: "registered",
    setup(__props) {
      const s_show = vue.ref(true);
      const parent = vue.ref([]);
      const children = vue.ref([]);
      const curIndex = vue.ref(0);
      vue.onMounted(async () => {
        const res = await RequestApi.Department();
        parent.value = res.data.data;
        changeList(0, res.data.data[0]._id);
        s_show.value = false;
      });
      const changeList = async (index, id) => {
        const res = await RequestApi.RegList({ id });
        curIndex.value = index;
        children.value = res.data.data;
      };
      const jumpRoute = (id) => {
        uni.navigateTo({
          url: "/pages/doctor/index?id=" + id
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createElementVNode("view", { class: "register" }, [
            vue.createElementVNode("view", { class: "register-l" }, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(parent.value, (item, index) => {
                return vue.openBlock(), vue.createElementBlock("text", {
                  onClick: ($event) => changeList(index, item._id),
                  class: vue.normalizeClass([curIndex.value == index ? "selected" : "", "l-item"]),
                  key: index
                }, vue.toDisplayString(item.dep_ment), 11, ["onClick"]);
              }), 128))
            ]),
            vue.createElementVNode("view", { class: "register-r" }, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(children.value, (item, index) => {
                return vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: index }, [
                  (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(item.dep_ment_list, (item_a, index_a) => {
                    return vue.openBlock(), vue.createElementBlock("text", {
                      onClick: ($event) => jumpRoute(item._id),
                      class: "r-item",
                      key: index_a
                    }, vue.toDisplayString(item_a.dep_name), 9, ["onClick"]);
                  }), 128))
                ], 64);
              }), 128))
            ])
          ]),
          s_show.value ? (vue.openBlock(), vue.createBlock(Skeleton$9, { key: 0 })) : vue.createCommentVNode("v-if", true)
        ], 64);
      };
    }
  });
  var PagesRegisteredRegistered = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/pages/registered/registered.vue"]]);
  const ON_SHOW = "onShow";
  const ON_LAUNCH = "onLaunch";
  const ON_LOAD = "onLoad";
  const ON_REACH_BOTTOM = "onReachBottom";
  const ON_SHARE_APP_MESSAGE = "onShareAppMessage";
  function isDebugMode() {
    return typeof __channelId__ === "string" && __channelId__;
  }
  function jsonStringifyReplacer(k, p) {
    switch (shared.toRawType(p)) {
      case "Function":
        return "function() { [native code] }";
      default:
        return p;
    }
  }
  function normalizeLog(type, filename, args) {
    if (isDebugMode()) {
      args.push(filename.replace("at ", "uni-app:///"));
      return console[type].apply(console, args);
    }
    const msgs = args.map(function(v) {
      const type2 = shared.toTypeString(v).toLowerCase();
      if (["[object object]", "[object array]", "[object module]"].indexOf(type2) !== -1) {
        try {
          v = "---BEGIN:JSON---" + JSON.stringify(v, jsonStringifyReplacer) + "---END:JSON---";
        } catch (e) {
          v = type2;
        }
      } else {
        if (v === null) {
          v = "---NULL---";
        } else if (v === void 0) {
          v = "---UNDEFINED---";
        } else {
          const vType = shared.toRawType(v).toUpperCase();
          if (vType === "NUMBER" || vType === "BOOLEAN") {
            v = "---BEGIN:" + vType + "---" + v + "---END:" + vType + "---";
          } else {
            v = String(v);
          }
        }
      }
      return v;
    });
    return msgs.join("---COMMA---") + " " + filename;
  }
  function formatAppLog(type, filename, ...args) {
    const res = normalizeLog(type, filename, args);
    res && console[type](res);
  }
  const createHook = (lifecycle) => (hook, target = vue.getCurrentInstance()) => {
    !vue.isInSSRComponentSetup && vue.injectHook(lifecycle, hook, target);
  };
  const onShow = /* @__PURE__ */ createHook(ON_SHOW);
  const onLaunch = /* @__PURE__ */ createHook(ON_LAUNCH);
  const onLoad = /* @__PURE__ */ createHook(ON_LOAD);
  const onReachBottom = /* @__PURE__ */ createHook(ON_REACH_BOTTOM);
  const onShareAppMessage = /* @__PURE__ */ createHook(ON_SHARE_APP_MESSAGE);
  const _sfc_main$x = /* @__PURE__ */ vue.defineComponent({
    __name: "point",
    props: {
      show: { type: Boolean, required: true, default: false },
      title: { type: String, required: false, default: "\u6CA1\u6709\u66F4\u591A\u7684\u6570\u636E" }
    },
    setup(__props) {
      return (_ctx, _cache) => {
        return __props.show ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "box"
        }, [
          vue.createElementVNode("image", {
            src: "/static/other/kongshuju.jpg",
            mode: "aspectFill"
          }),
          vue.createElementVNode("text", { style: { "margin-top": "40rpx" } }, vue.toDisplayString(__props.title), 1)
        ])) : vue.createCommentVNode("v-if", true);
      };
    }
  });
  var Point = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["__scopeId", "data-v-c314bc08"], ["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/com-components/point.vue"]]);
  const _sfc_main$w = {};
  function _sfc_render$8(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "sk-container" }, [
      vue.createElementVNode("view", { class: "top" }, [
        vue.createElementVNode("view", {
          class: "all selected sk-transparent sk-text-39-3333-996 sk-text",
          style: { "background-position-x": "50%" }
        }, "\u5168\u90E8"),
        vue.createElementVNode("scroll-view", {
          class: "scroll",
          "scroll-x": "true"
        }, [
          vue.createElementVNode("view", { class: "items" }, [
            vue.createElementVNode("view", { class: "date-item" }, [
              vue.createElementVNode("text", { class: "sk-transparent sk-text-20-0000-421 sk-text" }, "12-17"),
              vue.createElementVNode("text", { class: "sk-transparent sk-text-20-0000-207 sk-text" }, "\u5468\u65E5"),
              vue.createElementVNode("text", { class: "sk-transparent sk-text-20-0000-739 sk-text" }, "\u65E0\u53F7")
            ])
          ]),
          vue.createElementVNode("view", { class: "items" }, [
            vue.createElementVNode("view", { class: "date-item" }, [
              vue.createElementVNode("text", { class: "sk-transparent sk-text-20-0000-163 sk-text" }, "12-18"),
              vue.createElementVNode("text", { class: "sk-transparent sk-text-20-0000-848 sk-text" }, "\u5468\u4E00"),
              vue.createElementVNode("text", { class: "sk-transparent sk-text-20-0000-789 sk-text" }, "\u65E0\u53F7")
            ])
          ]),
          vue.createElementVNode("view", { class: "items" }, [
            vue.createElementVNode("view", { class: "date-item" }, [
              vue.createElementVNode("text", { class: "sk-transparent sk-text-20-0000-789 sk-text" }, "12-19"),
              vue.createElementVNode("text", { class: "sk-transparent sk-text-20-0000-923 sk-text" }, "\u5468\u4E8C"),
              vue.createElementVNode("text", { class: "sk-transparent sk-text-20-0000-652 sk-text" }, "\u65E0\u53F7")
            ])
          ]),
          vue.createElementVNode("view", { class: "items" }, [
            vue.createElementVNode("view", { class: "date-item" }, [
              vue.createElementVNode("text", { class: "sk-transparent sk-text-20-0000-489 sk-text" }, "12-20"),
              vue.createElementVNode("text", { class: "sk-transparent sk-text-20-0000-569 sk-text" }, "\u5468\u4E09"),
              vue.createElementVNode("text", { class: "sk-transparent sk-text-20-0000-254 sk-text" }, "\u65E0\u53F7")
            ])
          ])
        ])
      ]),
      vue.createElementVNode("view", { style: { "height": "85px" } }),
      vue.createElementVNode("view", { is: "com-components/point" }, [
        vue.createElementVNode("view", { class: "box point--box" }, [
          vue.createElementVNode("image", {
            mode: "aspectFill",
            class: "sk-image"
          }),
          vue.createElementVNode("text", {
            style: { "margin-top": "20px" },
            class: "sk-transparent sk-text-14-2857-239 sk-text"
          }, "\u6CA1\u6709\u533B\u751F\u6570\u636E")
        ])
      ])
    ]);
  }
  var Skeleton$8 = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["render", _sfc_render$8], ["__scopeId", "data-v-ce3ccc12"], ["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/skeleton/s-doctor-index.vue"]]);
  const _sfc_main$v = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props) {
      const s_show = vue.ref(true);
      const depId = vue.ref("");
      const doctor_time = vue.ref([]);
      const doctor_list = vue.ref([]);
      const show = vue.ref(false);
      const title = vue.ref("\u6CA1\u6709\u533B\u751F\u6570\u636E");
      onLoad(async (event) => {
        const { id } = event;
        depId.value = id;
        const res = await Promise.all([RequestApi.TimeSele({ dep_id: id }), RequestApi.AlldList({ dep_id: id })]);
        doctor_time.value = res[0].data.data;
        doctor_list.value = res[1].data.data;
        if (doctor_list.value.length < 1) {
          show.value = true;
        }
        s_show.value = false;
      });
      let curIndex = vue.ref(-1);
      const selectAll = async () => {
        const res = await RequestApi.AlldList({ dep_id: depId.value });
        doctor_list.value = res.data.data;
      };
      const selectDate = async (index, dep_id, date) => {
        curIndex.value = index;
        const res = await RequestApi.EverydList({ dep_id, week: date });
        doctor_list.value = res.data.data;
      };
      const jumpRoute = (_id) => {
        uni.navigateTo({
          url: "/pages/doctor/doctor-Homepage?id=" + _id
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createElementVNode("view", { class: "top" }, [
            vue.createElementVNode("view", {
              class: vue.normalizeClass(["all", vue.unref(curIndex) == -1 ? "selected" : ""]),
              onClick: selectAll
            }, "\u5168\u90E8", 2),
            vue.createElementVNode("scroll-view", {
              class: "scroll",
              "scroll-x": "true"
            }, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(doctor_time.value, (item, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: "items",
                  onClick: ($event) => selectDate(index, item.dep_id, item.date),
                  key: index
                }, [
                  vue.createElementVNode("view", { class: "date-item" }, [
                    vue.createElementVNode("text", null, vue.toDisplayString(item.date), 1),
                    vue.createElementVNode("text", {
                      class: vue.normalizeClass(index == vue.unref(curIndex) ? "selected" : "")
                    }, vue.toDisplayString(item.week), 3),
                    vue.createElementVNode("text", null, vue.toDisplayString(item.nu_source == 1 ? "\u53EF\u7EA6" : "\u65E0\u53F7"), 1)
                  ])
                ], 8, ["onClick"]);
              }), 128))
            ])
          ]),
          vue.createCommentVNode(" \u9AD8\u5EA6 "),
          vue.createElementVNode("view", { style: { "height": "170rpx" } }),
          vue.createCommentVNode(" \u533B\u751F\u9884\u7EA6 "),
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(doctor_list.value, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "doctor",
              key: index,
              onClick: ($event) => jumpRoute(item._id)
            }, [
              vue.createElementVNode("view", { class: "doctor-l" }, [
                vue.createElementVNode("image", {
                  src: item.avatar,
                  mode: "aspectFill"
                }, null, 8, ["src"]),
                vue.createElementVNode("view", { class: "desc" }, [
                  vue.createElementVNode("text", { class: "text-black" }, vue.toDisplayString(item.name), 1),
                  vue.createElementVNode("text", null, vue.toDisplayString(item.post), 1),
                  vue.createElementVNode("text", null, vue.toDisplayString(item.good_at), 1)
                ])
              ]),
              vue.createElementVNode("view", { class: "doctor-r" }, [
                vue.createElementVNode("text", { class: "reserve" }, "\u9884\u7EA6")
              ])
            ], 8, ["onClick"]);
          }), 128)),
          vue.createVNode(Point, {
            show: show.value,
            title: title.value
          }, null, 8, ["show", "title"]),
          s_show.value ? (vue.openBlock(), vue.createBlock(Skeleton$8, { key: 0 })) : vue.createCommentVNode("v-if", true)
        ], 64);
      };
    }
  });
  var PagesDoctorIndex = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/pages/doctor/index.vue"]]);
  var isVue2 = false;
  function set(target, key, val) {
    if (Array.isArray(target)) {
      target.length = Math.max(target.length, key);
      target.splice(key, 1, val);
      return val;
    }
    target[key] = val;
    return val;
  }
  function del(target, key) {
    if (Array.isArray(target)) {
      target.splice(key, 1);
      return;
    }
    delete target[key];
  }
  function getDevtoolsGlobalHook() {
    return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
  }
  function getTarget() {
    return typeof navigator !== "undefined" && typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {};
  }
  const isProxyAvailable = typeof Proxy === "function";
  const HOOK_SETUP = "devtools-plugin:setup";
  const HOOK_PLUGIN_SETTINGS_SET = "plugin:settings:set";
  let supported;
  let perf;
  function isPerformanceSupported() {
    var _a;
    if (supported !== void 0) {
      return supported;
    }
    if (typeof window !== "undefined" && window.performance) {
      supported = true;
      perf = window.performance;
    } else if (typeof global !== "undefined" && ((_a = global.perf_hooks) === null || _a === void 0 ? void 0 : _a.performance)) {
      supported = true;
      perf = global.perf_hooks.performance;
    } else {
      supported = false;
    }
    return supported;
  }
  function now() {
    return isPerformanceSupported() ? perf.now() : Date.now();
  }
  class ApiProxy {
    constructor(plugin, hook) {
      this.target = null;
      this.targetQueue = [];
      this.onQueue = [];
      this.plugin = plugin;
      this.hook = hook;
      const defaultSettings = {};
      if (plugin.settings) {
        for (const id in plugin.settings) {
          const item = plugin.settings[id];
          defaultSettings[id] = item.defaultValue;
        }
      }
      const localSettingsSaveId = `__vue-devtools-plugin-settings__${plugin.id}`;
      let currentSettings = Object.assign({}, defaultSettings);
      try {
        const raw = localStorage.getItem(localSettingsSaveId);
        const data = JSON.parse(raw);
        Object.assign(currentSettings, data);
      } catch (e) {
      }
      this.fallbacks = {
        getSettings() {
          return currentSettings;
        },
        setSettings(value) {
          try {
            localStorage.setItem(localSettingsSaveId, JSON.stringify(value));
          } catch (e) {
          }
          currentSettings = value;
        },
        now() {
          return now();
        }
      };
      if (hook) {
        hook.on(HOOK_PLUGIN_SETTINGS_SET, (pluginId, value) => {
          if (pluginId === this.plugin.id) {
            this.fallbacks.setSettings(value);
          }
        });
      }
      this.proxiedOn = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target.on[prop];
          } else {
            return (...args) => {
              this.onQueue.push({
                method: prop,
                args
              });
            };
          }
        }
      });
      this.proxiedTarget = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target[prop];
          } else if (prop === "on") {
            return this.proxiedOn;
          } else if (Object.keys(this.fallbacks).includes(prop)) {
            return (...args) => {
              this.targetQueue.push({
                method: prop,
                args,
                resolve: () => {
                }
              });
              return this.fallbacks[prop](...args);
            };
          } else {
            return (...args) => {
              return new Promise((resolve) => {
                this.targetQueue.push({
                  method: prop,
                  args,
                  resolve
                });
              });
            };
          }
        }
      });
    }
    async setRealTarget(target) {
      this.target = target;
      for (const item of this.onQueue) {
        this.target.on[item.method](...item.args);
      }
      for (const item of this.targetQueue) {
        item.resolve(await this.target[item.method](...item.args));
      }
    }
  }
  function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
    const descriptor = pluginDescriptor;
    const target = getTarget();
    const hook = getDevtoolsGlobalHook();
    const enableProxy = isProxyAvailable && descriptor.enableEarlyProxy;
    if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
      hook.emit(HOOK_SETUP, pluginDescriptor, setupFn);
    } else {
      const proxy = enableProxy ? new ApiProxy(descriptor, hook) : null;
      const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
      list.push({
        pluginDescriptor: descriptor,
        setupFn,
        proxy
      });
      if (proxy)
        setupFn(proxy.proxiedTarget);
    }
  }
  /*!
    * pinia v2.0.36
    * (c) 2023 Eduardo San Martin Morote
    * @license MIT
    */
  let activePinia;
  const setActivePinia = (pinia2) => activePinia = pinia2;
  const piniaSymbol = Symbol("pinia");
  function isPlainObject(o) {
    return o && typeof o === "object" && Object.prototype.toString.call(o) === "[object Object]" && typeof o.toJSON !== "function";
  }
  var MutationType;
  (function(MutationType2) {
    MutationType2["direct"] = "direct";
    MutationType2["patchObject"] = "patch object";
    MutationType2["patchFunction"] = "patch function";
  })(MutationType || (MutationType = {}));
  const IS_CLIENT = typeof window !== "undefined";
  const USE_DEVTOOLS = IS_CLIENT;
  const _global = /* @__PURE__ */ (() => typeof window === "object" && window.window === window ? window : typeof self === "object" && self.self === self ? self : typeof global === "object" && global.global === global ? global : typeof globalThis === "object" ? globalThis : { HTMLElement: null })();
  function bom(blob, { autoBom = false } = {}) {
    if (autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
      return new Blob([String.fromCharCode(65279), blob], { type: blob.type });
    }
    return blob;
  }
  function download(url, name, opts) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.onload = function() {
      saveAs(xhr.response, name, opts);
    };
    xhr.onerror = function() {
      console.error("could not download file");
    };
    xhr.send();
  }
  function corsEnabled(url) {
    const xhr = new XMLHttpRequest();
    xhr.open("HEAD", url, false);
    try {
      xhr.send();
    } catch (e) {
    }
    return xhr.status >= 200 && xhr.status <= 299;
  }
  function click(node) {
    try {
      node.dispatchEvent(new MouseEvent("click"));
    } catch (e) {
      const evt = document.createEvent("MouseEvents");
      evt.initMouseEvent("click", true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
      node.dispatchEvent(evt);
    }
  }
  const _navigator = typeof navigator === "object" ? navigator : { userAgent: "" };
  const isMacOSWebView = /* @__PURE__ */ (() => /Macintosh/.test(_navigator.userAgent) && /AppleWebKit/.test(_navigator.userAgent) && !/Safari/.test(_navigator.userAgent))();
  const saveAs = !IS_CLIENT ? () => {
  } : typeof HTMLAnchorElement !== "undefined" && "download" in HTMLAnchorElement.prototype && !isMacOSWebView ? downloadSaveAs : "msSaveOrOpenBlob" in _navigator ? msSaveAs : fileSaverSaveAs;
  function downloadSaveAs(blob, name = "download", opts) {
    const a = document.createElement("a");
    a.download = name;
    a.rel = "noopener";
    if (typeof blob === "string") {
      a.href = blob;
      if (a.origin !== location.origin) {
        if (corsEnabled(a.href)) {
          download(blob, name, opts);
        } else {
          a.target = "_blank";
          click(a);
        }
      } else {
        click(a);
      }
    } else {
      a.href = URL.createObjectURL(blob);
      setTimeout(function() {
        URL.revokeObjectURL(a.href);
      }, 4e4);
      setTimeout(function() {
        click(a);
      }, 0);
    }
  }
  function msSaveAs(blob, name = "download", opts) {
    if (typeof blob === "string") {
      if (corsEnabled(blob)) {
        download(blob, name, opts);
      } else {
        const a = document.createElement("a");
        a.href = blob;
        a.target = "_blank";
        setTimeout(function() {
          click(a);
        });
      }
    } else {
      navigator.msSaveOrOpenBlob(bom(blob, opts), name);
    }
  }
  function fileSaverSaveAs(blob, name, opts, popup) {
    popup = popup || open("", "_blank");
    if (popup) {
      popup.document.title = popup.document.body.innerText = "downloading...";
    }
    if (typeof blob === "string")
      return download(blob, name, opts);
    const force = blob.type === "application/octet-stream";
    const isSafari = /constructor/i.test(String(_global.HTMLElement)) || "safari" in _global;
    const isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent);
    if ((isChromeIOS || force && isSafari || isMacOSWebView) && typeof FileReader !== "undefined") {
      const reader = new FileReader();
      reader.onloadend = function() {
        let url = reader.result;
        if (typeof url !== "string") {
          popup = null;
          throw new Error("Wrong reader.result type");
        }
        url = isChromeIOS ? url : url.replace(/^data:[^;]*;/, "data:attachment/file;");
        if (popup) {
          popup.location.href = url;
        } else {
          location.assign(url);
        }
        popup = null;
      };
      reader.readAsDataURL(blob);
    } else {
      const url = URL.createObjectURL(blob);
      if (popup)
        popup.location.assign(url);
      else
        location.href = url;
      popup = null;
      setTimeout(function() {
        URL.revokeObjectURL(url);
      }, 4e4);
    }
  }
  function toastMessage(message, type) {
    const piniaMessage = "\u{1F34D} " + message;
    if (typeof __VUE_DEVTOOLS_TOAST__ === "function") {
      __VUE_DEVTOOLS_TOAST__(piniaMessage, type);
    } else if (type === "error") {
      console.error(piniaMessage);
    } else if (type === "warn") {
      console.warn(piniaMessage);
    } else {
      console.log(piniaMessage);
    }
  }
  function isPinia(o) {
    return "_a" in o && "install" in o;
  }
  function checkClipboardAccess() {
    if (!("clipboard" in navigator)) {
      toastMessage(`Your browser doesn't support the Clipboard API`, "error");
      return true;
    }
  }
  function checkNotFocusedError(error) {
    if (error instanceof Error && error.message.toLowerCase().includes("document is not focused")) {
      toastMessage('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn");
      return true;
    }
    return false;
  }
  async function actionGlobalCopyState(pinia2) {
    if (checkClipboardAccess())
      return;
    try {
      await navigator.clipboard.writeText(JSON.stringify(pinia2.state.value));
      toastMessage("Global state copied to clipboard.");
    } catch (error) {
      if (checkNotFocusedError(error))
        return;
      toastMessage(`Failed to serialize the state. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  async function actionGlobalPasteState(pinia2) {
    if (checkClipboardAccess())
      return;
    try {
      pinia2.state.value = JSON.parse(await navigator.clipboard.readText());
      toastMessage("Global state pasted from clipboard.");
    } catch (error) {
      if (checkNotFocusedError(error))
        return;
      toastMessage(`Failed to deserialize the state from clipboard. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  async function actionGlobalSaveState(pinia2) {
    try {
      saveAs(new Blob([JSON.stringify(pinia2.state.value)], {
        type: "text/plain;charset=utf-8"
      }), "pinia-state.json");
    } catch (error) {
      toastMessage(`Failed to export the state as JSON. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  let fileInput;
  function getFileOpener() {
    if (!fileInput) {
      fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = ".json";
    }
    function openFile() {
      return new Promise((resolve, reject) => {
        fileInput.onchange = async () => {
          const files = fileInput.files;
          if (!files)
            return resolve(null);
          const file = files.item(0);
          if (!file)
            return resolve(null);
          return resolve({ text: await file.text(), file });
        };
        fileInput.oncancel = () => resolve(null);
        fileInput.onerror = reject;
        fileInput.click();
      });
    }
    return openFile;
  }
  async function actionGlobalOpenStateFile(pinia2) {
    try {
      const open2 = await getFileOpener();
      const result = await open2();
      if (!result)
        return;
      const { text, file } = result;
      pinia2.state.value = JSON.parse(text);
      toastMessage(`Global state imported from "${file.name}".`);
    } catch (error) {
      toastMessage(`Failed to export the state as JSON. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  function formatDisplay(display) {
    return {
      _custom: {
        display
      }
    };
  }
  const PINIA_ROOT_LABEL = "\u{1F34D} Pinia (root)";
  const PINIA_ROOT_ID = "_root";
  function formatStoreForInspectorTree(store) {
    return isPinia(store) ? {
      id: PINIA_ROOT_ID,
      label: PINIA_ROOT_LABEL
    } : {
      id: store.$id,
      label: store.$id
    };
  }
  function formatStoreForInspectorState(store) {
    if (isPinia(store)) {
      const storeNames = Array.from(store._s.keys());
      const storeMap = store._s;
      const state2 = {
        state: storeNames.map((storeId) => ({
          editable: true,
          key: storeId,
          value: store.state.value[storeId]
        })),
        getters: storeNames.filter((id) => storeMap.get(id)._getters).map((id) => {
          const store2 = storeMap.get(id);
          return {
            editable: false,
            key: id,
            value: store2._getters.reduce((getters, key) => {
              getters[key] = store2[key];
              return getters;
            }, {})
          };
        })
      };
      return state2;
    }
    const state = {
      state: Object.keys(store.$state).map((key) => ({
        editable: true,
        key,
        value: store.$state[key]
      }))
    };
    if (store._getters && store._getters.length) {
      state.getters = store._getters.map((getterName) => ({
        editable: false,
        key: getterName,
        value: store[getterName]
      }));
    }
    if (store._customProperties.size) {
      state.customProperties = Array.from(store._customProperties).map((key) => ({
        editable: true,
        key,
        value: store[key]
      }));
    }
    return state;
  }
  function formatEventData(events) {
    if (!events)
      return {};
    if (Array.isArray(events)) {
      return events.reduce((data, event) => {
        data.keys.push(event.key);
        data.operations.push(event.type);
        data.oldValue[event.key] = event.oldValue;
        data.newValue[event.key] = event.newValue;
        return data;
      }, {
        oldValue: {},
        keys: [],
        operations: [],
        newValue: {}
      });
    } else {
      return {
        operation: formatDisplay(events.type),
        key: formatDisplay(events.key),
        oldValue: events.oldValue,
        newValue: events.newValue
      };
    }
  }
  function formatMutationType(type) {
    switch (type) {
      case MutationType.direct:
        return "mutation";
      case MutationType.patchFunction:
        return "$patch";
      case MutationType.patchObject:
        return "$patch";
      default:
        return "unknown";
    }
  }
  let isTimelineActive = true;
  const componentStateTypes = [];
  const MUTATIONS_LAYER_ID = "pinia:mutations";
  const INSPECTOR_ID = "pinia";
  const { assign: assign$1 } = Object;
  const getStoreType = (id) => "\u{1F34D} " + id;
  function registerPiniaDevtools(app, pinia2) {
    setupDevtoolsPlugin({
      id: "dev.esm.pinia",
      label: "Pinia \u{1F34D}",
      logo: "https://pinia.vuejs.org/logo.svg",
      packageName: "pinia",
      homepage: "https://pinia.vuejs.org",
      componentStateTypes,
      app
    }, (api) => {
      if (typeof api.now !== "function") {
        toastMessage("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html.");
      }
      api.addTimelineLayer({
        id: MUTATIONS_LAYER_ID,
        label: `Pinia \u{1F34D}`,
        color: 15064968
      });
      api.addInspector({
        id: INSPECTOR_ID,
        label: "Pinia \u{1F34D}",
        icon: "storage",
        treeFilterPlaceholder: "Search stores",
        actions: [
          {
            icon: "content_copy",
            action: () => {
              actionGlobalCopyState(pinia2);
            },
            tooltip: "Serialize and copy the state"
          },
          {
            icon: "content_paste",
            action: async () => {
              await actionGlobalPasteState(pinia2);
              api.sendInspectorTree(INSPECTOR_ID);
              api.sendInspectorState(INSPECTOR_ID);
            },
            tooltip: "Replace the state with the content of your clipboard"
          },
          {
            icon: "save",
            action: () => {
              actionGlobalSaveState(pinia2);
            },
            tooltip: "Save the state as a JSON file"
          },
          {
            icon: "folder_open",
            action: async () => {
              await actionGlobalOpenStateFile(pinia2);
              api.sendInspectorTree(INSPECTOR_ID);
              api.sendInspectorState(INSPECTOR_ID);
            },
            tooltip: "Import the state from a JSON file"
          }
        ],
        nodeActions: [
          {
            icon: "restore",
            tooltip: "Reset the state (option store only)",
            action: (nodeId) => {
              const store = pinia2._s.get(nodeId);
              if (!store) {
                toastMessage(`Cannot reset "${nodeId}" store because it wasn't found.`, "warn");
              } else if (!store._isOptionsAPI) {
                toastMessage(`Cannot reset "${nodeId}" store because it's a setup store.`, "warn");
              } else {
                store.$reset();
                toastMessage(`Store "${nodeId}" reset.`);
              }
            }
          }
        ]
      });
      api.on.inspectComponent((payload, ctx) => {
        const proxy = payload.componentInstance && payload.componentInstance.proxy;
        if (proxy && proxy._pStores) {
          const piniaStores = payload.componentInstance.proxy._pStores;
          Object.values(piniaStores).forEach((store) => {
            payload.instanceData.state.push({
              type: getStoreType(store.$id),
              key: "state",
              editable: true,
              value: store._isOptionsAPI ? {
                _custom: {
                  value: vue.toRaw(store.$state),
                  actions: [
                    {
                      icon: "restore",
                      tooltip: "Reset the state of this store",
                      action: () => store.$reset()
                    }
                  ]
                }
              } : Object.keys(store.$state).reduce((state, key) => {
                state[key] = store.$state[key];
                return state;
              }, {})
            });
            if (store._getters && store._getters.length) {
              payload.instanceData.state.push({
                type: getStoreType(store.$id),
                key: "getters",
                editable: false,
                value: store._getters.reduce((getters, key) => {
                  try {
                    getters[key] = store[key];
                  } catch (error) {
                    getters[key] = error;
                  }
                  return getters;
                }, {})
              });
            }
          });
        }
      });
      api.on.getInspectorTree((payload) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          let stores = [pinia2];
          stores = stores.concat(Array.from(pinia2._s.values()));
          payload.rootNodes = (payload.filter ? stores.filter((store) => "$id" in store ? store.$id.toLowerCase().includes(payload.filter.toLowerCase()) : PINIA_ROOT_LABEL.toLowerCase().includes(payload.filter.toLowerCase())) : stores).map(formatStoreForInspectorTree);
        }
      });
      api.on.getInspectorState((payload) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia2 : pinia2._s.get(payload.nodeId);
          if (!inspectedStore) {
            return;
          }
          if (inspectedStore) {
            payload.state = formatStoreForInspectorState(inspectedStore);
          }
        }
      });
      api.on.editInspectorState((payload, ctx) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia2 : pinia2._s.get(payload.nodeId);
          if (!inspectedStore) {
            return toastMessage(`store "${payload.nodeId}" not found`, "error");
          }
          const { path } = payload;
          if (!isPinia(inspectedStore)) {
            if (path.length !== 1 || !inspectedStore._customProperties.has(path[0]) || path[0] in inspectedStore.$state) {
              path.unshift("$state");
            }
          } else {
            path.unshift("state");
          }
          isTimelineActive = false;
          payload.set(inspectedStore, path, payload.state.value);
          isTimelineActive = true;
        }
      });
      api.on.editComponentState((payload) => {
        if (payload.type.startsWith("\u{1F34D}")) {
          const storeId = payload.type.replace(/^🍍\s*/, "");
          const store = pinia2._s.get(storeId);
          if (!store) {
            return toastMessage(`store "${storeId}" not found`, "error");
          }
          const { path } = payload;
          if (path[0] !== "state") {
            return toastMessage(`Invalid path for store "${storeId}":
${path}
Only state can be modified.`);
          }
          path[0] = "$state";
          isTimelineActive = false;
          payload.set(store, path, payload.state.value);
          isTimelineActive = true;
        }
      });
    });
  }
  function addStoreToDevtools(app, store) {
    if (!componentStateTypes.includes(getStoreType(store.$id))) {
      componentStateTypes.push(getStoreType(store.$id));
    }
    setupDevtoolsPlugin({
      id: "dev.esm.pinia",
      label: "Pinia \u{1F34D}",
      logo: "https://pinia.vuejs.org/logo.svg",
      packageName: "pinia",
      homepage: "https://pinia.vuejs.org",
      componentStateTypes,
      app,
      settings: {
        logStoreChanges: {
          label: "Notify about new/deleted stores",
          type: "boolean",
          defaultValue: true
        }
      }
    }, (api) => {
      const now2 = typeof api.now === "function" ? api.now.bind(api) : Date.now;
      store.$onAction(({ after, onError, name, args }) => {
        const groupId = runningActionId++;
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now2(),
            title: "\u{1F6EB} " + name,
            subtitle: "start",
            data: {
              store: formatDisplay(store.$id),
              action: formatDisplay(name),
              args
            },
            groupId
          }
        });
        after((result) => {
          activeAction = void 0;
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: now2(),
              title: "\u{1F6EC} " + name,
              subtitle: "end",
              data: {
                store: formatDisplay(store.$id),
                action: formatDisplay(name),
                args,
                result
              },
              groupId
            }
          });
        });
        onError((error) => {
          activeAction = void 0;
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: now2(),
              logType: "error",
              title: "\u{1F4A5} " + name,
              subtitle: "end",
              data: {
                store: formatDisplay(store.$id),
                action: formatDisplay(name),
                args,
                error
              },
              groupId
            }
          });
        });
      }, true);
      store._customProperties.forEach((name) => {
        vue.watch(() => vue.unref(store[name]), (newValue, oldValue) => {
          api.notifyComponentUpdate();
          api.sendInspectorState(INSPECTOR_ID);
          if (isTimelineActive) {
            api.addTimelineEvent({
              layerId: MUTATIONS_LAYER_ID,
              event: {
                time: now2(),
                title: "Change",
                subtitle: name,
                data: {
                  newValue,
                  oldValue
                },
                groupId: activeAction
              }
            });
          }
        }, { deep: true });
      });
      store.$subscribe(({ events, type }, state) => {
        api.notifyComponentUpdate();
        api.sendInspectorState(INSPECTOR_ID);
        if (!isTimelineActive)
          return;
        const eventData = {
          time: now2(),
          title: formatMutationType(type),
          data: assign$1({ store: formatDisplay(store.$id) }, formatEventData(events)),
          groupId: activeAction
        };
        activeAction = void 0;
        if (type === MutationType.patchFunction) {
          eventData.subtitle = "\u2935\uFE0F";
        } else if (type === MutationType.patchObject) {
          eventData.subtitle = "\u{1F9E9}";
        } else if (events && !Array.isArray(events)) {
          eventData.subtitle = events.type;
        }
        if (events) {
          eventData.data["rawEvent(s)"] = {
            _custom: {
              display: "DebuggerEvent",
              type: "object",
              tooltip: "raw DebuggerEvent[]",
              value: events
            }
          };
        }
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: eventData
        });
      }, { detached: true, flush: "sync" });
      const hotUpdate = store._hotUpdate;
      store._hotUpdate = vue.markRaw((newStore) => {
        hotUpdate(newStore);
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now2(),
            title: "\u{1F525} " + store.$id,
            subtitle: "HMR update",
            data: {
              store: formatDisplay(store.$id),
              info: formatDisplay(`HMR update`)
            }
          }
        });
        api.notifyComponentUpdate();
        api.sendInspectorTree(INSPECTOR_ID);
        api.sendInspectorState(INSPECTOR_ID);
      });
      const { $dispose } = store;
      store.$dispose = () => {
        $dispose();
        api.notifyComponentUpdate();
        api.sendInspectorTree(INSPECTOR_ID);
        api.sendInspectorState(INSPECTOR_ID);
        api.getSettings().logStoreChanges && toastMessage(`Disposed "${store.$id}" store \u{1F5D1}`);
      };
      api.notifyComponentUpdate();
      api.sendInspectorTree(INSPECTOR_ID);
      api.sendInspectorState(INSPECTOR_ID);
      api.getSettings().logStoreChanges && toastMessage(`"${store.$id}" store installed \u{1F195}`);
    });
  }
  let runningActionId = 0;
  let activeAction;
  function patchActionForGrouping(store, actionNames) {
    const actions = actionNames.reduce((storeActions, actionName) => {
      storeActions[actionName] = vue.toRaw(store)[actionName];
      return storeActions;
    }, {});
    for (const actionName in actions) {
      store[actionName] = function() {
        const _actionId = runningActionId;
        const trackedStore = new Proxy(store, {
          get(...args) {
            activeAction = _actionId;
            return Reflect.get(...args);
          },
          set(...args) {
            activeAction = _actionId;
            return Reflect.set(...args);
          }
        });
        return actions[actionName].apply(trackedStore, arguments);
      };
    }
  }
  function devtoolsPlugin({ app, store, options }) {
    if (store.$id.startsWith("__hot:")) {
      return;
    }
    if (options.state) {
      store._isOptionsAPI = true;
    }
    if (typeof options.state === "function") {
      patchActionForGrouping(
        store,
        Object.keys(options.actions)
      );
      const originalHotUpdate = store._hotUpdate;
      vue.toRaw(store)._hotUpdate = function(newStore) {
        originalHotUpdate.apply(this, arguments);
        patchActionForGrouping(store, Object.keys(newStore._hmrPayload.actions));
      };
    }
    addStoreToDevtools(
      app,
      store
    );
  }
  function createPinia() {
    const scope = vue.effectScope(true);
    const state = scope.run(() => vue.ref({}));
    let _p = [];
    let toBeInstalled = [];
    const pinia2 = vue.markRaw({
      install(app) {
        setActivePinia(pinia2);
        {
          pinia2._a = app;
          app.provide(piniaSymbol, pinia2);
          app.config.globalProperties.$pinia = pinia2;
          if (USE_DEVTOOLS) {
            registerPiniaDevtools(app, pinia2);
          }
          toBeInstalled.forEach((plugin) => _p.push(plugin));
          toBeInstalled = [];
        }
      },
      use(plugin) {
        if (!this._a && !isVue2) {
          toBeInstalled.push(plugin);
        } else {
          _p.push(plugin);
        }
        return this;
      },
      _p,
      _a: null,
      _e: scope,
      _s: /* @__PURE__ */ new Map(),
      state
    });
    if (USE_DEVTOOLS && typeof Proxy !== "undefined") {
      pinia2.use(devtoolsPlugin);
    }
    return pinia2;
  }
  function patchObject(newState, oldState) {
    for (const key in oldState) {
      const subPatch = oldState[key];
      if (!(key in newState)) {
        continue;
      }
      const targetValue = newState[key];
      if (isPlainObject(targetValue) && isPlainObject(subPatch) && !vue.isRef(subPatch) && !vue.isReactive(subPatch)) {
        newState[key] = patchObject(targetValue, subPatch);
      } else {
        {
          newState[key] = subPatch;
        }
      }
    }
    return newState;
  }
  const noop = () => {
  };
  function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
    subscriptions.push(callback);
    const removeSubscription = () => {
      const idx = subscriptions.indexOf(callback);
      if (idx > -1) {
        subscriptions.splice(idx, 1);
        onCleanup();
      }
    };
    if (!detached && vue.getCurrentScope()) {
      vue.onScopeDispose(removeSubscription);
    }
    return removeSubscription;
  }
  function triggerSubscriptions(subscriptions, ...args) {
    subscriptions.slice().forEach((callback) => {
      callback(...args);
    });
  }
  function mergeReactiveObjects(target, patchToApply) {
    if (target instanceof Map && patchToApply instanceof Map) {
      patchToApply.forEach((value, key) => target.set(key, value));
    }
    if (target instanceof Set && patchToApply instanceof Set) {
      patchToApply.forEach(target.add, target);
    }
    for (const key in patchToApply) {
      if (!patchToApply.hasOwnProperty(key))
        continue;
      const subPatch = patchToApply[key];
      const targetValue = target[key];
      if (isPlainObject(targetValue) && isPlainObject(subPatch) && target.hasOwnProperty(key) && !vue.isRef(subPatch) && !vue.isReactive(subPatch)) {
        target[key] = mergeReactiveObjects(targetValue, subPatch);
      } else {
        target[key] = subPatch;
      }
    }
    return target;
  }
  const skipHydrateSymbol = Symbol("pinia:skipHydration");
  function shouldHydrate(obj) {
    return !isPlainObject(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
  }
  const { assign } = Object;
  function isComputed(o) {
    return !!(vue.isRef(o) && o.effect);
  }
  function createOptionsStore(id, options, pinia2, hot) {
    const { state, actions, getters } = options;
    const initialState = pinia2.state.value[id];
    let store;
    function setup() {
      if (!initialState && !hot) {
        {
          pinia2.state.value[id] = state ? state() : {};
        }
      }
      const localState = hot ? vue.toRefs(vue.ref(state ? state() : {}).value) : vue.toRefs(pinia2.state.value[id]);
      return assign(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
        if (name in localState) {
          console.warn(`[\u{1F34D}]: A getter cannot have the same name as another state property. Rename one of them. Found with "${name}" in store "${id}".`);
        }
        computedGetters[name] = vue.markRaw(vue.computed(() => {
          setActivePinia(pinia2);
          const store2 = pinia2._s.get(id);
          return getters[name].call(store2, store2);
        }));
        return computedGetters;
      }, {}));
    }
    store = createSetupStore(id, setup, options, pinia2, hot, true);
    return store;
  }
  function createSetupStore($id, setup, options = {}, pinia2, hot, isOptionsStore) {
    let scope;
    const optionsForPlugin = assign({ actions: {} }, options);
    if (!pinia2._e.active) {
      throw new Error("Pinia destroyed");
    }
    const $subscribeOptions = {
      deep: true
    };
    {
      $subscribeOptions.onTrigger = (event) => {
        if (isListening) {
          debuggerEvents = event;
        } else if (isListening == false && !store._hotUpdating) {
          if (Array.isArray(debuggerEvents)) {
            debuggerEvents.push(event);
          } else {
            console.error("\u{1F34D} debuggerEvents should be an array. This is most likely an internal Pinia bug.");
          }
        }
      };
    }
    let isListening;
    let isSyncListening;
    let subscriptions = vue.markRaw([]);
    let actionSubscriptions = vue.markRaw([]);
    let debuggerEvents;
    const initialState = pinia2.state.value[$id];
    if (!isOptionsStore && !initialState && !hot) {
      {
        pinia2.state.value[$id] = {};
      }
    }
    const hotState = vue.ref({});
    let activeListener;
    function $patch(partialStateOrMutator) {
      let subscriptionMutation;
      isListening = isSyncListening = false;
      {
        debuggerEvents = [];
      }
      if (typeof partialStateOrMutator === "function") {
        partialStateOrMutator(pinia2.state.value[$id]);
        subscriptionMutation = {
          type: MutationType.patchFunction,
          storeId: $id,
          events: debuggerEvents
        };
      } else {
        mergeReactiveObjects(pinia2.state.value[$id], partialStateOrMutator);
        subscriptionMutation = {
          type: MutationType.patchObject,
          payload: partialStateOrMutator,
          storeId: $id,
          events: debuggerEvents
        };
      }
      const myListenerId = activeListener = Symbol();
      vue.nextTick().then(() => {
        if (activeListener === myListenerId) {
          isListening = true;
        }
      });
      isSyncListening = true;
      triggerSubscriptions(subscriptions, subscriptionMutation, pinia2.state.value[$id]);
    }
    const $reset = isOptionsStore ? function $reset2() {
      const { state } = options;
      const newState = state ? state() : {};
      this.$patch(($state) => {
        assign($state, newState);
      });
    } : () => {
      throw new Error(`\u{1F34D}: Store "${$id}" is built using the setup syntax and does not implement $reset().`);
    };
    function $dispose() {
      scope.stop();
      subscriptions = [];
      actionSubscriptions = [];
      pinia2._s.delete($id);
    }
    function wrapAction(name, action) {
      return function() {
        setActivePinia(pinia2);
        const args = Array.from(arguments);
        const afterCallbackList = [];
        const onErrorCallbackList = [];
        function after(callback) {
          afterCallbackList.push(callback);
        }
        function onError(callback) {
          onErrorCallbackList.push(callback);
        }
        triggerSubscriptions(actionSubscriptions, {
          args,
          name,
          store,
          after,
          onError
        });
        let ret;
        try {
          ret = action.apply(this && this.$id === $id ? this : store, args);
        } catch (error) {
          triggerSubscriptions(onErrorCallbackList, error);
          throw error;
        }
        if (ret instanceof Promise) {
          return ret.then((value) => {
            triggerSubscriptions(afterCallbackList, value);
            return value;
          }).catch((error) => {
            triggerSubscriptions(onErrorCallbackList, error);
            return Promise.reject(error);
          });
        }
        triggerSubscriptions(afterCallbackList, ret);
        return ret;
      };
    }
    const _hmrPayload = /* @__PURE__ */ vue.markRaw({
      actions: {},
      getters: {},
      state: [],
      hotState
    });
    const partialStore = {
      _p: pinia2,
      $id,
      $onAction: addSubscription.bind(null, actionSubscriptions),
      $patch,
      $reset,
      $subscribe(callback, options2 = {}) {
        const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
        const stopWatcher = scope.run(() => vue.watch(() => pinia2.state.value[$id], (state) => {
          if (options2.flush === "sync" ? isSyncListening : isListening) {
            callback({
              storeId: $id,
              type: MutationType.direct,
              events: debuggerEvents
            }, state);
          }
        }, assign({}, $subscribeOptions, options2)));
        return removeSubscription;
      },
      $dispose
    };
    const store = vue.reactive(
      assign(
        {
          _hmrPayload,
          _customProperties: vue.markRaw(/* @__PURE__ */ new Set())
        },
        partialStore
      )
    );
    pinia2._s.set($id, store);
    const setupStore = pinia2._e.run(() => {
      scope = vue.effectScope();
      return scope.run(() => setup());
    });
    for (const key in setupStore) {
      const prop = setupStore[key];
      if (vue.isRef(prop) && !isComputed(prop) || vue.isReactive(prop)) {
        if (hot) {
          set(hotState.value, key, vue.toRef(setupStore, key));
        } else if (!isOptionsStore) {
          if (initialState && shouldHydrate(prop)) {
            if (vue.isRef(prop)) {
              prop.value = initialState[key];
            } else {
              mergeReactiveObjects(prop, initialState[key]);
            }
          }
          {
            pinia2.state.value[$id][key] = prop;
          }
        }
        {
          _hmrPayload.state.push(key);
        }
      } else if (typeof prop === "function") {
        const actionValue = hot ? prop : wrapAction(key, prop);
        {
          setupStore[key] = actionValue;
        }
        {
          _hmrPayload.actions[key] = prop;
        }
        optionsForPlugin.actions[key] = prop;
      } else {
        if (isComputed(prop)) {
          _hmrPayload.getters[key] = isOptionsStore ? options.getters[key] : prop;
          if (IS_CLIENT) {
            const getters = setupStore._getters || (setupStore._getters = vue.markRaw([]));
            getters.push(key);
          }
        }
      }
    }
    {
      assign(store, setupStore);
      assign(vue.toRaw(store), setupStore);
    }
    Object.defineProperty(store, "$state", {
      get: () => hot ? hotState.value : pinia2.state.value[$id],
      set: (state) => {
        if (hot) {
          throw new Error("cannot set hotState");
        }
        $patch(($state) => {
          assign($state, state);
        });
      }
    });
    {
      store._hotUpdate = vue.markRaw((newStore) => {
        store._hotUpdating = true;
        newStore._hmrPayload.state.forEach((stateKey) => {
          if (stateKey in store.$state) {
            const newStateTarget = newStore.$state[stateKey];
            const oldStateSource = store.$state[stateKey];
            if (typeof newStateTarget === "object" && isPlainObject(newStateTarget) && isPlainObject(oldStateSource)) {
              patchObject(newStateTarget, oldStateSource);
            } else {
              newStore.$state[stateKey] = oldStateSource;
            }
          }
          set(store, stateKey, vue.toRef(newStore.$state, stateKey));
        });
        Object.keys(store.$state).forEach((stateKey) => {
          if (!(stateKey in newStore.$state)) {
            del(store, stateKey);
          }
        });
        isListening = false;
        isSyncListening = false;
        pinia2.state.value[$id] = vue.toRef(newStore._hmrPayload, "hotState");
        isSyncListening = true;
        vue.nextTick().then(() => {
          isListening = true;
        });
        for (const actionName in newStore._hmrPayload.actions) {
          const action = newStore[actionName];
          set(store, actionName, wrapAction(actionName, action));
        }
        for (const getterName in newStore._hmrPayload.getters) {
          const getter = newStore._hmrPayload.getters[getterName];
          const getterValue = isOptionsStore ? vue.computed(() => {
            setActivePinia(pinia2);
            return getter.call(store, store);
          }) : getter;
          set(store, getterName, getterValue);
        }
        Object.keys(store._hmrPayload.getters).forEach((key) => {
          if (!(key in newStore._hmrPayload.getters)) {
            del(store, key);
          }
        });
        Object.keys(store._hmrPayload.actions).forEach((key) => {
          if (!(key in newStore._hmrPayload.actions)) {
            del(store, key);
          }
        });
        store._hmrPayload = newStore._hmrPayload;
        store._getters = newStore._getters;
        store._hotUpdating = false;
      });
    }
    if (USE_DEVTOOLS) {
      const nonEnumerable = {
        writable: true,
        configurable: true,
        enumerable: false
      };
      ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((p) => {
        Object.defineProperty(store, p, assign({ value: store[p] }, nonEnumerable));
      });
    }
    pinia2._p.forEach((extender) => {
      if (USE_DEVTOOLS) {
        const extensions = scope.run(() => extender({
          store,
          app: pinia2._a,
          pinia: pinia2,
          options: optionsForPlugin
        }));
        Object.keys(extensions || {}).forEach((key) => store._customProperties.add(key));
        assign(store, extensions);
      } else {
        assign(store, scope.run(() => extender({
          store,
          app: pinia2._a,
          pinia: pinia2,
          options: optionsForPlugin
        })));
      }
    });
    if (store.$state && typeof store.$state === "object" && typeof store.$state.constructor === "function" && !store.$state.constructor.toString().includes("[native code]")) {
      console.warn(`[\u{1F34D}]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${store.$id}".`);
    }
    if (initialState && isOptionsStore && options.hydrate) {
      options.hydrate(store.$state, initialState);
    }
    isListening = true;
    isSyncListening = true;
    return store;
  }
  function defineStore(idOrOptions, setup, setupOptions) {
    let id;
    let options;
    const isSetupStore = typeof setup === "function";
    if (typeof idOrOptions === "string") {
      id = idOrOptions;
      options = isSetupStore ? setupOptions : setup;
    } else {
      options = idOrOptions;
      id = idOrOptions.id;
      if (typeof id !== "string") {
        throw new Error(`[\u{1F34D}]: "defineStore()" must be passed a store id as its first argument.`);
      }
    }
    function useStore(pinia2, hot) {
      const currentInstance = vue.getCurrentInstance();
      pinia2 = pinia2 || currentInstance && vue.inject(piniaSymbol, null);
      if (pinia2)
        setActivePinia(pinia2);
      if (!activePinia) {
        throw new Error(`[\u{1F34D}]: "getActivePinia()" was called but there was no active Pinia. Did you forget to install pinia?
	const pinia = createPinia()
	app.use(pinia)
This will fail in production.`);
      }
      pinia2 = activePinia;
      if (!pinia2._s.has(id)) {
        if (isSetupStore) {
          createSetupStore(id, setup, options, pinia2);
        } else {
          createOptionsStore(id, options, pinia2);
        }
        {
          useStore._pinia = pinia2;
        }
      }
      const store = pinia2._s.get(id);
      if (hot) {
        const hotId = "__hot:" + id;
        const newStore = isSetupStore ? createSetupStore(hotId, setup, options, pinia2, true) : createOptionsStore(hotId, assign({}, options), pinia2, true);
        hot._hotUpdate(newStore);
        delete pinia2.state.value[hotId];
        pinia2._s.delete(hotId);
      }
      if (IS_CLIENT && currentInstance && currentInstance.proxy && !hot) {
        const vm = currentInstance.proxy;
        const cache = "_pStores" in vm ? vm._pStores : vm._pStores = {};
        cache[id] = store;
      }
      return store;
    }
    useStore.$id = id;
    return useStore;
  }
  const mydata = defineStore("my_data", {
    state: () => ({
      patient: {}
    }),
    actions: {
      addPatien(value) {
        this.patient = value;
      }
    }
  });
  const _sfc_main$u = vue.defineComponent({
    __name: "pop-ups",
    setup(__props, { expose }) {
      const store = mydata();
      var show = vue.ref(false);
      var curIndex = vue.ref(-1);
      var the_time = vue.ref([]);
      const submitData = vue.reactive({
        week: "",
        the_time: "",
        when: 0,
        _id: "",
        patient_id: ""
      });
      const trigger = (value) => {
        show.value = value.show;
        the_time.value = value.the_time;
        submitData.week = value.week;
        submitData.when = value.when;
        submitData._id = value._id;
      };
      const clickoverlay = () => {
        show.value = false;
        curIndex.value = -1;
        submitData.the_time = "";
        the_time.value = [];
      };
      const choosePatient = () => {
        uni.navigateTo({
          url: "/pages/my-service/my-patient/my-patient"
        });
      };
      let name = vue.ref("");
      store.$subscribe((mutayion, state) => {
        name.value = state.patient.name;
        submitData.patient_id = state.patient._id;
      });
      const Submit = async () => {
        uni.showLoading({
          title: "\u63D0\u4EA4\u4E2D"
        });
        const res = await RequestApi.RegAppoin(submitData);
        if (res.statusCode == 200) {
          uni.showToast({
            title: "\u63D0\u4EA4\u6210\u529F",
            icon: "none",
            duration: 1e3
          });
          uni.redirectTo({
            url: "/pages/my-service/my-registration/index"
          });
        }
      };
      expose({ trigger });
      return (_ctx, _cache) => {
        const _component_page_container = vue.resolveComponent("page-container");
        return vue.openBlock(), vue.createBlock(_component_page_container, {
          show: vue.unref(show),
          onClickoverlay: clickoverlay
        }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "pop" }, [
              vue.createElementVNode("text", { class: "pop-tit" }, "\u8BF7\u9009\u62E9\u9884\u7EA6\u65F6\u6BB5"),
              vue.createElementVNode("view", { class: "pop-time" }, [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(the_time), (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("text", {
                    key: index,
                    class: vue.normalizeClass(index == vue.unref(curIndex) ? "selected" : ""),
                    onClick: ($event) => (vue.isRef(curIndex) ? curIndex.value = index : curIndex = index, submitData.the_time = item)
                  }, vue.toDisplayString(item), 11, ["onClick"]);
                }), 128))
              ]),
              vue.createElementVNode("text", { class: "pop-tit" }, "\u9009\u62E9\u6210\u5458"),
              vue.createElementVNode("view", { class: "pop-choice" }, [
                vue.createElementVNode("view", { class: "img" }, [
                  vue.createElementVNode("image", {
                    src: "/static/other/touxiang.svg",
                    mode: "widthFix"
                  }),
                  vue.createElementVNode("text", null, vue.toDisplayString(vue.unref(name)), 1)
                ]),
                vue.createElementVNode("view", {
                  class: "patient-choose",
                  onClick: choosePatient
                }, vue.toDisplayString(vue.unref(name) == "" ? "\u9009\u62E9\u5C31\u8BCA\u4EBA" : "\u91CD\u65B0\u9009\u62E9"), 1)
              ]),
              vue.createElementVNode("view", {
                class: "reserve",
                onClick: Submit
              }, "\u63D0\u4EA4\u9884\u7EA6")
            ])
          ]),
          _: 1
        }, 8, ["show"]);
      };
    }
  });
  var popus = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["__scopeId", "data-v-01fb815f"], ["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/pages/doctor/components/pop-ups.vue"]]);
  const _sfc_main$t = {};
  function _sfc_render$7(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "sk-container" }, [
      vue.createElementVNode("view", { class: "structure top" }, [
        vue.createElementVNode("view", { class: "doctor-info" }, [
          vue.createElementVNode("image", {
            mode: "aspectFill",
            class: "sk-image"
          }),
          vue.createElementVNode("view", { class: "info" }, [
            vue.createElementVNode("view", { class: "name" }, [
              vue.createElementVNode("text", { class: "text-black sk-transparent sk-text-18-3333-648 sk-text" }, "\u5218\u7231\u73B2"),
              vue.createElementVNode("text", { class: "sk-transparent sk-text-23-3333-762 sk-text" }, "\u4E3B\u4EFB\u533B\u5E08")
            ]),
            vue.createElementVNode("view", { class: "hospital sk-transparent sk-text-23-3333-175 sk-text" }, "\u4E91\u5357\u7701\u7B2C\u4E00\u4EBA\u6C11\u533B\u9662")
          ])
        ]),
        vue.createElementVNode("text", { class: "sk-transparent sk-text-23-3333-676 sk-text" }, "\u64C5\u957F\u513F\u7AE5\u795E\u7ECF\u7CFB\u7EDF\u75BE\u75C5\u53CA\u9AD8\u5371\u513F\u751F\u957F\u53D1\u80B2\u76D1\u6D4B\u3002")
      ]),
      vue.createElementVNode("view", { class: "reserve structure" }, [
        vue.createElementVNode("view", { class: "reserve-tit sk-transparent sk-text-14-2857-763 sk-text" }, "\u9884\u7EA6\u6302\u53F7"),
        vue.createElementVNode("view", { class: "reserve-scroll" }, [
          vue.createElementVNode("view", { class: "reserve-l" }, [
            vue.createElementVNode("text", {
              class: "border sk-transparent sk-text-40-4762-25 sk-text",
              style: { "background-position-x": "50%" }
            }, "\u65E5\u671F"),
            vue.createElementVNode("text", {
              class: "border sk-transparent sk-text-40-4762-911 sk-text",
              style: { "background-position-x": "50%" }
            }, "\u4E0A\u5348"),
            vue.createElementVNode("text", {
              class: "border sk-transparent sk-text-40-4762-737 sk-text",
              style: { "background-position-x": "50%" }
            }, "\u4E0B\u5348")
          ]),
          vue.createElementVNode("scroll-view", {
            class: "scroll",
            "enable-flex": "true",
            "scroll-x": "true"
          }, [
            vue.createElementVNode("view", { class: "date-item" }, [
              vue.createElementVNode("view", { class: "date border" }, [
                vue.createElementVNode("text", { class: "sk-transparent sk-text-14-2857-992 sk-text" }, "\u4ECA\u5929"),
                vue.createElementVNode("text", { class: "sk-transparent sk-text-14-2857-460 sk-text" }, "12-17")
              ]),
              vue.createElementVNode("view", {
                class: "order border selected sk-transparent sk-text-40-4762-119 sk-text",
                style: { "background-position-x": "50%" }
              }, "\u9884\u7EA6"),
              vue.createElementVNode("view", { class: "order border dis" })
            ]),
            vue.createElementVNode("view", { class: "date-item" }, [
              vue.createElementVNode("view", { class: "date border" }, [
                vue.createElementVNode("text", { class: "sk-transparent sk-text-14-2857-882 sk-text" }, "\u5468\u4E00"),
                vue.createElementVNode("text", { class: "sk-transparent sk-text-14-2857-477 sk-text" }, "12-18")
              ]),
              vue.createElementVNode("view", {
                class: "order border selected sk-transparent sk-text-40-4762-789 sk-text",
                style: { "background-position-x": "50%" }
              }, "\u9884\u7EA6"),
              vue.createElementVNode("view", {
                class: "order border selected sk-transparent sk-text-40-4762-886 sk-text",
                style: { "background-position-x": "50%" }
              }, "\u9884\u7EA6")
            ]),
            vue.createElementVNode("view", { class: "date-item" }, [
              vue.createElementVNode("view", { class: "date border" }, [
                vue.createElementVNode("text", { class: "sk-transparent sk-text-14-2857-543 sk-text" }, "\u5468\u4E8C"),
                vue.createElementVNode("text", { class: "sk-transparent sk-text-14-2857-445 sk-text" }, "12-19")
              ]),
              vue.createElementVNode("view", {
                class: "order border selected sk-transparent sk-text-40-4762-746 sk-text",
                style: { "background-position-x": "50%" }
              }, "\u9884\u7EA6"),
              vue.createElementVNode("view", {
                class: "order border selected sk-transparent sk-text-40-4762-915 sk-text",
                style: { "background-position-x": "50%" }
              }, "\u9884\u7EA6")
            ]),
            vue.createElementVNode("view", { class: "date-item" }, [
              vue.createElementVNode("view", { class: "date border" }, [
                vue.createElementVNode("text", { class: "sk-transparent sk-text-14-2857-473 sk-text" }, "\u5468\u4E09"),
                vue.createElementVNode("text", { class: "sk-transparent sk-text-14-2857-222 sk-text" }, "12-20")
              ]),
              vue.createElementVNode("view", {
                class: "order border selected sk-transparent sk-text-40-4762-541 sk-text",
                style: { "background-position-x": "50%" }
              }, "\u9884\u7EA6"),
              vue.createElementVNode("view", {
                class: "order border selected sk-transparent sk-text-40-4762-556 sk-text",
                style: { "background-position-x": "50%" }
              }, "\u9884\u7EA6")
            ])
          ])
        ])
      ]),
      vue.createElementVNode("view", { class: "warning" }, [
        vue.createElementVNode("view", { class: "important sk-transparent sk-text-14-2857-33 sk-text" }, "\u91CD\u8981\u63D0\u793A")
      ])
    ]);
  }
  var Skeleton$7 = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["render", _sfc_render$7], ["__scopeId", "data-v-5cf7ee1a"], ["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/skeleton/doctor-homepage.vue"]]);
  const _sfc_main$s = /* @__PURE__ */ vue.defineComponent({
    __name: "doctor-Homepage",
    setup(__props) {
      let s_show = vue.ref(true);
      let Id = vue.ref("");
      let doctor_data = vue.ref([]);
      onLoad(async (event) => {
        const { id } = event;
        Id.value = id;
        const res = await RequestApi.DoctorHome({ _id: id });
        doctor_data.value = res.data.data;
        s_show.value = false;
      });
      let component = vue.ref();
      const selectTime = (week, the_time, when) => {
        const value = {
          week,
          the_time,
          when,
          _id: Id.value,
          show: true
        };
        component.value.trigger(value);
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(doctor_data), (item, index) => {
            return vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: index }, [
              vue.createElementVNode("view", { class: "structure top" }, [
                vue.createElementVNode("view", { class: "doctor-info" }, [
                  vue.createElementVNode("image", {
                    src: item.avatar,
                    mode: "aspectFill"
                  }, null, 8, ["src"]),
                  vue.createElementVNode("view", { class: "info" }, [
                    vue.createElementVNode("view", { class: "name" }, [
                      vue.createElementVNode("text", { class: "text-black" }, vue.toDisplayString(item.name), 1),
                      vue.createElementVNode("text", null, vue.toDisplayString(item.post), 1)
                    ]),
                    vue.createElementVNode("view", { class: "hospital" }, vue.toDisplayString(item.hospital), 1)
                  ])
                ]),
                vue.createElementVNode("text", null, vue.toDisplayString(item.good_at), 1)
              ]),
              vue.createCommentVNode(" \u9884\u7EA6\u6302\u53F7 "),
              vue.createElementVNode("view", { class: "reserve structure" }, [
                vue.createElementVNode("view", { class: "reserve-tit" }, "\u9884\u7EA6\u6302\u53F7"),
                vue.createElementVNode("view", { class: "reserve-scroll" }, [
                  vue.createElementVNode("view", { class: "reserve-l" }, [
                    vue.createElementVNode("text", { class: "border" }, "\u65E5\u671F"),
                    vue.createElementVNode("text", { class: "border" }, "\u4E0A\u5348"),
                    vue.createElementVNode("text", { class: "border" }, "\u4E0B\u5348")
                  ]),
                  vue.createElementVNode("scroll-view", {
                    "scroll-x": "true",
                    class: "scroll",
                    "enable-flex": "true"
                  }, [
                    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(item.App_ment, (item_a, index_a) => {
                      return vue.openBlock(), vue.createElementBlock("view", {
                        class: "date-item",
                        key: index_a
                      }, [
                        vue.createElementVNode("view", { class: "date border" }, [
                          vue.createElementVNode("text", null, vue.toDisplayString(item_a.day), 1),
                          vue.createElementVNode("text", null, vue.toDisplayString(item_a.week), 1)
                        ]),
                        vue.createElementVNode("view", {
                          class: vue.normalizeClass(["order border", item_a.time[0].nu_source <= 0 ? "dis" : "selected"]),
                          onClick: ($event) => selectTime(item_a.week, item_a.time[0].the_time, item_a.time[0].when)
                        }, vue.toDisplayString(item_a.time[0].nu_source <= 0 ? "" : "\u9884\u7EA6"), 11, ["onClick"]),
                        vue.createElementVNode("view", {
                          class: vue.normalizeClass(["order border", item_a.time[1].nu_source <= 0 ? "dis" : "selected"])
                        }, vue.toDisplayString(item_a.time[1].nu_source <= 0 ? "" : "\u9884\u7EA6"), 3)
                      ]);
                    }), 128))
                  ])
                ])
              ])
            ], 64);
          }), 128)),
          vue.createCommentVNode(" \u91CD\u8981\u63D0\u793A "),
          vue.createElementVNode("view", { class: "warning" }, [
            vue.createElementVNode("view", { class: "important" }, "\u91CD\u8981\u63D0\u793A"),
            vue.createElementVNode("view", { class: "tip" }, "1.\u672C\u6B21\u9884\u7EA6\u5C31\u8BCA\u5F53\u5929\u4E0D\u53EF\u4EE5\u53D6\u6D88\u9884\u7EA6\uFF0C\u5982\u9700\u53D6\u6D88\uFF0C\u8BF7\u5728\u5C31\u8BCA\u524D\u4E00\u592924\uFF1A00\u4E4B\u524D\u64CD\u4F5C\uFF0C\u7D2F\u8BA1\u53D6\u6D88\u6216\u723D\u7EA6\u4E09\u6B21\u53EF\u80FD\u4F1A\u88AB\u5217\u5165\u533B\u9662\u9ED1\u540D\u5355\uFF0C\u8BF7\u6309\u9700\u9884\u7EA6"),
            vue.createElementVNode("view", null, "2.\u9884\u7EA6\u6302\u53F7\u6682\u4E0D\u652F\u6301\u533B\u4FDD\u652F\u4ED8\uFF0C\u82E5\u672C\u6B21\u6302\u53F7\u4F7F\u7528\u624B\u673A\u5728\u7EBF\u652F\u4ED8\uFF0C\u5C31\u8BCA\u8FC7\u7A0B\u4E2D\u7684\u95E8\u8BCA\u68C0\u9A8C\u68C0\u67E5\uFF0C\u5904\u65B9\u8D39\u7528\u53EF\u80FD\u4E0D\u652F\u6301\u533B\u4FDD\u652F\u4ED8")
          ]),
          vue.createCommentVNode(" \u5F39\u7A97 "),
          vue.createVNode(popus, {
            ref_key: "component",
            ref: component
          }, null, 512),
          vue.unref(s_show) ? (vue.openBlock(), vue.createBlock(Skeleton$7, { key: 0 })) : vue.createCommentVNode("v-if", true)
        ], 64);
      };
    }
  });
  var PagesDoctorDoctorHomepage = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/pages/doctor/doctor-Homepage.vue"]]);
  const _sfc_main$r = {};
  function _sfc_render$6(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "sk-container" }, [
      vue.createElementVNode("view", { class: "img" }, [
        vue.createElementVNode("image", {
          mode: "aspectFill",
          class: "sk-image"
        }),
        vue.createElementVNode("text", { class: "logined sk-transparent sk-text-14-2857-188 sk-text" }, "Nuyoah\u{1F9F8}")
      ]),
      vue.createElementVNode("view", { class: "info" }, [
        vue.createElementVNode("view", { class: "info-item" }, [
          vue.createElementVNode("text", { class: "sk-transparent sk-opacity" }, "5"),
          vue.createElementVNode("text", { class: "sk-transparent sk-text-14-2857-872 sk-text" }, "\u5065\u5EB7\u5206")
        ]),
        vue.createElementVNode("view", { class: "info-item" }, [
          vue.createElementVNode("text", { class: "sk-transparent sk-opacity" }, "5"),
          vue.createElementVNode("text", { class: "sk-transparent sk-text-14-2857-769 sk-text" }, "\u4F18\u60E0\u5238")
        ]),
        vue.createElementVNode("view", { class: "info-item" }, [
          vue.createElementVNode("text", { class: "sk-transparent sk-opacity" }, "8"),
          vue.createElementVNode("text", { class: "sk-transparent sk-text-14-2857-3 sk-text" }, "\u6D88\u606F")
        ])
      ]),
      vue.createElementVNode("view", { class: "orders" }, [
        vue.createElementVNode("view", { class: "order" }, [
          vue.createElementVNode("view", { class: "order-item" }, [
            vue.createElementVNode("image", {
              mode: "widthFix",
              style: { "height": "30px" },
              class: "sk-image"
            }),
            vue.createElementVNode("text", { class: "sk-transparent sk-text-14-2857-971 sk-text" }, "\u5C31\u8BCA\u4EBA\u7BA1\u7406")
          ])
        ]),
        vue.createElementVNode("view", { class: "order" }, [
          vue.createElementVNode("view", { class: "order-item" }, [
            vue.createElementVNode("image", {
              mode: "widthFix",
              style: { "height": "30px" },
              class: "sk-image"
            }),
            vue.createElementVNode("text", { class: "sk-transparent sk-text-14-2857-773 sk-text" }, "\u6211\u7684\u6302\u53F7")
          ])
        ]),
        vue.createElementVNode("view", { class: "order" }, [
          vue.createElementVNode("view", { class: "order-item" }, [
            vue.createElementVNode("image", {
              mode: "widthFix",
              style: { "height": "30px" },
              class: "sk-image"
            }),
            vue.createElementVNode("text", { class: "sk-transparent sk-text-14-2857-678 sk-text" }, "\u65B0\u51A0\u75AB\u82D7")
          ])
        ]),
        vue.createElementVNode("view", { class: "order" }, [
          vue.createElementVNode("view", { class: "order-item" }, [
            vue.createElementVNode("image", {
              mode: "widthFix",
              style: { "height": "30px" },
              class: "sk-image"
            }),
            vue.createElementVNode("text", { class: "sk-transparent sk-text-14-2857-646 sk-text" }, "HPV\u75AB\u82D7")
          ])
        ]),
        vue.createElementVNode("view", { class: "order" }, [
          vue.createElementVNode("view", { class: "order-item" }, [
            vue.createElementVNode("image", {
              mode: "widthFix",
              style: { "height": "30px" },
              class: "sk-image"
            }),
            vue.createElementVNode("text", { class: "sk-transparent sk-text-14-2857-501 sk-text" }, "\u6838\u9178\u68C0\u6D4B")
          ])
        ]),
        vue.createElementVNode("view", { class: "order" }, [
          vue.createElementVNode("view", { class: "order-item" }, [
            vue.createElementVNode("image", {
              mode: "widthFix",
              style: { "height": "30px" },
              class: "sk-image"
            }),
            vue.createElementVNode("text", { class: "sk-transparent sk-text-14-2857-113 sk-text" }, "\u6211\u7684\u4F53\u68C0")
          ])
        ])
      ])
    ]);
  }
  var Skeleton$6 = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["render", _sfc_render$6], ["__scopeId", "data-v-8622c168"], ["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/skeleton/mine.vue"]]);
  const _sfc_main$q = /* @__PURE__ */ vue.defineComponent({
    __name: "mine",
    setup(__props) {
      var s_show = vue.ref(true);
      const user_data = vue.reactive({
        url: "",
        nickName: ""
      });
      onShow(() => {
        const user = uni.getStorageSync("wxuser");
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
        uni.navigateTo({
          url: "/src/pages/login-page/index"
        });
      };
      const jumpPoute = (path) => {
        uni.navigateTo({
          url: path
        });
      };
      const List = vue.reactive([
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
      const OrderList = vue.reactive([
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
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createElementVNode("view", { class: "img" }, [
            vue.createElementVNode("image", {
              src: user_data.url == "" ? "/static/other/touxiang.svg" : user_data.url,
              mode: "aspectFill"
            }, null, 8, ["src"]),
            vue.createElementVNode("text", {
              onClick: Login,
              class: vue.normalizeClass(user_data.nickName == "" ? "none" : "logined")
            }, vue.toDisplayString(user_data.nickName == "" ? "\u767B\u5F55" : user_data.nickName), 3)
          ]),
          vue.createElementVNode("view", { class: "info" }, [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(List, (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "info-item",
                key: index
              }, [
                vue.createElementVNode("text", null, vue.toDisplayString(item.number), 1),
                vue.createElementVNode("text", null, vue.toDisplayString(item.type), 1)
              ]);
            }), 128))
          ]),
          vue.createCommentVNode(" \u8DEF\u7531\u8DF3\u8F6C "),
          vue.createElementVNode("view", { class: "orders" }, [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(OrderList, (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "order",
                key: index,
                onClick: ($event) => jumpPoute(item.path)
              }, [
                vue.createElementVNode("view", { class: "order-item" }, [
                  vue.createElementVNode("image", {
                    src: item.icon,
                    mode: "widthFix"
                  }, null, 8, ["src"]),
                  vue.createElementVNode("text", null, vue.toDisplayString(item.title), 1)
                ])
              ], 8, ["onClick"]);
            }), 128))
          ]),
          vue.unref(s_show) ? (vue.openBlock(), vue.createBlock(Skeleton$6, { key: 0 })) : vue.createCommentVNode("v-if", true)
        ], 64);
      };
    }
  });
  var PagesMineMine = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/pages/mine/mine.vue"]]);
  const _sfc_main$p = {};
  function _sfc_render$5(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "sk-container" }, [
      vue.createElementVNode("view", { class: "register-item" }, [
        vue.createElementVNode("view", { class: "item-top" }, [
          vue.createElementVNode("image", {
            mode: "aspectFill",
            class: "sk-image"
          }),
          vue.createElementVNode("view", { class: "desc" }, [
            vue.createElementVNode("text", { class: "weight sk-transparent sk-text-7-5000-237 sk-text" }, "\u5218\u7231\u73B2"),
            vue.createElementVNode("text", { class: "sk-transparent sk-text-10-0000-338 sk-text" }, "\u4E91\u5357\u7701\u7B2C\u4E00\u4EBA\u6C11\u533B\u9662")
          ])
        ]),
        vue.createElementVNode("view", { class: "info-item first" }, [
          vue.createElementVNode("text", { class: "sk-transparent sk-text-24-0000-708 sk-text" }, "\u9884\u7EA6\u6D41\u6C34\u53F7"),
          vue.createElementVNode("text", { class: "sk-transparent sk-text-24-0000-699 sk-text" }, "VHBF4F4NE9VGA3AV47W1JK7L6YP")
        ]),
        vue.createElementVNode("view", { class: "info-item" }, [
          vue.createElementVNode("text", { class: "sk-transparent sk-text-24-0000-856 sk-text" }, "\u5C31\u8BCA\u4EBA"),
          vue.createElementVNode("text", { class: "sk-transparent sk-text-24-0000-509 sk-text" }, "\u554A\u554A")
        ]),
        vue.createElementVNode("view", { class: "info-item" }, [
          vue.createElementVNode("text", { class: "sk-transparent sk-text-24-0000-213 sk-text" }, "\u5C31\u8BCA\u65F6\u95F4"),
          vue.createElementVNode("text", { class: "sk-transparent sk-text-24-0000-736 sk-text" }, "12-08 09:00-10:00")
        ]),
        vue.createElementVNode("view", { class: "info-item" }, [
          vue.createElementVNode("text", { class: "sk-transparent sk-text-24-0000-718 sk-text" }, "\u79D1\u5BA4"),
          vue.createElementVNode("text", { class: "sk-transparent sk-text-24-0000-931 sk-text" }, "\u513F\u79D1")
        ]),
        vue.createElementVNode("view", { class: "info-item" }, [
          vue.createElementVNode("text", { class: "sk-transparent sk-text-24-0000-485 sk-text" }, "\u6392\u961F\u53F7"),
          vue.createElementVNode("text", { class: "sk-transparent sk-text-24-0000-691 sk-text" }, "003")
        ]),
        vue.createElementVNode("view", { class: "info-item" }, [
          vue.createElementVNode("text", { class: "sk-transparent sk-text-24-0000-599 sk-text" }, "\u79D1\u5BA4\u697C\u5C42"),
          vue.createElementVNode("text", { class: "sk-transparent sk-text-24-0000-918 sk-text" }, "2\u53F7\u95E8\u8BCA\u697C9\u697C,\u513F\u79D13\u53F7\u8BCA\u5BA4")
        ]),
        vue.createElementVNode("view", { class: "info-item" }, [
          vue.createElementVNode("text", { class: "sk-transparent sk-text-24-0000-771 sk-text" }, "\u6302\u53F7\u8D39\u7528"),
          vue.createElementVNode("text", { class: "sk-transparent sk-text-24-0000-983 sk-text" }, "20")
        ]),
        vue.createElementVNode("view", { class: "cancel" }, [
          vue.createElementVNode("text", {
            class: "canceled sk-transparent sk-text-14-2857-83 sk-text",
            style: { "background-position-x": "100%" }
          }, "\u5DF2\u53D6\u6D88\u9884\u7EA6")
        ])
      ]),
      vue.createElementVNode("view", { class: "register-item" }, [
        vue.createElementVNode("view", { class: "item-top" }, [
          vue.createElementVNode("image", {
            mode: "aspectFill",
            class: "sk-image"
          }),
          vue.createElementVNode("view", { class: "desc" }, [
            vue.createElementVNode("text", { class: "weight sk-transparent sk-text-7-5000-998 sk-text" }, "\u5218\u7231\u73B2"),
            vue.createElementVNode("text", { class: "sk-transparent sk-text-10-0000-660 sk-text" }, "\u4E91\u5357\u7701\u7B2C\u4E00\u4EBA\u6C11\u533B\u9662")
          ])
        ]),
        vue.createElementVNode("view", { class: "info-item first" }, [
          vue.createElementVNode("text", { class: "sk-transparent sk-text-24-0000-123 sk-text" }, "\u9884\u7EA6\u6D41\u6C34\u53F7"),
          vue.createElementVNode("text", { class: "sk-transparent sk-text-24-0000-785 sk-text" }, "N51UP2PDRDKWAS6YWPWZ6ZWTLWZ")
        ]),
        vue.createElementVNode("view", { class: "info-item" }, [
          vue.createElementVNode("text", { class: "sk-transparent sk-text-24-0000-575 sk-text" }, "\u5C31\u8BCA\u4EBA"),
          vue.createElementVNode("text", { class: "sk-transparent sk-text-24-0000-179 sk-text" }, "\u554A\u554A")
        ]),
        vue.createElementVNode("view", { class: "info-item" }, [
          vue.createElementVNode("text", { class: "sk-transparent sk-text-24-0000-70 sk-text" }, "\u5C31\u8BCA\u65F6\u95F4"),
          vue.createElementVNode("text", { class: "sk-transparent sk-text-24-0000-372 sk-text" }, "12-08 10:00-12:00")
        ]),
        vue.createElementVNode("view", { class: "info-item" }, [
          vue.createElementVNode("text", { class: "sk-transparent sk-text-24-0000-514 sk-text" }, "\u79D1\u5BA4"),
          vue.createElementVNode("text", { class: "sk-transparent sk-text-24-0000-778 sk-text" }, "\u513F\u79D1")
        ])
      ])
    ]);
  }
  var Skeleton$5 = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["render", _sfc_render$5], ["__scopeId", "data-v-6748738e"], ["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/skeleton/service-my-registration.vue"]]);
  const _sfc_main$o = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props) {
      let s_show = vue.ref(true);
      let order = vue.ref([]);
      let show = vue.ref(false);
      onShow(async () => {
        const res = await RequestApi.UserRegistrat();
        formatAppLog("log", "at pages/my-service/my-registration/index.vue:63", res);
        order.value = res.data.data;
        if (res.data.data.length == 0) {
          show.value = true;
        }
        s_show.value = false;
      });
      const Cancel = async (id, index) => {
        await RequestApi.RegistCancel({ _id: id });
        order.value[index].cancel = false;
      };
      return (_ctx, _cache) => {
        const _component_View = vue.resolveComponent("View");
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(order), (item, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "register-item",
              key: index
            }, [
              vue.createVNode(_component_View, { class: "item-top" }, {
                default: vue.withCtx(() => [
                  vue.createElementVNode("image", {
                    src: item.avatar,
                    mode: "aspectFill"
                  }, null, 8, ["src"]),
                  vue.createElementVNode("view", { class: "desc" }, [
                    vue.createElementVNode("text", { class: "weight" }, vue.toDisplayString(item.tre_doctor), 1),
                    vue.createElementVNode("text", null, vue.toDisplayString(item.tre_place), 1)
                  ])
                ]),
                _: 2
              }, 1024),
              vue.createElementVNode("view", { class: "info-item first" }, [
                vue.createElementVNode("text", null, "\u9884\u7EA6\u6D41\u6C34\u53F7"),
                vue.createElementVNode("text", null, vue.toDisplayString(item.se_number), 1)
              ]),
              vue.createElementVNode("view", { class: "info-item" }, [
                vue.createElementVNode("text", null, "\u5C31\u8BCA\u4EBA"),
                vue.createElementVNode("text", null, vue.toDisplayString(item.patient_name), 1)
              ]),
              vue.createElementVNode("view", { class: "info-item" }, [
                vue.createElementVNode("text", null, "\u5C31\u8BCA\u65F6\u95F4"),
                vue.createElementVNode("text", null, vue.toDisplayString(item.tre_time) + " " + vue.toDisplayString(item.the_time), 1)
              ]),
              vue.createElementVNode("view", { class: "info-item" }, [
                vue.createElementVNode("text", null, "\u79D1\u5BA4"),
                vue.createElementVNode("text", null, vue.toDisplayString(item.dep_ment), 1)
              ]),
              vue.createElementVNode("view", { class: "info-item" }, [
                vue.createElementVNode("text", null, "\u6392\u961F\u53F7"),
                vue.createElementVNode("text", null, vue.toDisplayString(item.que_number), 1)
              ]),
              vue.createElementVNode("view", { class: "info-item" }, [
                vue.createElementVNode("text", null, "\u79D1\u5BA4\u697C\u5C42"),
                vue.createElementVNode("text", null, vue.toDisplayString(item.remark), 1)
              ]),
              vue.createElementVNode("view", { class: "info-item" }, [
                vue.createElementVNode("text", null, "\u6302\u53F7\u8D39\u7528"),
                vue.createElementVNode("text", null, vue.toDisplayString(item.reg_cost), 1)
              ]),
              vue.createElementVNode("view", { class: "cancel" }, [
                vue.createElementVNode("text", {
                  onClick: ($event) => Cancel(item._id, index),
                  class: vue.normalizeClass(item.cancel ? "to-cancel" : "canceled")
                }, vue.toDisplayString(item.cancel ? "\u53D6\u6D88\u9884\u7EA6" : "\u5DF2\u53D6\u6D88\u9884\u7EA6"), 11, ["onClick"])
              ])
            ]);
          }), 128)),
          vue.createCommentVNode(" \u6CA1\u6709\u6570\u636E "),
          vue.createVNode(Point, { show: vue.unref(show) }, null, 8, ["show"]),
          vue.createElementVNode("view", { style: { "height": "300rpx" } }),
          vue.unref(s_show) ? (vue.openBlock(), vue.createBlock(Skeleton$5, { key: 0 })) : vue.createCommentVNode("v-if", true)
        ], 64);
      };
    }
  });
  var PagesMyServiceMyRegistrationIndex = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/pages/my-service/my-registration/index.vue"]]);
  const _sfc_main$n = {};
  function _sfc_render$4(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "sk-container" }, [
      vue.createElementVNode("view", { class: "video-item" }, [
        vue.createElementVNode("view", {
          class: "video sk-image",
          id: "6a6a269a62e428200247b1d638668709",
          "object-fit": "cover",
          src: "https://diancan-1252107261.cos.accelerate.myqcloud.com/yiliao/video-001.mp4",
          title: "\u76AE\u80A4\u79D1\u5B9E\u7528\u5C0F\u77E5\u8BC6\uFF0C\u8FD8\u4E0D\u8F6C\u53D1\u6536\u85CF",
          "unit-id": "true"
        }),
        vue.createElementVNode("text", { class: "title sk-transparent sk-text-14-2857-276 sk-text" }, "\u76AE\u80A4\u79D1\u5B9E\u7528\u5C0F\u77E5\u8BC6\uFF0C\u8FD8\u4E0D\u8F6C\u53D1\u6536\u85CF"),
        vue.createElementVNode("image", {
          class: "play sk-image",
          mode: "widthFix",
          style: { "height": "50px" }
        }),
        vue.createElementVNode("view", { class: "doctor" }, [
          vue.createElementVNode("image", {
            mode: "widthFix",
            style: { "height": "20.6557px" },
            class: "sk-image"
          }),
          vue.createElementVNode("text", { class: "sk-transparent sk-text-14-2857-288 sk-text" }, "\u76AE\u80A4\u79D1\u533B\u751F\u8D75\u4E3D\u4E3D")
        ])
      ]),
      vue.createElementVNode("view", { class: "video-item" }, [
        vue.createElementVNode("view", {
          class: "video sk-image",
          id: "6a6a269a62e428200247b1d7076b1cf9",
          "object-fit": "cover",
          src: "https://diancan-1252107261.cos.accelerate.myqcloud.com/yiliao/video-002.mp4",
          title: "4\u79CD\u76AE\u80A4\u79D1\u5E38\u7528\u836F\uFF0C\u65E2\u7B80\u5355\u53C8\u6709\u6548\uFF0C\u6536\u85CF\u597D\u4EE5\u5907\u4E0D\u65F6\u4E4B\u9700\uFF01",
          "unit-id": "true"
        }),
        vue.createElementVNode("text", { class: "title sk-transparent sk-text-14-2857-132 sk-text" }, "4\u79CD\u76AE\u80A4\u79D1\u5E38\u7528\u836F\uFF0C\u65E2\u7B80\u5355\u53C8\u6709\u6548\uFF0C\u6536\u85CF\u597D\u4EE5\u5907\u4E0D\u65F6\u4E4B\u9700\uFF01"),
        vue.createElementVNode("image", {
          class: "play sk-image",
          mode: "widthFix",
          style: { "height": "50px" }
        }),
        vue.createElementVNode("view", { class: "doctor" }, [
          vue.createElementVNode("image", {
            mode: "widthFix",
            style: { "height": "18.4262px" },
            class: "sk-image"
          }),
          vue.createElementVNode("text", { class: "sk-transparent sk-text-14-2857-905 sk-text" }, "\u738B\u5229\u5170\u4E2D\u533B\u76AE\u80A4\u79D1")
        ])
      ]),
      vue.createElementVNode("view", { class: "video-item" }, [
        vue.createElementVNode("view", {
          class: "video sk-image",
          id: "6a6a269a62e428200247b1d838c13cb6",
          "object-fit": "cover",
          src: "https://diancan-1252107261.cos.accelerate.myqcloud.com/yiliao/video-003.mp4",
          title: "\u5982\u4F55\u8C03\u7406\u597D\u80A0\u80C3\uFF1F",
          "unit-id": "true"
        }),
        vue.createElementVNode("text", { class: "title sk-transparent sk-text-14-2857-551 sk-text" }, "\u5982\u4F55\u8C03\u7406\u597D\u80A0\u80C3\uFF1F")
      ])
    ]);
  }
  var Skeleton$4 = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$4], ["__scopeId", "data-v-09c223d2"], ["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/skeleton/video.vue"]]);
  const _sfc_main$m = /* @__PURE__ */ vue.defineComponent({
    __name: "video",
    setup(__props) {
      const video_data = vue.ref([]);
      let s_show = vue.ref(true);
      vue.onMounted(() => {
        getData(0);
        s_show.value = false;
      });
      async function getData(page) {
        const res = await RequestApi.VideoList({ page });
        video_data.value = [...video_data.value, ...res.data.data];
      }
      const loading = vue.ref(false);
      const pager = vue.ref(0);
      onReachBottom(async () => {
        loading.value = true;
        pager.value++;
        await getData(pager.value);
        loading.value = false;
      });
      let Index = vue.ref(-1);
      let Id = vue.ref("");
      const toPlay = (index, _id) => {
        video_data.value[index].controls = true;
        video_data.value[index].play_but = false;
        if (Id.value == "") {
          Index.value = index;
          Id.value = _id;
          uni.createVideoContext(Id.value).play();
        } else {
          if (index != Index.value) {
            var preId = uni.createVideoContext(Id.value);
            preId.pause();
            video_data.value[Index.value].controls = false;
            video_data.value[Index.value].play_but = true;
          }
          Index.value = index;
          Id.value = _id;
          uni.createVideoContext(Id.value).play();
        }
      };
      onShow(() => {
        uni.createVideoContext(Id.value).pause();
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(video_data.value, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "video-item",
              key: index
            }, [
              vue.createElementVNode("video", {
                src: item.video_url,
                id: item._id,
                controls: item.controls,
                "show-center-play-btn": false,
                "object-fit": "cover",
                title: item.video_title,
                class: "video"
              }, null, 8, ["src", "id", "controls", "title"]),
              vue.createElementVNode("text", { class: "title" }, vue.toDisplayString(item.video_title), 1),
              item.play_but ? (vue.openBlock(), vue.createElementBlock("image", {
                key: 0,
                onClick: ($event) => toPlay(index, item._id),
                class: "play",
                src: "/static/other/video-bofang.png",
                mode: "widthFix"
              }, null, 8, ["onClick"])) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode("view", { class: "doctor" }, [
                vue.createElementVNode("image", {
                  src: item.avatar,
                  mode: "widthFix"
                }, null, 8, ["src"]),
                vue.createElementVNode("text", null, vue.toDisplayString(item.name), 1)
              ])
            ]);
          }), 128)),
          vue.createCommentVNode(" \u52A0\u8F7D\u7B26\u53F7 "),
          vue.createElementVNode("view", { class: "loading" }, [
            loading.value ? (vue.openBlock(), vue.createElementBlock("image", {
              key: 0,
              src: "/static/other/loading.svg",
              mode: "widthFix"
            })) : vue.createCommentVNode("v-if", true)
          ]),
          vue.unref(s_show) ? (vue.openBlock(), vue.createBlock(Skeleton$4, { key: 0 })) : vue.createCommentVNode("v-if", true)
        ], 64);
      };
    }
  });
  var PagesVideoVideo = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/pages/video/video.vue"]]);
  const uploadImage = (url, load_title, err_title) => {
    return new Promise((resolve, reject) => {
      uni.chooseMedia({
        count: 1,
        mediaType: ["image"],
        sourceType: ["album"],
        sizeType: ["compressed"],
        success: (res) => {
          uni.showLoading({ title: load_title, mask: true });
          formatAppLog("log", "at public/misc.ts:10", res);
          uni.uploadFile({
            url,
            filePath: res.tempFiles[0].tempFilePath,
            name: "file",
            header: { accept: "application/json" },
            success: (imgres) => {
              uni.hideLoading();
              resolve(imgres);
            },
            fail: (err) => {
              uni.showToast({ title: err_title, icon: "error", duration: 100 });
              reject(err);
            }
          });
        }
      });
    });
  };
  const _sfc_main$l = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props) {
      const store = mydata();
      const submitData = vue.reactive({
        illness: "",
        guide: false,
        ins_report: [],
        patient_id: ""
      });
      const choosePatient = () => {
        uni.navigateTo({
          url: "/pages/my-service/my-patient/my-patient"
        });
      };
      let name = vue.ref("");
      store.$subscribe((mutayion, state) => {
        name.value = state.patient.name;
        submitData.patient_id = state.patient._id;
      });
      const upload = async () => {
        const res = await uploadImage(ImgUrl, "\u4E0A\u4F20\u4E2D", "\u4E0A\u4F20\u5931\u8D25");
        submitData.ins_report.push(JSON.parse(res.data).data);
      };
      const changeCheck = (event) => {
        submitData.guide = event.detail.value.length == 0 ? false : true;
      };
      const Cancel = () => {
        uni.navigateBack({ delta: 1 });
      };
      const Submit = async () => {
        uni.showLoading({
          title: "\u63D0\u4EA4\u4E2D"
        });
        const res = await RequestApi.GraPhics(submitData);
        if (res.statusCode == 200) {
          uni.showToast({
            title: "\u63D0\u4EA4\u6210\u529F",
            icon: "none",
            duration: 1e3
          });
        }
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createElementVNode("view", { class: "detail" }, [
            vue.createElementVNode("text", { class: "detail-tit" }, "\u8BF7\u8BE6\u7EC6\u63CF\u8FF0\u4F60\u7684\u75C5\u60C5"),
            vue.withDirectives(vue.createElementVNode("textarea", {
              placeholder: "\u4E3A\u4E86\u66F4\u597D\u83B7\u5F97\u533B\u751F\u5E2E\u52A9,\u8BF7\u5C3D\u53EF\u80FD\u8BE6\u7EC6\u63CF\u8FF0\u75C5\u60C5",
              maxlength: "300",
              "placeholder-style": "color:#00c8c8;font-size: 32rpx;",
              "auto-focus": true,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => submitData.illness = $event)
            }, null, 512), [
              [vue.vModelText, submitData.illness]
            ])
          ]),
          vue.createElementVNode("view", { class: "checkbox" }, [
            vue.createElementVNode("checkbox-group", { onChange: changeCheck }, [
              vue.createElementVNode("label", null, [
                vue.createElementVNode("checkbox", {
                  value: "cb",
                  checked: submitData.guide
                }, null, 8, ["checked"]),
                vue.createTextVNode("\u9700\u8981\u533B\u751F\u6307\u5BFC\u7528\u836F ")
              ])
            ], 32)
          ]),
          vue.createCommentVNode(" \u4E0A\u4F20\u68C0\u67E5\u62A5\u544A\u6216\u60A3\u5904\u7167\u7247 "),
          vue.createElementVNode("view", { class: "upload" }, [
            vue.createElementVNode("text", { class: "upload-tit" }, "\u4E0A\u4F20\u68C0\u67E5\u62A5\u544A\u6216\u60A3\u5904\u7167\u7247"),
            vue.createElementVNode("view", { class: "upload-img" }, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(submitData.ins_report, (item, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: "img",
                  key: index
                }, [
                  vue.createElementVNode("image", {
                    src: item,
                    mode: "aspectFill"
                  }, null, 8, ["src"]),
                  vue.createElementVNode("image", {
                    onClick: ($event) => submitData.ins_report.splice(index, 1),
                    src: "/static/other/shanchu-goods.svg",
                    mode: "widthFix"
                  }, null, 8, ["onClick"])
                ]);
              }), 128)),
              vue.createElementVNode("view", { class: "img" }, [
                vue.createElementVNode("image", {
                  onClick: upload,
                  src: "/static/other/shuxing-img.png",
                  mode: "aspectFill"
                })
              ])
            ])
          ]),
          vue.createCommentVNode(" \u9009\u62E9\u5C31\u8BCA\u4EBA "),
          vue.createElementVNode("view", { class: "choose" }, [
            vue.createElementVNode("text", { class: "upload-tit" }, "\u9009\u62E9\u5C31\u8BCA\u4EBA"),
            vue.createElementVNode("view", { class: "patient" }, [
              vue.createElementVNode("view", { class: "patient-img" }, [
                vue.createElementVNode("image", {
                  src: "/static/other/touxiang.svg",
                  mode: "aspectFill"
                }),
                vue.createElementVNode("text", null, vue.toDisplayString(vue.unref(name)), 1)
              ]),
              vue.createElementVNode("view", {
                class: "patient-choose",
                onClick: choosePatient
              }, vue.toDisplayString(vue.unref(name) == "" ? "\u9009\u62E9\u5C31\u8BCA\u4EBA" : "\u91CD\u65B0\u9009\u62E9"), 1)
            ])
          ]),
          vue.createCommentVNode(" \u6309\u94AE "),
          vue.createElementVNode("view", { style: { "height": "300rpx" } }),
          vue.createElementVNode("view", { class: "btn" }, [
            vue.createElementVNode("text", {
              class: "cancel",
              onClick: Cancel
            }, "\u53D6\u6D88"),
            vue.createElementVNode("text", {
              class: "submit",
              onClick: Submit
            }, "\u63D0\u4EA4\u9884\u7EA6")
          ])
        ], 64);
      };
    }
  });
  var PagesGraphicsIndex = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["__scopeId", "data-v-562c90d2"], ["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/pages/graphics/index.vue"]]);
  const _sfc_main$k = {};
  function _sfc_render$3(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "sk-container" }, [
      vue.createElementVNode("view", { class: "tijian-nav data-v-fd81419c" }, [
        vue.createElementVNode("view", { class: "nav-item data-v-fd81419c" }, [
          vue.createElementVNode("text", { class: "data-v-fd81419c sk-transparent sk-text-14-2857-690 sk-text" }, "\u5168\u90E8"),
          vue.createElementVNode("image", { class: "data-v-fd81419c sk-image" })
        ]),
        vue.createElementVNode("view", { class: "nav-item data-v-fd81419c" }, [
          vue.createElementVNode("text", { class: "data-v-fd81419c sk-transparent sk-text-14-2857-110 sk-text" }, "\u9500\u91CF"),
          vue.createElementVNode("image", { class: "data-v-fd81419c sk-image" })
        ]),
        vue.createElementVNode("view", { class: "nav-item data-v-fd81419c" }, [
          vue.createElementVNode("text", { class: "data-v-fd81419c sk-transparent sk-text-14-2857-411 sk-text" }, "\u4EF7\u683C"),
          vue.createElementVNode("image", { class: "data-v-fd81419c sk-image" })
        ])
      ]),
      vue.createElementVNode("view", {
        class: "data-v-fd81419c",
        style: { "height": "70px" }
      }),
      vue.createElementVNode("view", { class: "tijian-list data-v-fd81419c" }, [
        vue.createElementVNode("text", { class: "list-tit text-black data-v-fd81419c sk-transparent sk-text-28-7500-53 sk-text" }, "\u5165\u804C\u4F53\u68C0\u5957\u9910"),
        vue.createElementVNode("view", { class: "list-img data-v-fd81419c" }, [
          vue.createElementVNode("image", {
            class: "data-v-fd81419c sk-image",
            mode: "aspectFill"
          }),
          vue.createElementVNode("view", { class: "desc data-v-fd81419c" }, [
            vue.createElementVNode("text", { class: "text-black data-v-fd81419c sk-transparent sk-text-14-2857-245 sk-text" }, "\u9002\u7528\u4E8E\u6C42\u804C\u4EBA\u5458"),
            vue.createElementVNode("view", { class: "descs data-v-fd81419c sk-transparent sk-text-14-2857-423 sk-text" }, "\u7279\u70B9\uFF1A\u6839\u636E\u4F01\u4E8B\u4E1A\u5355\u4F4D\u5165\u804C\u8981\u6C42\uFF0C\u5BF9\u76F8\u5173\u75BE\u75C5\u8FDB\u884C\u7B5B\u67E5\u3002")
          ])
        ]),
        vue.createElementVNode("view", { class: "list-price data-v-fd81419c" }, [
          vue.createElementVNode("text", { class: "data-v-fd81419c sk-transparent sk-text-14-2857-287 sk-text" }, "\u5DF2\u7EA6 200"),
          vue.createElementVNode("text", { class: "data-v-fd81419c sk-transparent sk-text-14-2857-906 sk-text" }, "\uFFE5600")
        ])
      ]),
      vue.createElementVNode("view", { class: "tijian-list data-v-fd81419c" }, [
        vue.createElementVNode("text", { class: "list-tit text-black data-v-fd81419c sk-transparent sk-text-28-7500-223 sk-text" }, "\u5B66\u751F\u4F53\u68C0\u5957\u9910"),
        vue.createElementVNode("view", { class: "list-img data-v-fd81419c" }, [
          vue.createElementVNode("image", {
            class: "data-v-fd81419c sk-image",
            mode: "aspectFill"
          }),
          vue.createElementVNode("view", { class: "desc data-v-fd81419c" }, [
            vue.createElementVNode("text", { class: "text-black data-v-fd81419c sk-transparent sk-text-14-2857-296 sk-text" }, "\u9002\u7528\u4E8E\u5B66\u751F\u7FA4\u4F53"),
            vue.createElementVNode("view", { class: "descs data-v-fd81419c sk-transparent sk-text-14-2857-272 sk-text" }, "\u7279\u70B9\uFF1A\u6839\u636E\u513F\u7AE5\u53D1\u80B2\u7279\u70B9\uFF0C\u91CD\u70B9\u7B5B\u67E5\u8425\u517B\u4EE3\u8C22\u3001\u809D\u810F\u3001\u8840\u6DB2\u76F8\u5173\u7684\u75BE\u75C5\uFF0C\u4E86\u89E3\u513F\u7AE5\u7684\u53D1\u80B2\u72B6\u51B5\uFF0C\u4E3A\u513F\u7AE5\u6210\u957F\u4FDD\u9A7E\u62A4\u822A\u3002")
          ])
        ]),
        vue.createElementVNode("view", { class: "list-price data-v-fd81419c" }, [
          vue.createElementVNode("text", { class: "data-v-fd81419c sk-transparent sk-text-14-2857-100 sk-text" }, "\u5DF2\u7EA6 300"),
          vue.createElementVNode("text", { class: "data-v-fd81419c sk-transparent sk-text-14-2857-806 sk-text" }, "\uFFE5100")
        ])
      ]),
      vue.createElementVNode("view", { class: "tijian-list data-v-fd81419c" }, [
        vue.createElementVNode("text", { class: "list-tit text-black data-v-fd81419c sk-transparent sk-text-28-7500-400 sk-text" }, "\u7236\u6BCD\u5957\u9910"),
        vue.createElementVNode("view", { class: "list-img data-v-fd81419c" }, [
          vue.createElementVNode("image", {
            class: "data-v-fd81419c sk-image",
            mode: "aspectFill"
          }),
          vue.createElementVNode("view", { class: "desc data-v-fd81419c" }, [
            vue.createElementVNode("text", { class: "text-black data-v-fd81419c sk-transparent sk-text-14-2857-986 sk-text" }, "\u80BF\u7624\u7B5B\u67E5\u4E28\u8179\u90E8\u5F69\u8D85\u4E28\u7532\u72B6\u817A\u5F69\u8D85\u4E28\u9888\u90E8\u8840\u7BA1\u5F69\u8D85")
          ])
        ])
      ])
    ]);
  }
  var Skeleton$3 = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$3], ["__scopeId", "data-v-625110a9"], ["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/skeleton/phy-exam-index.vue"]]);
  const _sfc_main$j = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props) {
      let s_show = vue.ref(true);
      let phy_term = vue.ref([]);
      let phy_data = vue.ref([]);
      vue.onMounted(async () => {
        const res = await Promise.all([RequestApi.PhyTerm(), RequestApi.PhysGet()]);
        phy_term.value = res[0].data.data;
        phy_data.value = res[1].data.data;
        s_show.value = false;
      });
      const down_show = vue.ref(false);
      const filterData = vue.reactive({ type: "", sales: "", price: "" });
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
        const res = await RequestApi.PhyQuery(filterData);
        phy_data.value = res.data.data;
      };
      const changeSelect = (value) => {
        phy_term.value[0].query_val = value;
        down_show.value = false;
        filterData.type = value;
        QueryData();
      };
      const goDetails = (id, title) => {
        uni.navigateTo({
          url: "/pages/phy-exam/Details?id=" + id + "&title=" + title
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createElementVNode("view", { class: "tijian-nav" }, [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(phy_term), (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "nav-item",
                key: index,
                onClick: ($event) => shaixuan(index, item.filter_val)
              }, [
                vue.createElementVNode("text", null, vue.toDisplayString(item.query_val), 1),
                vue.createElementVNode("image", {
                  src: index == 0 ? "/static/other/shaixuan-jiantou.png" : "/static/other/shaixuan.png"
                }, null, 8, ["src"])
              ], 8, ["onClick"]);
            }), 128))
          ]),
          vue.createCommentVNode(" \u4E0B\u62C9\u5217\u8868 "),
          down_show.value ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "down-list"
          }, [
            vue.createElementVNode("view", { class: "down-item" }, [
              vue.unref(phy_term).length > 0 ? (vue.openBlock(true), vue.createElementBlock(vue.Fragment, { key: 0 }, vue.renderList(vue.unref(phy_term)[0].filter_val, (item, index) => {
                return vue.openBlock(), vue.createElementBlock("text", {
                  key: index,
                  onClick: ($event) => changeSelect(item)
                }, vue.toDisplayString(item), 9, ["onClick"]);
              }), 128)) : vue.createCommentVNode("v-if", true)
            ]),
            vue.createElementVNode("view", { class: "mask" })
          ])) : vue.createCommentVNode("v-if", true),
          vue.createCommentVNode(" \u4F53\u68C0\u5957\u9910 "),
          vue.createElementVNode("view", { style: { "height": "140rpx" } }),
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(phy_data), (item, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "tijian-list",
              onClick: ($event) => goDetails(item._id, item.title),
              key: index
            }, [
              vue.createElementVNode("text", { class: "list-tit text-black" }, vue.toDisplayString(item.title), 1),
              vue.createElementVNode("view", { class: "list-img" }, [
                vue.createElementVNode("image", {
                  src: item.image,
                  mode: "aspectFill"
                }, null, 8, ["src"]),
                vue.createElementVNode("view", { class: "desc" }, [
                  vue.createElementVNode("text", { class: "text-black" }, vue.toDisplayString(item.be_suit), 1),
                  vue.createElementVNode("view", { class: "descs" }, vue.toDisplayString(item.describe), 1)
                ])
              ]),
              vue.createElementVNode("view", { class: "list-price" }, [
                vue.createElementVNode("text", null, "\u5DF2\u7EA6 " + vue.toDisplayString(item.sales), 1),
                vue.createElementVNode("text", null, "\uFFE5" + vue.toDisplayString(item.price), 1)
              ])
            ], 8, ["onClick"]);
          }), 128)),
          vue.unref(s_show) ? (vue.openBlock(), vue.createBlock(Skeleton$3, { key: 1 })) : vue.createCommentVNode("v-if", true)
        ], 64);
      };
    }
  });
  var PagesPhyExamIndex = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__scopeId", "data-v-fd81419c"], ["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/pages/phy-exam/index.vue"]]);
  const _sfc_main$i = {};
  function _sfc_render$2(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "sk-container" }, [
      vue.createElementVNode("view", { class: "test-tit" }, [
        vue.createElementVNode("text", { class: "sk-transparent sk-text-14-2857-261 sk-text" }, "\u6D4B\u8BC4\u8FDB\u5EA6"),
        vue.createElementVNode("progress", {
          "active-color": "#EFEFEF",
          "border-radius": "30",
          class: "progress",
          percent: "11.11111111111111",
          "stroke-width": "10",
          "background-color": "#EFEFEF"
        }),
        vue.createElementVNode("text", { class: "sk-transparent sk-text-14-2857-772 sk-text" }, "1/9")
      ]),
      vue.createElementVNode("view", { class: "test-problem structure sk-transparent sk-text-14-2857-631 sk-text" }, "\u8FD1\u671F\u662F\u5426\u51FA\u73B0\u505A\u4E8B\u65F6\u63D0\u4E0D\u8D77\u52B2\u6216\u8005\u6CA1\u6709\u5174\u8DA3\u7684\u60C5\u51B5\uFF1F"),
      vue.createElementVNode("view", { class: "test-choices structure" }, [
        vue.createElementVNode("view", { class: "choices-type" }, [
          vue.createElementVNode("text", { class: "line" }),
          vue.createElementVNode("text", { class: "sk-transparent sk-text-14-2857-49 sk-text" }, "\u5355\u9009\u9898")
        ]),
        vue.createElementVNode("view", { class: "choices" }, [
          vue.createElementVNode("view", {
            class: "choices-item sk-transparent sk-text-14-2857-533 sk-text",
            "hover-class": "hover-style",
            "hover-stay-time": "300"
          }, "\u5B8C\u5168\u4E0D\u4F1A"),
          vue.createElementVNode("view", {
            class: "choices-item sk-transparent sk-text-14-2857-914 sk-text",
            "hover-class": "hover-style",
            "hover-stay-time": "300"
          }, "\u6709\u51E0\u5929"),
          vue.createElementVNode("view", {
            class: "choices-item sk-transparent sk-text-14-2857-133 sk-text",
            "hover-class": "hover-style",
            "hover-stay-time": "300"
          }, "\u4E00\u534A\u4EE5\u4E0A\u7684\u65E5\u5B50"),
          vue.createElementVNode("view", {
            class: "choices-item sk-transparent sk-text-14-2857-440 sk-text",
            "hover-class": "hover-style",
            "hover-stay-time": "300"
          }, "\u51E0\u4E4E\u6BCF\u5929")
        ])
      ])
    ]);
  }
  var Skeleton$2 = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$2], ["__scopeId", "data-v-0648d4ec"], ["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/skeleton/self-test-topic.vue"]]);
  const _sfc_main$h = /* @__PURE__ */ vue.defineComponent({
    __name: "topic",
    setup(__props) {
      const s_show = vue.ref(true);
      let Type = vue.ref("");
      let Title = vue.ref("");
      onLoad((event) => {
        const { type, name } = event;
        Type.value = type;
        Title.value = name;
        uni.setNavigationBarTitle({
          title: Title.value
        });
      });
      let all_data = vue.ref([]);
      let cur_data = vue.reactive({
        options: [],
        topic: "",
        _id: ""
      });
      let data_length = vue.ref(0);
      onShow(async () => {
        cur_index.value = 1;
        cur_index_s.value = 0;
        cur_percent.value = 0;
        question_id.value = [];
        if (Type.value == "001") {
          var res = await RequestApi.DepressionTopics();
        } else if (Type.value == "002") {
          var res = await RequestApi.PrematureTopics();
        } else {
          var res = await RequestApi.InsomniaTopics();
        }
        all_data.value = res.data.data;
        data_length.value = res.data.data.length;
        cur_data = res.data.data[0];
        cur_percent.value = 100 / data_length.value;
        s_show.value = false;
      });
      let cur_index = vue.ref(1);
      let cur_index_s = vue.ref(0);
      let cur_percent = vue.ref(0);
      let question_id = vue.reactive({ value: [] });
      const changeNextPage = (son_id) => {
        cur_index_s.value++;
        if (cur_index_s.value < data_length.value) {
          cur_index.value++;
          cur_data = all_data.value[cur_index_s.value];
          cur_percent.value = 100 * cur_index.value / data_length.value;
        }
        question_id.value.push(son_id);
      };
      vue.watch([cur_index_s, data_length], (newVal, oldVal) => {
        let obj = JSON.stringify({ type: Type.value, topic_id: question_id.value });
        if (newVal[0] == newVal[1]) {
          uni.navigateTo({
            url: "/pages/self-test/result?value=" + obj
          });
        }
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createElementVNode("view", { class: "test-tit" }, [
            vue.createElementVNode("text", null, "\u6D4B\u8BC4\u8FDB\u5EA6"),
            vue.createElementVNode("progress", {
              percent: vue.unref(cur_percent),
              class: "progress",
              "border-radius": "30",
              activeColor: "#0066ff",
              "stroke-width": "10"
            }, null, 8, ["percent"]),
            vue.createElementVNode("text", null, vue.toDisplayString(vue.unref(cur_index)) + "/" + vue.toDisplayString(vue.unref(data_length)), 1)
          ]),
          vue.createCommentVNode(" \u9898\u76EE "),
          vue.createElementVNode("view", { class: "test-problem structure" }, vue.toDisplayString(vue.unref(cur_data).topic), 1),
          vue.createCommentVNode(" \u9009\u9879 "),
          vue.createElementVNode("view", { class: "test-choices structure" }, [
            vue.createElementVNode("view", { class: "choices-type" }, [
              vue.createElementVNode("text", { class: "line" }),
              vue.createElementVNode("text", null, "\u5355\u9009\u9898")
            ]),
            vue.createElementVNode("view", { class: "choices" }, [
              vue.unref(cur_data).options.length > 0 ? (vue.openBlock(true), vue.createElementBlock(vue.Fragment, { key: 0 }, vue.renderList(vue.unref(cur_data).options, (item, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: "choices-item",
                  "hover-class": "hover-style",
                  "hover-stay-time": "300",
                  key: index,
                  onClick: ($event) => changeNextPage(item.son_id)
                }, vue.toDisplayString(item.title), 9, ["onClick"]);
              }), 128)) : vue.createCommentVNode("v-if", true)
            ])
          ]),
          s_show.value ? (vue.openBlock(), vue.createBlock(Skeleton$2, { key: 0 })) : vue.createCommentVNode("v-if", true)
        ], 64);
      };
    }
  });
  var PagesSelfTestTopic = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/pages/self-test/topic.vue"]]);
  let TEST = [
    {
      type: "001",
      name: "\u6291\u90C1\u6D4B\u8BC4\u4E13\u4E1A\u7248",
      share_title: "\u6291\u90C1\u6D4B\u8BC4\u4E13\u4E1A\u7248,\u4F60\u662F\u4E0D\u5F00\u5FC3\u8FD8\u662F\u771F\u6291\u90C1",
      share_path: "/pages/self-test/topic?type=001&name=\u6291\u90C1\u6D4B\u8BC4\u4E13\u4E1A\u7248",
      share_url: "https://diancan-1252107261.cos.accelerate.myqcloud.com/yiliao/F-yiyu.png"
    },
    {
      type: "002",
      name: "\u7537\u6027\u529F\u80FD\u6D4B\u8BD5",
      share_title: "\u4E94\u4E2A\u529E\u6CD5\u5224\u65AD\u81EA\u8EAB\u6027\u529F\u80FD",
      share_path: "/pages/self-test/topic?type=002&name=\u7537\u6027\u529F\u80FD\u6D4B\u8BD5",
      share_url: "https://diancan-1252107261.cos.accelerate.myqcloud.com/yiliao/F-zaoxie.png"
    },
    {
      type: "003",
      name: "\u5931\u7720\u7A0B\u5EA6\u6D4B\u8BC4",
      share_title: "\u5931\u7720\u6807\u51C6\u81EA\u6D4B,\u6D4B\u4E00\u6D4B\u4F60\u662F\u5426\u8EAB\u5728\u5176\u4E2D",
      share_path: "/pages/self-test/topic?type=003&name=\u5931\u7720\u7A0B\u5EA6\u6D4B\u8BC4",
      share_url: "https://diancan-1252107261.cos.accelerate.myqcloud.com/yiliao/F-shimian.png"
    }
  ];
  const _sfc_main$g = /* @__PURE__ */ vue.defineComponent({
    __name: "result",
    setup(__props) {
      let type_id = vue.ref("");
      let choice_id = vue.ref([]);
      onLoad((event) => {
        const { type, topic_id } = JSON.parse(event.value);
        type_id.value = type;
        choice_id.value = topic_id;
      });
      let test_res = vue.ref([]);
      onShow(async () => {
        if (type_id.value == "001") {
          var res = await RequestApi.Depression({ value: choice_id.value });
        } else if (type_id.value == "002") {
          var res = await RequestApi.PreMature({ value: choice_id.value });
        } else {
          var res = await RequestApi.InsoMnia({ value: choice_id.value });
        }
        test_res.value = res.data.data;
        share_data.value = TEST.filter((item) => item.type == type_id.value);
      });
      const again = () => {
        uni.navigateBack({
          delta: 1
        });
      };
      var share_data = vue.ref([]);
      onShareAppMessage(() => {
        return {
          title: share_data.value[0].share_title,
          path: share_data.value[0].share_path,
          imageUrl: share_data.value[0].share_url
        };
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createElementVNode("view", {
            class: "result-title text-black",
            style: { "font-size": "36rpx" }
          }, "\u7ED3\u679C\u5206\u6790"),
          vue.createElementVNode("view", { class: "texts" }, "\u672C\u6D4B\u8BD5\u53CA\u7ED3\u679C\u7531AI\u5F97\u51FA\uFF0C\u4EC5\u4F9B\u53C2\u8003\uFF0C\u4E0D\u80FD\u4F5C\u4E3A\u8BCA\u65AD\u53CA\u8BCA\u7597\u7684\u4F9D\u636E"),
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(test_res), (item, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "result",
              key: index
            }, [
              vue.createElementVNode("text", { class: "result-tit-b" }, vue.toDisplayString(item.scope) + ":" + vue.toDisplayString(item.result), 1),
              vue.createElementVNode("text", { class: "result-tit-s" }, vue.toDisplayString(item.suggest), 1),
              vue.createElementVNode("view", { class: "result-txt" }, [
                vue.createElementVNode("view", { class: "txt-title text-black" }, "\u6D4B\u8BC4\u7ED3\u679C\u6982\u8FF0\uFF1A"),
                vue.createElementVNode("view", null, [
                  (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(item.outline, (item_a, index_a) => {
                    return vue.openBlock(), vue.createElementBlock("text", {
                      class: "text-item",
                      key: index_a
                    }, vue.toDisplayString(index_a + 1) + ". " + vue.toDisplayString(item_a), 1);
                  }), 128))
                ])
              ]),
              vue.createCommentVNode(" AI\u63A8\u8350 "),
              item.recommend.length > 0 ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                vue.createElementVNode("view", { class: "txt-title text-black" }, "AI\u4E3A\u60A8\u63A8\u8350\u4EE5\u4E0B\u79D1\u5BA4\uFF1A"),
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(item.recommend, (item_a, index_a) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    class: "keshi",
                    key: index_a
                  }, [
                    vue.createElementVNode("view", { class: "keshi-item" }, [
                      vue.createElementVNode("text", { class: "text-black" }, vue.toDisplayString(item_a.dep_name), 1),
                      vue.createElementVNode("text", { class: "keshi-address" }, vue.toDisplayString(item_a.hospital), 1)
                    ]),
                    vue.createElementVNode("text", { class: "guahao" }, "\u53BB\u6302\u53F7")
                  ]);
                }), 128))
              ], 64)) : vue.createCommentVNode("v-if", true)
            ]);
          }), 128)),
          vue.createCommentVNode(" \u6309\u94AE "),
          vue.createElementVNode("view", { style: { "height": "200rpx" } }),
          vue.createElementVNode("view", { class: "btn" }, [
            vue.createElementVNode("button", {
              class: "cancel",
              "open-type": "share"
            }, "\u9080\u8BF7\u670B\u53CB\u6D4B\u4E00\u6D4B"),
            vue.createElementVNode("button", {
              class: "submit",
              onClick: again
            }, "\u518D\u6D4B\u4E00\u6B21")
          ])
        ], 64);
      };
    }
  });
  var PagesSelfTestResult = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/pages/self-test/result.vue"]]);
  const _sfc_main$f = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props) {
      let order = vue.ref([]);
      let show = vue.ref(false);
      onShow(async () => {
        const res = await RequestApi.PhyuserOrder();
        order.value = res.data.data;
        if (res.data.data.length == 0) {
          show.value = true;
        }
      });
      const Cancel = async (id, index) => {
        await RequestApi.PhyCancel({ _id: id });
        order.value[index].cancel = false;
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(order), (item, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "vaccine-order",
              key: index
            }, [
              vue.createElementVNode("view", { class: "order-message" }, [
                vue.createElementVNode("text", null, "\u4F53\u68C0\u5957\u9910: "),
                vue.createElementVNode("text", { class: "message" }, vue.toDisplayString(item.phy_name), 1)
              ]),
              vue.createElementVNode("view", { class: "order-message" }, [
                vue.createElementVNode("text", null, "\u4F53\u68C0\u4EBA: "),
                vue.createElementVNode("text", { class: "message" }, vue.toDisplayString(item.name), 1)
              ]),
              vue.createElementVNode("view", { class: "order-message" }, [
                vue.createElementVNode("text", null, "\u4F53\u68C0\u65F6\u95F4: "),
                vue.createElementVNode("text", { class: "message" }, vue.toDisplayString(item.phy_time), 1)
              ]),
              vue.createElementVNode("view", { class: "order-message" }, [
                vue.createElementVNode("text", null, "\u4F53\u68C0\u5730\u70B9: "),
                vue.createElementVNode("text", { class: "message" }, vue.toDisplayString(item.address), 1)
              ]),
              vue.createElementVNode("view", { class: "order-message" }, [
                vue.createElementVNode("text", null, "\u8BA2\u5355\u7F16\u53F7: "),
                vue.createElementVNode("text", { class: "message" }, vue.toDisplayString(item.order_number), 1)
              ]),
              vue.createElementVNode("view", { class: "order-price" }, [
                vue.createElementVNode("text", null, "\uFFE5" + vue.toDisplayString(item.price), 1)
              ]),
              vue.createElementVNode("view", { class: "cancel-btn" }, [
                vue.createElementVNode("text", {
                  onClick: ($event) => Cancel(item._id, index),
                  class: vue.normalizeClass(item.cancel ? "to-cancel" : "canceled")
                }, vue.toDisplayString(item.cancel ? "\u53D6\u6D88\u9884\u7EA6" : "\u5DF2\u53D6\u6D88\u9884\u7EA6"), 11, ["onClick"])
              ])
            ]);
          }), 128)),
          vue.createVNode(Point, { show: vue.unref(show) }, null, 8, ["show"]),
          vue.createElementVNode("view", { style: { "height": "300rpx" } })
        ], 64);
      };
    }
  });
  var PagesMyServicePhyExamIndex = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__scopeId", "data-v-5ceeaf96"], ["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/pages/my-service/phy-exam/index.vue"]]);
  const _sfc_main$e = vue.defineComponent({
    __name: "se-member",
    setup(__props, { expose }) {
      const store = mydata();
      const submitData = vue.reactive({
        phy_name: "",
        phy_time: "",
        patient_id: "",
        show: false
      });
      const trigger = (value) => {
        submitData.phy_name = value.phy_name;
        submitData.phy_time = value.phy_time;
        submitData.show = value.show;
      };
      expose({ trigger });
      const choosePatient = () => {
        uni.navigateTo({
          url: "/pages/my-service/my-patient/my-patient"
        });
      };
      let name = vue.ref("");
      store.$subscribe((mutayion, state) => {
        name.value = state.patient.name;
        submitData.patient_id = state.patient._id;
      });
      const Submit = async () => {
        uni.showLoading({
          title: "\u63D0\u4EA4\u4E2D",
          mask: true
        });
        const res = await RequestApi.ResPhy(submitData);
        if (res.statusCode == 200) {
          uni.hideLoading();
          uni.redirectTo({
            url: "/pages/my-service/phy-exam/index"
          });
        }
      };
      const hide = () => {
        submitData.show = false;
      };
      return (_ctx, _cache) => {
        const _component_page_container = vue.resolveComponent("page-container");
        return vue.openBlock(), vue.createBlock(_component_page_container, {
          show: submitData.show,
          onClickoverlay: hide
        }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "page" }, [
              vue.createElementVNode("text", { class: "page-tit" }, "\u9009\u62E9\u6210\u5458"),
              vue.createElementVNode("view", { class: "page-text" }, [
                vue.createElementVNode("view", { class: "page-l" }, [
                  vue.createElementVNode("image", {
                    src: "/static/other/touxiang.svg",
                    mode: "widthFix"
                  }),
                  vue.createElementVNode("text", null, vue.toDisplayString(vue.unref(name)), 1)
                ]),
                vue.createElementVNode("view", {
                  class: "page-r",
                  onClick: choosePatient
                }, vue.toDisplayString(vue.unref(name) == "" ? "\u9009\u62E9\u6210\u5458" : "\u91CD\u65B0\u9009\u62E9"), 1)
              ]),
              vue.createElementVNode("view", {
                class: "page-submit",
                onClick: Submit
              }, "\u63D0\u4EA4\u9884\u7EA6")
            ])
          ]),
          _: 1
        }, 8, ["show"]);
      };
    }
  });
  var Semember = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__scopeId", "data-v-e186633e"], ["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/com-components/se-member.vue"]]);
  const _sfc_main$d = /* @__PURE__ */ vue.defineComponent({
    __name: "Details",
    setup(__props) {
      const phy_detail = vue.ref([]);
      const activeIndex = vue.ref(-1);
      const member = vue.ref();
      const s_data = vue.reactive({
        phy_name: "",
        phy_time: "",
        show: true
      });
      onLoad(async (event) => {
        s_data.phy_name = event.title;
        const res = await RequestApi.PhyDateil({ id: event.id });
        phy_detail.value = res.data.data;
      });
      const chooseMember = () => {
        member.value.trigger(s_data);
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createCommentVNode(" \u9876\u90E8\u56FE\u7247\u533A\u57DF "),
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(phy_detail.value, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "detail-top",
              key: index
            }, [
              vue.createElementVNode("image", {
                src: item.image,
                mode: "aspectFill"
              }, null, 8, ["src"]),
              vue.createElementVNode("view", { class: "top-num" }, [
                vue.createElementVNode("text", { class: "top-price" }, "\uFFE5" + vue.toDisplayString(item.price), 1),
                vue.createElementVNode("text", null, "\u5DF2\u7EA6" + vue.toDisplayString(item.sales), 1)
              ]),
              vue.createElementVNode("text", { class: "top-tit" }, vue.toDisplayString(item.title), 1),
              vue.createElementVNode("view", { style: { "height": "20rpx" } })
            ]);
          }), 128)),
          vue.createCommentVNode(" \u4F53\u68C0\u65F6\u95F4\u9009\u62E9 "),
          vue.createElementVNode("view", { class: "reserve-time" }, [
            vue.createElementVNode("text", { class: "reserve-tit text-black" }, "\u4F53\u68C0\u65F6\u95F4\u9009\u62E9"),
            vue.createElementVNode("scroll-view", {
              "scroll-x": "true",
              class: "scroll-view_H"
            }, [
              phy_detail.value.length > 0 ? (vue.openBlock(true), vue.createElementBlock(vue.Fragment, { key: 0 }, vue.renderList(phy_detail.value[0].date, (item, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  onClick: ($event) => (activeIndex.value = index, s_data.phy_time = item.date),
                  class: vue.normalizeClass([index == activeIndex.value ? "selected" : "", "scroll"]),
                  key: index
                }, [
                  vue.createElementVNode("view", { class: "scroll-item" }, [
                    vue.createElementVNode("text", null, vue.toDisplayString(item.date), 1),
                    vue.createElementVNode("text", null, vue.toDisplayString(item.week), 1)
                  ])
                ], 10, ["onClick"]);
              }), 128)) : vue.createCommentVNode("v-if", true)
            ])
          ]),
          vue.createCommentVNode(" \u9002\u7528\u4EBA\u7FA4 "),
          vue.createElementVNode("view", { class: "structure" }, [
            vue.createElementVNode("text", { class: "fit-tit text-black" }, "\u9002\u7528\u4EBA\u7FA4"),
            vue.createElementVNode("view", { class: "fit-items" }, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(phy_detail.value, (item, index) => {
                return vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: index }, [
                  (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(item.crowd, (item_a, index_a) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "fit-item",
                      key: index_a
                    }, [
                      vue.createElementVNode("image", {
                        src: item_a.image,
                        mode: "aspectFill"
                      }, null, 8, ["src"]),
                      vue.createElementVNode("text", null, vue.toDisplayString(item_a.name), 1)
                    ]);
                  }), 128))
                ], 64);
              }), 128))
            ])
          ]),
          vue.createCommentVNode(" \u5957\u9910\u9879\u76EE "),
          vue.createElementVNode("view", { class: "structure" }, [
            vue.createElementVNode("text", { class: "structure-tit text-black" }, "\u5957\u9910\u9879\u76EE"),
            vue.createElementVNode("view", { class: "projects" }, [
              phy_detail.value.length > 0 ? (vue.openBlock(true), vue.createElementBlock(vue.Fragment, { key: 0 }, vue.renderList(phy_detail.value[0].project, (item, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: "project-item",
                  key: index
                }, [
                  vue.createElementVNode("text", { class: "project-tit" }, vue.toDisplayString(item.title), 1),
                  (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(item.content, (item_a, index_a) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "project-table",
                      key: index_a
                    }, [
                      vue.createElementVNode("text", { class: "table-l" }, vue.toDisplayString(item_a.thing), 1),
                      vue.createElementVNode("text", { class: "table-r" }, vue.toDisplayString(item_a.details), 1)
                    ]);
                  }), 128))
                ]);
              }), 128)) : vue.createCommentVNode("v-if", true)
            ])
          ]),
          vue.createVNode(Semember, {
            ref_key: "member",
            ref: member
          }, null, 512),
          vue.createElementVNode("view", { style: { "height": "300rpx" } }),
          vue.createCommentVNode(" \u6309\u94AE "),
          vue.createElementVNode("view", { class: "btn" }, [
            phy_detail.value.length > 0 ? (vue.openBlock(), vue.createElementBlock("text", {
              key: 0,
              class: "check-price"
            }, "\u68C0\u6D4B\u8D39\u7528: \uFFE5" + vue.toDisplayString(phy_detail.value[0].price), 1)) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode("text", {
              class: "submit",
              onClick: chooseMember
            }, "\u9009\u62E9\u6210\u5458")
          ])
        ], 64);
      };
    }
  });
  var PagesPhyExamDetails = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-08088682"], ["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/pages/phy-exam/Details.vue"]]);
  const _sfc_main$c = /* @__PURE__ */ vue.defineComponent({
    __name: "my-patient",
    setup(__props) {
      const store = mydata();
      const show = vue.ref(false);
      const title = vue.ref("\u6CA1\u6709\u5C31\u8BCA\u4EBA\u6570\u636E");
      const patient = vue.ref([]);
      onShow(async () => {
        const res = await RequestApi.GetPatient();
        patient.value = res.data.data;
        if (res.data.data.length == 0) {
          show.value = true;
        }
      });
      const choose = (_id, name) => {
        store.addPatien({ name, _id });
        uni.navigateBack({ delta: 1 });
      };
      const Cancel = () => {
        uni.navigateBack({ delta: 1 });
      };
      const Add = () => {
        uni.navigateTo({
          url: "/pages/my-service/my-patient/add-patient"
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(patient.value, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "info",
              key: index,
              onClick: ($event) => choose(item._id, item.name)
            }, [
              vue.createElementVNode("view", { class: "info-item" }, [
                vue.createElementVNode("view", { class: "info-flex" }, [
                  vue.createElementVNode("text", { class: "name" }, vue.toDisplayString(item.name), 1),
                  vue.createElementVNode("text", { class: "tag" }, vue.toDisplayString(item.relation), 1)
                ]),
                vue.createElementVNode("view", { class: "info-flex" }, [
                  vue.createElementVNode("text", null, vue.toDisplayString(item.sex), 1),
                  vue.createElementVNode("text", null, vue.toDisplayString(item.age) + "\u5C81", 1),
                  vue.createElementVNode("text", null, vue.toDisplayString(item.phone), 1)
                ])
              ])
            ], 8, ["onClick"]);
          }), 128)),
          vue.createCommentVNode(" \u6309\u94AE "),
          vue.createVNode(Point, {
            show: show.value,
            titlt: title.value
          }, null, 8, ["show", "titlt"]),
          vue.createElementVNode("view", { style: { "height": "300rpx" } }),
          vue.createElementVNode("view", { class: "btn" }, [
            vue.createElementVNode("text", {
              class: "cancel",
              onClick: Cancel
            }, "\u53D6\u6D88"),
            vue.createElementVNode("text", {
              class: "submit",
              onClick: Add
            }, "\u6DFB\u52A0\u5C31\u8BCA\u4EBA")
          ])
        ], 64);
      };
    }
  });
  var PagesMyServiceMyPatientMyPatient = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-71152d90"], ["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/pages/my-service/my-patient/my-patient.vue"]]);
  const _sfc_main$b = /* @__PURE__ */ vue.defineComponent({
    __name: "add-patient",
    setup(__props) {
      let submitData = vue.reactive({
        name: "",
        sex: "",
        born: "",
        relation: "",
        id_card: "",
        phone: ""
      });
      const changeSex = (event) => {
        submitData.sex = event.detail.value == "0" ? "\u7537" : "\u5973";
      };
      const changeDate = (event) => {
        submitData.born = event.detail.value;
      };
      const changeRelation = (event) => {
        submitData.relation = event.detail.value == "0" ? "\u81EA\u5DF1" : event.detail.value == "1" ? "\u7236\u6BCD" : "\u5176\u4ED6";
      };
      const upload = async () => {
        const res = await uploadImage(AiCard, "\u8BC6\u522B\u4E2D", "\u8BC6\u522B\u5931\u8D25");
        const data = JSON.parse(res.data);
        if (res.statusCode == 200) {
          submitData.name = data.data.name;
          submitData.born = data.data.born;
          submitData.id_card = data.data.id_card;
          submitData.sex = data.data.sex;
        } else {
          uni.showToast({
            title: data.data,
            icon: "none",
            duration: 1e3
          });
        }
      };
      const sure_add = async () => {
        const res = await RequestApi.PatientRes(submitData);
        if (res.statusCode == 200) {
          uni.navigateBack({ delta: 1 });
        }
      };
      const Cancel = () => {
        uni.navigateBack({ delta: 1 });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createElementVNode("view", {
            class: "identify",
            onClick: upload
          }, [
            vue.createElementVNode("image", {
              src: "/static/other/AI-shibie.svg",
              mode: "widthFix"
            }),
            vue.createElementVNode("text", null, "\u8EAB\u4EFD\u667A\u80FD\u8BC6\u522B")
          ]),
          vue.createElementVNode("view", { class: "xinguan-form" }, [
            vue.createElementVNode("view", { class: "form" }, [
              vue.createElementVNode("text", null, "\u771F\u5B9E\u59D3\u540D"),
              vue.withDirectives(vue.createElementVNode("input", {
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.unref(submitData).name = $event),
                type: "text",
                placeholder: "\u8BF7\u8F93\u5165\u771F\u5B9E\u59D3\u540D",
                "placeholder-style": "place-style"
              }, null, 512), [
                [vue.vModelText, vue.unref(submitData).name]
              ])
            ]),
            vue.createElementVNode("view", { class: "form" }, [
              vue.createElementVNode("text", null, "\u6027\u522B"),
              vue.createElementVNode("picker", {
                mode: "selector",
                range: ["\u7537", "\u5973"],
                onChange: changeSex
              }, [
                vue.createElementVNode("view", { class: "choose-address" }, [
                  vue.createElementVNode("text", null, vue.toDisplayString(vue.unref(submitData).sex == "" ? "\u8BF7\u9009\u62E9\u6027\u522B" : vue.unref(submitData).sex), 1),
                  vue.createElementVNode("image", {
                    src: "/static/other/gengduo.svg",
                    mode: "widthFix"
                  })
                ])
              ], 32)
            ]),
            vue.createElementVNode("view", { class: "form" }, [
              vue.createElementVNode("text", null, "\u51FA\u751F\u65E5\u671F"),
              vue.createElementVNode("picker", {
                mode: "date",
                onChange: changeDate
              }, [
                vue.createElementVNode("view", { class: "choose-address" }, [
                  vue.createElementVNode("text", null, vue.toDisplayString(vue.unref(submitData).born == "" ? "\u8BF7\u9009\u62E9\u51FA\u751F\u65E5\u671F" : vue.unref(submitData).born), 1),
                  vue.createElementVNode("image", {
                    src: "/static/other/gengduo.svg",
                    mode: "widthFix"
                  })
                ])
              ], 32)
            ]),
            vue.createElementVNode("view", { class: "form" }, [
              vue.createElementVNode("text", null, "\u6210\u5458\u5173\u7CFB"),
              vue.createElementVNode("picker", {
                mode: "selector",
                range: ["\u81EA\u5DF1", "\u7236\u6BCD", "\u5176\u4ED6"],
                onChange: changeRelation
              }, [
                vue.createElementVNode("view", { class: "choose-address" }, [
                  vue.createElementVNode("text", null, vue.toDisplayString(vue.unref(submitData).relation == "" ? "\u8BF7\u9009\u62E9\u6210\u5458\u5173\u7CFB" : vue.unref(submitData).relation), 1),
                  vue.createElementVNode("image", {
                    src: "/static/other/gengduo.svg",
                    mode: "widthFix"
                  })
                ])
              ], 32)
            ]),
            vue.createElementVNode("view", { class: "form" }, [
              vue.createElementVNode("text", null, "\u8EAB\u4EFD\u8BC1"),
              vue.withDirectives(vue.createElementVNode("input", {
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => vue.unref(submitData).id_card = $event),
                type: "text",
                placeholder: "\u8BF7\u8F93\u5165\u8EAB\u4EFD\u8BC1",
                "placeholder-style": "place-style"
              }, null, 512), [
                [vue.vModelText, vue.unref(submitData).id_card]
              ])
            ]),
            vue.createElementVNode("view", { class: "form" }, [
              vue.createElementVNode("text", null, "\u624B\u673A\u53F7"),
              vue.withDirectives(vue.createElementVNode("input", {
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => vue.unref(submitData).phone = $event),
                placeholder: "\u8BF7\u8F93\u5165\u624B\u673A\u53F7",
                type: "number",
                "placeholder-style": "place-style"
              }, null, 512), [
                [vue.vModelText, vue.unref(submitData).phone]
              ])
            ])
          ]),
          vue.createCommentVNode(" \u6309\u94AE "),
          vue.createElementVNode("view", { style: { "height": "300rpx" } }),
          vue.createElementVNode("view", { class: "btn" }, [
            vue.createElementVNode("text", {
              class: "cancel",
              onClick: Cancel
            }, "\u53D6\u6D88"),
            vue.createElementVNode("text", {
              class: "submit",
              onClick: sure_add
            }, "\u786E\u8BA4\u6DFB\u52A0")
          ])
        ], 64);
      };
    }
  });
  var PagesMyServiceMyPatientAddPatient = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-583272b5"], ["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/pages/my-service/my-patient/add-patient.vue"]]);
  const _sfc_main$a = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props) {
      let order = vue.ref([]);
      let show = vue.ref(false);
      onShow(async () => {
        const res = await RequestApi.NuatauserOrder();
        order.value = res.data.data;
        if (res.data.data.length == 0) {
          show.value = true;
        }
      });
      const Cancel = async (id, index) => {
        await RequestApi.NuataCancel({ _id: id });
        order.value[index].cancel = false;
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(order), (item, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "vaccine-order",
              key: index
            }, [
              vue.createElementVNode("view", { class: "order-tit" }, vue.toDisplayString(item.phy_name), 1),
              vue.createElementVNode("view", { class: "order-message" }, [
                vue.createElementVNode("text", null, "\u68C0\u6D4B\u4EBA: "),
                vue.createElementVNode("text", { class: "message" }, vue.toDisplayString(item.name), 1)
              ]),
              vue.createElementVNode("view", { class: "order-message" }, [
                vue.createElementVNode("text", null, "\u68C0\u6D4B\u5730\u70B9: "),
                vue.createElementVNode("text", { class: "message" }, vue.toDisplayString(item.address), 1)
              ]),
              vue.createElementVNode("view", { class: "order-message" }, [
                vue.createElementVNode("text", null, "\u68C0\u6D4B\u65F6\u95F4: "),
                vue.createElementVNode("text", { class: "message" }, vue.toDisplayString(item.phy_time), 1)
              ]),
              vue.createElementVNode("view", { class: "order-message" }, [
                vue.createElementVNode("text", null, "\u8BA2\u5355\u7F16\u53F7: "),
                vue.createElementVNode("text", { class: "message" }, vue.toDisplayString(item.order_number), 1)
              ]),
              vue.createElementVNode("view", { class: "order-price" }, [
                vue.createElementVNode("text", null, "\uFFE5" + vue.toDisplayString(item.price), 1)
              ]),
              vue.createElementVNode("view", { class: "cancel-btn" }, [
                vue.createElementVNode("text", {
                  onClick: ($event) => Cancel(item._id, index),
                  class: vue.normalizeClass(item.cancel ? "to-cancel" : "canceled")
                }, vue.toDisplayString(item.cancel ? "\u53D6\u6D88\u9884\u7EA6" : "\u5DF2\u53D6\u6D88\u9884\u7EA6"), 11, ["onClick"])
              ])
            ]);
          }), 128)),
          vue.createVNode(Point, { show: vue.unref(show) }, null, 8, ["show"]),
          vue.createElementVNode("view", { style: { "height": "300rpx" } })
        ], 64);
      };
    }
  });
  var PagesMyServiceNucleicAcidIndex = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-3c29e9c5"], ["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/pages/my-service/nucleic-acid/index.vue"]]);
  const _sfc_main$9 = {};
  function _sfc_render$1(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "sk-container" }, [
      vue.createElementVNode("view", { class: "nucleic-top data-v-3382da42" }, [
        vue.createElementVNode("view", { class: "nucleic-price data-v-3382da42" }, [
          vue.createElementVNode("view", { class: "price-left data-v-3382da42" }, [
            vue.createElementVNode("image", {
              class: "data-v-3382da42 sk-image",
              mode: "aspectlete"
            })
          ]),
          vue.createElementVNode("view", { class: "price-right data-v-3382da42" }, [
            vue.createElementVNode("text", { class: "price-tit data-v-3382da42 sk-transparent sk-text-14-2857-535 sk-text" }, "\u6807\u51C6\u901A\u7528\u2014\u2014\u6838\u9178\u68C0\u6D4B"),
            vue.createElementVNode("text", { class: "price-num data-v-3382da42 sk-transparent sk-text-14-2857-952 sk-text" }, "\uFFE520")
          ])
        ]),
        vue.createElementVNode("view", { class: "nucleic-service data-v-3382da42" }, [
          vue.createElementVNode("view", { class: "service-item data-v-3382da42" }, [
            vue.createElementVNode("icon", {
              class: "icon-box-img data-v-3382da42 sk-image",
              size: "15px",
              type: "success",
              color: "#EFEFEF"
            }),
            vue.createElementVNode("text", { class: "data-v-3382da42 sk-transparent sk-text-14-2857-128 sk-text" }, "\u652F\u6301\u9000\u6539")
          ]),
          vue.createElementVNode("view", { class: "service-item data-v-3382da42" }, [
            vue.createElementVNode("icon", {
              class: "icon-box-img data-v-3382da42 sk-image",
              size: "15px",
              type: "success",
              color: "#EFEFEF"
            }),
            vue.createElementVNode("text", { class: "data-v-3382da42 sk-transparent sk-text-14-2857-530 sk-text" }, "\u53EF\u5F00\u53D1\u7968")
          ]),
          vue.createElementVNode("view", { class: "service-item data-v-3382da42" }, [
            vue.createElementVNode("icon", {
              class: "icon-box-img data-v-3382da42 sk-image",
              size: "15px",
              type: "success",
              color: "#EFEFEF"
            }),
            vue.createElementVNode("text", { class: "data-v-3382da42 sk-transparent sk-text-14-2857-433 sk-text" }, "\u9001\u5065\u5EB7\u5206")
          ])
        ])
      ]),
      vue.createElementVNode("view", { class: "nucleic-address data-v-3382da42" }, [
        vue.createElementVNode("view", { class: "address-item data-v-3382da42" }, [
          vue.createElementVNode("text", { class: "text-weight data-v-3382da42 sk-transparent sk-text-14-2857-823 sk-text" }, "\u6606\u660E\u5E02\u7B2C\u4E00\u4EBA\u6C11\u533B\u9662(\u6606\u534E\u533B\u9662)"),
          vue.createElementVNode("text", { class: "data-v-3382da42 sk-transparent sk-text-14-2857-400 sk-text" }, "\u6606\u660E\u5E02\u897F\u5C71\u533A\u91D1\u78A7\u8DEF157\u53F7")
        ]),
        vue.createElementVNode("view", { class: "address-item data-v-3382da42" }, [
          vue.createElementVNode("image", {
            class: "data-v-3382da42 sk-image",
            mode: "widthFix",
            style: { "height": "25px" }
          }),
          vue.createElementVNode("text", { class: "font-phone data-v-3382da42 sk-transparent sk-text-14-2857-741 sk-text" }, "\u7535\u8BDD")
        ])
      ]),
      vue.createElementVNode("view", { class: "xinguan-form data-v-3382da42" }, [
        vue.createElementVNode("view", { class: "form data-v-3382da42" }, [
          vue.createElementVNode("text", { class: "data-v-3382da42 sk-transparent sk-text-14-2857-158 sk-text" }, "\u771F\u5B9E\u59D3\u540D"),
          vue.createElementVNode("view", {
            class: "data-v-3382da42 sk-image",
            placeholder: "\u8BF7\u8F93\u5165\u771F\u5B9E\u59D3\u540D",
            "placeholder-style": "place-style",
            type: "text",
            value: "true"
          })
        ]),
        vue.createElementVNode("view", { class: "form data-v-3382da42" }, [
          vue.createElementVNode("text", { class: "data-v-3382da42 sk-transparent sk-text-14-2857-251 sk-text" }, "\u8EAB\u4EFD\u8BC1"),
          vue.createElementVNode("view", {
            class: "data-v-3382da42 sk-image",
            placeholder: "\u8BF7\u8F93\u5165\u8EAB\u4EFD\u8BC1",
            "placeholder-style": "place-style",
            type: "text",
            value: "true"
          })
        ]),
        vue.createElementVNode("view", { class: "form data-v-3382da42" }, [
          vue.createElementVNode("text", { class: "data-v-3382da42 sk-transparent sk-text-14-2857-733 sk-text" }, "\u624B\u673A\u53F7"),
          vue.createElementVNode("view", {
            class: "data-v-3382da42 sk-image",
            placeholder: "\u8BF7\u8F93\u5165\u624B\u673A\u53F7",
            "placeholder-style": "place-style",
            type: "text",
            value: "true"
          })
        ])
      ]),
      vue.createElementVNode("view", { class: "reserve-time data-v-3382da42" }, [
        vue.createElementVNode("text", { class: "reserve-tit text-black data-v-3382da42 sk-transparent sk-text-14-2857-64 sk-text" }, "\u9009\u62E9\u9884\u7EA6\u65F6\u6BB5"),
        vue.createElementVNode("scroll-view", {
          class: "scroll-view_H data-v-3382da42",
          "scroll-x": "true"
        }, [
          vue.createElementVNode("view", { class: "selected scroll data-v-3382da42" }, [
            vue.createElementVNode("view", { class: "scroll-item data-v-3382da42" }, [
              vue.createElementVNode("text", { class: "data-v-3382da42 sk-transparent sk-text-14-2857-760 sk-text" }, "12-18"),
              vue.createElementVNode("text", { class: "data-v-3382da42 sk-transparent sk-text-14-2857-254 sk-text" }, "\u661F\u671F\u4E00")
            ])
          ]),
          vue.createElementVNode("view", { class: "scroll data-v-3382da42" }, [
            vue.createElementVNode("view", { class: "scroll-item data-v-3382da42" }, [
              vue.createElementVNode("text", { class: "data-v-3382da42 sk-transparent sk-text-14-2857-333 sk-text" }, "12-19"),
              vue.createElementVNode("text", { class: "data-v-3382da42 sk-transparent sk-text-14-2857-464 sk-text" }, "\u661F\u671F\u4E8C")
            ])
          ]),
          vue.createElementVNode("view", { class: "scroll data-v-3382da42" }, [
            vue.createElementVNode("view", { class: "scroll-item data-v-3382da42" }, [
              vue.createElementVNode("text", { class: "data-v-3382da42 sk-transparent sk-text-14-2857-550 sk-text" }, "12-20"),
              vue.createElementVNode("text", { class: "data-v-3382da42 sk-transparent sk-text-14-2857-502 sk-text" }, "\u661F\u671F\u4E09")
            ])
          ]),
          vue.createElementVNode("view", { class: "scroll data-v-3382da42" }, [
            vue.createElementVNode("view", { class: "scroll-item data-v-3382da42" }, [
              vue.createElementVNode("text", { class: "data-v-3382da42 sk-transparent sk-text-14-2857-887 sk-text" }, "12-21"),
              vue.createElementVNode("text", { class: "data-v-3382da42 sk-transparent sk-text-14-2857-409 sk-text" }, "\u661F\u671F\u56DB")
            ])
          ]),
          vue.createElementVNode("view", { class: "scroll data-v-3382da42" }, [
            vue.createElementVNode("view", { class: "scroll-item data-v-3382da42" }, [
              vue.createElementVNode("text", { class: "data-v-3382da42 sk-transparent sk-text-14-2857-329 sk-text" }, "12-22"),
              vue.createElementVNode("text", { class: "data-v-3382da42 sk-transparent sk-text-14-2857-562 sk-text" }, "\u661F\u671F\u4E94")
            ])
          ]),
          vue.createElementVNode("view", { class: "scroll data-v-3382da42" }, [
            vue.createElementVNode("view", { class: "scroll-item data-v-3382da42" }, [
              vue.createElementVNode("text", { class: "data-v-3382da42 sk-transparent sk-text-14-2857-41 sk-text" }, "12-23"),
              vue.createElementVNode("text", { class: "data-v-3382da42 sk-transparent sk-text-14-2857-253 sk-text" }, "\u661F\u671F\u516D")
            ])
          ])
        ])
      ]),
      vue.createElementVNode("view", { class: "nucleic-method data-v-3382da42" }, [
        vue.createElementVNode("text", { class: "text-black data-v-3382da42 sk-transparent sk-text-14-2857-553 sk-text" }, "\u54BD\u62ED\u5B50\u91C7\u6837\u65B9\u5F0F"),
        vue.createElementVNode("view", { class: "method-item data-v-3382da42" }, [
          vue.createElementVNode("text", { class: "method data-v-3382da42 sk-transparent sk-text-14-2857-73 sk-text" }, "\u91C7\u96C6\u65B9\u5F0F"),
          vue.createElementVNode("view", { class: "method-txt data-v-3382da42 sk-transparent sk-text-14-2857-272 sk-text" }, "\u76EE\u524D\u4E3B\u8981\u91C7\u96C6\u65B9\u6CD5\u4E3A\u53E3\u54BD\u62ED\u5B50\uFF0C\u64CD\u4F5C\u76F8 \u5BF9\u7B80\u5355\uFF0C\u523A\u6FC0\u6027\u5C0F\u3002")
        ])
      ]),
      vue.createElementVNode("view", { class: "btn data-v-3382da42" }, [
        vue.createElementVNode("text", {
          class: "check-price data-v-3382da42 sk-transparent sk-text-31-2500-628 sk-text",
          style: { "background-position-x": "50%" }
        }, "\u68C0\u6D4B\u8D39\u7528: \uFFE520"),
        vue.createElementVNode("text", {
          class: "submit data-v-3382da42 sk-transparent sk-text-14-2857-254 sk-text",
          style: { "background-position-x": "50%" }
        }, "\u63D0\u4EA4")
      ])
    ]);
  }
  var Skeleton$1 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$1], ["__scopeId", "data-v-62a3cbf4"], ["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/skeleton/nucleic-acid.vue"]]);
  const _sfc_main$8 = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props) {
      let s_show = vue.ref(true);
      let nucleic_data = vue.reactive({
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
      vue.onMounted(async () => {
        const res = await RequestApi.NuataGet();
        nucleic_data.data = res.data.data[0];
        s_show.value = false;
      });
      const activeIndex = vue.ref(0);
      const makePhoneCall = () => {
        uni.makePhoneCall({
          phoneNumber: nucleic_data.data.phone
        });
      };
      const submitData = vue.reactive({
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
        uni.showLoading({
          title: "\u63D0\u4EA4\u4E2D",
          mask: true
        });
        const res = await RequestApi.ResNuata(submitData);
        formatAppLog("log", "at pages/nucleic-acid/index.vue:122", res);
        if (res.statusCode == 200) {
          uni.hideLoading();
          uni.navigateTo({
            url: "/pages/my-service/nucleic-acid/index"
          });
        }
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createCommentVNode(" \u4EF7\u683C\u548C\u670D\u52A1 "),
          vue.createElementVNode("view", { class: "nucleic-top" }, [
            vue.createElementVNode("view", { class: "nucleic-price" }, [
              vue.createElementVNode("view", { class: "price-left" }, [
                vue.createElementVNode("image", {
                  src: vue.unref(nucleic_data).data.logo,
                  mode: "aspectlete"
                }, null, 8, ["src"])
              ]),
              vue.createElementVNode("view", { class: "price-right" }, [
                vue.createElementVNode("text", { class: "price-tit" }, vue.toDisplayString(vue.unref(nucleic_data).data.name), 1),
                vue.createElementVNode("text", { class: "price-num" }, "\uFFE5" + vue.toDisplayString(vue.unref(nucleic_data).data.price), 1)
              ])
            ]),
            vue.createElementVNode("view", { class: "nucleic-service" }, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(nucleic_data).data.boon, (item, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: "service-item",
                  key: index
                }, [
                  vue.createElementVNode("icon", {
                    class: "icon-box-img",
                    type: "success",
                    size: "15"
                  }),
                  vue.createElementVNode("text", null, vue.toDisplayString(item), 1)
                ]);
              }), 128))
            ])
          ]),
          vue.createCommentVNode(" \u5730\u5740 "),
          vue.createElementVNode("view", { class: "nucleic-address" }, [
            vue.createElementVNode("view", { class: "address-item" }, [
              vue.createElementVNode("text", { class: "text-weight" }, vue.toDisplayString(vue.unref(nucleic_data).data.hospital), 1),
              vue.createElementVNode("text", null, vue.toDisplayString(vue.unref(nucleic_data).data.address), 1)
            ]),
            vue.createElementVNode("view", {
              class: "address-item",
              onClick: makePhoneCall
            }, [
              vue.createElementVNode("image", {
                src: "/static/other/dianhua.svg",
                mode: "widthFix"
              }),
              vue.createElementVNode("text", { class: "font-phone" }, "\u7535\u8BDD")
            ])
          ]),
          vue.createCommentVNode(" \u8868\u5355 "),
          vue.createElementVNode("view", { class: "xinguan-form" }, [
            vue.createElementVNode("view", { class: "form" }, [
              vue.createElementVNode("text", null, "\u771F\u5B9E\u59D3\u540D"),
              vue.withDirectives(vue.createElementVNode("input", {
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => submitData.name = $event),
                type: "text",
                placeholder: "\u8BF7\u8F93\u5165\u771F\u5B9E\u59D3\u540D",
                "placeholder-style": "place-style"
              }, null, 512), [
                [vue.vModelText, submitData.name]
              ])
            ]),
            vue.createElementVNode("view", { class: "form" }, [
              vue.createElementVNode("text", null, "\u8EAB\u4EFD\u8BC1"),
              vue.withDirectives(vue.createElementVNode("input", {
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => submitData.id_card = $event),
                type: "text",
                placeholder: "\u8BF7\u8F93\u5165\u8EAB\u4EFD\u8BC1",
                "placeholder-style": "place-style"
              }, null, 512), [
                [vue.vModelText, submitData.id_card]
              ])
            ]),
            vue.createElementVNode("view", { class: "form" }, [
              vue.createElementVNode("text", null, "\u624B\u673A\u53F7"),
              vue.withDirectives(vue.createElementVNode("input", {
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => submitData.phone = $event),
                type: "text",
                placeholder: "\u8BF7\u8F93\u5165\u624B\u673A\u53F7",
                "placeholder-style": "place-style"
              }, null, 512), [
                [vue.vModelText, submitData.phone]
              ])
            ])
          ]),
          vue.createCommentVNode(" \u9884\u7EA6\u65F6\u6BB5 "),
          vue.createElementVNode("view", { class: "reserve-time" }, [
            vue.createElementVNode("text", { class: "reserve-tit text-black" }, "\u9009\u62E9\u9884\u7EA6\u65F6\u6BB5"),
            vue.createElementVNode("scroll-view", {
              "scroll-x": "true",
              class: "scroll-view_H"
            }, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(nucleic_data).data.date, (item, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  onClick: ($event) => to_reserve(index, item.date),
                  class: vue.normalizeClass([index == activeIndex.value ? "selected" : "", "scroll"]),
                  key: index
                }, [
                  vue.createElementVNode("view", { class: "scroll-item" }, [
                    vue.createElementVNode("text", null, vue.toDisplayString(item.date), 1),
                    vue.createElementVNode("text", null, vue.toDisplayString(item.week), 1)
                  ])
                ], 10, ["onClick"]);
              }), 128))
            ])
          ]),
          vue.createCommentVNode(" \u91C7\u6837\u65B9\u5F0F "),
          vue.createElementVNode("view", { class: "nucleic-method" }, [
            vue.createElementVNode("text", { class: "text-black" }, "\u54BD\u62ED\u5B50\u91C7\u6837\u65B9\u5F0F"),
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(nucleic_data).data.style, (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "method-item",
                key: index
              }, [
                vue.createElementVNode("text", { class: "method" }, vue.toDisplayString(item.title), 1),
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(item.desc, (item_a, index_a) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    class: "method-txt",
                    key: index_a
                  }, vue.toDisplayString(item_a), 1);
                }), 128))
              ]);
            }), 128))
          ]),
          vue.createElementVNode("view", { style: { "height": "300rpx" } }),
          vue.createCommentVNode(" \u6309\u94AE "),
          vue.createElementVNode("view", { class: "btn" }, [
            vue.createElementVNode("text", { class: "check-price" }, "\u68C0\u6D4B\u8D39\u7528: \uFFE5" + vue.toDisplayString(vue.unref(nucleic_data).data.price), 1),
            vue.createElementVNode("text", {
              class: "submit",
              onClick: Submit
            }, "\u63D0\u4EA4")
          ]),
          vue.unref(s_show) ? (vue.openBlock(), vue.createBlock(Skeleton$1, { key: 0 })) : vue.createCommentVNode("v-if", true)
        ], 64);
      };
    }
  });
  var PagesNucleicAcidIndex = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-3382da42"], ["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/pages/nucleic-acid/index.vue"]]);
  const _sfc_main$7 = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props) {
      let order = vue.ref([]);
      let show = vue.ref(false);
      onShow(async () => {
        const res = await RequestApi.HpvuserOrder();
        order.value = res.data.data;
        if (res.data.data.length == 0) {
          show.value = true;
        }
      });
      const Cancel = async (id, index) => {
        await RequestApi.HpvCancel({ _id: id });
        order.value[index].cancel = false;
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(order), (item, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "vaccine-order",
              key: index
            }, [
              vue.createElementVNode("view", { class: "order-tit" }, vue.toDisplayString(item.hpv_name), 1),
              vue.createElementVNode("view", { class: "order-message" }, [
                vue.createElementVNode("text", null, "\u63A5\u79CD\u4EBA: "),
                vue.createElementVNode("text", { class: "message" }, vue.toDisplayString(item.name), 1)
              ]),
              vue.createElementVNode("view", { class: "order-message" }, [
                vue.createElementVNode("text", null, "\u63A5\u79CD\u5730\u70B9: "),
                vue.createElementVNode("text", { class: "message" }, vue.toDisplayString(item.address), 1)
              ]),
              vue.createElementVNode("view", { class: "order-message" }, [
                vue.createElementVNode("text", null, "\u75AB\u82D7\u5957\u9910: "),
                vue.createElementVNode("text", { class: "message" }, vue.toDisplayString(item.ino_time) + " " + vue.toDisplayString(item.combo), 1)
              ]),
              vue.createElementVNode("view", { class: "order-message" }, [
                vue.createElementVNode("text", null, "\u8BA2\u5355\u7F16\u53F7: "),
                vue.createElementVNode("text", { class: "message" }, vue.toDisplayString(item.order_number), 1)
              ]),
              vue.createElementVNode("view", { class: "order-price" }, [
                vue.createElementVNode("text", null, "\uFFE5" + vue.toDisplayString(item.price), 1)
              ]),
              vue.createElementVNode("view", { class: "cancel-btn" }, [
                vue.createElementVNode("text", {
                  onClick: ($event) => Cancel(item._id, index),
                  class: vue.normalizeClass(item.cancel ? "to-cancel" : "canceled")
                }, vue.toDisplayString(item.cancel ? "\u53D6\u6D88\u9884\u7EA6" : "\u5DF2\u53D6\u6D88\u9884\u7EA6"), 11, ["onClick"])
              ])
            ]);
          }), 128)),
          vue.createVNode(Point, { show: vue.unref(show) }, null, 8, ["show"]),
          vue.createElementVNode("view", { style: { "height": "300rpx" } })
        ], 64);
      };
    }
  });
  var PagesMyServiceHpvViewIndex = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-f954fea4"], ["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/pages/my-service/hpv-view/index.vue"]]);
  const _sfc_main$6 = {};
  function _sfc_render(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "sk-container" }, [
      vue.createElementVNode("view", { class: "hpv-top" }, [
        vue.createElementVNode("image", {
          mode: "aspectFill",
          class: "sk-image"
        }),
        vue.createElementVNode("view", { class: "hpv-tab" }, [
          vue.createElementVNode("view", { class: "tab-item" }, [
            vue.createElementVNode("text", { class: "sk-transparent sk-text-14-2857-623 sk-text" }, "\u5168\u90E8"),
            vue.createElementVNode("text", { class: "selected" })
          ]),
          vue.createElementVNode("view", { class: "tab-item" }, [
            vue.createElementVNode("text", { class: "sk-transparent sk-text-14-2857-108 sk-text" }, "9\u4EF7HPV"),
            vue.createElementVNode("text")
          ]),
          vue.createElementVNode("view", { class: "tab-item" }, [
            vue.createElementVNode("text", { class: "sk-transparent sk-text-14-2857-863 sk-text" }, "4\u4EF7HPV"),
            vue.createElementVNode("text")
          ]),
          vue.createElementVNode("view", { class: "tab-item" }, [
            vue.createElementVNode("text", { class: "sk-transparent sk-text-14-2857-946 sk-text" }, "2\u4EF7HPV"),
            vue.createElementVNode("text")
          ])
        ])
      ]),
      vue.createElementVNode("view", { class: "hpv-list" }, [
        vue.createElementVNode("view", { class: "list-item" }, [
          vue.createElementVNode("view", { class: "list-left" }, [
            vue.createElementVNode("text", { class: "hpv-name sk-transparent sk-text-14-2857-333 sk-text" }, "9\u4EF7HPV\u75AB\u82D7"),
            vue.createElementVNode("view", { class: "hpv-desc" }, [
              vue.createElementVNode("text", { class: "desc-item sk-transparent sk-text-0-0000-89 sk-text" }, "16-26\u5C81"),
              vue.createElementVNode("text", { class: "desc-item sk-transparent sk-text-0-0000-419 sk-text" }, "\u63A5\u79CD\u4E09\u9488")
            ]),
            vue.createElementVNode("text", { class: "hpv-price sk-transparent sk-text-14-2857-605 sk-text" }, "\uFFE55780-\uFFE59280")
          ]),
          vue.createElementVNode("view", { class: "list-right" }, [
            vue.createElementVNode("button", { class: "sk-transparent sk-button sk-pseudo sk-pseudo-circle" }, "\u53BB\u9884\u7EA6")
          ])
        ]),
        vue.createElementVNode("view", { class: "list-item" }, [
          vue.createElementVNode("view", { class: "list-left" }, [
            vue.createElementVNode("text", { class: "hpv-name sk-transparent sk-text-14-2857-480 sk-text" }, "\u56FD\u4EA79\u4EF7HPV\u75AB\u82D7"),
            vue.createElementVNode("view", { class: "hpv-desc" }, [
              vue.createElementVNode("text", { class: "desc-item sk-transparent sk-text-0-0000-573 sk-text" }, "16-26\u5C81"),
              vue.createElementVNode("text", { class: "desc-item sk-transparent sk-text-0-0000-604 sk-text" }, "\u4EAB200\u5143\u5927\u989D\u5238\u8865\u8D34")
            ]),
            vue.createElementVNode("text", { class: "hpv-price sk-transparent sk-text-14-2857-497 sk-text" }, "\uFFE53000-\uFFE55300")
          ]),
          vue.createElementVNode("view", { class: "list-right" }, [
            vue.createElementVNode("button", { class: "sk-transparent sk-button sk-pseudo sk-pseudo-circle" }, "\u53BB\u9884\u7EA6")
          ])
        ]),
        vue.createElementVNode("view", { class: "list-item" }, [
          vue.createElementVNode("view", { class: "list-left" }, [
            vue.createElementVNode("text", { class: "hpv-name sk-transparent sk-text-14-2857-243 sk-text" }, "4\u4EF7HPV\u75AB\u82D7"),
            vue.createElementVNode("view", { class: "hpv-desc" }, [
              vue.createElementVNode("text", { class: "desc-item sk-transparent sk-text-0-0000-294 sk-text" }, "20-45\u5C81"),
              vue.createElementVNode("text", { class: "desc-item sk-transparent sk-text-0-0000-879 sk-text" }, "\u63A5\u79CD\u4E09\u9488")
            ]),
            vue.createElementVNode("text", { class: "hpv-price sk-transparent sk-text-14-2857-199 sk-text" }, "\uFFE53600-\uFFE54560")
          ]),
          vue.createElementVNode("view", { class: "list-right" }, [
            vue.createElementVNode("button", { class: "sk-transparent sk-button sk-pseudo sk-pseudo-circle" }, "\u53BB\u9884\u7EA6")
          ])
        ])
      ])
    ]);
  }
  var Skeleton = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render], ["__scopeId", "data-v-6b907bed"], ["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/skeleton/hpv-vaccine.vue"]]);
  const _sfc_main$5 = /* @__PURE__ */ vue.defineComponent({
    __name: "hpv-vaccine",
    setup(__props) {
      let s_show = vue.ref(true);
      let hpv_list = vue.ref([]);
      let hpv_select = vue.ref([]);
      let hpv_all = vue.ref([]);
      let currIndex = vue.ref(0);
      vue.onMounted(async () => {
        const res = await RequestApi.OtuHpv();
        hpv_select.value = res.data.data[0].hpv_select;
        hpv_list.value = res.data.data[0].hpv_list;
        hpv_all.value = res.data.data[0].hpv_list;
        s_show.value = false;
      });
      const changeList = (id, index) => {
        currIndex.value = index;
        if (id == "26da8e4962dc565503df9629704f1700") {
          hpv_list.value = hpv_all.value;
        } else {
          hpv_list.value = hpv_all.value.filter((item) => item.hpv_id == id);
        }
      };
      const reserve = (_id, name, price, describe) => {
        let obj = JSON.stringify({ _id, name, price, describe });
        uni.navigateTo({
          url: "/pages/hpv-vaccine/hpv-buy?value=" + obj
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createElementVNode("view", { class: "hpv-top" }, [
            vue.createElementVNode("image", {
              src: "https://qita-1252107261.cos.ap-chengdu.myqcloud.com/yiliao/gongjinai.jpg",
              mode: "aspectFill"
            }),
            vue.createElementVNode("view", { class: "hpv-tab" }, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(hpv_select), (item, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: "tab-item",
                  key: index,
                  onClick: ($event) => changeList(item._id, index)
                }, [
                  vue.createElementVNode("text", null, vue.toDisplayString(item.name), 1),
                  vue.createElementVNode("text", {
                    class: vue.normalizeClass(index == vue.unref(currIndex) ? "selected" : "")
                  }, null, 2)
                ], 8, ["onClick"]);
              }), 128))
            ])
          ]),
          vue.createCommentVNode(" hpv\u75AB\u82D7\u5217\u8868 "),
          vue.createElementVNode("view", { class: "hpv-list" }, [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(hpv_list), (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "list-item",
                key: index
              }, [
                vue.createElementVNode("view", { class: "list-left" }, [
                  vue.createElementVNode("text", { class: "hpv-name" }, vue.toDisplayString(item.name), 1),
                  vue.createElementVNode("view", { class: "hpv-desc" }, [
                    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(item.describe, (item_a, index_a) => {
                      return vue.openBlock(), vue.createElementBlock("text", {
                        class: "desc-item",
                        key: index_a
                      }, vue.toDisplayString(item_a), 1);
                    }), 128))
                  ]),
                  vue.createElementVNode("text", { class: "hpv-price" }, "\uFFE5" + vue.toDisplayString(item.price[0]) + "-\uFFE5" + vue.toDisplayString(item.price[1]), 1)
                ]),
                vue.createElementVNode("view", { class: "list-right" }, [
                  vue.createElementVNode("button", {
                    onClick: ($event) => reserve(item._id, item.name, item.price, item.describe)
                  }, "\u53BB\u9884\u7EA6", 8, ["onClick"])
                ])
              ]);
            }), 128))
          ]),
          vue.unref(s_show) ? (vue.openBlock(), vue.createBlock(Skeleton, { key: 0 })) : vue.createCommentVNode("v-if", true)
        ], 64);
      };
    }
  });
  var PagesHpvVaccineHpvVaccine = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/pages/hpv-vaccine/hpv-vaccine.vue"]]);
  const _sfc_main$4 = /* @__PURE__ */ vue.defineComponent({
    __name: "hpv-buy",
    setup(__props) {
      let combo_name = vue.ref([]);
      let combo_time = vue.ref([]);
      let Name = vue.ref(-1);
      let Time = vue.ref(-1);
      let router_data = vue.reactive({
        _id: "",
        name: "",
        price: ["0"],
        describe: ["0"]
      });
      onLoad(async (event) => {
        formatAppLog("log", "at pages/hpv-vaccine/hpv-buy.vue:98", event);
        const { _id, name, price: price2, describe } = JSON.parse(event.value);
        router_data._id = _id;
        router_data.name = name;
        router_data.price = price2;
        router_data.describe = describe;
        const res = await RequestApi.HpvPack();
        combo_name.value = [res.data.data[0]];
        combo_time.value = [res.data.data[1]];
      });
      let name_id = vue.ref("");
      let comboName = vue.ref("");
      let time_id = vue.ref("");
      let comboTime = vue.ref("");
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
      vue.watch([name_id, time_id], (newVal, oldVal) => {
        if (newVal[0] != "" && newVal[1] != "") {
          name_id.value = newVal[0];
          time_id.value = newVal[1];
          uni.showLoading({
            title: "\u8BA1\u7B97\u4EF7\u683C\u4E2D",
            mask: true
          });
          getPrice();
        }
      });
      let price = vue.ref(0);
      const getPrice = async () => {
        const res = await RequestApi.HpvPrice({ hpv_id: router_data._id, combo_id: name_id.value, time_id: time_id.value });
        price.value = res.data.data[0].price;
        uni.hideLoading();
      };
      let gender = vue.ref("");
      const changeSelector = (event) => {
        gender.value = event.detail.value == "0" ? "\u7537" : "\u5973";
      };
      let born_date = vue.ref("");
      const changeDate = (event) => {
        born_date.value = event.detail.value;
      };
      let submitData = vue.reactive({
        name: "",
        id_card: "",
        gender,
        born_date,
        phone: "",
        combo: comboName,
        ino_time: comboTime,
        price,
        hpv_name: vue.toRefs(router_data).name
      });
      const Submit = async () => {
        uni.showLoading({
          title: "\u63D0\u4EA4\u4E2D",
          mask: true
        });
        const res = await RequestApi.ResHpv(submitData);
        if (res.statusCode == 200) {
          uni.hideLoading();
          uni.redirectTo({
            url: "/pages/my-service/hpv-view/index"
          });
        }
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createElementVNode("view", { class: "taocan-top" }, [
            vue.createElementVNode("view", { class: "top-left" }, [
              vue.createElementVNode("text", { class: "hpv-name" }, vue.toDisplayString(vue.unref(router_data).name), 1),
              vue.createElementVNode("view", { class: "hpv-desc" }, [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(router_data).describe, (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("text", {
                    class: "desc-item",
                    key: index
                  }, vue.toDisplayString(item), 1);
                }), 128))
              ])
            ]),
            vue.createElementVNode("view", { class: "top-right" }, [
              vue.createElementVNode("text", { class: "hpv-price" }, "\uFFE5" + vue.toDisplayString(vue.unref(router_data).price[0]) + "-\uFFE5" + vue.toDisplayString(vue.unref(router_data).price[1]), 1)
            ])
          ]),
          vue.createCommentVNode(" \u9884\u7EA6hpv\uFF0C\u8868\u5355\u586B\u5199 "),
          vue.createElementVNode("view", { class: "hpv-form" }, [
            vue.createElementVNode("view", { class: "form" }, [
              vue.createElementVNode("text", null, "\u771F\u5B9E\u59D3\u540D"),
              vue.withDirectives(vue.createElementVNode("input", {
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.unref(submitData).name = $event),
                placeholder: "\u8BF7\u8F93\u5165\u771F\u5B9E\u59D3\u540D",
                "placeholder-style": "place-style",
                type: "text"
              }, null, 512), [
                [vue.vModelText, vue.unref(submitData).name]
              ])
            ]),
            vue.createElementVNode("view", { class: "form" }, [
              vue.createElementVNode("text", null, "\u8EAB\u4EFD\u8BC1"),
              vue.withDirectives(vue.createElementVNode("input", {
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => vue.unref(submitData).id_card = $event),
                placeholder: "\u8BF7\u8F93\u5165\u8EAB\u4EFD\u8BC1",
                "placeholder-style": "place-style",
                type: "text"
              }, null, 512), [
                [vue.vModelText, vue.unref(submitData).id_card]
              ])
            ]),
            vue.createElementVNode("view", { class: "form" }, [
              vue.createElementVNode("text", null, "\u6027\u522B"),
              vue.createElementVNode("picker", {
                mode: "selector",
                range: ["\u7537", "\u5973"],
                onChange: changeSelector
              }, [
                vue.createElementVNode("view", { class: "choose-picker" }, [
                  vue.createElementVNode("text", null, vue.toDisplayString(vue.unref(gender) == "" ? "\u8BF7\u9009\u62E9\u6027\u522B" : vue.unref(gender)), 1),
                  vue.createElementVNode("image", {
                    src: "/static/other/gengduo.svg",
                    mode: ""
                  })
                ])
              ], 32)
            ]),
            vue.createElementVNode("view", { class: "form" }, [
              vue.createElementVNode("text", null, "\u51FA\u751F\u65E5\u671F"),
              vue.createElementVNode("picker", {
                mode: "date",
                onChange: changeDate
              }, [
                vue.createElementVNode("view", { class: "choose-picker" }, [
                  vue.createElementVNode("text", null, vue.toDisplayString(vue.unref(born_date) == "" ? "\u8BF7\u9009\u62E9\u51FA\u751F\u65E5\u671F" : vue.unref(born_date)), 1),
                  vue.createElementVNode("image", {
                    src: "/static/other/gengduo.svg",
                    mode: ""
                  })
                ])
              ], 32)
            ]),
            vue.createElementVNode("view", { class: "form" }, [
              vue.createElementVNode("text", null, "\u624B\u673A\u53F7"),
              vue.withDirectives(vue.createElementVNode("input", {
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => vue.unref(submitData).phone = $event),
                type: "number",
                placeholder: "\u8BF7\u8F93\u5165\u624B\u673A\u53F7",
                "placeholder-style": "place-style"
              }, null, 512), [
                [vue.vModelText, vue.unref(submitData).phone]
              ])
            ])
          ]),
          vue.createCommentVNode(" \u5957\u9910\u540D\u79F0\uFF0C\u63A5\u79CD\u65F6\u95F4\u7684\u9009\u62E9 "),
          vue.createElementVNode("view", { class: "hpv-choose" }, [
            vue.createCommentVNode(" \u5957\u9910\u540D\u79F0 "),
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(combo_name), (item, index) => {
              return vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: index }, [
                vue.createElementVNode("text", { class: "choose-tit" }, vue.toDisplayString(item.title), 1),
                vue.createElementVNode("view", { class: "choose-name" }, [
                  (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(item.name, (item_a, index_a) => {
                    return vue.openBlock(), vue.createElementBlock("text", {
                      class: vue.normalizeClass([index_a == vue.unref(Name) ? "selected" : "", "name-item"]),
                      key: index_a,
                      onClick: ($event) => selectName(index_a, item_a.combo_id, item_a.combo)
                    }, vue.toDisplayString(item_a.combo), 11, ["onClick"]);
                  }), 128))
                ])
              ], 64);
            }), 128)),
            vue.createCommentVNode(" \u63A5\u79CD\u65F6\u95F4 "),
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(combo_time), (item, index) => {
              return vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: index }, [
                vue.createElementVNode("text", { class: "choose-tit" }, vue.toDisplayString(item.title), 1),
                vue.createElementVNode("view", { class: "choose-name" }, [
                  (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(item.name, (item_a, index_a) => {
                    return vue.openBlock(), vue.createElementBlock("text", {
                      class: vue.normalizeClass([index_a == vue.unref(Time) ? "selected" : "", "name-item"]),
                      key: index_a,
                      onClick: ($event) => selectTime(index_a, item_a.time_id, item_a.time)
                    }, vue.toDisplayString(item_a.time), 11, ["onClick"]);
                  }), 128))
                ])
              ], 64);
            }), 128))
          ]),
          vue.createCommentVNode(" \u5E95\u90E8\u6309\u94AE\uFF0C\u5408\u8BA1\uFF0C\u63D0\u4EA4 "),
          vue.createElementVNode("view", { class: "footer" }, [
            vue.createElementVNode("text", { class: "all-price" }, "\u5408\u8BA1\uFF1A\uFFE5" + vue.toDisplayString(vue.unref(price)), 1),
            vue.createElementVNode("text", {
              class: "submit",
              onClick: Submit
            }, "\u63D0\u4EA4")
          ]),
          vue.createElementVNode("view", { style: { "height": "300rpx" } })
        ], 64);
      };
    }
  });
  var PagesHpvVaccineHpvBuy = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-c4e399cc"], ["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/pages/hpv-vaccine/hpv-buy.vue"]]);
  const _sfc_main$3 = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props) {
      let order = vue.ref([]);
      let show = vue.ref(false);
      onShow(async () => {
        const res = await RequestApi.CoviduserOrder();
        order.value = res.data.data;
        if (res.data.data.length == 0) {
          show.value = true;
        }
      });
      const Cancel = async (id, index) => {
        await RequestApi.CovidCancel({ _id: id });
        order.value[index].cancel = false;
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createElementVNode("view", null, [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(order), (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "vaccine-order",
                key: index
              }, [
                vue.createElementVNode("view", { class: "order-tit" }, vue.toDisplayString(item.name), 1),
                vue.createElementVNode("view", { class: "order-message" }, [
                  vue.createElementVNode("text", null, "\u63A5\u79CD\u5730\u70B9: "),
                  vue.createElementVNode("text", { class: "message" }, vue.toDisplayString(item.address), 1)
                ]),
                vue.createElementVNode("view", { class: "order-message" }, [
                  vue.createElementVNode("text", null, "\u75AB\u82D7\u5382\u5546: "),
                  vue.createElementVNode("text", { class: "message" }, vue.toDisplayString(item.company), 1)
                ]),
                vue.createElementVNode("view", { class: "order-message" }, [
                  vue.createElementVNode("text", null, "\u63A5\u79CD\u65F6\u95F4: "),
                  vue.createElementVNode("text", { class: "message" }, vue.toDisplayString(item.date) + " " + vue.toDisplayString(item.period), 1)
                ]),
                vue.createElementVNode("view", { class: "cancel-btn" }, [
                  vue.createElementVNode("text", {
                    onClick: ($event) => Cancel(item._id, index),
                    class: vue.normalizeClass(item.cancel ? "to-cancel" : "canceled")
                  }, vue.toDisplayString(item.cancel ? "\u53D6\u6D88\u9884\u7EA6" : "\u5DF2\u53D6\u6D88\u9884\u7EA6"), 11, ["onClick"])
                ])
              ]);
            }), 128))
          ]),
          vue.createVNode(Point, { show: vue.unref(show) }, null, 8, ["show"]),
          vue.createElementVNode("view", { style: { "height": "300rpx" } })
        ], 64);
      };
    }
  });
  var PagesMyServiceXinguanIndex = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-4e24fc04"], ["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/pages/my-service/xinguan/index.vue"]]);
  const _sfc_main$2 = /* @__PURE__ */ vue.defineComponent({
    __name: "xinguan-vaccine",
    setup(__props) {
      let timeIndex = vue.ref("");
      let time_data = vue.reactive({
        data: {
          Hospital: "",
          address: "",
          company: [],
          lasting: [],
          week: [],
          _id: ""
        }
      });
      let submitData = vue.reactive({
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
      vue.onMounted(async () => {
        const res = await RequestApi.NewappTime();
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
        uni.navigateBack({
          delta: 1
        });
      };
      const submit = async () => {
        const res = await RequestApi.ResCovid(submitData);
        if (res.statusCode == 200) {
          uni.navigateTo({
            url: "/pages/my-service/xinguan/index"
          });
        }
      };
      let selector_data = vue.ref([
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
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createElementVNode("view", { class: "xinguan-form" }, [
            vue.createElementVNode("view", { class: "form" }, [
              vue.createElementVNode("text", null, "\u59D3\u540D"),
              vue.withDirectives(vue.createElementVNode("input", {
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.unref(submitData).name = $event),
                type: "text",
                placeholder: "\u8BF7\u8F93\u5165\u59D3\u540D",
                "placeholder-style": "place-style"
              }, null, 512), [
                [vue.vModelText, vue.unref(submitData).name]
              ])
            ]),
            vue.createElementVNode("view", { class: "form" }, [
              vue.createElementVNode("text", null, "\u8EAB\u4EFD\u8BC1"),
              vue.withDirectives(vue.createElementVNode("input", {
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => vue.unref(submitData).id_card = $event),
                type: "text",
                placeholder: "\u8BF7\u8F93\u5165\u8EAB\u4EFD\u8BC1",
                "placeholder-style": "place-style"
              }, null, 512), [
                [vue.vModelText, vue.unref(submitData).id_card]
              ])
            ]),
            vue.createElementVNode("view", { class: "form" }, [
              vue.createElementVNode("text", null, "\u624B\u673A\u53F7"),
              vue.withDirectives(vue.createElementVNode("input", {
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => vue.unref(submitData).phone = $event),
                type: "text",
                placeholder: "\u8BF7\u8F93\u5165\u624B\u673A\u53F7",
                "placeholder-style": "place-style"
              }, null, 512), [
                [vue.vModelText, vue.unref(submitData).phone]
              ])
            ]),
            vue.createElementVNode("view", { class: "form" }, [
              vue.createElementVNode("text", null, "\u73B0\u5C45\u5730\u5740"),
              vue.createElementVNode("picker", {
                mode: "region",
                onChange: changeRegion
              }, [
                vue.createElementVNode("view", { class: "choose-address" }, [
                  vue.createElementVNode("text", null, vue.toDisplayString(vue.unref(submitData).address == "" ? "\u8BF7\u9009\u62E9\u73B0\u5C45\u5730\u5740" : vue.unref(submitData).address), 1),
                  vue.createElementVNode("image", {
                    src: "/static/other/gengduo.svg",
                    mode: "widthFix"
                  })
                ])
              ], 32)
            ]),
            vue.createElementVNode("view", { class: "form" }, [
              vue.createElementVNode("text", null, "\u73B0\u5C45\u8BE6\u7EC6\u5730\u5740"),
              vue.withDirectives(vue.createElementVNode("input", {
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => vue.unref(submitData).de_address = $event),
                type: "text",
                placeholder: "\u8BF7\u8F93\u5165\u73B0\u5C45\u8BE6\u7EC6\u5730\u5740",
                "placeholder-style": "place-style"
              }, null, 512), [
                [vue.vModelText, vue.unref(submitData).de_address]
              ])
            ]),
            vue.createElementVNode("view", { class: "form" }, [
              vue.createElementVNode("text", null, "\u75AB\u82D7\u4EBA\u7FA4\u5206\u7C7B"),
              vue.createElementVNode("picker", {
                mode: "selector",
                range: vue.unref(selector_data),
                onChange: changeSelector
              }, [
                vue.createElementVNode("view", { class: "choose-address" }, [
                  vue.createElementVNode("text", null, vue.toDisplayString(vue.unref(submitData).crowd_sort == "" ? "\u8BF7\u9009\u62E9\u75AB\u82D7\u4EBA\u7FA4\u5206\u7C7B" : vue.unref(submitData).crowd_sort), 1),
                  vue.createElementVNode("image", {
                    src: "/static/other/gengduo.svg",
                    mode: "widthFix"
                  })
                ])
              ], 40, ["range"])
            ])
          ]),
          vue.createCommentVNode(" \u5730\u5740 "),
          vue.createElementVNode("view", { class: "xinguan-address border" }, [
            vue.createElementVNode("text", { class: "font-black" }, vue.toDisplayString(vue.unref(time_data).data.Hospital), 1),
            vue.createElementVNode("text", null, vue.toDisplayString(vue.unref(time_data).data.address), 1),
            vue.createElementVNode("view", { class: "xinguan-firm" }, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(time_data).data.company, (item, index) => {
                return vue.openBlock(), vue.createElementBlock("text", {
                  class: "font-small firm",
                  key: index
                }, vue.toDisplayString(item), 1);
              }), 128))
            ])
          ]),
          vue.createCommentVNode(" \u661F\u671F "),
          vue.createElementVNode("view", { class: "xinguan-week border" }, [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(time_data).data.week, (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                key: index,
                class: vue.normalizeClass(["week-item", vue.unref(submitData).date == item.date ? "checked" : ""]),
                onClick: ($event) => changeWeek(item.date)
              }, [
                vue.createElementVNode("text", null, vue.toDisplayString(item.day), 1),
                vue.createElementVNode("text", null, vue.toDisplayString(item.date), 1),
                vue.createElementVNode("text", null, vue.toDisplayString(item.Have), 1)
              ], 10, ["onClick"]);
            }), 128))
          ]),
          vue.createCommentVNode(" \u4E0A\u5348\u65F6\u6BB5,\u4E0B\u5348\u65F6\u6BB5 "),
          vue.unref(time_data).data.lasting.length > 0 ? (vue.openBlock(true), vue.createElementBlock(vue.Fragment, { key: 0 }, vue.renderList(vue.unref(time_data).data.lasting, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "border xinguan-time",
              key: index
            }, [
              vue.createElementVNode("text", null, vue.toDisplayString(item.period), 1),
              vue.createElementVNode("template", null, [
                vue.createElementVNode("view", { class: "time-flex" }, [
                  (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(item.time, (item_a, index_a) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: vue.normalizeClass(["time", vue.unref(timeIndex) == index + "-" + index_a ? "checked" : ""]),
                      key: index_a,
                      onClick: ($event) => changeTime(index + "-" + index_a, item.period, item_a.start_time, item_a.end_time, item_a.when)
                    }, [
                      vue.createElementVNode("text", null, vue.toDisplayString(item_a.start_time) + "-" + vue.toDisplayString(item_a.end_time), 1),
                      vue.createElementVNode("text", null, "\u5269\u4F59" + vue.toDisplayString(item_a.over), 1)
                    ], 10, ["onClick"]);
                  }), 128))
                ])
              ])
            ]);
          }), 128)) : vue.createCommentVNode("v-if", true),
          vue.createCommentVNode(" \u6309\u94AE "),
          vue.createElementVNode("view", { style: { "height": "200rpx" } }),
          vue.createElementVNode("view", { class: "btn" }, [
            vue.createElementVNode("text", {
              class: "cancel",
              onClick: cancel
            }, "\u53D6\u6D88"),
            vue.createElementVNode("text", {
              class: "submit",
              onClick: submit
            }, "\u63D0\u4EA4\u9884\u7EA6")
          ])
        ], 64);
      };
    }
  });
  var PagesXinguanVaccineXinguanVaccine = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/pages/xinguan-vaccine/xinguan-vaccine.vue"]]);
  const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props) {
      const login = () => {
        uni.getUserProfile({
          desc: "\u83B7\u53D6\u7528\u6237\u4FE1\u606F",
          success: (res) => {
            const { avatarUrl, nickName } = res.userInfo;
            uni.login({
              success(code) {
                uni.showLoading({ title: "\u767B\u9646\u4E2D", mask: true });
                loginApi(avatarUrl, nickName, code.code);
              },
              fail(err) {
                uni.showToast({ title: "\u767B\u5F55\u5931\u8D25", icon: "none", duration: 1e3 });
              }
            });
          },
          fail: (err) => {
            uni.showToast({ title: "\u767B\u5F55\u5931\u8D25", icon: "none", duration: 1e3 });
          }
        });
      };
      const loginApi = async (avatarUrl, nickName, code) => {
        try {
          const obj = { appid: "wxf64cebafedb21c58", secret: "6b1185c47a149f70c66f7b0f85b6d395", nickName, avatarUrl, code };
          const res = await RequestApi.WxLogin(obj);
          uni.setStorageSync("wxuser", res.data.data);
          setTimeout(() => {
            uni.navigateBack({ delta: 1 });
            uni.showToast({ title: "\u767B\u5F55\u6210\u529F", icon: "none", duration: 1e3 });
          }, 600);
        } catch (err) {
          uni.showToast({ title: "\u767B\u5F55\u5931\u8D25", icon: "none", duration: 1e3 });
        }
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "login" }, [
          vue.createElementVNode("image", {
            src: "https://diancan-1252107261.cos.accelerate.myqcloud.com/yiliao/denglu-yemian.jpg",
            mode: "aspectFill"
          }),
          vue.createElementVNode("button", { onClick: login }, "\u6388\u6743\u767B\u5F55")
        ]);
      };
    }
  });
  var PagesLoginPageIndex = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/pages/login-page/index.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/registered/registered", PagesRegisteredRegistered);
  __definePage("pages/doctor/index", PagesDoctorIndex);
  __definePage("pages/doctor/doctor-Homepage", PagesDoctorDoctorHomepage);
  __definePage("pages/mine/mine", PagesMineMine);
  __definePage("pages/my-service/my-registration/index", PagesMyServiceMyRegistrationIndex);
  __definePage("pages/video/video", PagesVideoVideo);
  __definePage("pages/graphics/index", PagesGraphicsIndex);
  __definePage("pages/phy-exam/index", PagesPhyExamIndex);
  __definePage("pages/self-test/topic", PagesSelfTestTopic);
  __definePage("pages/self-test/result", PagesSelfTestResult);
  __definePage("pages/my-service/phy-exam/index", PagesMyServicePhyExamIndex);
  __definePage("pages/phy-exam/Details", PagesPhyExamDetails);
  __definePage("pages/my-service/my-patient/my-patient", PagesMyServiceMyPatientMyPatient);
  __definePage("pages/my-service/my-patient/add-patient", PagesMyServiceMyPatientAddPatient);
  __definePage("pages/my-service/nucleic-acid/index", PagesMyServiceNucleicAcidIndex);
  __definePage("pages/nucleic-acid/index", PagesNucleicAcidIndex);
  __definePage("pages/my-service/hpv-view/index", PagesMyServiceHpvViewIndex);
  __definePage("pages/hpv-vaccine/hpv-vaccine", PagesHpvVaccineHpvVaccine);
  __definePage("pages/hpv-vaccine/hpv-buy", PagesHpvVaccineHpvBuy);
  __definePage("pages/my-service/xinguan/index", PagesMyServiceXinguanIndex);
  __definePage("pages/xinguan-vaccine/xinguan-vaccine", PagesXinguanVaccineXinguanVaccine);
  __definePage("pages/login-page/index", PagesLoginPageIndex);
  const _sfc_main = /* @__PURE__ */ vue.defineComponent({
    __name: "App",
    setup(__props) {
      onLaunch(() => {
        const get_data = uni.getStorageSync("MenuButton");
        if (!get_data) {
          const res = uni.getMenuButtonBoundingClientRect();
          uni.setStorageSync("MenuButton", res);
        }
      });
      return () => {
      };
    }
  });
  var App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "C:/Users/cheer/Desktop/vue3-uni-guahao/src/App.vue"]]);
  const pinia = createPinia();
  function createApp() {
    const app = vue.createVueApp(App);
    app.use(pinia);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue, uni.VueShared);
