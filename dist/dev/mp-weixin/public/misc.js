"use strict";
var common_vendor = require("../common/vendor.js");
const uploadImage = (url, load_title, err_title) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.chooseMedia({
      count: 1,
      mediaType: ["image"],
      sourceType: ["album"],
      sizeType: ["compressed"],
      success: (res) => {
        common_vendor.index.showLoading({ title: load_title, mask: true });
        console.log(res);
        common_vendor.index.uploadFile({
          url,
          filePath: res.tempFiles[0].tempFilePath,
          name: "file",
          header: { accept: "application/json" },
          success: (imgres) => {
            common_vendor.index.hideLoading();
            resolve(imgres);
          },
          fail: (err) => {
            common_vendor.index.showToast({ title: err_title, icon: "error", duration: 100 });
            reject(err);
          }
        });
      }
    });
  });
};
exports.uploadImage = uploadImage;
