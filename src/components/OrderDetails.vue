<template>
  <div>
    <section>
      <h3 class="step">Step 1</h3>
      <h3 class="step">Step 2</h3>
      <h3>Step 3</h3>
      <h3>Review</h3>
    </section>
    <main>
      <h1>Details</h1>

      <!-- check re-order -->
      Re-Order?
      <input type="checkbox" v-model="re_order">
      {{re_order}}

      <div v-if="re_order == true">
        <!-- check exact same order -->
        <input type="checkbox" v-model="same_order">
        {{same_order}}

      </div>

      <!-- nav buttons -->
      <button @click="next">Next</button>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  computed: {
    re_order: {
      get () {
        return this.$store.state.re_order
      },
      set (value) {
        this.$store.dispatch('updateReOrder', value)
        this.$store.dispatch('updateSameOrder', false)
      }
    },
    same_order: {
      get () {
        return this.$store.state.same_order
      },
      set (value) {
        this.$store.dispatch('updateSameOrder', value)
      }
    }
  },
  methods: {
    next () {
      this.$router.push('/summary')
    }
  }
}
</script>

<style scoped>
main {
  box-sizing: border-box;
  float: right;
  width: 80%;

  padding-right: 10%;
}
section {
  box-sizing: border-box;
  float: left;
  width: 20%;
}
li {
  list-style-type: none;
}
.step {
  color: orange;
}
</style>
