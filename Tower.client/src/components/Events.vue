<template>
  <div>
    <img class="img-fluid" :src="events.coverImg" alt="" />
  </div>
  <div class="">
    <h5 class="ms-2">{{ events.name }}</h5>
    <h6 class="ms-3">{{ events.location }}</h6>
    <h6 class="ms-3">{{ new Date(events.startDate).toDateString() }}</h6>
    <h6 class="text-end" v-if="!events.isCanceled">
      <span class="me-3"> Spots left {{ events.capacity }}</span>
    </h6>
    <div class="bg-danger" v-if="events.isCanceled">
      <h4 class="text-center">Canceled</h4>
    </div>

    <div class="bg-danger" v-if="events.capacity <= 0">
      <h4 class="text-center">SoldOut</h4>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    events: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {

    }
  }
}
</script>


<style lang="scss" scoped>
</style>