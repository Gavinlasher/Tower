<template>
  <img
    class="img-fluid pp"
    :src="ticket.account.picture"
    alt=""
    :title="ticket.account.name"
  />
</template>


<script>
export default {
  props: {
    ticket: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {

    }
  }
}
</script>


<style lang="scss" scoped>
</style>