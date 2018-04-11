<template>
  <div>
    <h1>order</h1>

    <!-- type in rep name -->
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

  </div>
</template>

<script>
export default {
  name: 'Order',
  data () {
    return {
      checked: '',
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
    }
  },
  methods: {
    async load () {
      // FIXME: use query to load garment
      const data = [
        'Sanmar', 'Alphabrorder', 'Other Apparel', 'Drop Off'
      ]
      this.garments = data
    }
  }
}
</script>

<style scoped>
li { list-style-type: none; }
</style>
