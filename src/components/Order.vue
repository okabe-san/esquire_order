<template>
  <div>
    <h1>order</h1>
    <input type="text" v-model="garment">
    {{garment}}
  </div>
</template>

<script>

export default {
  name: 'Order',
  computed: {
    garment: {
      get () {
        return this.$store.state.garment
      },
      set (value) {
        this.$store.commit('updateGarment', value)
      }
    }
  },
  methods: {
    updateGarment () {
      this.$store.commit('updateGarment')
    }
  }
}
</script>

<style scoped>
</style>
