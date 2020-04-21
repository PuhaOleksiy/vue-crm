<template>
<div>
  <Loader v-if="loading" />
  <div v-else-if="record">
    <div class="breadcrumb-wrap">
    <router-link class="breadcrumb" to="/history">History</router-link>
      <a @click.prevent class="breadcrumb">
        {{  record.type === 'income' ? "Income" : 'Outcome'}}
      </a>
    </div>
    <div class="row">
      <div class="col s12 m6">
        <div
          class="card"
          :class="{
            'red': record.type === 'outcome',
            'green': record.type === 'income'
          }">
          <div class="card-content white-text">
            <p>Description: {{ record.description }}</p>
            <p>Sum: {{ record.amount }}</p>
            <p>Category: {{ record.category.title }}</p>

            <small>{{ record.date | date('datetime') }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
  <p class="center" v-else>This recird not exist. Go to <router-link to="/records">record</router-link></p>
</div>
</template>
<script>
export default {
  name: 'detail',
  data: () => ({
    record: null,
    loading: true
  }),
  async mounted() {
    const id = this.$route.params.id
    const record = await this.$store.dispatch('fetchRecordById', id);
    const category = await this.$store.dispatch('fetchCategoryById', record.categoryId );
    this.record = {
      ...record,
      category
    }
    this.loading = false;
  }
}
</script>
