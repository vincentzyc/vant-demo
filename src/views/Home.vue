<template>
  <div class="home">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <p>刷新次数: {{ count }}</p>
      <img alt="Vue logo" src="../assets/img/logo.png" />
      <div class="stylus-test">
        <p class="stylus-testp">stylus测试测试测试测试stylus测试测试测试测试stylus测试测试测试测试</p>
      </div>
      <HelloWorld msg="Welcome to Your Vue.js App" />
    </van-pull-refresh>
  </div>
</template>

<script>
// @ is an alias to /src
import { PullRefresh } from 'vant';

import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld,
    "van-pull-refresh": PullRefresh
  },
  data() {
    return {
      count: 0,
      isLoading: false
    }
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功');
        this.isLoading = false;
        this.count++;
      }, 500);
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

