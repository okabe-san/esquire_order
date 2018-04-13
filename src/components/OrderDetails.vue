<template>
  <div>
    <section>
      <h3 class="step">Step 1</h3>
      <h3 class="step">Step 2</h3>
      <h3>Step 3</h3>
      <h3>Review</h3>
    </section>
    <main>
      <h1>Details</h1>

      <!-- check re-order or not -->
      New Order
      <input type="radio" v-model="re_order" v-on:change="order()" vaule="1"> Yes
      <input type="radio" v-model="re_order" v-on:change="order()" value="2"> No: Re-Order
      <br />

      <!-- for re-order -->
      <div v-if="reOrder">
        <!-- select order -->
        Pick Order
        <ul>
          <li v-for="order in orders" :key="order">
            <input type="radio" v-model="order_picked" :value="order">
              {{order}}
          </li>
        </ul>
        <!-- check exact same order or not -->
        Is this the exact same order?
        <input type="checkbox" v-model="same_order">
      </div>

      <!-- for non re-order -->
      <div v-else>
        <h3>Upload file(s)</h3>
        <!-- upload file(s) -->
        <vue-clip ref="vc" :options="options" :on-added-file="fileAdded">

          <template slot="clip-uploader-action" slot-scope="props">
            <div class="uploader-action" v-bind:class="{dragging: props.dragging}">
              <div class="dz-message">
                Drag and Drop file(s)
              </div>
            </div>
          </template>

          <!-- If need more info/features then use template below -->

          <!-- <template slot="clip-uploader-body" slot-scope="props">
            <div class="uploader-files">
              <div class="uploader-file" v-for="(file, index) in props.files" :key="index">
                {{file.name}}
                <button @click="removeFile(file)">Delete</button>
              </div>
            </div>
          </template> -->

        </vue-clip>

        <div v-for="(file, index) in files" :key="index">
          {{file.name}}
          <button @click="removeFile(index)">Delete</button>
        </div>

      </div>

      <!-- nav buttons -->
      <button @click="back">Back</button>
      <button @click="next">Next</button>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  data () {
    return {
      orders: [],
      reOrder: null,
      options: {
        url: '/details'
      },
      files: []
    }
  },
  created () {
    this.loadOrders()
  },
  computed: {
    re_order: {
      get () {
        return this.$store.state.re_order
      },
      set (value) {
        this.$store.dispatch('updateReOrder', value)
        this.$store.dispatch('updateOrderPicked', '')
        this.$store.dispatch('updateSameOrder', false)
      }
    },
    order_picked: {
      get () {
        return this.$store.state.order_picked
      },
      set (value) {
        this.$store.dispatch('updateOrderPicked', value)
      }
    },
    same_order: {
      get () {
        return this.$store.state.same_order
      },
      set (value) {
        this.$store.dispatch('updateSameOrder', value)
      }
    }
  },
  methods: {
    async loadOrders () {
      // FIXME: use query to load orders
      const data = [
        'Order 001', 'Order 002', 'Order 003', 'Order 004'
      ]
      this.orders = data
    },
    order () {
      this.reOrder = !this.reOrder
    },
    fileAdded (file) {
      this.files.push(file)
    },
    removeFile (index) {
      this.files.splice(index, 1)
    },
    // FIXME: after connect to the server, turn on actual remove method
    // removeFile (file) {
    //   this.$refs.vc.removeFile(file)
    // },
    back () {
      this.$router.push('/shipping')
    },
    next () {
      this.$router.push('/summary')
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
.uploader-action {
  padding: 1rem;
  background: lightgray;
  cursor: pointer;
  transition: background 200ms ease;
}
.uploader-action.dragging {
  background: #effff6;
}
.uploader-action .dz-messge {
  text-align: center;
}
</style>
