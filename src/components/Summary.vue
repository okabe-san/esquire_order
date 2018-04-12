<template>
  <div>
    <h1>summary</h1>
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
    }
  }
}
</script>

<style scoped>
li { list-style-type: none; }
</style>
