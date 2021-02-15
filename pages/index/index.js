// index.js
import { Record } from "../../models/record";

// 获取应用实例
const app = getApp();

Page({
  data: {
    record : new Record(),
    result : {},
    userInfo: {},
  },
  onRecordChanged(e) {
    this.setData({
      record: e.detail
    })
  },
  onResultChanged(e) {
    this.setData({
      result: e.detail
    })
  },
  onShareAppMessage(e) {
    if (this.data.record.getMembers() > 0) {
      return {
        title: '多记账，越记越多',
        desc: this.data.result.members + '人，总记' + this.data.result.prepayments + '元',
        path: '/pages/index/index?date=' + this.data.record.create +'&groups=' + encodeURIComponent(JSON.stringify(this.data.record.getGroups()))
      };
    }
  },
  onShareTimeline(e) {
    if (this.data.record.getMembers() > 0) {
      return {
        title: '多记账，越记越多',
        desc: this.data.result.members + '人，总记' + this.data.result.prepayments + '元',
        path: '/pages/index/index?date=' + this.data.record.create +'&groups=' + encodeURIComponent(JSON.stringify(this.data.record.getGroups()))
      };
    }
  },
  onLoad(options) {
    if (options.groups) {
      const record = new Record();
      const groups = JSON.parse(decodeURIComponent(options.groups));
      Object.keys(groups).forEach(function (leader) {
        const group = groups[leader];
        record.addGroup(group);
      });
      this.setData({
        record: record,
      });
    }
  }
})
