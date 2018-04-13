<template>
  <div>
    <section>
      <h3 class="step">Step 1</h3>
      <h3 class="step">Step 2</h3>
      <h3>Step 3</h3>
      <h3>Review</h3>
    </section>
    <main>
      <h1>Details</h1>

      <!-- check re-order or not -->
      New Order
      <input type="radio" v-model="re_order" v-on:change="order()" vaule="1"> Yes
      <input type="radio" v-model="re_order" v-on:change="order()" value="2"> No: Re-Order
      <br />

      <!-- for re-order -->
      <div v-if="reOrder">
        <!-- select order -->
        Pick Order
        <ul>
          <li v-for="order in orders" :key="order">
            <input type="radio" v-model="order_picked" :value="order">
              {{order}}
          </li>
        </ul>
        <!-- check exact same order or not -->
        Is this the exact same order?
        <input type="checkbox" v-model="same_order">
      </div>

      <!-- for non re-order -->
      <div v-else>
        <h3>Upload file(s)</h3>
        <!-- upload embroidery file(s) -->
        <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
          <div class="dropbox">
            <!-- need to add acceptable file types -->
            <input type="file"
              multiple
              :name="uploadFieldName"
              :disabled="isSaving"
              @change="filesChange($event.target.name, $event.target.files);
              fileCount = $event.target.files.length"
               accept="image/*"
              class="input-file">
              <p v-if="isInitial">
                Drag your file(s) here to begin<br /> or click to browse
              </p>
              <p v-if="isSaving">
                Uploading {{ fileCount }} files...
              </p>
          </div>
        </form>

      </div>

      <!-- nav buttons -->
      <button @click="back">Back</button>
      <button @click="next">Next</button>
    </main>
  </div>
</template>

<script>
import { upload } from 'v-file-upload'

// FOR FILE UPLOAD
const STATUS_INITIAL = 0
const STATUS_SAVING = 1
const STATUS_SUCCESS = 2
const STATUS_FAILED = 3

export default {
  name: 'Detail',
  data () {
    return {
      orders: [],
      reOrder: null,
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: ''
    }
  },
  created () {
    this.loadOrders()
  },
  mounted () {
    this.reset()
  },
  computed: {
    re_order: {
      get () {
        return this.$store.state.re_order
      },
      set (value) {
        this.$store.dispatch('updateReOrder', value)
        this.$store.dispatch('updateOrderPicked', '')
        this.$store.dispatch('updateSameOrder', false)
      }
    },
    order_picked: {
      get () {
        return this.$store.state.order_picked
      },
      set (value) {
        this.$store.dispatch('updateOrderPicked', value)
      }
    },
    same_order: {
      get () {
        return this.$store.state.same_order
      },
      set (value) {
        this.$store.dispatch('updateSameOrder', value)
      }
    },

    // FOR FILE UPLOAD
    isInitial () {
      return this.currentStatus === STATUS_INITIAL
    },
    isSaving () {
      return this.currentStatus === STATUS_SAVING
    },
    isSuccess () {
      return this.currentStatus === STATUS_SUCCESS
    },
    isFailed () {
      return this.currentStatus === STATUS_FAILED
    }
  },
  methods: {
    async loadOrders () {
      // FIXME: use query to load orders
      const data = [
        'Order 001', 'Order 002', 'Order 003', 'Order 004'
      ]
      this.orders = data
    },
    order () {
      this.reOrder = !this.reOrder
    },
    back () {
      this.$router.push('/shipping')
    },
    next () {
      this.$router.push('/summary')
    },
    // FOR FILE UPLOAD
    reset () {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL
      this.uploadedFiles = []
      this.uploadError = null
    },
    save (formData) {
      // upload data to the server
      this.currentStatus = STATUS_SAVING

      // FIXME: develop upload file(s)
      upload(formData)
        .then(x => {
          this.uploadedFiles = [].concat(x)
          this.currentStatus = STATUS_SUCCESS
        })
        .catch(err => {
          this.uploadError = err.response
          this.currentStatus = STATUS_FAILED
        })
    },
    filesChange (fieldName, fileList) {
      // handle file changes
      const formData = new FormData()
      console.log(formData)
      if (!fileList.length) return

      // append the files to FormData
      Array
        .from(Array(fileList.length).keys())
        .map(x => {
          formData.append(fieldName, fileList[x], fileList[x].name)
        })

      // save it
      this.save(formData)
    }
  }
}
</script>

<style scoped>
main {
  box-sizing: border-box;
  float: right;
  width: 80%;

  padding-right: 10%;
}
section {
  box-sizing: border-box;
  float: left;
  width: 20%;
}
li {
  list-style-type: none;
}
.step {
  color: orange;
}

/* FOR FILE UPLOAD */
.dropbox {
  outline: 1px dashed grey;
  outline-offset: -1rem;
  background: lightcyan;
  color: dimgray;
  padding: 2rem;
  min-height: 200px;
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0;
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: lightblue;
}

.dropbox p {
  font-size: 1.2rem;
  text-align: center;
  padding: 2rem 0;
}
</style>
