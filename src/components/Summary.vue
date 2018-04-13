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
      <h3>Step 1</h3>
      Representative Name: {{rep}} <br />
      Garments from: {{garmentChecked}} <br />
      Shipping method: {{methodChecked}} <br />
      Split Shipping: {{split}} <br />
      Shipping Address:
      <ul>
       <li v-for="(input, index) in inputs" :key="index">
         {{index + 1}}
         Address: {{input.address}}
         Detail: {{input.detail}}
       </li>
     </ul>

     <!-- step 2 -->
     <h3>Step 2</h3>
     Re-order: {{reOrder}} <br />
     Order {{orderPicked}} <br />
     Exact same order: {{sameOrder}} <br />

     <!-- step 3 -->
     <h3>Step 3</h3>
     <ul>
      <li v-for="(option, index) in optionChecked" :key="index">
        {{index + 1}} {{option}}
      </li>
    </ul>
    Comment(s) <br />
    {{comments}}
   </main>
  </div>
</template>

<script>

export default {
  name: 'Summary',
  computed: {
    rep: {
      get () {
        return this.$store.state.rep
      }
    },
    garmentChecked: {
      get () {
        return this.$store.state.garment
      }
    },
    methodChecked: {
      get () {
        return this.$store.state.method
      }
    },
    split: {
      get () {
        return this.$store.state.split
      }
    },
    inputs: {
      get () {
        return this.$store.state.addresses
      }
    },
    reOrder: {
      get () {
        return this.$store.state.re_order
      }
    },
    orderPicked: {
      get () {
        return this.$store.state.order_picked
      }
    },
    sameOrder: {
      get () {
        return this.$store.state.same_order
      }
    },
    optionChecked: {
      get () {
        return this.$store.state.option_checked
      }
    },
    comments: {
      get () {
        return this.$store.state.comments
      }

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
