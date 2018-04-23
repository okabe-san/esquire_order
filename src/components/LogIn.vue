<template>
  <div>
    <img src="../assets/logo.png">
    <h1>{{ msg }}</h1>
      User name: <input type="text" v-model="user_name"><br />
      Password: <input type="text" v-model="password"><br />
      <button @click="login">Log in</button>
  </div>
</template>

<script>
export default {
  name: 'LogIn',
  data () {
    return {
      msg: 'Welcome to Esquire Embroidery!',
      user_name: '',
      password: ''
    }
  },
  methods: {
    login () {
      // FIXME: use real login
      this.$router.push('/entry')
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
