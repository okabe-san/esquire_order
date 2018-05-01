<template>
  <div>
    <table style="width:100%">
      <thead>
        <tr style="color:#56c0c4">
          <th>Item</th>
          <th>Location</th>
          <th>Quantity</th>
          <th>File/Image</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>

          <td>
            <select class="item" v-model="addedItem.item">
              <option v-for="(item, index) in items" :value="item" :key="index">
                {{item}}
              </option>
            </select>
          </td>

          <td>
            <select class="location" v-model="addedItem.location">
              <option v-for="(location, index) in locationCap" :value="location" :key="index">
                {{location}}
              </option>
            </select>
          </td>

          <td>
            <input class="quantity" type="number" min="1" v-model="addedItem.quantity">
          </td>

          <td>
            <vue-clip class="clip" v-if="files.length === 0" ref="vc" :options="options" :on-added-file="fileAdded">
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
          </td>
          <td>
            <button @click="addItem">Add</button>
          </td>
        </tr>
      </tbody>
    </table>
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
    removeFile () {
      this.files.splice(0, 1)
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
.image {
  max-width: 100px;
  max-height: 30px;
  width: auto;
  height: auto;
  padding-left: 1rem;
  border: 1px solid #ededed;
}

/* for display order */
.order_detail {
  padding: 0 2rem;
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
