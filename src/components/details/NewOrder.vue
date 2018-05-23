<template>
  <div>

    <!-- show order details -->
    <div v-if="orderPicked" class="display">
      <h3>Order Detail</h3>
      <table style="width:100%">
        <thead>
          <tr>
            <th>Item</th>
            <th>Location</th>
            <th>Quantity</th>
            <th>Logo</th>
            <th>Stitch</th>
            <th>File Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(detail, index) in orderPicked.items" :key="index">

            <!-- item -->
            <td v-if="edit && index === indexNum">
              <select class="item" v-model="editOrder.item" @change="getLocations">
                <option v-for="(item, index) in items" :value="item" :key="index">
                  {{item}}
                </option>
              </select>
            </td>
            <td v-else>{{detail.item}}</td>

            <!-- location -->
            <td v-if="edit && index === indexNum">
              <select class="location" style="width:150px" v-model="editOrder.location">
                <option v-for="(location, index) in locationCap" :value="location" :key="index">
                  {{location}}
                </option>
              </select>
            </td>
            <td v-else>{{detail.location}}</td>

            <!-- quantity -->
            <td v-if="edit && index === indexNum">
              <input class="quantity" type="number" min="1" v-model="editOrder.quantity">
            </td>
            <td v-else>{{detail.quantity}}</td>

            <!-- image -->
            <td class="po_image">
              <img class="image" :src="detail.image">
            </td>

            <!-- stitch -->
            <td class="po_stitch">
              {{detail.stitch}}
            </td>

            <!-- file name -->
            <td class="po_file">
              {{detail.name}}
            </td>

            <!-- for edit item buttons -->
            <td class="order_buttons">
              <button v-if="!edit" @click="removeModal()">Delete</button>
              <button v-if="!edit" class="edit" @click="editItem(index, detail)">Edit</button>
              <button
                class="update"
                v-if="edit && index === indexNum"
                @click="updateItem(index)">
                Update
              </button>
              <deleteItem
                v-if="remove"
                @cancel="remove = false"
                @remove="removeItem(index)"
                :data="index">
              </deleteItem>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="removeMessage.length > 0">
        <p class="message">
          {{removeMessage}}
        </p>
      </div>
    </div>

    <!-- add item  -->
    <div style="margin-top:3rem">
      <h3>Add Item</h3>
      <addItem></addItem>
      <p v-if="!fileCheck && files.length === 0">Please add file.</p>
    </div>

  </div>
</template>

<script>
import deleteItem from './deleteItem.vue'
import addItem from './AddItem.vue'
import locations from '../../assets/fakeLocation.json'

export default {
  components: {
    deleteItem,
    addItem
  },
  data () {
    return {
      message: '',
      options: {
        url: '/details',
        maxFiles: 1
      },
      files: [],
      orders: [],
      edit: false,
      indexNum: 0,
      editOrder: {
        'item': '',
        'location': '',
        quantity: 0
      },
      fileCheck: true,
      // for delete item
      remove: false,
      removeMessage: '',
      // for adding item
      addedItem: {
        'item': 'Cap',
        'location': 'Front Center',
        'image': '',
        quantity: 1
      },
      items: [],
      locationCap: locations.locationCap,
      locationShirt: locations.locationShirt
    }
  },
  created () {
    this.item()
  },
  watch: {
    // clear removeMessage
    add: function () {
      this.removeMessage = ''
    }
  },
  computed: {
    orderPicked: {
      get () {
        return this.$store.state.order_picked
      },
      set (value) {
        this.$store.dispatch('updateOrderPicked', value)
      }
    },
    order: {
      get () {
        return this.$store.state.edit_order
      },
      set (value) {
        this.$store.dispatch('updateEditOrder', value)
      }
    }
  },
  methods: {
    async item () {
      // FIXME: use query to get items
      const data = ['Cap', 'Tops', 'Beanie', 'Bag', 'Pants']
      this.items = data
    },
    // FIXME: after connect to the server, turn on actual remove method
    // removeFile (file) {
    //   this.$refs.vc.removeFile(file)
    // },
    editItem (index, detail) {
      this.removeMessage = ''
      this.edit = !this.edit
      this.indexNum = index
      this.editOrder = detail
      if (detail.item === 'Tops' || detail.item === 'Beanie') {
        this.locations = this.locationShirt
        this.editOrder.location = 'Left Chest'
      } else {
        this.locations = this.locationCap
        this.editOrder.location = 'Front Center'
      }
    },
    updateItem (index) {
      this.removeMessage = ''
      this.orderPicked.items[index] = this.editOrder
      this.edit = !this.edit
    },
    removeModal () {
      if (this.orderPicked.items.length === 1) {
        this.removeMessage = 'Not able to delete the last item in the order.'
      } else {
        this.remove = true
      }
    },
    removeItem (index) {
      this.orderPicked.items.splice(index, 1)
      this.remove = false
    },
    getLocations (e) {
      if (e.target.value === 'Tops' || e.target.value === 'Beanie') {
        this.locations = this.locationShirt
        this.editOrder.location = 'Left Chest'
      } else {
        this.locations = this.locationCap
        this.editOrder.location = 'Front Center'
      }
    }
  }
}
</script>

<style scoped>
@import '../../assets/css/button_lib.css';
@import '../../assets/css/order_lib.css';

.display button {
  width: 88px;
}
</style>
