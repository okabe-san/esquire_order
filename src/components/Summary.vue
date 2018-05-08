<template>
  <div id="order">
    <section>
      <h3>Step 1</h3>
      <i class="material-icons step">keyboard_arrow_down</i>
      <h3>Step 2</h3>
      <i class="material-icons step">keyboard_arrow_down</i>
      <h3>Step 3</h3>
      <i class="material-icons step">keyboard_arrow_down</i>
      <h2 class="step">Review</h2>
    </section>

    <main>
      <div class="form_wrapper">
        <div class="form">
          <h2>REVIEW</h2>
          <div class="display">

            <!-- step 1 -->
            <div class="one">
              <h3>
                Step 1
                 <button @click="backToDetails">Edit</button>
               </h3>
               : {{state.re_order}} <br />
               Order {{state.order_picked}} <br />
               Need edit: {{state.edit_order}} <br />
             </div>

            <!-- step 2 -->
            <div class="two">
              <h3>
                Step 2
                <button @click="backToShipping">Edit</button>
              </h3>

              Representative Name: {{state.rep}} <br />
              Garments from: {{state.garment}} <br />
              Shipping method: {{state.method}} <br />
              Split Shipping: {{state.split}} <br />
              Shipping Address:
              <ul>
                <li v-for="(input, index) in state.addresses" :key="index">
                  {{index + 1}}
                  Address: {{input.address}}
                  Detail: {{input.detail}}
                </li>
              </ul>
            </div>

            <!-- step 3 -->
            <div>
              <h3>
                Step 3
                <button @click="backToOptions">Edit</button>
              </h3>

              <ul>
                <li v-for="(option, index) in state.option_checked" :key="index">
                  {{index + 1}} {{option}}
                </li>
              </ul>
              Comment(s) <br />
              {{state.comments}}
            </div>
          </div>

          <!-- nav buttons -->
          <div class="action">
            <button class="submit" @click="submit">
              <span class="button">
                Submit
                <i class="material-icons">check</i>
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
  name: 'Summary',
  computed: {
    state: {
      get () {
        return this.$store.state
      }
    }
  },
  methods: {
    backToDetails () {
      this.$router.push('/entry')
    },
    backToShipping () {
      this.$router.push('/shipping')
    },
    backToOptions () {
      this.$router.push('/options')
    },
    submit () {
      this.$router.push('/thanks')
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
  flex-direction: row;
}
.one, .two, .three {
  width: calc(100% / 3);
}
</style>
