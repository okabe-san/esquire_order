<template>
  <transition name="modal">
    <div class="modal-mask">

        <div class="modal-container">

          <div class="modal-header">
            Select Image
          </div>

          <div class="modal-body">
            <div v-for="(detail, index) in orderPicked.items" :key="index">
              <img class="image" :src="detail.image">
            </div>
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
          </div>

          <div class="modal-footer">
            <button @click="$emit('close')">
              OK
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
@import '../../assets/css/button_lib.css';
@import '../../assets/css/order_lib.css';
.modal-mask {
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
