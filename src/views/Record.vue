<template>
  <div>
  <div class="page-title">
    <h3>{{'menu.record' | localize}}</h3>
  </div>

  <Loader v-if="loading" />
  <p class="center" v-else-if="!categories.length">No categories. Go to <router-link to="/categories">categoriaes page</router-link></p>
  <form @submit.prevent="submitHandler" class="form" v-else >
    <div class="input-field" >
      <select ref="select" v-model="category">
        <option
          v-for="item in categories"
          :key="item.id"
          :value="item.id"
        >{{item.title}} ({{item.limit}})</option>
      </select>
      <label>Select category</label>
    </div>

    <p>
      <label>
        <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
        />
        <span>Income</span>
      </label>
    </p>

    <p>
      <label>
        <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
        />
        <span>Outcome</span>
      </label>
    </p>

    <div class="input-field">
      <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{invalid: $v.amount.$dirty && (!$v.amount.required || !$v.amount.minValue )}"
      >
      <label for="amount">Summ</label>
      <span class="helper-text invalid"
        v-if="$v.amount.$dirty && (!$v.amount.required || !$v.amount.minValue )">Minimal length {{ $v.amount.$params.minValue.min }} </span>
    </div>

    <div class="input-field">
      <input
          id="description"
          type="text"
          v-model="description"
          :class="{invalid: $v.description.$dirty && !$v.description.required  }"
      >
      <label for="description">Description</label>
      <span
        v-if="$v.description.$dirty && !$v.description.required"
        class="helper-text invalid">Enter description </span>
    </div>

    <button class="btn waves-effect waves-light" type="submit">
      Create
      <i class="material-icons right">send</i>
    </button>
  </form>
</div>
</template>


<script>
import {required, minValue} from 'vuelidate/lib/validators';
import {mapGetters} from 'vuex';
export default {
  name: 'record',
  metaInfo() {
    return {
      title: this.$title('menu.record')
    }
  },
  data: () => ({
    loading: true,
    select: null,
    categories: [],
    category: null,
    type: 'outcome',
    amount: 1,
    description: ''
  }),
  validations: {
    amount: {required, minValue: minValue(1)},
    description: {required}
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories');
    this.loading = false;

    if(this.categories.length) {
      this.category = this.categories[0].id;
    }


    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select);
      M.updateTextFields();
    });
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord() {
      if(this.type === 'income') {
        return true;
      }
      return this.info.bill >= this.amount
    }
  },
  methods: {
    async submitHandler() {
      if(this.$v.$invalid) {
        this.$v.$touch();
        return
      }
      if(this.canCreateRecord) {
        try {
          await this.$store.dispatch('createRecord', {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          })
          const bill = this.type === 'income'
            ? this.info.bill + this.amount
            : this.info.bill - this.amount;

          await this.$store.dispatch('updateInfo', {bill})
          this.$message('record success added');
          this.$v.$reset();
          this.amount = 1;
          this.description = ''
        } catch(e) {}
      } else {
        this.$message(`Not enought money (${this.amount - this.info.bill})` )
      }
    }
  },




  destroyed() {
    if(this.select && this.select.destroy){
      this.select.destroy();
    }
  }
}
</script>
