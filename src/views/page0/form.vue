<template>
  <div>
    <div class="flex">
      <div class="flex-none label">
        收货地址
        <span>*</span>
      </div>
      <div class="flex-auto mg-l10 c999 textover1" @click="$refs.adrPicker.open()">{{addressValues}}</div>
    </div>
    <AddressPicker ref="adrPicker" :productId="productId" v-model="addressArr" />
  </div>
</template>

<script>
import AddressPicker from '@/components/address-picker'
export default {
  components: {
    AddressPicker
  },
  props: {
    salesProdName: {
      type: String
    },
    pid: {
      type: Number
    },
    productId: {
      type: [Number, String]
    }
  },
  data() {
    return {
      addressArr: [],
    }
  },
  computed: {
    addressValues() {
      return this.addressArr.length > 0 ? this.addressArr.join(' ') : '请选择省份/地市/县区'
    }
  },
  methods: {

  }
}
</script>

<style lang="stylus" scoped>
.label {
  width: 70px;

  span {
    color: #e10012;
    font-weight: 700;
    font-size: 14px;
  }
}
</style>
