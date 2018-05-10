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

          <h2 style="margin-bottom:1rem">PO Number</h2>
          <span v-if="messagePo.length > 0">
            <span class="required">*</span>
            {{messagePo}}
          </span>
          <div v-if="!editPo">
            <input
              type="text"
              class="po"
              v-model="po"
              @keyup.enter="enterPo"
              placeholder="Please put PO number">
            <button @click="enterPo">Enter</button>
          </div>
          <div v-else>
            <h2 style="display:inline-block;padding-right:2rem">{{poNumber}}</h2>
            <button class="edit" @click="editPo = !editPo">Edit</button>
          </div>

          <!-- check re-order or not -->
          <div v-if="poNumber">
            <hr />
            <h2 style="display:inline-block;padding-right:2rem">REORDER?</h2>
              <label>YES (able to edit)
                <input type="radio" v-model="reOrder" @change="orderCheck()" vaule="yes">
                <span class="radio"></span>
              </label>
              <label>NO (new order)
                <input type="radio" v-model="reOrder" @change="orderCheck()" value="no">
                <span class="radio"></span>
              </label>

            <!-- for re-order -->
            <div v-if="!this.reOrder" class="order_entry">
              <reOrder></reOrder>
            </div>

            <!-- for new-order -->
            <div v-else class="order_entry">
              <newOrder></newOrder>
            </div>

            <!-- error message -->
            <div class="action">
              <div v-if="message.length > 0" style="margin-bottom:1rem">
                <span class="required">*</span>
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
      po: '',
      messagePo: '',
      message: ''
    }
  },
  mounted () {
    // check order was selected

    // this.$store.watch(this.$store.getters.order, order => {
    //   if (order.po) {
    //     this.message = ''
    //   }
    // })
  },
  computed: {
    poNumber: {
      get () {
        return this.$store.state.po_number
      }
    },
    editPo: {
      get () {
        return this.$store.state.edit_po
      },
      set (value) {
        this.po = this.$store.state.po_number
        this.$store.dispatch('updateEditPo', value)
      }
    },
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
    enterPo () {
      this.message = ''
      if (this.po.length < 3) {
        this.messagePo = 'At least 3 characters long.'
      } else {
        this.messagePo = ''
        this.$store.state.edit_po = !this.$store.state.edit_po
        this.$store.state.po_number = this.po
      }
    },
    orderCheck () {
      this.$store.state.order_picked = ''
    },
    next () {
      if (!this.$store.state.edit_po) {
        this.message = 'Have to enter PO number.'
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
.po {
  width: 200px;
}
.order_entry {
  margin-top: 3rem;
}
.action {
  margin-top: 3rem;
}
</style>
