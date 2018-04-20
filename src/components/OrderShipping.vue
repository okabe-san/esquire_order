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

      <!-- address(es) -->
      Need split shipping? Then, please write shipping details.
      <div v-for="(address, index) in addresses" :key="index">
        <span v-if="edit && index === indexNum">
          <input type="text" v-model="editShipping.address">
          <!-- shipping methods -->
          <select v-model="editShipping.method">
            <option v-for="(method, index) in methods" :value="method" :key="index">
               {{method}}
            </option>
          </select>
          Detail:
          <input type="text" v-model="editShipping.detail">
        </span>

        <span v-else>
          {{address.address}} {{address.method}} {{address.detail}}
        </span>

        <button @click="editAddress(index, address)">Edit</button>
        <button v-if="edit && index === indexNum" @click="updateAddress(index)">Update</button>
        <button @click="removeAddress(index)">Delete</button>
      </div>

      <div>
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
      edit: false,
      indexNum: 0,
      editShipping: {
        'address': '',
        'method': '',
        'detail': ''
      },
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
    editAddress (index, detail) {
      this.edit = !this.edit
      this.indexNum = index
      this.editShipping = detail
    },
    updateAddress (index) {
      this.addresses[index].address = this.editShipping.address
      this.addresses[index].method = this.editShipping.method
      this.addresses[index].detail = this.editShipping.detail
      this.edit = !this.edit
    },
    removeAddress (index) {
      this.addresses.splice(index, 1)
    },
    addAddress (item) {
      this.addresses.push(this.addedAddress)
      // TODO: refresh all add item inputs
    },
    back () {
      this.$router.push('/entry')
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
