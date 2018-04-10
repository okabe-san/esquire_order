<template>
  <div>
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
      this.$router.push('/order')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
