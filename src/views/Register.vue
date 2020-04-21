<template>
  <form class="card auth-card"  @submit.prevent="submitHandler">
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
          v-else-if="$v.password.$dirty && !$v.password.minLength" >Min length of pass is {{$v.password.$params.minLength.min}}  is {{password.length}}</small>
      </div>
      <div class="input-field">
        <input
            id="name"
            type="text"
            v-model.trim="name"
            :class="{invalid: $v.name.$dirty && !$v.password.required }"
        >
        <label for="name">Name</label>
        <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required">Name required</small>
      </div>
      <p>
        <label>
          <input type="checkbox"  v-model="agree" />
          <span>I agree with the rules</span>
          <br>
          <small
            class="helper-text invalid"
            v-if="$v.agree.$dirty && !$v.agree.checked">Agree required</small>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Sign up
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Already have an account?
        <router-link to="/login">Login!</router-link>
      </p>
    </div>
  </form>
</template>


<script>
import {email, required, minLength} from    'vuelidate/lib/validators';
export default {
  name: 'register',
  metaInfo() {
    return {
      title: this.$title('title.registration')
    }
  },
  data: () => ({
    email: '',
    password: '',
    name: '',
    agree: false
  }),
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(4)},
    name: {required},
    agree: {checked: v => v}
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      }

      try {
        await this.$store.dispatch('register', formData)
        this.$router.push('/')
      }
      catch(e) {

      }

    }
  }
}
</script>
