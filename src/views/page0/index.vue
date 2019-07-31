<template>
  <div class="kuaishou-wrap">
    <img v-lazy="require('./img/1.png')" alt class="fullimg" />
    <img v-lazy="require('./img/2.png')" alt class="fullimg" />
    <div class="container">
      <div class="form-wrapper">
        <img v-lazy="require('./img/3.png')" alt class="fullimg" />
        <p class="tiptext">请认真填写信息以确保卡能寄送到</p>
        <jb-form class="form-content" ref="form" :salesProdName="salesProdName" :prodId="prodId" :productId="productId"></jb-form>
        <div class="submit-btn" @click="submitOrder">0元免费体验</div>
      </div>
    </div>

    <div class="info-wrap" v-show="showInfo">
      <div class="product-info">
        <img v-lazy="require('./img/5.png')" alt class="fullimg" />
        <ol>
          <li>大王卡套餐激活当月赠送 20 元话费，仅当月使用有效；原套餐月租19元/月，激活次月起优惠至9元/月，相当于每月节省10元，持续优惠12个月，优惠结束后恢复至19元/月；首充50元赠送50元话费，本金立即到账，赠送话费自次月起每月返还10元，连续赠送5个月，赠送话费仅当月有效。领取方法：登录“KING 卡助手”微信公众号-福利-存费送费。</li>
          <li>套餐内，每月包含3GB国内通用流量+100分钟通话时长，40G定向免流APP为：爱奇艺、快手、手机百度、百度地图等百度系产品；优酷视频、高德地图、书旗小说、虾米音乐等阿里系产品；以及其他定向流量APP等等，但不包括定向APP内打开的第三方外链、视频、图片等。</li>
          <li>套餐外，国内流量按1元800M/日收取，流量仅当天有效，可自由叠加，语音0.1元/分钟，短信0.1/每条。</li>
          <li>国内语音和国内流量仅限大陆地区使用,不包含港澳台。</li>
        </ol>
      </div>
      <div class="product-info">
        <img v-lazy="require('./img/4.png')" alt class="fullimg" />
        <ol>
          <li>根据国家相关规定，未满16周岁的用户将不能在网络渠道办理入网，因年龄未能问题未能激活的用户，请由您的法定代理人前往营业厅代为办理，详情请咨询10000。</li>
          <li>本号卡仅满足用户正常使用通话和流量，请涉及不法用途人员绕路。</li>
          <li>以下情况不支持发货：未满16周岁、黑名单用户、身份证下同一运营商已满5张卡（需在营业厅注销不使用的卡，方可办理）、特殊证件（军人/保密单位等）、新疆/西藏等物流限制区域以及诈骗高发区。</li>
          <li>电信4G卡需搭配4G终端使用；双卡双待手机，不支持同时使用2张电信卡，异网手机卡，需把电信卡放在卡槽1使用。</li>
        </ol>
      </div>
    </div>

    <div class="flex flex-center scroll" @click="showDetail()">
      <span>{{showInfo?'点击收起':'点击查看详情'}}</span>
      <img v-lazy="require('./img/arrow.png')" alt class="arrow-icon" :class="showInfo?'rotate180':'rotate0'" />
    </div>
  </div>
</template>

<script>
import jbForm from './form'

export default {
  name: "index",
  components: {
    jbForm
  },
  data() {
    return {
      showInfo: false,
      salesProdName: '王卡-大王卡（日租800MB）',
      prodId: 5873,
      productId: 'PD1907150152'
    }
  },
  methods: {
    showDetail() {
      this.showInfo = !this.showInfo;
    },
    async submitOrder() {
      console.log('提交');
      // this.$refs.form.submitOrder();
    }
  },
  mounted() {
    document.title = '电信大王卡';
  }
}
</script>

<style scoped>
.kuaishou-wrap {
  position: relative;
  background: #5340db;
}

.container {
  padding: 20px;
}

.form-wrapper {
  padding: 20px;
  border-radius: 10px;
  background: #ffffff;
}

.tiptext {
  text-align: center;
  line-height: 20px;
  font-size: 12px;
  color: #666666;
  font-weight: 700;
  letter-spacing: 3px;
}
.product-info {
  border-radius: 10px;
  background: #431ac6;
  margin: 0 20px 20px;
  padding: 20px;
}
.product-info img {
  width: 100%;
  height: 56px;
}
.product-info ol {
  margin-left: 10px;
  list-style: decimal;
}
.product-info li {
  list-style: inherit;
  color: #9787ff;
  line-height: 20px;
  font-size: 14px;
  margin-bottom: 10px;
}
.submit-btn {
  color: #ffffff;
  background: #3d85fe;
  text-align: center;
  line-height: 40px;
  border-radius: 20px;
  margin: 20px auto 10px auto;
  font-size: 16px;
  box-shadow: 0 2px 6px 1px rgba(83, 64, 219, 0.4);
}
.company-info {
  margin-top: 10px;
  padding-bottom: 20px;
}
.company-info p {
  font-size: 12px;
  line-height: 20px;
  text-align: center;
}
.scroll {
  color: #3ca6ff;
  text-align: center;
  line-height: 30px;
  padding-bottom: 20px;
}
.rotate180 {
  transform: rotate(180deg);
}
.rotate0 {
  transform: rotate(0deg);
}
.arrow-icon {
  transition: 0.3s;
  width: 20px;
  height: 20px;
  margin-left: 6px;
}
</style>