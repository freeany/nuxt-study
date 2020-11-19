<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? "Sign in" : "Sign up" }}</h1>
          <p class="text-xs-center">
            <nuxt-link v-if="isLogin" to="/register"
              >Need an account?</nuxt-link
            >
            <nuxt-link v-else to="/login">Have an account?</nuxt-link>
          </p>
          <ul class="error-messages">
            <template v-for="(message, name) in errors">
              <li v-for="msg in message" :key="msg">{{ name }} {{ msg }}</li>
            </template>
          </ul>
          <form @submit.prevent="submit">
            <fieldset class="form-group" v-if="!isLogin">
              <input
                v-model="user.username"
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="user.email"
                class="form-control form-control-lg"
                type="email"
                placeholder="Email"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="user.password"
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                minlength="8"
                required
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? "Sign in" : "Sign up" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from '@/api/user'
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  name: 'loginIndex',
  middleware: 'notAuthenticated',
  data () {
    return {
      user: {
        username: '',
        email: '',
        password: ''
      },
      errors: {}
    }
  },
  methods: {
    async submit () {
      const { email, password } = this.user
      try {
        const { data } = this.isLogin ? await login({ user: { email, password } }) : await register({ user: this.user })
        this.$store.commit('setUser', data.user)
        Cookie.set('user', JSON.stringify(data.user)) // saving token in cookie for server rendering
        this.$router.push('/')
      } catch (err) {
        this.errors = err.response.data.errors
      }
    }
  },
  computed: {
    isLogin () {
      return this.$route.name === 'login'
    }
  }
}
</script>

<style>
</style>
