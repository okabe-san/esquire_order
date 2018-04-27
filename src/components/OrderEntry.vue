<template>
  <div id="order">
    <!-- display steps -->
    <section>
      <h5>ORDER STEPS</h5>
      <h3 class="step">
        STEP 1<br />
        <small>Order Entry</small>
      </h3>
      <i class="material-icons step">keyboard_arrow_down</i>
      <h3>STEP 2</h3>
      <i class="material-icons">keyboard_arrow_down</i>
      <h3>STEP 3</h3>
      <i class="material-icons">keyboard_arrow_down</i>
      <h3>REVIEW</h3>
    </section>

    <!-- order form -->
    <main>
      <div class="form_wrapper">
        <h1>Order Entry</h1>
        <div class="form">
          <!-- check re-order or not -->
          <h3>
            Is this Re-Order? &nbsp;&nbsp;

            <label>YES
              <input type="radio" v-model="reOrder" v-on:change="orderCheck()" vaule="yes">
              <span class="radio"></span>
            </label>

            <label>NO (new order)
              <input type="radio" v-model="reOrder" v-on:change="orderCheck()" value="no">
              <span class="radio"></span>
            </label>

          </h3>
          <hr />

          <!-- for re-order -->
          <div v-if="order">
            <reOrder class="order_entry"></reOrder>
          </div>

          <!-- for new-order -->
          <div v-else>
            <newOrder class="order_entry"></newOrder>
          </div>
          <!-- error message -->
          <div>
            {{message}}
          </div>

          <!-- nav buttons -->
          <button @click="next">Next</button>
        </div>
      </div>
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
.order_entry {
  padding-top: 1rem;
}
</style>
