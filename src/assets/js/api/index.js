import Vue from "vue";
import apiModule1 from './apiModule1.js';
import apiModule2 from './apiModule2.js';

const vm = new Vue()

const createInterface = arr => {
  let Interface = {};
  arr.forEach(v => {
    Interface[v.name] = param => {
      return new Promise(reslove => {
        Api.axiosPost(v.url, param, v.backType).then(res => reslove(res))
      })
    }
  });
  return Interface
}

const Api = {
  ApiModule1: createInterface(apiModule1),
  ApiModule2: createInterface(apiModule2),
  env() {
    if (process.env.NODE_ENV === "development" || window.location.href.includes('192.168')) return "development";
    if (window.location.href.includes('test-mgr')) return 'test';
    return 'production'
  },
  axiosPost(url, data, backType = 'success') {
    return new Promise(resolve => {
      vm.$axios.post(url, data).then(res => {
        if (res.status !== 200) {
          console.log('请求失败', res);
          if (backType === 'getError') resolve({ error: true });
          vm.$toast.loading({ mask: true });
          return vm.$dialog.alert({ message: res.message || '网络繁忙' });
        }
        let backData = res.data;
        if (backType === 'allData') return resolve(backData);
        if (backData.code === '0000') return resolve(backData.data || '');
        if (backType === 'getError') resolve({ error: true });
        vm.$toast.loading({ mask: true });
        vm.$dialog.alert({ message: backData.msg || '服务器异常' })
      }).catch(error => {
        console.log(error);
        if (backType === 'getError') resolve({ error: true });
        vm.$toast.loading({ mask: true });
        vm.$dialog.alert({ message: '网络异常' })
      });
    })
  }
}

export default Api