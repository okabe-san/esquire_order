<template>
  <div>
    <!-- display steps -->
    <section>
      <h3 class="step">STEP 1</h3>
      <h3>STEP 2</h3>
      <h3>STEP 3</h3>
      <h3>REVIEW</h3>
    </section>

    <!-- order form -->
    <main>
      <h1>Order Entry</h1>
      <!-- check re-order or not -->
      Re-Order
      <input type="radio" v-model="reOrder" v-on:change="orderCheck()" vaule="yes"> Yes
      <input type="radio" v-model="reOrder" v-on:change="orderCheck()" value="no"> No: New Order
      <br />

      <!-- for re-order -->
      <div v-if="order">
        <reOrder></reOrder>
      </div>

      <!-- for new-order -->
      <div v-else>
        <newOrder></newOrder>
      </div>
      <!-- error message -->
      <div>
        {{message}}
      </div>

      <!-- nav buttons -->
      <button @click="next">Next</button>
    </main>
  </div>
</template>

<script>
import ReOrder from './details/ReOrder.vue'
import NewOrder from './details/NewOrder.vue'

export default {
  name: 'Entry',
  components: {
    ReOrder,
    NewOrder
  },
  data () {
    return {
      order: true,
      message: ''
    }
  },
  mounted () {
    // check order was selected
    this.$store.watch(this.$store.getters.order, order => {
      if (order.po) {
        this.message = ''
      }
    })
  },
  computed: {
    reOrder: {
      get () {
        return this.$store.state.re_order
      },
      set (value) {
        this.$store.dispatch('updateReOrder', value)
        this.$store.dispatch('updateOrderPicked', '')
        this.$store.dispatch('updateEditOrder', false)
      }
    },
    orderPicked: {
      get () {
        return this.$store.state.order_picked
      }
    }
  },
  methods: {
    orderCheck () {
      this.order = !this.order
    },
    next () {
      if (this.order && this.$store.state.order_picked.length === 0) {
        this.message = 'Please search and select the order.'
      } else {
        this.$router.push('/shipping')
      }
    }
  }
}
</script>

<style scoped>
@import '../assets/css/order_lib.css';
</style>
