// index.js
import { Record } from "../../models/record";

// 获取应用实例
const app = getApp();

Page({
  data: {
    record : new Record(),
    userInfo: {},
  },
  onRecordChanged(e) {
    this.setData({
      record: e.detail
    })
  },
  onLoad() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    } else {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo
        })
      }
    }
  }
})
