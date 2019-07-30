<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>
      <div class="lh30 text-center">
        <p v-for="item in 20" :key="item">{{item}}</p>
        <router-link to="/">Home</router-link>
      </div>
      <van-button block type="default">默认按钮</van-button>
      <van-button block type="primary">主要按钮</van-button>
      <van-button block type="info">信息按钮</van-button>
      <van-button block type="warning">警告按钮</van-button>
      <van-button block type="danger">危险按钮</van-button>
    </div>
    <van-field readonly clickable label="城市" :value="value" placeholder="选择城市" @click="showPicker = true" />

    <van-popup v-model="showPicker" position="bottom">
      <van-picker show-toolbar :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
    </van-popup>
  </div>
</template>


<script>
import { Button, Field, Popup, Picker } from 'vant';

export default {
  components: {
    "van-button": Button,
    "van-field": Field,
    "van-popup": Popup,
    "van-picker": Picker
  },
  data() {
    return {
      value: '',
      showPicker: false,
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州']
    }
  },
  methods: {
    onConfirm(value) {
      this.value = value;
      this.showPicker = false;
    }
  }
};
</script>
