<template>
  <div>
    <!-- select order -->
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
      {{detail.item}} / {{detail.location}} / {{detail.image}} / {{detail.quantity}}
      <button @click="removeItem(index)">Delete</button>
    </div>

    <!-- add item(s)  -->
    <select v-model="addedItem.item">
      <option v-for="(item, index) in items" :value="item" :key="index">
        {{item}}
      </option>
    </select>

    <select v-model="addedItem.location">
      <option v-for="(location, index) in locationCap" :value="location" :key="index">
        {{location}}
      </option>
    </select>

    <!-- Need to add image uploder -->
    <input type="text" placeholder="upload image">

    <input type="number" v-model="addedItem.quantity">

    <button @click="addItem">Add</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      orders: [],
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
    orderPicked: {
      get () {
        return this.$store.state.order_picked
      },
      set (value) {
        this.$store.dispatch('updateOrderPicked', value)
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
    removeItem (index) {
      this.orderPicked.items.splice(index, 1)
    },
    addItem (item) {
      this.orderPicked.items.push(this.addedItem)
    }
  }
}
</script>

<style scoped>
</style>
