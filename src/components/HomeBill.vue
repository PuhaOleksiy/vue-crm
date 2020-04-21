<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Currency</span>

        <p class="currency-line">
          <span>{{ base | currency('UAH') }} </span>
        </p>
        <p
          v-for="cur of rates"
          :key="cur.ccy"
          class="currency-line">
          <span>{{ getCurrency(cur) | currency(cur.ccy) }} </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['rates'],
  data: () => ({

  }),
  computed: {
    base(){
      return this.$store.getters.info.bill;
    }
  },
  created(){
    this.rates.length = 2;
  },
  methods: {
    getCurrency(currency) {
      return this.base / currency.buy;
    }
  }
}
</script>
