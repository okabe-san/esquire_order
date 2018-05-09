<template>
  <div id="order">
    <!-- display steps -->
    <section>
      <h2 class="step">
        STEP 1<br />
        <small>Order Entry</small>
      </h2>
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
        <div class="form">
          <!-- check re-order or not -->
          <div>
            <h2 style="display:inline-block;padding-right:2rem">REORDER?</h2>
              <label>YES (able to edit)
                <input type="radio" v-model="reOrder" @change="orderCheck()" vaule="yes">
                <span class="radio"></span>
              </label>
              <label>NO (new order)
                <input type="radio" v-model="reOrder" @change="orderCheck()" value="no">
                <span class="radio"></span>
              </label>
            </div>

          <!-- for re-order -->
          <div v-if="order" class="order_entry">
            <reOrder></reOrder>
          </div>

          <!-- for new-order -->
          <div v-else class="order_entry">
            <newOrder></newOrder>
          </div>

          <!-- error message -->
          <div class="action">
            <div class="required" style="margin-bottom:1rem">
              {{message}}
            </div>

            <!-- nav buttons -->
            <button class="next" v-if="orderPicked" @click="next">
              <span class="button">
                Next
                <i class="material-icons">navigate_next</i>
              </span>
            </button>
          </div>

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
      this.$store.state.order_picked = ''
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
@import '../assets/css/button_lib.css';

/* for steps */
h2{
  font-weight: 700;
  margin: 0;
}
h3 {
  color: rgba(255, 255, 255, 0.5);
}
.order_entry {
  margin-top: 3rem;
}
.action {
  margin-top: 3rem;
}
</style>
