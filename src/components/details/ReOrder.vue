<template>
  <div>
    <!-- search/select order -->
    <input type="text" placeholder="PO# or image name" v-model="searchKey">
    <button @click="search">Search</button>
    <h4 class="required">
      {{message}}
    </h4>
    <div class="po_wrapper">
      <div class="po" v-for="(order, index) in orders" :key="index">
        <div class="po_image">
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
    <div class="order_detail" v-if="orderPicked">
      <h3>PO Number: {{orderPicked.po}} - Order Detail</h3>
      <table style="width:100%">
        <thead>
          <tr>
            <th>Item</th>
            <th>Location</th>
            <th>Quantity</th>
            <th>Logo</th>
            <th>Stich</th>
            <th>File Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(detail, index) in orderPicked.items" :key="index">

            <!-- item -->
            <td v-if="edit && index === indexNum">
              <select class="item" v-model="editOrder.item">
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
              <input class="quantity" type="number" v-model="editOrder.quantity">
            </td>
            <td v-else>{{detail.quantity}}</td>

            <!-- image -->
            <td class="po_image">
              <img class="image" :src="detail.image">
            </td>

            <!-- stich -->
            <td class="po_stich">

            </td>

            <!-- file name -->
            <td class="po_file">

            </td>

            <!-- for edit item buttons -->
            <td class="order_buttons">
              <button @click="editItem(index, detail)">Edit</button>
              <button v-if="edit && index === indexNum" @click="updateItem(index)">Update</button>
              <button @click="removeItem(index)">Delete</button>
            </td>

          </tr>
        </tbody>
      </table>

      <!-- add item  -->
      <div v-if="orderPicked" style="margin-top:2rem">
        <h3 style="display:inline-block;padding-right:2rem">Need to add new item(s) to this order?</h3>
        <label class="container">
          <input type="checkbox" v-model="add">
          <span class="checkbox"></span>
        </label>
        <addItem v-if="add" @close="add=false"></addItem>
        <p v-if="!fileCheck && files.length === 0">Please add file.</p>
      </div>
    </div>

  </div>
</template>

<script>
import addItem from './AddItem.vue'

export default {
  components: {
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
      // for adding item
      add: false,
      addedItem: {
        'item': 'Cap',
        'location': 'Front Center',
        'image': '',
        quantity: 1
      },
      items: [],
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
  created () {
    this.item()
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
              'image': require(`@/assets/images/townsend.jpg`),
              'quantity': 10
            },
            {
              'item': 'Tops',
              'location': 'Front Chest',
              'quantity': 20,
              'image': require(`@/assets/images/townsend2.jpg`)
            }]
          },
          { 'po': '10020',
            'items':
            [{
              'item': 'Cap',
              'location': 'Front Center',
              'image': require(`@/assets/images/Earned it.jpg`),
              'quantity': 30
            }]
          },
          { 'po': '100A100',
            'items':
            [{
              'item': 'Cap',
              'location': 'Front Center',
              'image': require(`@/assets/images/Earned it2.jpg`),
              'quantity': 30
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
              'image': require(`@/assets/images/ACV Auctions.jpg`),
              'quantity': 10
            },
            {
              'item': 'Tops',
              'location': 'Front Chest',
              'quantity': 20,
              'image': require(`@/assets/images/ACV Auctions2.jpg`)
            }]
          },
          { 'po': '20020',
            'items':
            [{
              'item': 'Cap',
              'location': 'Front Center',
              'image': require(`@/assets/images/LinkedIn Franklin.jpg`),
              'quantity': 30
            }]
          },
          { 'po': '200Z100',
            'items':
            [{
              'item': 'Cap',
              'location': 'Front Center',
              'image': require(`@/assets/images/triple ring.jpg`),
              'quantity': 30
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
      this.edit = !this.edit
      this.indexNum = index
      this.editOrder = detail
    },
    updateItem (index) {
      this.orderPicked.items[index] = this.editOrder
      this.edit = !this.edit
    },
    removeItem (index) {
      this.orderPicked.items.splice(index, 1)
    }
  }
}
</script>

<style scoped>
@import '../../assets/css/button_lib.css';
input {
  padding: 7px 10px;
  font-size: 100%;
}
/* for order(po number) selection */
.po_wrapper {
  margin: 2rem 0;
}
.po {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
}
.po_image {
  width: 120px;
}
.po_number {
  width: 300px;
}
.image {
  max-width: 100px;
  max-height: 30px;
  width: auto;
  height: auto;
  padding: .125rem .25rem;
  border: 1px solid #ededed;
}

/* for display order */
.order_detail {
  padding: 0 2rem 2rem;
  border-radius: 7px;
  border: 1px solid #dccd;
}
table {
  border-collapse: collapse;
}
thead {
  border-bottom: 1px solid #666;
  margin-bottom: 1rem;
}
th {
  padding: 0 0 .5rem;
}
td {
  padding: .5rem 0 0;
}
td {
  flex: 1;
}

/* for display add item */
.clip {
  display: inline-block;
}

/* for input/select style */
select.item {
  width: 100px;
  padding: .25rem;
  font-size: 1rem;
  border-radius: 0;
  background: #fff;
  background-image: url(../../assets/images/arrow-down.png);
  background-repeat: no-repeat;
  background-position: 69px;
  -webkit-appearance: none;
  outline: none
}
select.location {
  width: 150px;
  padding: .25rem;
  font-size: 1rem;
  border-radius: 0;
  background: #fff;
  background-image: url(../../assets/images/arrow-down.png);
  background-repeat: no-repeat;
  background-position: 120px;
  -webkit-appearance: none;
  outline: none
}
input.quantity {
  width: 50px;
  height: 13px;
}

</style>
