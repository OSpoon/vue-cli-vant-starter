<template>
  <div>
    <van-nav-bar
      title="演示"
    />
    <van-cell-group>
      <van-cell title="2019nCoV疫情图" is-link to="ncov" />
    </van-cell-group>
  </div>
</template>

<script>
const coupon = {
  condition: '无使用门槛\n最多优惠12元',
  reason: '',
  value: 150,
  name: '优惠券名称',
  startAt: 1489104000,
  endAt: 1514592000,
  valueDesc: '1.5',
  unitDesc: '元'
}

export default {
  name: 'Home',
  props: {},
  data() {
    return {
      chosenCoupon: -1,
      coupons: [coupon],
      disabledCoupons: [coupon]
    }
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="less" scoped>

</style>
