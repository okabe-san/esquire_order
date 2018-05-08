<template>
  <div id="order">
    <section>
      <h3>Step 1</h3>
      <i class="material-icons step">keyboard_arrow_down</i>
      <h3>
        Step 2<br />
      </h3>
      <i class="material-icons step">keyboard_arrow_down</i>
      <h2 class="step">
        Step 3<br />
        <small>Option</small>
      </h2>
      <i class="material-icons step">keyboard_arrow_down</i>
      <h3>Review</h3>
    </section>

    <main>
      <div class="form_wrapper">
        <div class="form">
          <h2>Options</h2>

          <!-- options list -->
          <ul>
            <li v-for="option in options" :key="option">
              {{option}}&nbsp;
              <label class="container">
                <input type="checkbox" v-model="optionChecked" :value="option">
                <span class="checkbox"></span>
              </label>

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
            </li>
          </ul>

          <!-- comments -->
          Additional Comments
          <input type="text" v-model="comments">
          <br />

          <!-- nav buttons -->
          <button @click="back">Back</button>
          <button @click="next">Next</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Options',
  data () {
    return {
      options: [],
      optionDetails: {
        url: '/details'
      },
      baggedByName: [],
      personalizationName: []
    }
  },
  created () {
    this.loadOptions()
  },
  computed: {
    optionChecked: {
      get () {
        return this.$store.state.option_checked
      },
      set (value) {
        this.$store.dispatch('updateOptionChecked', value)
      }
    },
    comments: {
      get () {
        return this.$store.state.comments
      },
      set (value) {
        this.$store.dispatch('updateComments', value)
      }
    }
  },
  methods: {
    async loadOptions () {
      // FIXME: use query to load options
      const data = [
        'Poly Bagged', 'Poly Bagged by name', 'Pre-Production required', 'Sew-out required', 'Personalization'
      ]
      this.options = data
    },
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
    },
    back () {
      this.$router.push('/shipping')
    },
    next () {
      this.$router.push('/summary')
    }
  }
}
</script>

<style scoped>
@import '../assets/css/order_lib.css';
@import '../assets/css/button_lib.css';
/* for steps */
h2 {
  font-weight: 700;
  margin: 0;
}
section > h3 {
  color: rgba(255, 255, 255, 0.5);
}

</style>
