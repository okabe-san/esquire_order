<template>
  <div>
    <!-- search/select order -->
    Search Order by PO number or image file name.<br />
    <input type="text" placeholder="90000">
    <button @click="search">Search</button>
    <ul>
      <li v-for="(order, index) in orders" :key="index">
        <input type="radio" v-model="orderPicked" :value="order">
          PO Number: {{order.po}}
      </li>
    </ul>

    <!-- show order details -->
    <div v-for="(detail, index) in orderPicked.items" :key="index">
      {{detail.item}} / {{detail.location}} / {{detail.image}} /

      <!-- edit quantity -->
      <span v-if="edit && index === indexNum">
        <input type="number" :value="editOrder.quantity">
      </span>
      <span v-else>
        {{detail.quantity}}
      </span>

      <button @click="editItem(index, detail)">Edit</button>
      <button v-if="edit" @click="updateItem(index)">Update</button>
      <button @click="removeItem(index)">Delete</button>
    </div>

    <!-- add item  -->
    <div v-if="orderPicked">
      <!-- item -->
      <select v-model="addedItem.item">
        <option v-for="(item, index) in items" :value="item" :key="index">
          {{item}}
        </option>
      </select>
      <!-- location -->
      <select v-model="addedItem.location">
        <option v-for="(location, index) in locationCap" :value="location" :key="index">
          {{location}}
        </option>
      </select>
      <!-- quantity -->
      <input type="number" v-model="addedItem.quantity">
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
        <button @click="removeFile(index)">Delete</button>
      </div>
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
        item: '',
        locaton: '',
        quantity: 0
      },
      addedItem: {
        'item': 'Cap',
        'location': 'Front Center',
        'image': '',
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
    editItem (index, detail) {
      this.edit = !this.edit
      this.indexNum = index
      this.editOrder.quantity = detail.quantity
    },
    updateItem (index) {
      this.orderPicked.items[index].quantity = this.order.quantity
      this.edit = !this.edit
    },
    removeItem (index) {
      this.orderPicked.items.splice(index, 1)
    },
    addItem (item) {
      this.addedItem.image = this.files[0].name
      this.orderPicked.items.push(this.addedItem)
      // TODO: refresh all add item inputs
    }
  }
}
</script>

<style scoped>
li {
  list-style-type: none;
}
</style>
