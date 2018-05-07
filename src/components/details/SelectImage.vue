<template>
  <transition name="modal">
    <div class="modal_mask">
      <div class="modal_container">

        <div class="modal_header">
          <h3>SELECT IMAGE</h3>
        </div>

        <div class="modal_body">
          <v-client-table :data="tableData" :columns="columns" :options="options">
            <div slot="image" slot-scope="props">
              <img :src="props.row.image">
            </div>
          </v-client-table>

          <!-- <div v-for="(detail, index) in images" :key="index">
            <div @click="$emit('select', detail.image)">
              <img @click="isActive=!isActive" class="image" :src="detail.image">
            </div>
          </div> -->
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
      columns: ['image'],
      tableData: [],
      searchedImages: [],
      options: {
        // for table data
        sortable: ['name'],
        filterable: ['name'],
        // for image loader
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
        {id: 1,
          image: require(`@/assets/images/logos/2in house canary.jpg`),
          name: '2in house canary'},
        {id: 2,
          image: require(`@/assets/images/logos/ACV Auctions.jpg`),
          name: 'ACV Auctions'},
        {id: 3,
          image: require(`@/assets/images/logos/ACV Auctions2.jpg`),
          name: 'ACVAuctions2'},
        {id: 4,
          image: require(`@/assets/images/logos/B_Corp.jpg`),
          name: 'B_Corp'},
        {id: 5,
          image: require(`@/assets/images/logos/B_Corp2.jpg`),
          name: 'B_Corp2'},
        {id: 6,
          image: require(`@/assets/images/logos/Earned it.jpg`),
          name: 'EarnedIt'},
        {id: 7,
          image: require(`@/assets/images/logos/Earned it2.jpg`),
          name: 'EarnedIt2'},
        {id: 8,
          image: require(`@/assets/images/logos/island Institute.jpg`),
          name: 'islandInstitute'},
        {id: 9,
          image: require(`@/assets/images/logos/LinkedIn Franklin.jpg`),
          name: 'LinkedInFranklin'},
        {id: 10,
          image: require(`@/assets/images/logos/townsend.jpg`),
          name: 'townsend'},
        {id: 11,
          image: require(`@/assets/images/logos/townsend2.jpg`),
          name: 'townsend2'},
        {id: 12,
          image: require(`@/assets/images/logos/townsend3.jpg`),
          name: 'townsend3'},
        {id: 13,
          image: require(`@/assets/images/logos/triple ring.jpg`),
          name: 'triple ring'}
      ]
      this.tableData = data
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
  max-width: 100px;
  max-height: 40px;
  border: 1px solid #999;
}
.border {
  color: #fff;
  background: #555;
  padding: .25rem 1rem;
  cursor: pointer;
}
</style>
