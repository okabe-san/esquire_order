<template>
  <div id="app">
    <header>
      <div class="nav">
        <h3>Esquire Embroidery</h3>
        <span class="icon">
          <i class="material-icons">perm_identity</i>
        </span>
        LOGIN
      </div>
      <div class="logo">
        <img src="./assets/logo.png">
      </div>
    </header>
    <router-view/>
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
  name: 'App'
}
</script>

<style scoped>
.icon {
  flex: 1;
  text-align: right;
  padding-right: 10px;
  font-size: 36px;
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
