<template>
  <div>
    <section>
      <h3 class="step">Step 1</h3>
      <h3 class="step">Step 2</h3>
      <h3 class="step">Step 3</h3>
      <h3 class="step">Review</h3>
    </section>
    <main>
      <h1>Review</h1>
      <!-- step 1 -->
      <h3>
        Step 1
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

     <!-- step 2 -->
     <h3>
       Step 2
        <button @click="backToDetails">Edit</button>
      </h3>

     Re-order: {{state.re_order}} <br />
     Order {{state.order_picked}} <br />
     Need edit: {{state.edit_order}} <br />

     <!-- step 3 -->
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
    backToShipping () {
      this.$router.push('/shipping')
    },
    backToDetails () {
      this.$router.push('/details')
    },
    backToOptions () {
      this.$router.push('/options')
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
