<template>
  <div>
  <div class="body">
    <h2>CUSTOMER LOGIN</h2>
    <div class="login-wrapper">
      <div class="login">
        <h3>User name<span class="required"> *</span></h3>
        <input type="email" v-model="user_name"><br />
        <h3>Password<span class="required"> *</span></h3>
        <input type="text" v-model="password"><br />
        <button @click="login">LOGIN</button>
        Forgot password?
      </div>
    </div>
  </div>
  <div class="image-wrapper">
    <img class="img-left" src="../assets/sample2.jpg">
    <!-- <img class="img-right" src="../assets/sample3.jpg"> -->
    <img class="img-mid" src="../assets/sample1.jpeg">
  </div>
</div>
</template>

<script>
export default {
  name: 'LogIn',
  data () {
    return {
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
  h2 { text-align: left; }
  h3 { margin-bottom: .5rem; }
  button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 17px;
    color: white;
    background: #7dcdc8;
    border: none;
  }
  button:hover {
    background: #56c0c4;
  }
  input {
    padding: 7px 10px;
    font-size: 120%
  }
  .body {
    padding: 1rem 6rem;
  }
  .login-wrapper {
    display: flex;
    justify-content: center;
    border-top: 1px solid #dcdcdc;
  }
  .login {
    width: 250px;
    text-align: left;
  }
  .image-wrapper {
    position: relative;
    display: block;
    margin-top: 70px;
    width: 100%;
    height: 250px;
    background: #56c0c4;
  }
  /* hide background color top: 3px */
  .image-wrapper::after {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    top:0;
    border: 3px solid #fff;
  }
  .img-left {
    float: left;
    clip-path: polygon(0 0, 100% 0%, 75% 100%, 0% 100%);
  }
  .img-mid {
    float: right;
    clip-path: polygon(25% 0, 100% 0, 100% 100%, 0 100%);
  }
  .img-right {
    float: right;
  }
</style>
