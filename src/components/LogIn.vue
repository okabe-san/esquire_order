<template>
  <div>
    <div class="logo_wrapper">
      <div class="logo">
        <img src="../assets/logo.png">
      </div>
    </div>
    <div class="body">
      <h2>CUSTOMER LOGIN</h2>
      <div class="login-wrapper">
        <div class="login">
          <h3>User name<span class="required"> *</span></h3>
          <input type="email" v-model="user_name" placeholder="Embroidery@gmail.com"><br />
          <h3>Password<span class="required"> *</span></h3>
          <input type="text" v-model="password"><br />
          <button @click="login">LOGIN</button>
          Forgot password?
        </div>
      </div>
    </div>
    <div class="image-wrapper">
      <img class="img-left" src="../assets/sample2.jpg">
      <h3 class="mid">
        Our mission is excellent communication, customer service, high quality, and quick turn around.   Once you place your order with us– you can cross it off your list.  If there is anything further you need to do– we will contact you.
      </h3>
      <img class="img-right" src="../assets/sample1.jpeg">
    </div>
    <footer>
      <div class="info-wrapper">
        <div class="info">
          <h3>Services</h3>
          <p>Embroidery</p>
          <p>Rhinestone</p>
          <p>Laser Etching</p>
          <p>Vinyl Heat Press</p>
        </div>
      </div>
      <div class="info-wrapper">
        <div class="info">
          <h3>Socila</h3>
          <p>Twitter</p>
          <p>Facebook</p>
          <p>Instagram</p>
        </div>
      </div>
      <div class="info-wrapper">
        <div class="info">
          <h3>Supports</h3>
          <p>support@esquireembroiery.com</p>
          <p>(303)xxx-xxxx</p>
        </div>
      </div>
    </footer>
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
h2 {
  text-align: left;
  margin-left: 100px;
  border-bottom: 1px solid #dcdcdc;
}
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
  font-size: 125%;
  width: 250px;
}
.body {
  padding: 3rem 6rem;
}
.login-wrapper {
  display: flex;
  justify-content: center;
  padding-right:
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
.img-right {
  float: right;
  clip-path: polygon(25% 0, 100% 0, 100% 100%, 0 100%);
}
.mid {
  display: inline-block;
  width: 300px;
  color: #fff;
  padding-top: 5px;
}
.info-wrapper {
  display: flex;
  justify-content: center;
  float: left;
  width: calc(100% / 3);
}
.info {
  text-align: left;
}
</style>
