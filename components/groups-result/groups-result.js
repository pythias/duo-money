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
        this.setData({
          result: result,
        });
      }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    result: {},
    slideButtons: [{
      type: 'warn',
      text: '删除',
    }],
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
