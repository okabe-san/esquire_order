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

      Company Name: Test<br />
      <!-- type rep name -->
      Representative Name:
      <input type="text" v-model="rep"><br />

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

      <div v-for="(address, index) in addresses" :key="index">
        {{address.address}} {{address.method}}
        <button @click="editAddress(index, detail)">Edit</button>
      </div>

      <!-- shipping address -->
      <!-- no split shipping -->
      <div v-if="split == false">
        Shipping Address
        <input type="text" v-model="addedAddress.address">
        <!-- shipping methods -->
        Shipping method
        <select v-model="addedAddress.method">
          <option v-for="(method, index) in methods" :value="method" :key="index">
             {{method}}
          </option>
        </select>
        <button @click="addAddress">Add</button>
      </div>

      <!-- split shipping -->
      <div v-if="split == true">
        Address:
        <input type="text" v-model="addedAddress.address">
        <!-- shipping methods -->
        <select v-model="addedAddress.method">
          <option v-for="(method, index) in methods" :value="method" :key="index">
             {{method}}
          </option>
        </select>
        Detail:
        <input type="text" v-model="addedAddress.detail">
        <button @click="addAddress">Add</button>
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
      methods: [],
      addedAddress: {
        'address': '',
        'method': 'UPS',
        'detail': ''
      }
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
    addresses: {
      get () {
        return this.$store.state.addresses
      },
      set (value) {
        this.$store.dispatch('updateAddress', value)
      }
    },
    split: {
      get () {
        return this.$store.state.split
      },
      set (value) {
        this.$store.dispatch('updateSplit', value)
        // TODO: to keep first address
        this.$store.dispatch('updateAddresses', [])
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
    updateAddress (index) {
      this.address[index].address = this.edit.address.address
      this.address[index].method = this.edit.address.method
      this.address[index].detail = this.edit.address.detail
    },
    addAddress (item) {
      this.addresses.push(this.addedAddress)
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
