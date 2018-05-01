<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              Add Item
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">

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

            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click="$emit('close')">
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
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
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 500px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>
