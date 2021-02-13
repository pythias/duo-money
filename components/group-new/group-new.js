import { Group, Record } from "../../models/record"
import { isInt, isDigit } from "../../utils/util"

// components/group-new.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    'record': {
      type: Record,
      value: '',
      observer: function (newVal, oldVal) {

      }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    formData: {
      leader: "",
      members: "",
      prepayments: "",
    },
    addButtonDisabled: true,
    rules: [{
        name: 'leader',
        rules: {required: true, message: '领队名称必填', minlength: 1, maxlength: 10},
      }, {
        name: 'members',
        rules: [{required: true, message: '人数必填'}, {range: [0, 1000], message: '人数格式不对'}],
      }, {
        name: 'prepayments',
        rules: [{required: true, message: '预付款必填'}, {range: [0.0, 1000000.0], message: '预付款格式不对'}],
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    attached: function () {

    },
    formInputChange(e) {
      const {field} = e.currentTarget.dataset
      this.setData({
        [`formData.${field}`]: e.detail.value
      });
      this.inputChanged(this.data.formData);
    },
    moveToMembers(e) {
      this.setData({
        focusIndex: "members",
      });
    },
    moveToPrepayments(e) {
      this.setData({
        focusIndex: "prepayments",
      });
    },
    inputChanged: function(data) {
      let disabled = false;
      if (data.leader.length === 0 || !isInt(data.members) || !isDigit(data.prepayments)) {
        disabled = true;
      }
      this.setData({
        addButtonDisabled: disabled,
      });
    },
    onAddTapped: function(e) {
      this.selectComponent('#form').validate((valid, errors) => {
        if (!valid) {
          console.log('valid', valid, errors)
          const firstError = Object.keys(errors)
          if (firstError.length) {
            this.setData({
              error: errors[firstError[0]].message,
              focusIndex: errors[firstError[0]].name
            })
          }
          return;
        }

        let group = new Group(this.data.formData.leader, this.data.formData.members, this.data.formData.prepayments);
        if (this.data.record.addGroup(group)) {
          this.triggerEvent('recordchanged', this.data.record);
          this.setData({
            focusIndex: "leaders",
          });
        } else {
          this.setData({
            focusIndex: "leaders",
            error: "领队已经存在",
          });
        }
      });
    },
  }
})
