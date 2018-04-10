<template>
  <div>
    <h1>order</h1>
    <button @click="getGarmet"></button>
    {{updateGramet}}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Order',
  data () {
    return {
      garmet: ''
    }
  },
  computed: mapGetters([
    'updateGramet'
  ]),
  methods: {
    getGarmet () {
      this.$store.state.garmet = 'store test'
    }
  }
}
</script>

<style scoped>
</style>
