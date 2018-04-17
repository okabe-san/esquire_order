<template>
  <div>
    <h3>Upload file(s)</h3>
    <!-- upload file(s) -->
    <vue-clip ref="vc" :options="options" :on-added-file="fileAdded">

      <template slot="clip-uploader-action" slot-scope="props">
        <div class="uploader-action" :class="{dragging: props.dragging}">
          <div class="dz-message">
            Drag and Drop file(s)
          </div>
        </div>
      </template>

    </vue-clip>

    <div v-for="(file, index) in files" :key="index">
      {{file.name}}
      <button @click="removeFile(index)">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      options: {
        url: '/details'
      },
      files: []
    }
  },
  methods: {
    fileAdded (file) {
      this.files.push(file)
    },
    removeFile (index) {
      this.files.splice(index, 1)
    }
  }
}
</script>

<style scoped>
.uploader-action {
  padding: 1rem;
  background: lightgray;
  cursor: pointer;
  transition: background 200ms ease;
}
.uploader-action.dragging {
  background: #effff6;
}
.uploader-action .dz-messge {
  text-align: center;
}
</style>
