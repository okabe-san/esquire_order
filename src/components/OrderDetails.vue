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
      Re-Order?
      <input type="radio" v-model="re_order" v-on:change="order()" vaule="1"> No
      <input type="radio" v-model="re_order" v-on:change="order()" value="2"> Yes
      <br />

      <!-- for re-order -->
      <div v-if="reOrder">
        <!-- check exact same order or not -->
        Is this the exact same order?
        <input type="checkbox" v-model="same_order">
        {{same_order}}

        <!-- select order -->
        <div v-if="same_order">
          Pick Order
          <ul>
            <li v-for="order in orders" :key="order">
              <input type="radio" v-model="orderPicked" :value="order">
                {{order}}
            </li>
          </ul>
        </div>
      </div>

      <!-- for non re-order -->
      <div v-else>
        <h3>Upload file(s)</h3>
        <!-- upload embroidery file(s) -->
        <form enctype="multipart/form-data" v-if="isInitial || isSaving">
          <div class="dropbox">
            <!-- need to add acceptable file types -->
            <input type="file"
              multiple
              :name="uploadFieldName"
              :disabled="isSaving"
              @change="filesChange($event.target.name, $event.target.files);
              fileCount = $event.target.files.length"
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
      <button @click="next">Next</button>
    </main>
  </div>
</template>

<script>
// for file upload
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
      re_order: null,
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
    same_order: {
      get () {
        return this.$store.state.same_order
      },
      set (value) {
        this.$store.dispatch('updateSameOrder', value)
        this.$store.dispatch('updateOrderPicked', '')
      }
    },
    orderPicked: {
      get () {
        return this.$store.state.order_picked
      },
      set (value) {
        this.$store.dispatch('updateOrderPicked', value)
      }
    },
    // for file upload
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
    next () {
      this.$router.push('/summary')
    },
    order () {
      this.reOrder = !this.reOrder
    },
    // for file upload
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
    },
    filesChange (fieldName, fileList) {
      // handle file changes
      const formData = new FormData()

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
.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  background: lightcyan;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px; /* minimum height */
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: lightblue; /* when mouse over to the drop zone, change color */
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}
</style>
