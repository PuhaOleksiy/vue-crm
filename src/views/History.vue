<template>
  <div>
  <div class="page-title">
    <h3>{{'menu.history' | localize}}</h3>
  </div>

  <div class="history-chart">
    <canvas ref="canvas"></canvas>
  </div>

  <Loader v-if="loading" />
  <p class="center" v-else-if="!records.length"> No records. Go to <router-link to="/record">create record</router-link></p>
  <section v-else>
    <HistoryTable :records="items" />
    <Paginate
      v-model="page"
      :page-count="pageCount"
      :click-handler="pageChangeHandler"
      :prev-text="'<'"
      :next-text="'>'"
      :container-class="'pagination'"
      :page-class="'waves-effect'" />
  </section>
</div>
</template>

<script>
import HistoryTable from '@/components/HistoryTable';
import paginationMixin from '@/mixins/pagination.mixin';
import {Pie} from 'vue-chartjs';
export default {
  name: 'history',
  metaInfo() {
    return {
      title: this.$title('menu.history')
    }
  },
  extends: Pie,
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: []
  }),
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords');
    this.records = this.records.sort((a, b) => new Date(b.date) - new Date(a.date))

    const categories = await this.$store.dispatch('fetchCategories');

    this.setup(categories);

    this.loading = false;
  },
  methods: {
    setup(categories) {

      this.setupPagination(this.records.map(record => {
        return {
          ...record,
          categoryName: categories.find(item => item.id === record.categoryId).title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? 'Income' : 'Outcome',
        }
      }));

      this.renderChart({
        labels: categories.map(item => item.title),
        datasets: [{
          label: 'Outcomes by categories',
          data: categories.map(item => {
            return this.records.reduce((total, record) => {
              if(record.categoryId === item.id && record.type === 'outcome') {
                total += +record.amount
              }
              return total
            }, 0)

          }),
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      });
    }
  },
  components: {
    HistoryTable
  }
}
</script>
