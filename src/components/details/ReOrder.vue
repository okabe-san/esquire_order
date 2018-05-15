<template>
  <div>
    <!-- search/select order -->
    <div class="search_wrapper">
      <input
        type="text"
        placeholder="PO # or Logo file name"
        v-model="searchKey"
        @keyup.enter="search"
        style="width:250px">
      <button @click="search">
        <span class="button">
          <i class="material-icons">search</i>
          Search Order
        </span>
      </button>
    </div>
    <p class="message">
      {{message}}
    </p>
    <div class="po_wrapper">
      <div class="po" v-for="(order, index) in orders" :key="index">
        <div class="po_image_search">
          <img class="image" :src="order.items[0].image">
        </div>
        <label class="po_number">
          PO Number: {{order.po}}
          <input class="po_radio" type="radio" v-model="orderPicked" :value="order">
          <span class="radio po_radio"></span>
        </label>
      </div>
    </div>

    <!-- show order details -->
    <div class="display" v-if="orderPicked">
      <h3>PO Number: {{orderPicked.po}} - Order Detail</h3>
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
                <option v-for="(location, index) in locations" :value="location" :key="index">
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
        <p class="message">{{removeMessage}}</p>
      </div>
    </div>

    <!-- add item  -->
    <div v-if="orderPicked" style="margin-top:2rem">
      <h3 style="display:inline-block;padding-right:2rem">Need to add new item(s) to this order?</h3>
      <label class="container">
        <input type="checkbox" v-model="add">
        <span class="checkbox"></span>
      </label>
      <addItem
        v-if="add"
        @close="add = false">
      </addItem>
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
      searchKey: '',
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
      add: false,
      addedItem: {
        'item': 'Cap',
        'location': 'Front Center',
        'image': '',
        quantity: 1
      },
      items: [],
      locationCap: locations.locationCap,
      locationShirt: locations.locationShirt,
      locations: []
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
    async search () {
      // clear message
      this.message = ''
      // clear order picked data
      this.$store.state.order_picked = ''

      // FIXME: use query to search orders (fuzzy search)
      let data = []
      if (this.searchKey.startsWith('100')) {
        data = [
          { 'po': '1000',
            'items':
            [{
              'item': 'Cap',
              'location': 'Front Center',
              'image': require(`@/assets/images/logos/townsend.jpg`),
              'quantity': 10,
              'stitch': 3747,
              'name': 'townsend.jpg'
            },
            {
              'item': 'Tops',
              'location': 'Left Chest',
              'quantity': 20,
              'image': require(`@/assets/images/logos/townsend2.jpg`),
              'stitch': 3747,
              'name': 'townsend2.jpg'
            }]
          },
          { 'po': '10020',
            'items':
            [{
              'item': 'Cap',
              'location': 'Front Center',
              'image': require(`@/assets/images/logos/Earned it.jpg`),
              'quantity': 30,
              'stitch': 4698,
              'name': 'Earned It.jpg'
            }]
          },
          { 'po': '100A100',
            'items':
            [{
              'item': 'Cap',
              'location': 'Front Center',
              'image': require(`@/assets/images/logos/Earned it2.jpg`),
              'quantity': 30,
              'stitch': 4698,
              'name': 'Earned It2.jpg'
            }]
          }
        ]
      } else if (this.searchKey.startsWith('200')) {
        data = [
          { 'po': '2020',
            'items':
            [{
              'item': 'Cap',
              'location': 'Front Center',
              'image': require(`@/assets/images/logos/ACV Auctions.jpg`),
              'quantity': 10,
              'stitch': 4815,
              'name': 'ACV Auctions.jpg'
            },
            {
              'item': 'Tops',
              'location': 'Left Chest',
              'image': require(`@/assets/images/logos/ACV Auctions2.jpg`),
              'quantity': 20,
              'stitch': 4815,
              'name': 'ACV Auctions2.jpg'
            }]
          },
          { 'po': '20020',
            'items':
            [{
              'item': 'Cap',
              'location': 'Front Center',
              'image': require(`@/assets/images/logos/LinkedIn Franklin.jpg`),
              'quantity': 30,
              'stitch': 4059,
              'name': 'LinkedIn Franklin.jpg'
            }]
          },
          { 'po': '200Z100',
            'items':
            [{
              'item': 'Cap',
              'location': 'Front Center',
              'image': require(`@/assets/images/logos/triple ring.jpg`),
              'quantity': 30,
              'stitch': 3764,
              'name': 'triple ring.jpg'
            }]
          }
        ]
      } else {
        this.message = 'No search result found. Please search again.'
      }
      // max results
      data.slice(0, 5)
      this.orders = data
    },
    async item () {
      // FIXME: use query to get items
      const data = ['Cap', 'Tops', 'Beanie', 'Bag', 'Pants']
      this.items = data
    },
    fileAdded (file) {
      this.files.push(file)
    },
    removeFile () {
      this.files.splice(0, 1)
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

.search_wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* for order(po number) selection */
.po_wrapper {
}
.po {
  display: flex;
  align-items: center;
  height: 40px;
}
.po_image_search {
  width: 120px;
  margin-left: 29%;
  margin-right: 8%;
}
.po_image {
  width: 120px;
}
.po_image_search .image {
  float: left;
}
.image_left {
  float: left;
}
.po_number {
  text-align: left;
  width: 300px;
}

.display button {
  width: 88px;
}
</style>
