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
            </li>
          </ul>

          <!-- comments -->
          Additional Comments
          <textarea cols="40" rows="3" v-model="comments">
          </textarea>

          <!-- nav buttons -->
          <div class="action">
            <button @click="back">Back</button>
            <button @click="next">Next</button>
          </div>
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
      options: []
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
.action {
  margin-top: 3rem;
}

</style>
