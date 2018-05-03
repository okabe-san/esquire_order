<template>
  <div>
    <table style="width:100%">
      <thead>
        <tr>
          <th>Item</th>
          <th>Location</th>
          <th>Quantity</th>
          <th>File/Image</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <!-- item -->
          <td>
            <select class="item" v-model="addedItem.item">
              <option v-for="(item, index) in items" :value="item" :key="index">
                {{item}}
              </option>
            </select>
          </td>
          <!-- location -->
          <td>
            <select class="location" v-model="addedItem.location">
              <option v-for="(location, index) in locationCap" :value="location" :key="index">
                {{location}}
              </option>
            </select>
          </td>
          <!-- quantity -->
          <td>
            <input class="quantity" type="number" min="1" v-model="addedItem.quantity">
          </td>
          <!-- image -->
          <td>
            <button @click="select=true">Select Image</button>
            <selectImage v-if="select" @close="select=false" @select="addedItem.image = $event"></selectImage>
            <img class="image" :src="addedItem.image">
          </td>
          <!-- button -->
          <td>
            <button @click="addItem">Add</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import selectImage from './SelectImage.vue'

export default {
  components: {
    selectImage
  },
  data () {
    return {
      select: false,
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
    async item () {
      // FIXME: use query to get items
      const data = ['Cap', 'Tops', 'Beanie', 'Bag', 'Pants']
      this.items = data
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
@import '../../assets/css/order_lib.css';
</style>
