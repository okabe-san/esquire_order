<template>
  <div>
    <!-- FOR OPTION 2 -->
    <div v-if="
      optionChecked.includes(option) &&
      option === 'Poly Bagged by name'">
      <h3>Upload list</h3>
      <!-- upload file -->
      <vue-clip ref="vc" :options="optionDetails" :on-added-file="fileAddedBagged">
        <template slot="clip-uploader-action" slot-scope="props">
          <div class="uploader-action" :class="{dragging: props.dragging}">
            <div class="dz-message">
              Drag and Drop file
            </div>
          </div>
        </template>
      </vue-clip>
      <div v-for="(file, index) in baggedByName" :key="index">
        {{file.name}}
        <button @click="removeFileAddedBagged(index)">Delete</button>
      </div>
    </div>

    <!-- FOR OPTION 5 -->
    <div v-if="
      optionChecked.includes(option) &&
      option === 'Personalization'">
      <h3>Upload list</h3>
      <!-- upload file -->
      <vue-clip ref="vc" :options="optionDetails" :on-added-file="fileAddedPersonal">
        <template slot="clip-uploader-action" slot-scope="props">
          <div class="uploader-action" :class="{dragging: props.dragging}">
            <div class="dz-message">
              Drag and Drop file
            </div>
          </div>
        </template>
      </vue-clip>
      <div v-for="(file, index) in personalizationName" :key="index">
        {{file.name}}
        <button @click="removeFileAddedPersonal(index)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      optionDetails: {
        url: '/details'
      },
      baggedByName: [],
      personalizationName: []
    }
  },
  methods: {
    fileAddedBagged (file) {
      this.baggedByName.push(file)
    },
    removeFileAddedBagged (index) {
      this.baggedByName.splice(index, 1)
    },
    fileAddedPersonal (file) {
      this.personalizationName.push(file)
    },
    removeFileAddedPersonal (index) {
      this.personalizationName.splice(index, 1)
    }
  }
}
</script>

<style scoped>
</style>
