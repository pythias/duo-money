<template>
  <view class="page-body">
    <input name="leader" v-model="leader" type="text" placeholder="请输入领队名称" focus/>
    <input name="members" v-model="members" class="weui-input" type="number" placeholder="请输入团队人数" />
    <input name="prepayments" v-model="prepayments" class="weui-input" type="digit" placeholder="请输入领队预付款"/>
    <view class="btn-area">
      <button type="default" @tap="tapNew">添加</button>
    </view>
  </view>

  <view class="page-section-spacing" id="groups">
    <view id="group1" class="demo-text-1">{{ leader }}的团队一共{{ members }}人，预缴{{ prepayments }}元</view>
  </view>

  <view class="page-section-spacing">
    <view class="page-section">
      <view class="weui-cells__title">总款项</view>
      <view class="weui-cells weui-cells_after-title">
        <view class="weui-cell weui-cell_input">
          <input name="total" class="weui-input" type="digit" placeholder="请输入总款项"/>
        </view>
      </view>
    </view>
    <view class="btn-area">
      <button type="primary" @tap="tapCount">结算</button>
    </view>
    <view class="page-section-spacing" id="results">
      <view id="resultGroup1" class="demo-text-1">X的团队一共x人，预缴y元，需补缴z元</view>
    </view>
  </view>

</template>

<script>
import Taro from '@tarojs/taro'
import './new.scss'
import Vue from "vue";

export default {
  data() {
    return {
      groups: [],
      total: 0
    }
  },
  tapNew: function(event) {
    alert("hello2")
  },
  tapCount: function(event) {
    alert("hello1")
  }
}
</script>