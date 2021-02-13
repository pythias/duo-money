// components/groups-detail/groups-detail.js
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
        this.setData({
          groups: newVal.getGroups(),
        });
      }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    groups: [],
    slideButtons: [{
      type: 'warn',
      text: '删除',
    }],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    slideButtonTap: function (e) {
      this.data.record.removeGroup(e.currentTarget.id);
      this.triggerEvent('recordchanged', this.data.record);
    },
  }
})
