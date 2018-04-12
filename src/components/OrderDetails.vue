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
      Re-Order?
      <input type="checkbox" v-model="re_order">
      {{re_order}}

      <div v-if="re_order == true">
        <!-- check exact same order or not -->
        Is this the exact same order?
        <input type="checkbox" v-model="same_order">
        {{same_order}}

        <!-- select order -->
        <div v-if="same_order == true">
          Pick Order
          <ul>
            <li v-for="order in orders" :key="order">
              <input type="radio" v-model="orderPicked" :value="order">
                {{order}}
            </li>
          </ul>
        </div>

      </div>

      <!-- nav buttons -->
      <button @click="next">Next</button>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  data () {
    return {
      orders: []
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
        this.$store.dispatch('updateSameOrder', false)
      }
    },
    same_order: {
      get () {
        return this.$store.state.same_order
      },
      set (value) {
        this.$store.dispatch('updateSameOrder', value)
        this.$store.dispatch('updateOrderPicked', '')
      }
    },
    orderPicked: {
      get () {
        return this.$store.state.order_picked
      },
      set (value) {
        this.$store.dispatch('updateOrderPicked', value)
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
