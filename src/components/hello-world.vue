<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="mg-t20">
      <van-button type="default" @click="test1()">默认按钮 loading</van-button>
      <van-button type="primary" @click="test2()">主要按钮 dialog</van-button>
      <van-button type="info" @click="showPicker=true">信息按钮 datetime-picker</van-button>
      <van-button type="warning">警告按钮</van-button>
      <van-button type="danger">危险按钮</van-button>
    </div>

    <div class="mg-t20">
      <van-button plain type="primary">朴素按钮</van-button>
      <van-button plain type="danger">朴素按钮</van-button>
    </div>
    <div class="mg-t20">
      <van-button plain hairline type="primary">细边框按钮</van-button>
      <van-button plain hairline type="danger">细边框按钮</van-button>
    </div>
    <div class="mg-t20">
      <van-button disabled type="primary">禁用状态</van-button>
      <van-button disabled type="danger">禁用状态</van-button>
    </div>

    <div class="mg-t20">
      <van-button loading type="primary" />
      <van-button loading type="primary" loading-type="spinner" />
      <van-button loading type="danger" loading-text="加载中..." />
    </div>

    <div class="mg-t20">
      <van-button square type="primary" @click="$router.push('/about')">方形按钮 go about page</van-button>
      <van-button round type="danger">圆形按钮</van-button>
    </div>

    <div class="mg-t20">
      <van-button icon="star-o" type="primary" />
      <van-button icon="star-o" type="primary">按钮</van-button>
      <van-button icon="https://img.yzcdn.cn/vant/logo.png" type="danger">按钮</van-button>
    </div>
    <div class="mg-t20">
      <van-button type="primary" size="large">大号按钮</van-button>
      <van-button type="primary" size="normal">普通按钮</van-button>
      <van-button type="primary" size="small">小型按钮</van-button>
      <van-button type="primary" size="mini">迷你按钮</van-button>
    </div>
    <van-popup v-model="showPicker" position="bottom">
      <van-datetime-picker v-model="currentDate" type="date" :min-date="minDate" @cancel="showPicker = false" @confirm="onConfirm" />
    </van-popup>
  </div>
</template>

<script>
import { Button, Popup, DatetimePicker } from 'vant';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    "van-button": Button,
    "van-popup": Popup,
    "van-datetime-picker": DatetimePicker,
  },
  data() {
    return {
      showPicker: false,
      currentDate: '',
      minDate: new Date(),
    }
  },
  methods: {
    onConfirm(value) {
      console.log(value);
      this.showPicker = false;
    },
    test1() {
      const toast = this.$toast.loading({
        duration: 0,       // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '倒计时 3 秒'
      });

      let second = 3;
      const timer = setInterval(() => {
        second--;
        if (second) {
          toast.message = `倒计时 ${second} 秒`;
        } else {
          clearInterval(timer);
          this.$toast.clear();
          // toast.clear();
        }
      }, 1000);
    },
    test2() {
      this.$dialog.alert({
        title: '标题',
        message: '弹窗内容'
      });
    }
  }
}
</script>

<style lang="stylus" scoped>
.stylus-test {
  line-height: 30px;

  .stylus-testp {
    font-size: 18px;
  }
}
</style>

