<template>
  <div>
    <div class="form-wrap">
      <div class="flex form-item">
        <label class="form-label">姓名</label>
        <div class="form-input flex">
          <input type="text" maxlength="15" v-model="Data.name" placeholder="请输入办理人姓名" @blur="checkName(Data.name)" />
        </div>
      </div>
      <div class="flex form-item">
        <label class="form-label">联系方式</label>
        <div class="form-input flex">
          <input type="tel" maxlength="11" v-model="Data.phone" placeholder="请输入手机号码" @blur="checkPhone(Data.phone)" />
        </div>
      </div>
      <div class="flex form-item">
        <label class="form-label">身份证</label>
        <div class="form-input flex">
          <input type="text" maxlength="18" v-model="Data.idcard" placeholder="未满16周岁请勿下单" @blur="checkIDCard(Data.idcard)" />
        </div>
      </div>
      <div class="flex form-item">
        <label class="form-label">收货地址</label>
        <div class="form-input" :class="{placeholder:addressArr.length===0}" @click="$refs.adrPicker.open()">{{addressValues}}</div>
      </div>
      <div class="flex form-item">
        <label class="form-label">详细地址</label>
        <div class="form-input flex">
          <input type="text" maxlength="100" v-model="Data.adress" placeholder="请输入**街道门牌号**小区**层**房号" @blur="checkAddress(Data.adress)" />
        </div>
      </div>
    </div>
    <AddressPicker ref="adrPicker" :productId="productId" v-model="addressArr" @close="closePicker" />
  </div>
</template>

<script>
import { checkName, checkIDCard, checkPhone, checkAddress, reportData } from '@/utils/form-check'
import AddressPicker from '../address-picker'

export default {
  name: "BaseForm",
  components: {
    AddressPicker
  },
  props: {
    productId: {
      type: [Number, String]
    }
  },
  data() {
    return {
      Data: {
        name: "",
        phone: "",
        idcard: "",
        adress: ""
      },
      addressArr: []
    }
  },
  computed: {
    addressValues() {
      return this.addressArr.length > 0 ? this.addressArr.join(' ') : '请选择省份/地市/县区'
    }
  },
  methods: {
    closePicker(val) {
      reportData(val)
    },
    checkName(v) {
      if (checkName(v) === true) reportData(v)
    },
    checkIDCard(v) {
      if (checkIDCard(v) === true) reportData(v)
    },
    checkPhone(v) {
      if (checkPhone(v) === true) reportData(v)
    },
    checkAddress(v) {
      if (checkAddress(v) === true) reportData(v)
    },
    checkOut() {//校验表单
      let checkedName = checkName(this.Data.name);
      if (checkedName !== true) return checkedName;

      let checkedPhone = checkPhone(this.Data.phone);
      if (checkedPhone !== true) return checkedPhone;

      let checkedIDCard = checkIDCard(this.Data.idcard);
      if (checkedIDCard !== true) return checkedIDCard;

      //判断收货省份是否为空
      if (!this.addressArr[0]) return "请选择收货省份";

      //判断收货市区是否为空
      if (!this.addressArr[1]) return "请选择收货城市";

      //判断收货区县是否为空
      if (!this.addressArr[2]) return "请选择收货地区";

      let checkedAddress = checkAddress(this.Data.adress);
      if (checkedAddress !== true) return checkedAddress;

      return true
    },
    async submitOrder() {
      var tip = this.checkOut(); //校验页面信息
      if (tip !== true) {
        this.$toast(tip);
        return false;
      }

      if (this.Data.adress.indexOf('省') > -1) {
        this.Data.adress = this.Data.adress.substr(this.Data.adress.indexOf('省') + 1);
      }
      if (this.Data.adress.indexOf('市') > -1) {
        this.Data.adress = this.Data.adress.substr(this.Data.adress.indexOf('市') + 1);
      }

      let params = {
        city: this.addressArr[1],
        district: this.addressArr[2],
        province: this.addressArr[0],
        ...this.Data
      };
      console.log(params);
      // 调接口提交
    }
  }
}
</script>
<style lang="stylus" scoped>
.form-wrap {
  background: #fff;
  width: 100%;
}

.form-item {
  position: relative;
  width: 100%;
  height: 44px;
  line-height: 44px;
  font-size: 14px;
}

.form-item::before {
  position: absolute;
  left: -10px;
  color: #e10012;
  content: '*';
}

.form-label {
  width: 72px;
}

.form-input input {
  border: none;
  width: 100%;
  height: 100%;
  outline: none;
  font-size: 14px;
  color: #333;
}

.placeholder {
  color: #999;
}

.form-input input::-webkit-input-placeholder {
  color: #999;
}
</style>