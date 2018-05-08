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
        <small>Options</small>
      </h2>
      <i class="material-icons step">keyboard_arrow_down</i>
      <h3>Review</h3>
    </section>

    <main>
      <div class="form_wrapper">
        <div class="form">
          <h2>Options</h2>
          <div class="display">

            <!-- options list -->
            <ul>
              <li v-for="option in options" :key="option">
                {{option}}&nbsp;&nbsp;&nbsp;
                <label class="container">
                  <input type="checkbox" v-model="optionChecked" :value="option">
                  <span class="checkbox"></span>
                </label>
              </li>
            </ul>

            <!-- comments -->
            <h3>Additional Comments:</h3>
            <textarea cols="60" rows="5" v-model="comments">
            </textarea>

          </div>

          <!-- nav buttons -->
          <div class="action">
            <button class="back" @click="back">
              <span class="button">
                <i class="material-icons">keyboard_arrow_left</i>
                Back
              </span>
            </button>
            <button class="next" @click="next">
              <span class="button">
                Next
                <i class="material-icons">navigate_next</i>
              </span>
            </button>
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
.display {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.action {
  margin-top: 3rem;
}

</style>
