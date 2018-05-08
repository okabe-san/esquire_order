<template>
  <div id="order">
    <section>
      <h3>Step 1</h3>
      <i class="material-icons step">keyboard_arrow_down</i>
      <h2 class="step">
        Step 2<br />
        <small>Shipping</small>
      </h2>
      <i class="material-icons step">keyboard_arrow_down</i>
      <h3>Step 3</h3>
      <i class="material-icons step">keyboard_arrow_down</i>
      <h3>Review</h3>
    </section>

    <main>
      <div class="form_wrapper">
        <div class="form">
          <h2>SHIPPING INFORMATION</h2>
          <div class="display">

            <!-- type rep name -->
            <h3>Representative Name</h3>

            <select
              v-if="!addedRep"
              class="rep"
              v-model="addedRep">
              <option
                selected
                disabled
                :value="addedRep">
                Please select name
              </option>
              <option v-for="(name, index) in reps" :value="name" :key="index">
                 {{name}}
              </option>
            </select>
            <div v-else>
              <select
                v-if="editRep"
                class="rep"
                v-model="addedRep"
                @change="editRep = !editRep">
                <option v-for="(name, index) in reps" :value="name" :key="index">
                   {{name}}
                </option>
              </select>
              <span v-else>
                {{rep}}
                <button class="edit" @click="editRep = !editRep">Edit</button>
              </span>

            </div>

            <!-- show shipping details -->
            <h3>Shipping Address(es)</h3>
            <table v-if="shipping.length > 0" style="width:100%">
              <thead>
                <tr>
                  <th>Method</th>
                  <th>Address</th>
                  <th>Detail</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(detail, index) in shipping" :key="index">

                  <!-- method -->
                  <td v-if="edit && index === indexNum">
                    <select class="item" v-model="editShipping.method">
                      <option v-for="(method, index) in methods" :value="method" :key="index">
                         {{method}}
                      </option>
                    </select>
                  </td>
                  <td v-else>{{detail.method}}</td>

                  <!-- address -->
                  <td v-if="edit && index === indexNum">
                    <textarea cols="40" rows="3" v-model="editShipping.address">
                    </textarea>
                  </td>
                  <td v-else>{{detail.address}}</td>

                    <!-- detail -->
                  <td v-if="edit && index === indexNum">
                    <textarea cols="40" rows="3" v-model="editShipping.detail">
                    </textarea>
                  </td>
                  <td v-else>{{detail.detail || '-'}}</td>

                  <td>
                    <button class="edit" @click="editAddress(index, detail)">Edit</button>
                    <button
                      class="update"
                      v-if="edit && index === indexNum" @click="updateAddress(index)">Update</button>
                    <button @click="removeAddress(index)">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-else>
            </div>
          </div>

          <!-- add shipping -->
          <h3>Add Shipping Address</h3>
          <div class="shipping_wrapper">

            <!-- shipping method -->
            <span class="shipping_method">
              <label>Method:</label>
              <select class="item" v-model="addedAddress.method">
                <option v-for="(method, index) in methods" :value="method" :key="index">
                   {{method}}
                </option>
              </select>
            </span>

            <!-- address -->
            <span class="shipping_address">
              <label>Address:</label>
              <textarea cols="40" rows="3" v-model="addedAddress.address">
              </textarea>
            </span>

            <!-- detail -->
            <span class="shipping_detail">
              <label>
                Detail:
              </label>
              <textarea
                cols="40"
                rows="3"
                maxlength="200"
                placeholder="Please write split shipping infomation here."
                v-model="addedAddress.detail">
              </textarea>
            </span>

            <button class="add" @click="addAddress">Add</button>
            <h4 v-if="!addressCheck">
              <span class="required">*</span>
              Please put Address
            </h4>
          </div>

          <!-- error message -->
          <h4 class="message">
            <span v-if="messageRep" class="required">*</span>
            {{messageRep}}
            <span v-if="messageShipping" class="required">*</span>
            {{messageShipping}}
          </h4>

          <!-- nav buttons -->
          <div class="action">
            <button class="back" @click="back">Back</button>
            <button class="next" @click="next">Next</button>
          </div>
        </div>
      </div>
    </main>

  </div>
</template>

<script>
export default {
  name: 'Shipping',
  data () {
    return {
      reps: [],
      editRep: false,
      methods: [],
      edit: false,
      indexNum: 0,
      editShipping: {
        'address': '',
        'method': 'UPS',
        'detail': ''
      },
      addedRep: '',
      addedAddress: {
        'address': '',
        'method': 'UPS',
        'detail': ''
      },
      addressCheck: true,
      messageRep: '',
      messageShipping: ''
    }
  },
  created () {
    this.loadRep()
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
    shipping: {
      get () {
        return this.$store.state.shipping
      },
      set (value) {
        this.$store.dispatch('updateAddress', value)
      }
    }
  },
  watch: {
    addedRep () {
      this.rep = this.addedRep
    },
    rep () {
      if (this.$store.state.rep.length > 0) {
        this.messageRep = ''
      }
    },
    shipping () {
      // check address detail is not empty
      let detail = this.$store.state.shipping.every(add => add.detail)

      if (this.$store.state.shipping.length > 0) {
        this.messageShipping = ''
      }
      if (this.$store.state.shipping.length > 1 && !detail) {
        this.messageShipping = ''
      }
    }
  },
  methods: {
    async loadRep () {
      // FIXME: use query to load shipping methods
      const data = [
        'Jane Smith', 'Mike Tanaka', 'Coco Logan'
      ]
      this.reps = data
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
      this.shipping[index] = this.editShipping
      this.edit = !this.edit
    },
    removeAddress (index) {
      this.shipping.splice(index, 1)
    },
    addAddress () {
      if (this.addedAddress.address.length > 0) {
        this.shipping.push(this.addedAddress)
        this.addressCheck = true
        // back to default values
        this.addedAddress = {
          'address': '',
          'method': 'UPS',
          'detail': ''
        }
      } else {
        this.addressCheck = false
      }
    },
    back () {
      this.$router.push('/entry')
    },
    next () {
      const store = this.$store.state

      // check address detail is not empty
      let detail = store.shipping.every(add => add.detail)
      if (store.rep.length === 0 ||
        store.shipping.length === 0 ||
        (store.shipping.length > 1 && !detail)) {
        // add error messages
        if (store.rep.length === 0) {
          this.messageRep = 'Please select representative name.'
        }
        if (store.shipping.length === 0) {
          this.messageShipping = 'Please add shipping address.'
        }
        if (store.shipping.length > 1 && !detail) {
          this.messageShipping = 'Please add shipping address detail for split.'
        }
      } else {
        this.$router.push('/options')
      }
    }
  }
}
</script>

<style scoped>
@import '../assets/css/order_lib.css';
@import '../assets/css/button_lib.css';
/* for steps */
h2 {
  font-weight: 700;
  margin: 0;
}
section > h3 {
  color: rgba(255, 255, 255, 0.5);
}

/* for adding shipping address */
.shipping_wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 20%;
}
.shipping_address,
.shipping_method,
.shipping_detail
{
  width: 80%;
  text-align: left;
  margin: .5rem 0;
}
label {
  display: inline-block;
  width: 80px;
}
.add {
  align-self: flex-end;
  text-align: right;
  height: 35px;
}

.action {
  margin-top: 3rem;
}
.display button {
  width: 88px;
}

</style>
