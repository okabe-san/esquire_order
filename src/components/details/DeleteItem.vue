<template>
  <transition name="modal">
    <div class="modal_mask">
      <div class="modal_container">

        <div class="modal_header">
          <h3>DELETE ITEM</h3>
        </div>

        <div class="modal_body">
          <p class="message" style="margin-top:0">
            Are you sure delete this item?
          </p>
          <table style="width:100%">
            <thead>
              <tr>
                <th>Item</th>
                <th>Location</th>
                <th>Quantity</th>
                <th>Logo</th>
                <th>Stitch</th>
                <th>File Name</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{orderPicked.items[index].item}}</td>
                <td>{{orderPicked.items[index].location}}</td>
                <td>{{orderPicked.items[index].quantity}}</td>
                <td><img class="image" :src="orderPicked.items[index].image"></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="modal_footer">
          <button style="float:left" @click="$emit('cancel')">
            CANCEL
          </button>
          <button style="float:right" @click="$emit('remove')">
            DELETE
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ['data'],
  data () {
    return {
      index: this.data
    }
  },
  computed: {
    orderPicked: {
      get () {
        return this.$store.state.order_picked
      }
    }
  }
}
</script>

<style scoped>
@import '../../assets/css/order_lib.css';
@import '../../assets/css/button_lib.css';
@import '../../assets/css/modal_lib.css';
</style>
