<template>
  <div>
    <h1>Shipping</h1>

    <!-- type rep name -->
    <input type="text" v-model="rep">
    {{rep}}

    <!-- garments list -->
    <ul>
      <li v-for="garment in garments" :key="garment">
        <input type="radio" v-model="garmentChecked" :value="garment">
          {{garment}}
      </li>
    </ul>
    {{garmentChecked}}

    <!-- shipping methods list -->
    <ul>
      <li v-for="method in methods" :key="method">
        <input type="radio" v-model="methodChecked" :value="method">
          {{method}}
      </li>
    </ul>
    {{methodChecked}}

    <!-- check split shipping -->
    <input type="checkbox" v-model="split">
    {{split}}

    <!-- add split shipping address details -->
    <div v-if="split == true">
      <ul>
       <li v-for="(input, index) in inputs" :key="index">
         <input type="text" v-model="input.address"> {{input.address}}
         <input type="text" v-model="input.detail"> {{input.detail}}
         <button v-if="index != 0" @click="deleteRow(index)">Delete</button>
       </li>
     </ul>
     <button @click="addRow">Add row</button>

    </div>

    <!-- nav buttons -->
    <button @click="next">Next</button>

  </div>
</template>

<script>
export default {
  name: 'Order',
  data () {
    return {
      garments: [],
      methods: [],
      split: false
    }
  },
  created () {
    this.loadGarments()
    this.loadMethod()
  },
  computed: {
    rep: {
      get () {
        return this.$store.state.rep
      },
      set (value) {
        this.$store.dispatch('updateRep', value)
      }
    },
    garmentChecked: {
      get () {
        return this.$store.state.garment
      },
      set (value) {
        this.$store.dispatch('updateGarment', value)
      }
    },
    methodChecked: {
      get () {
        return this.$store.state.method
      },
      set (value) {
        this.$store.dispatch('updateMethod', value)
      }
    },
    inputs: {
      get () {
        return this.$store.state.splitDetails
      },
      set (value) {
        this.$store.dispatch('updateSplitDetails', value)
      }
    }
  },
  methods: {
    async loadGarments () {
      // FIXME: use query to load garments
      const data = [
        'Sanmar', 'Alphabrorder', 'Other Apparel', 'Drop Off'
      ]
      this.garments = data
    },
    async loadMethod () {
      // FIXME: use query to load shipping methods
      const data = [
        'UPS', 'Fed-EX', 'Pickup', 'Other'
      ]
      this.methods = data
    },
    addRow () {
      this.inputs.push({
        address: '',
        detail: ''
      })
    },
    deleteRow (index) {
      this.inputs.splice(index, 1)
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
