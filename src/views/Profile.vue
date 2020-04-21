<template>
  <div>
  <div class="page-title">
    <h3>{{ 'title.profile' | localize }}</h3>
  </div>

  <form class="form"  @submit.prevent="submitHandler">
    <div class="input-field">
      <input
          id="description"
          type="text"
          autocomplete="off"
          v-model="name"
          :class="{invalid: $v.name.$dirty && (!$v.name.required || !$v.name.minLength)}"
      >
      <label for="description">Name</label>
       <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required" >Name required</small>
        <small
          class="helper-text invalid"
          v-else-if="$v.name.$dirty && !$v.name.minLength" >Min length of name is {{$v.name.$params.minLength.min}}. Now  is {{name.length}}</small>
    </div>
    <p class="red"> Localization works for navbar and sidebar only</p>
    <div class="switch">
      <label>
        English
        <input type="checkbox" v-model="isUaLocale">
        <span class="lever"></span>
        Українська
      </label>
    </div>
    <button class="btn waves-effect waves-light" type="submit">
      Save
      <i class="material-icons right">send</i>
    </button>
  </form>
</div>
</template>

<script>
import {required, minLength} from    'vuelidate/lib/validators';
import {mapGetters, mapActions} from 'vuex';
import localizeFilter from '@/filters/localize.filter';
export default {
  metaInfo() {
    return {
      title: this.$title('title.profile')
    }
  },
  data: () => ({
    name: '',
    isUaLocale: true
  }),
  mounted() {
    this.isUaLocale = this.info.locale === 'uk-UA' ? true : false;
    this.name = this.info.name;
    setTimeout(() => M.updateTextFields())
  },
  validations: {
    name: {required, minLength: minLength(4)}
  },
  computed: {
    ...mapGetters(['info'])
  },
  methods: {
    ...mapActions(['updateInfo']),
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try{
        await this.updateInfo({
          name: this.name,
          locale: this.isUaLocale ? 'uk-UA' : 'en-US'
        })
      }
      catch(e) {

      }
    }
  }

}
</script>


<style scoped>
  .switch{
    margin-bottom: 2rem;
  }


</style>
