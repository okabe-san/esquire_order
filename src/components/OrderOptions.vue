<template>
  <div>
    <section>
      <h3 class="step">Step 1</h3>
      <h3 class="step">Step 2</h3>
      <h3 class="step">Step 3</h3>
      <h3>Review</h3>
    </section>
    <main>
      <h1>Options</h1>
      <!-- options list -->
      Select option(s)
      <ul>
        <li v-for="option in options" :key="option">
          {{option}}
          <input type="checkbox" v-model="optionChecked" :value="option">

          <!-- FOR OPTION 2 -->
          <div v-if="
            optionChecked.includes(option) &&
            option === 'Poly Bagged by name'">
            <h1>Poly Bagged by name</h1>
          </div>

          <!-- FOR OPTION 5 -->
          <div v-if="
            optionChecked.includes(option) &&
            option === 'Personalization'">
            <h1>Personalization</h1>
          </div>

        </li>
      </ul>

      <!-- nav buttons -->
      <button @click="back">Back</button>
      <button @click="next">Next</button>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Options',
  data () {
    return {
      options: [],
      optionChecked: []
    }
  },
  created () {
    this.loadOptions()
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
      this.$router.push('/details')
    },
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
