<template >
  <div class="container-fluid">
    <div class="row p-5 justify-content-center">
      <div class="col-md-12">
        <div class="border shadow bg-dark">
          <img
            class="img-fluid banner border shadow"
            src="https://images.unsplash.com/photo-1549226024-48875665c1ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80"
            alt=""
          />
        </div>
      </div>
    </div>
    <div class="row p-3">
      <div class="col-md-12 bg-dark border text-center">
        <div class="d-flex text-center">
          <h3 class="selectable" @click="getAll">All</h3>
          <h3 class="selectable" @click="filterEvents('expos')">Expos</h3>
          <h3 class="selectable" @click="filterEvents('convention')">
            Convention
          </h3>
          <h3 class="selectable" @click="filterEvents('exhibits')">Exhibits</h3>
          <h3 class="selectable" @click="filterEvents('sport')">Sports</h3>
          <h3 class="seleactable" @click="filterEvents('digital')">Digital</h3>
          <h3 class="selectable" @click="filterEvents('concerts')">Concerts</h3>
        </div>
      </div>
    </div>
    <div class="row">
      <div
        class="col-md-3 selectable"
        v-for="e in events"
        :key="e.id"
        @click="goTo(e.id)"
      >
        <Events :events="e" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, watchEffect } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { eventsService } from '../services/EventsService'
import { AppState } from "../AppState"
import { useRouter } from "vue-router"
export default {
  name: 'Home',
  setup() {
    const router = useRouter()
    watchEffect(async () => {
      try {
        await eventsService.getAll()
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      async goTo(id) {
        try {
          await eventsService.getActiveEvent(id)
          router.push({
            name: 'Event',
            params: { id: AppState.ActiveEvent.id }
          })
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error message')
        }
      },
      async getAll() {
        try {
          await eventsService.getAll()
        } catch (error) {
          Pop.toast(error.message, 'message')
          logger.error(error)
        }
      },
      async filterEvents(eventType) {
        try {
          await eventsService.filterEvents(eventType)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      events: computed(() => AppState.events)
    }
  }

}
</script>

<style scoped lang="scss">
.banner {
  height: 30vh;
  width: 100%;
  object-fit: cover;
}
h3 {
  padding: 1rem;
}
</style>
