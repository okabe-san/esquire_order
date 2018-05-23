<template>
  <div>
    <p v-if="message.length > 0" style="padding-bottom:1rem" class="message">
      {{message}}
    </p>
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
            <select class="item" v-model="addedItem.item" @change="getLocations">
              <option v-for="(item, index) in items" :value="item" :key="index">
                {{item}}
              </option>
            </select>
          </td>
          <!-- location -->
          <td>
            <select class="location" v-model="addedItem.location">
              <option v-for="(location, index) in locations" :value="location" :key="index">
                {{location}}
              </option>
            </select>
          </td>
          <!-- quantity -->
          <td>
            <input class="quantity" type="number" min="1" v-model="addedItem.quantity">
          </td>
          <!-- image -->
          <td class="table_image">
            <img v-if="addedItem.image" class="image" :src="addedItem.image">
            <button @click="select=true">Select Image</button>
            <selectImage
              v-if="select"
              @close="select=false"
              @select="addedItem.image = $event.image;
                addedItem.stitch = $event.stitch;
                addedItem.name = $event.name;
                message = ''">
            </selectImage>
          </td>
          <!-- button -->
          <td>
            <button @click="addItem">
              Add
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import selectImage from './SelectImage.vue'
import locations from '../../assets/fakeLocation.json'

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
        'quantity': 1,
        'stich': 0,
        'name': ''
      },
      items: [],
      locationCap: locations.locationCap,
      locationShirt: locations.locationShirt,
      locations: locations.locationCap,
      message: ''
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
      // for new order - create initial orderPicked
      if (!this.orderPicked) {
        this.orderPicked = {}
        this.orderPicked.items = []
      }

      if (this.addedItem.image.length > 0) {
        // FIXME: not able to computed orderPicked
        this.orderPicked.items.push(this.addedItem)
        this.fileCheck = true
        // back to default values
        this.addedItem = {
          'item': 'Cap',
          'location': 'Front Center',
          'image': '',
          'quantity': 1
        }
      } else {
        this.message = 'Please add an image file before click \'Add\'.'
        this.fileCheck = false
      }
    },
    getLocations (e) {
      if (e.target.value === 'Tops' || e.target.value === 'Beanie') {
        this.locations = this.locationShirt
        this.addedItem.location = 'Left Chest'
      } else {
        this.locations = this.locationCap
        this.addedItem.location = 'Front Center'
      }
    }
  }
}
</script>

<style scoped>
@import '../../assets/css/button_lib.css';
@import '../../assets/css/order_lib.css';
.table_image {
  display: flex;
  justify-content: center;
}
</style>
