"use strict";
var common_vendor = require("../common/vendor.js");
const mydata = common_vendor.defineStore("my_data", {
  state: () => ({
    patient: {}
  }),
  actions: {
    addPatien(value) {
      this.patient = value;
    }
  }
});
exports.mydata = mydata;
