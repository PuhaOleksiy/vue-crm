<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">ALOHA CRM</span>
      <p>Demo User: demo@gmail.com</p>
      <p>Pass: demo1234</p>
      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{invalid: $v.email.$dirty && (!$v.email.required || !$v.email.email)}"
        >
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required" >Email required</small>
        <small
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && !$v.email.email" >Email not correct</small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            v-model.trim="password"
            :class="{invalid: $v.password.$dirty && (!$v.password.required || !$v.password.minLength)}"
        >
        <label for="password">Password</label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required" >Pass required</small>
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.minLength" >Min length of pass is {{$v.password.$params.minLength.min}}. Now is {{password.length}}</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Login
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        No account?
        <router-link to="/register"> Sign Up </router-link>
      </p>
    </div>
  </form>
</template>

<script>
import {email, required, minLength} from    'vuelidate/lib/validators';
import messages from '@/utils/messages'
export default {
  name: 'login',
  metaInfo() {
    return {
      title: this.$title('title.login')
    }
  },
  data: () => ({
    email: '',
    password: ''
  }),
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(4)}
  },
  mounted() {
    if(messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password
      }
      try{
        await this.$store.dispatch('login', formData);
        this.$router.push('/')
      }
      catch(e) {

      }
    }
  }
}
</script>
