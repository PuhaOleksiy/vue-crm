<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">Exchange Rates</span>
        </div>
        <table>
          <thead>
          <tr>
            <th>Currency</th>
            <th>Rate</th>
            <th>Date</th>
          </tr>
          </thead>

          <tbody>
          <tr >
            <td>UAH</td>
            <td>{{ (1).toFixed(4) }}</td>
            <td>{{ nowDate | date('date') }}</td>
          </tr>
          <tr v-for="cur in rates" :key="cur.ccy">
            <td>{{cur.ccy}}</td>
            <td>{{ (+getCurrency(cur)).toFixed(4) }}</td>
            <td>{{ nowDate | date('date') }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['rates', 'date'],
  data: () => ({

  }),
  computed: {
    base(){
      return this.$store.getters.info.bill;
    },
    nowDate(){
      return new Date()
    }
  },
  created(){
    this.rates.length = 2;
  },
  methods: {
    getCurrency(currency) {
      return currency.buy;
    }
  }
}
</script>
