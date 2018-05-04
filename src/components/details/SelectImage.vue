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
@import '../../assets/css/modal_lib.css';
h3 {
  margin-top: 0;
}
img {
  cursor: pointer;
}
.border {
  color: #fff;
  background: #555;
  padding: .25rem 1rem;
  cursor: pointer;
}
</style>
