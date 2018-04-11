<template>
  <div>
    <h1>order</h1>

    <!-- type rep name -->
    <input type="text" v-model="rep">
    {{rep}}

    <!-- garments list -->
    <ul>
      <li v-for="garment in garments" :key="garment">
        <input type="radio" v-model="checked" :value="garment">
          {{garment}}
      </li>
    </ul>
    {{checked}}

    <button @click="next">Next</button>

  </div>
</template>

<script>
export default {
  name: 'Order',
  data () {
    return {
      garments: []
    }
  },
  created () { this.load() },
  computed: {
    rep: {
      get () {
        return this.$store.state.rep
      },
      set (value) {
        this.$store.dispatch('updateRep', value)
      }
    },
    checked: {
      get () {
        return this.$store.state.garment
      },
      set (value) {
        this.$store.dispatch('updateGarment', value)
      }
    }
  },
  methods: {
    async load () {
      // FIXME: use query to load garments
      const data = [
        'Sanmar', 'Alphabrorder', 'Other Apparel', 'Drop Off'
      ]
      this.garments = data
    },
    next () {
      this.$router.push('/summary')
    }
  }
}
</script>

<style scoped>
li { list-style-type: none; }
</style>
