<template>
  <div>
  <div class="page-title">
    <h3>{{'menu.planning' | localize}}</h3>
    <h4>{{ info.bill | currency('UAH') }}</h4>
  </div>

  <Loader v-if="loading" />
  <p class="center" v-else-if="!categories.length">No categories. Go to <router-link to="/categories">categoriaes page</router-link></p>
  <section v-else>
    <div v-for="cat in categories" :key="cat.id">
      <p >
        <strong>{{cat.title}}:</strong>
        {{cat.spend | currency('UAH') }} from {{cat.limit | currency('UAH') }}
      </p>
      <div class="progress" v-tooltip="cat.tooltip">
        <div
            class="determinate"
            :class="[cat.progressColor]"
            :style="{width:  cat.progressPercent + '%' }"
        ></div>
      </div>
    </div>
  </section>
</div>
</template>
<script>
import {mapGetters} from 'vuex';
import currencyFilter from '@/filters/currency.filter'
export default {
  name: 'Planning',
  metaInfo() {
    return {
      title: this.$title('menu.planning')
    }
  },
  data: () => ({
    loading: true,
    categories: []
  }),
  computed: {
    ...mapGetters(['info'])
  },
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords');
    const categories = await this.$store.dispatch('fetchCategories');
    setTimeout(() => {
      this.categories = categories.map(cat => {
        const spend = records
          .filter(i => i.categoryId === cat.id)
          .filter(i => i.type === 'outcome')
          .reduce((total, record) => {
            return total += +record.amount
          }, 0);
        const persent = 100 * spend / cat.limit;
        const progressPercent = persent > 100 ? 100 : persent;
        const progressColor = progressPercent < 60
          ? 'green'
          : progressPercent < 90
            ? 'yellow'
            : 'red';

        const tooltipValue = cat.limit - spend;

        const tooltip = `${tooltipValue < 0 ? 'Excess of' : 'It left'} ${ currencyFilter(Math.abs(tooltipValue)) }`

        return {
          ...cat,
          progressPercent,
          progressColor,
          spend,
          tooltip
        }
      })
    })

    this.loading = false
  }
}
</script>
