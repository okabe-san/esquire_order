<template>
  <div>
    <section>
      <h3 class="step">Step 1</h3>
      <h3>Step 2</h3>
      <h3>Step 3</h3>
      <h3>Review</h3>
    </section>
    <main>
      <h1>Details</h1>

      <!-- check re-order or not -->
      Re-Order
      <input type="radio" v-model="reOrder" v-on:change="orderCheck()" vaule="yes"> Yes
      <input type="radio" v-model="reOrder" v-on:change="orderCheck()" value="no"> No: New Order
      <br />

      <!-- for re-order -->
      <div v-if="order">
        <reOrder></reOrder>
      </div>

      <!-- for non re-order -->
      <div v-else>
        <h3>Upload file(s)</h3>
        <!-- upload file(s) -->
        <vue-clip ref="vc" :options="options" :on-added-file="fileAdded">

          <template slot="clip-uploader-action" slot-scope="props">
            <div class="uploader-action" :class="{dragging: props.dragging}">
              <div class="dz-message">
                Drag and Drop file(s)
              </div>
            </div>
          </template>

        </vue-clip>

        <div v-for="(file, index) in files" :key="index">
          {{file.name}}
          <button @click="removeFile(index)">Delete</button>
        </div>

      </div>

      <!-- nav buttons -->
      <button @click="next">Next</button>
    </main>
  </div>
</template>

<script>
import ReOrder from './ReOrder.vue'

export default {
  name: 'Detail',
  components: {
    ReOrder
  },
  data () {
    return {
      orders: [],
      order: true,
      options: {
        url: '/details'
      },
      files: [],
      addedItem: {
        'item': 'Cap',
        'location': 'Front Center',
        'image': null,
        quantity: 0
      },
      items: ['Cap', 'Tops', 'Beanie', 'Bag', 'Pants'],
      locationCap: [
        'Front Center',
        'Front Left',
        'Front Right',
        'Left',
        'Right',
        'Back Center'
      ],
      locationShirt: [
        'Left Chest',
        'Right Chest',
        'Left Bottom',
        'Right Bottom',
        'Upper Left Sleeves',
        'Upper right Sleeves',
        'Left Wrist',
        'Right Wrist'
      ]
    }
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
      },
      set (value) {
        this.$store.dispatch('updateOrderPicked', value)
      }
    },
    editOrder: {
      get () {
        return this.$store.state.edit_order
      },
      set (value) {
        this.$store.dispatch('updateEditOrder', value)
      }
    }
  },
  methods: {
    async search () {
      // FIXME: use query to search orders
      const data = [
        { 'po': '100',
          'items':
          [{
            'item': 'Cap',
            'location': 'Front Center',
            'image': 'logo.png',
            'quantity': 10
          },
          {
            'item': 'Shirt',
            'location': 'Front Chest',
            'image': 'logo.png',
            'quantity': 20
          }]
        }
      ]
      this.orders = data
    },
    orderCheck () {
      this.order = !this.order
    },
    removeItem (index) {
      this.orderPicked.items.splice(index, 1)
    },
    addItem (item) {
      this.orderPicked.items.push(this.addedItem)
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
    next () {
      this.$router.push('/shipping')
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
