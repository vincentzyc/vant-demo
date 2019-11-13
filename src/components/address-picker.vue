<template>
  <van-popup v-model="showPicker" position="bottom" @close="close()">
    <van-picker show-toolbar title="请选择省市区" ref="adsPicker" :columns="columns" @change="onChange" @cancel="close()" @confirm="close()" />
  </van-popup>
</template>

<script>
import CITYS from './city.json';
import { Popup, Picker } from 'vant';

export default {
  components: {
    "van-popup": Popup,
    "van-picker": Picker
  },
  props: {
    value: {
      type: Array,
      default: ()=>{
        return []
      },
    },
    productId: {
      type: [Number, String]
    }
  },
  data() {
    return {
      showPicker: false,
      allCitys: [],
      valuesArr: [],
      columns: [
        {
          values: []
        },
        {
          values: []
        },
        {
          values: []
        }
      ]
    }
  },
  methods: {
    open() {
      if(this.value.length===0) this.$emit('input', this.valuesArr)
      this.showPicker = true
    },
    close() {
      this.showPicker = false;
      this.$emit('close', this.valuesArr)
    },
    removeArrayEl(arr, val) {
      let index = arr.indexOf(val);
      if (index > -1) {
        arr.splice(index, 1);
      }
    },
    getChildAddress(province, city) {
      if (!province) return [];
      let provinceInfo = null, provinceList = [];
      for (const item of this.allCitys) {
        if (item.cityName === province || item.n === province) {
          provinceInfo = item;
          break
        }
      }
      provinceList = provinceInfo ? (provinceInfo.cityInfo || provinceInfo.c).map(v => v.cityName || v.n) : [];
      if (!city) return provinceList;
      let allCity = null, cityList = [];
      for (const item of (provinceInfo.cityInfo || provinceInfo.c)) {
        if (item.cityName === city || item.n === city) {
          allCity = item;
          break
        }
      }
      cityList = allCity ? (allCity.cityInfo || allCity.c).map(v => v.cityName || v.n) : [];
      if (cityList.includes('其它区')) {
        this.removeArrayEl(cityList, '其它区');
        cityList.push('其它区')
      }
      return cityList
    },
    onChange(picker, values) {
      if (!this.showPicker) return;
      if (!values[0]) return;
      if (this.valuesArr[0] !== values[0]) {
        //改变省份
        let cityList = this.getChildAddress(values[0]);
        let areaList = this.getChildAddress(values[0], cityList[0]);
        picker.setColumnValues(1, cityList);
        picker.setColumnValues(2, areaList);
      } else if (this.valuesArr[1] !== values[1]) {
        //改变市
        let areaList = this.getChildAddress(values[0], values[1]);
        picker.setColumnValues(2, areaList);
        picker.setColumnValue(2, areaList[0]);
      }
      this.valuesArr = picker.getValues();
      this.$emit('input', this.valuesArr);
    },
    initLocalCitys() {
      this.allCitys = CITYS;
      let province = this.allCitys.map(v => v.n);
      let city = this.getChildAddress(province[0])
      let area = this.getChildAddress(province[0], city[0])
      this.columns[0].values = province;
      this.columns[1].values = city;
      this.columns[2].values = area;
      this.valuesArr = [province[0], city[0], area[0]];
    },
    async initDistrict(productId) {
      let res = await this.$api.Common.getCityInfo({ productCode: productId });
      if (!Array.isArray(res) || res.length === 0) return;
      this.allCitys = res;
      let province = res.map(v => v.cityName);
      let city = this.getChildAddress(province[0])
      let area = this.getChildAddress(province[0], city[0])
      this.columns[0].values = province;
      this.columns[1].values = city;
      this.columns[2].values = area;
      this.valuesArr = [province[0], city[0], area[0]];
      // this.$emit('input', this.valuesArr)  //抛出初始值给父级
    }
  },
  destroyed() {
    this.columns = null;
    this.allCitys = null;
  },
  created() {
    this.initLocalCitys();
    // this.initDistrict()
  }
}
</script>
