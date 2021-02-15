// components/groups-result/groups-result.js
import {Record} from "../../models/record";

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    'record': {
      type: Record,
      value: '',
      observer: function (newVal, oldVal) {
        const result = newVal.calculate();
        this.triggerEvent('resultchanged', result);
        this.setData({
          result: result,
          sendButtonDisabled: result.members === 0,
        });
      }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    result: {},
    sendButtonDisabled: true,
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
