<template>
  <div>
    <!-- search/select order -->
    <p>Search Order by PO number or image file name.</p>
    <input type="text" placeholder="90000">
    <button @click="search">Search</button>

    <div class="po_wrapper">
      <div class="po" v-for="(order, index) in orders" :key="index">
        <label class="po_label">PO Number: {{order.po}}
          <input class="po_radio" type="radio" v-model="orderPicked" :value="order">
          <span class="radio po_radio"></span>
        </label>
        <div class="po_image">
          <img class="image" :src="order.items[0].image">
        </div>
      </div>
    </div>
    <hr v-if="orderPicked">

    <!-- show order details -->
    <p v-if="orderPicked">Order Detail</p>
    <div class="order_wrapper" v-for="(detail, index) in orderPicked.items" :key="index">

      <!-- edit item -->
      <span class="order_item" v-if="edit && index === indexNum">
        <!-- item -->
        <select class="item" v-model="editOrder.item">
          <option v-for="(item, index) in items" :value="item" :key="index">
            {{item}}
          </option>
        </select>

        <!-- location -->
        <select class="location" style="width:150px" v-model="editOrder.location">
          <option v-for="(location, index) in locationCap" :value="location" :key="index">
            {{location}}
          </option>
        </select>

        <!-- quantity -->
        <input class="quantity" type="number" v-model="editOrder.quantity">
      </span>

      <span class="order_item" v-else>
        {{detail.item}} / {{detail.location}} / {{detail.quantity}}
      </span>

      <!-- for edit item buttons -->
      <div class="order_buttons">
        <button @click="editItem(index, detail)">Edit</button>
        <button v-if="edit && index === indexNum" @click="updateItem(index)">Update</button>
        <button @click="removeItem(index)">Delete</button>
      </div>

    </div>

    <!-- add item  -->
    <div v-if="orderPicked">
      <p>Need to add new item(s) to this order?</p>
      <!-- item -->
      <select class="item" v-model="addedItem.item">
        <option v-for="(item, index) in items" :value="item" :key="index">
          {{item}}
        </option>
      </select>
      <!-- location -->
      <select class="location" v-model="addedItem.location">
        <option v-for="(location, index) in locationCap" :value="location" :key="index">
          {{location}}
        </option>
      </select>
      <!-- quantity -->
      <input class="quantity" type="number" min="1" v-model="addedItem.quantity">
      <!-- image -->
      <vue-clip v-if="files.length === 0" ref="vc" :options="options" :on-added-file="fileAdded">
        <template slot="clip-uploader-action" slot-scope="props">
          <div class="uploader-action" :class="{dragging: props.dragging}">
            <div class="dz-message">
              Select file
            </div>
          </div>
        </template>
      </vue-clip>
      <div v-for="(file, index) in files" :key="index">
        {{file.name}}
        <button @click="removeFile">Delete</button>
      </div>
      <p v-if="!fileCheck && files.length === 0">Please add file.</p>
      <button @click="addItem">Add</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
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
      // FIXME: use query to search orders (fuzzy search)
      const data = [
        { 'po': '100',
          'items':
          [{
            'item': 'Cap',
            'location': 'Front Center',
            'image': require(`@/assets/sanmar.png`),
            'quantity': 10
          },
          {
            'item': 'Tops',
            'location': 'Front Chest',
            'quantity': 20
          }]
        },
        { 'po': '101',
          'items':
          [{
            'item': 'Cap',
            'location': 'Front Center',
            'image': require(`@/assets/alphabroder.jpg`),
            'quantity': 30
          }]
        },
        { 'po': '106',
          'items':
          [{
            'item': 'Cap',
            'location': 'Front Center',
            'image': require(`@/assets/alphabroder2.jpg`),
            'quantity': 30
          }]
        }
      ]
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
    },
    addItem () {
      if (this.files.length > 0) {
        this.addedItem.image = this.files[0].name
        this.orderPicked.items.push(this.addedItem)
        this.fileCheck = true
        // back to default values
        this.addedItem = {
          'item': 'Cap',
          'location': 'Front Center',
          'image': '',
          'quantity': 1
        }
        this.files.splice(0, 1)
      } else {
        this.fileCheck = false
      }
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
  height: 50px;
}
.po_label {
  width: 350px;
}
.po_radio {
  float: right;
}
.po_image {
  flex: 1;
}
.image {
  max-width: 100px;
  max-height: 50px;
  width: auto;
  height: auto;
  padding-left: 1rem;
}

/* for order detail */
.order_wrapper {
  display: flex;
  align-items: center;
  height: 40px;
}
.order_item {
  width: 400px;
}
.order_buttons {
  flex: 1;
}

/* for input/select style */
select.item {
  width: 100px;
  padding: .25rem;
  font-size: 1rem;
  border-radius: 0;
  background: #fff;
  background-image: url(../../assets/arrow-down.png);
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
  background-image: url(../../assets/arrow-down.png);
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
