<template>
  <div>
    <!-- show order details -->
    <div v-for="(detail, index) in orderPicked.items" :key="index">
      <!-- edit item -->
      <span v-if="edit && index === indexNum">
        <!-- item -->
        <select v-model="editOrder.item">
          <option v-for="(item, index) in items" :value="item" :key="index">
            {{item}}
          </option>
        </select>

        <!-- location -->
        <select v-model="editOrder.location">
          <option v-for="(location, index) in locationCap" :value="location" :key="index">
            {{location}}
          </option>
        </select>

        <!-- quantity -->
        <input type="number" v-model="editOrder.quantity">
      </span>

      <span v-else>
        {{detail.item}} / {{detail.location}} / {{detail.quantity}}
      </span>

      <button @click="editItem(index, detail)">Edit</button>
      <button v-if="edit && index === indexNum" @click="updateItem(index)">Update</button>
      <button @click="removeItem(index)">Delete</button>
    </div>

    <!-- add item  -->
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
    <input type="number" min="1" v-model="addedItem.quantity">
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
    async item () {
      // FIXME: use query to get items
      const data = ['Cap', 'Tops', 'Beanie', 'Bag', 'Pants']
      this.items = data
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
