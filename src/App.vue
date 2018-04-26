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
      <div class="logo_wrapper">
        <div class="logo">
          <img src="./assets/logo.png">
        </div>
      </div>
    </header>
    <router-view/>
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
</style>
