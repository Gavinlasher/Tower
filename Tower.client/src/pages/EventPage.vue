<template>
  <div class="row cover-img bg-light m-4">
    <div class="col-md-4 no-blur">
      <img class="img-fluid m-3 border shadow" :src="events.coverImg" alt="" />
    </div>
    <div class="col-md-8 p-5 read-text">
      <h3 class="text-start text-light">{{ events.name }}</h3>
      <h3 class="text-start text-light">{{ events.location }}</h3>
      <h6 class="text-light text-start">{{ events.description }}</h6>
      <div class="d-flex justify-content-between mt-5">
        <h3>
          {{ events.capacity }}
          <span class="ms-2"> Spots Left</span>
        </h3>
        <button class="btn btn-light ms-5">Attend</button>
      </div>
    </div>
  </div>
  <h2 class="ms-4">See Whos is attending</h2>
  <div class="row m-4">
    <div class="col-md-12 bg-secondary">img of ticket holder</div>
  </div>
</template>


<script>
import { computed, watchEffect } from "@vue/runtime-core"
import { useRoute } from "vue-router"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { eventsService } from "../services/EventsService"
import { AppState } from "../AppState"
export default {
  setup() {
    const route = useRoute()
    watchEffect(async () => {
      try {
        if (route.name = 'Event') {
          await eventsService.getActiveEvent(route.params.id)
        }
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error message')
      }
    })
    return {
      events: computed(() => AppState.ActiveEvent),
      account: computed(() => AppState.account),
      coverImg: computed(() => `url('${AppState.ActiveEvent.coverImg}')`)
    }
  }
}
</script>


<style lang="scss" scoped>
.cover-img {
  background-image: v-bind(coverImg);
  background-size: cover;
  background-position: center;
}
img {
  height: 50vh;
  width: 60vh;
}
.read-text {
  text-shadow: 2px 1px black;
}
</style>