<template>
  <transition name="modal">
    <div class="modal_mask">
      <div class="modal_container">

        <div class="modal_header">
          <h3>SELECT IMAGE</h3>
        </div>

        <div class="modal_body">
          <div class="search">
            <input type="text" placeholder="Image Search">
            <button>Search</button>
          </div>
          <div class="image_wrapper">
            <div v-for="(detail, index) in images" :key="index">
              <div @click="selectedImage=detail">
                <img class="image" :src="detail.image">
              </div>
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

          <div v-if="selectedImage.image">
            <p>
              Image: <b><u>'{{selectedImage.name}}'</u></b> was selected.
            </p>
          </div>

        </div>

        <div class="modal_footer">
          <button style="float:left" @click="$emit('close')">
            <span @click="$emit('select', '')">
              Cancel
            </span>
          </button>
          <button style="float:right" @click="$emit('close')">
            <span @click="$emit('select', selectedImage)">
              Add Image
            </span>
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
      images: [],
      selectedImage: {},
      options: {
        url: '/details',
        maxFiles: 1
      },
      files: []
    }
  },
  created () {
    this.getImages()
  },
  computed: {
    orderPicked: {
      get () {
        return this.$store.state.order_picked
      }
    }
  },
  methods: {
    async getImages () {
      // FIXME: use query to get images
      let data = [
        {image: require(`@/assets/images/logos/2in house canary.jpg`),
          name: '2in house canary.jpg',
          stitch: 3832},
        {image: require(`@/assets/images/logos/ACV Auctions.jpg`),
          name: 'ACV Auctions.jpg',
          stitch: 4815},
        {image: require(`@/assets/images/logos/ACV Auctions2.jpg`),
          name: 'ACV Auctions2.jpg',
          stitch: 4815},
        {image: require(`@/assets/images/logos/B_Corp.jpg`),
          name: 'B_Corp.jpg',
          stitch: 4767},
        {image: require(`@/assets/images/logos/B_Corp2.jpg`),
          name: 'B_Corp2.jpg',
          stitch: 4767},
        {image: require(`@/assets/images/logos/Earned it.jpg`),
          name: 'Earned It.jpg',
          stitch: 4698},
        {image: require(`@/assets/images/logos/Earned it2.jpg`),
          name: 'Earned It2.jpg',
          stitch: 4698},
        {image: require(`@/assets/images/logos/island Institute.jpg`),
          name: 'island Institute.jpg',
          stitch: 3879},
        {image: require(`@/assets/images/logos/LinkedIn Franklin.jpg`),
          name: 'Linked InFranklin.jpg',
          stitch: 4059},
        {image: require(`@/assets/images/logos/townsend.jpg`),
          name: 'townsend.jpg',
          stitch: 3747},
        {image: require(`@/assets/images/logos/townsend2.jpg`),
          name: 'townsend2.jpg',
          stitch: 3747},
        {image: require(`@/assets/images/logos/townsend3.jpg`),
          name: 'townsend3.jpg',
          stitch: 3747},
        {image: require(`@/assets/images/logos/triple ring.jpg`),
          name: 'triple ring.jpg',
          stitch: 3764}
      ]
      this.images = data
    },
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
.search {
  margin-bottom: 2rem;
}
img {
  cursor: pointer;
  max-width: 100px;
  max-height: 40px;
  border: 1px solid #999;
}
.image_wrapper {
  display: flex;
  flex-wrap: wrap;
}
.border {
  color: #fff;
  background: #555;
  padding: .25rem 1rem;
  cursor: pointer;
}
</style>
