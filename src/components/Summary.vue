<template>
  <div>
    <h1>summary</h1>
    {{rep}}
    {{checked}}
  </div>
</template>

<script>

export default {
  name: 'Summary',
  computed: {
    rep: {
      get () {
        return this.$store.state.rep
      }
    },
    checked: {
      get () {
        return this.$store.state.garment
      }
    }
  }
}
</script>

<style scoped>
</style>
