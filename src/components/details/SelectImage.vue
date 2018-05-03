<template>
  <transition name="modal">
    <div class="modal_mask">
      <div class="modal_container">

        <div class="modal_header">
          <h3>SELECT IMAGE</h3>
        </div>

        <div class="modal_body">
          <div v-for="(detail, index) in orderPicked.items" :key="index">
            <div @click="$emit('select', detail.image)">
              <img @click="isActive=!isActive" class="image" :src="detail.image">
            </div>
          </div>
          <vue-clip class="clip" v-if="files.length === 0" ref="vc" :options="options" :on-added-file="fileAdded">
            <template slot="clip-uploader-action" slot-scope="props">
              <div class="uploader-action" :class="{dragging: props.dragging}">
                <div class="dz-message">
                  <p class="border">Select new image</p>
                </div>
              </div>
            </template>
          </vue-clip>
          <div v-for="(file, index) in files" :key="index">
            {{file.name}}
            <button @click="removeFile">Delete</button>
          </div>
        </div>

        <div class="modal-footer">
          <button style="float:right" @click="$emit('close')">
            CLOSE
          </button>
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
      files: []
    }
  },
  computed: {
    orderPicked: {
      get () {
        return this.$store.state.order_picked
      }
    }
  },
  methods: {
    fileAdded (file) {
      this.files.push(file)
    },
    removeFile () {
      this.files.splice(0, 1)
    }
  }
}
</script>

<style scoped>
@import '../../assets/css/order_lib.css';
@import '../../assets/css/button_lib.css';
h3 {
  margin-top: 0;
}
img {
  cursor: pointer;
}
.test {
  width: 300px;
}
.border {
  color: #fff;
  background: #555;
  padding: .25rem 1rem;
  cursor: pointer;
}
.modal_mask {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .5);
  transition: opacity .3s ease;
}
.modal_container {
  width: 400px;
  margin: 0px auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
}
.modal_header {
  border-bottom: 1px solid #dcdcdc;
}
.modal_body {
  margin: 20px 0;
}
.modal_enter {
  opacity: 0;
}
.modal_leave_active {
  opacity: 0;
}
.modal_enter .modal_container,
.modal_leave_active .modal_container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>
