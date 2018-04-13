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
      reOrder: null
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
</style>
