<template>
  <div class="wrapper">
    <div class="body">
      <h2>
        <i class="material-icons">
          favorite_border
        </i>
        Thank you!
      </h2>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Thanks'
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
}
.body {
  max-width: 50%;
}
.material-icons {
  font-size: 144px;
  color: pink;
}
</style>
