<template>
  <div>
    <section>
      <h3 class="step">Step 1</h3>
      <h3 class="step">Step 2</h3>
      <h3>Step 3</h3>
      <h3>Review</h3>
    </section>
    <main>
      <h1>Garment and Shipping info</h1>

      <!-- type rep name -->
      Representative Name
      <input type="text" v-model="rep">
      <br />

      <!-- garments list -->
      Where the garments from?
      <ul>
        <li v-for="garment in garments" :key="garment">
          <input type="radio" v-model="garmentChecked" :value="garment">
            {{garment}}
        </li>
      </ul>

      <!-- check split shipping -->
      Need a split shipping?
      <input type="checkbox" v-model="split">
      {{split}}
      <br />

      <!-- shipping address -->
      <!-- no split shipping -->
      <div v-if="split == false">
        Shipping Address
        <input type="text" v-model="inputs[0].address">

        <!-- shipping methods -->
        Shipping method
        <select>
          <option v-for="method in methods" :key="method">
             {{method}}
          </option>
        </select>

      </div>

      <!-- split shipping -->
      <div v-if="split == true">
        Shipping Address / Garment Detail
        <ul>
         <li v-for="(input, index) in inputs" :key="index">
           {{index + 1}}
           <input type="text" v-model="input.address">
           <input type="text" v-model="input.detail">

           <!-- shipping methods -->
           Shipping method
           <select>
             <option v-for="method in methods" :key="method">
                {{method}}
             </option>
           </select>

           <button v-if="index > 1" @click="deleteRow(index)">Delete</button>
         </li>
       </ul>
       <button @click="addRow">Add row</button>
      </div>

      <!-- nav buttons -->
      <button @click="back">Back</button>
      <button @click="next">Next</button>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Shipping',
  data () {
    return {
      garments: [],
      methods: []
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
    split: {
      get () {
        return this.$store.state.split
      },
      set (value) {
        this.$store.dispatch('updateSplit', value)
        // TODO: to keep first address
        this.$store.dispatch('updateAddresses', [{address: '', detail: ''}])
      }
    },
    inputs: {
      get () {
        return this.$store.state.addresses
      },
      set (value) {
        this.$store.dispatch('updateAddresses', value)
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
    back () {
      this.$router.push('/details')
    },
    next () {
      this.$router.push('/options')
    }
  }
}
</script>

<style scoped>
main {
  box-sizing: border-box;
  float: right;
  width: 80%;

  padding-right: 10%;
}
section {
  box-sizing: border-box;
  float: left;
  width: 20%;
}
li {
  list-style-type: none;
}
.step {
  color: orange;
}
</style>
