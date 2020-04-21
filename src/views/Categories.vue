<template>
  <div>
  <div class="page-title">
    <h3>{{'menu.categories' | localize}}</h3>
  </div>
  <section>
    <Loader v-if="loading" />
    <div v-else class="row">
      <CategoryCreate @created="addNewCategory" />
      <CategoryEdit
        v-if="categories.length"
        :categories="categories"
        :key="categories.length + updateCount"
        @updated="updateCategories" />
      <p v-else class="center">List of categories is empty</p>
    </div>
  </section>
</div>
</template>


<script>
import CategoryCreate from '@/components/CategoryCreate';
import CategoryEdit from '@/components/CategoryEdit';
import Loader from '@/components/app/Loader';

export default {
  name: 'categories',
  metaInfo() {
    return {
      title: this.$title('menu.categories')
    }
  },
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories');

    this.loading = false;
  },
  components: {
    CategoryCreate, CategoryEdit, Loader
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category)
    },
    updateCategories(category){
      this.categories.forEach((element,index) => {
        if(element.id === category.id) {
          this.categories[index] = {...category};
        }
      });
      this.updateCount++;
    }
  }
}
</script>
