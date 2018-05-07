<template>
  <transition name="modal">
    <div class="modal_mask">
      <div class="modal_container">

        <div class="modal_header">
          <h3>SELECT IMAGE</h3>
        </div>

        <div class="modal_body">
          <button @click="search">
            <span class="button">
              <i class="material-icons">search</i>
              Search Order
            </span>
          </button>
          <div v-for="(detail, index) in images" :key="index">
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
      images: [],
      searchedImages: [],
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
          name: '2in house canary'},
        {image: require(`@/assets/images/logos/ACV Auctions.jpg`),
          name: 'ACV Auctions'},
        {image: require(`@/assets/images/logos/ACV Auctions2.jpg`),
          name: 'ACVAuctions2'},
        {image: require(`@/assets/images/logos/B_Corp.jpg`),
          name: 'B_Corp'},
        {image: require(`@/assets/images/logos/B_Corp2.jpg`),
          name: 'B_Corp2'},
        {image: require(`@/assets/images/logos/Earned it.jpg`),
          name: 'EarnedIt'},
        {image: require(`@/assets/images/logos/Earned it2.jpg`),
          name: 'EarnedIt2'},
        {image: require(`@/assets/images/logos/island Institute.jpg`),
          name: 'islandInstitute'},
        {image: require(`@/assets/images/logos/LinkedIn Franklin.jpg`),
          name: 'LinkedInFranklin'},
        {image: require(`@/assets/images/logos/townsend.jpg`),
          name: 'townsend'},
        {image: require(`@/assets/images/logos/townsend2.jpg`),
          name: 'townsend2'},
        {image: require(`@/assets/images/logos/townsend3.jpg`),
          name: 'townsend3'},
        {image: require(`@/assets/images/logos/triple ring.jpg`),
          name: 'triple ring'}
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
