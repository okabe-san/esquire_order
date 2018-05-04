<template>
  <transition name="modal">
    <div class="modal_mask">
      <div class="modal_container_small">

        <div class="modal_header">
          <h3>DELETE ITEM</h3>
        </div>

        <div class="modal_body">
          {{index}}
        </div>

        <div class="modal-footer">
          <button style="float:right" @click="$emit('remove')">
            CLOSE
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
  }
}
</script>

<style scoped>
@import '../../assets/css/order_lib.css';
@import '../../assets/css/button_lib.css';
@import '../../assets/css/modal_lib.css';
h3 {
  margin-top: 0;
}
</style>
