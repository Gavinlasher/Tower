<template>
  <div class="row cover-img bg-light m-4">
    <div class="col-md-4 no-blur">
      <img class="img-fluid m-3 border shadow" :src="events.coverImg" alt="" />
    </div>
    <div class="col-md-8 p-5 read-text">
      <div
        class="d-flex justify-content-end"
        v-if="account.id == events.creatorId && !events.isCanceled"
      >
        <button class="btn btn-danger me-3" @click="cancelEvent(events.id)">
          Cancel Event
        </button>
        <button
          class="btn btn-warning"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasExample"
        >
          Edit Details
        </button>
      </div>
      <h3 class="text-start text-light">{{ events.name }}</h3>
      <h3 class="text-start text-light">{{ events.location }}</h3>
      <h6 class="text-light text-start">{{ events.description }}</h6>
      <div class="d-flex justify-content-between mt-5">
        <h3>
          {{ events.capacity }}
          <span class="ms-2"> Spots Left</span>
        </h3>
        <button
          v-if="
            events.capacity > 0 &&
            !events.isCanceled &&
            myTicket.eventId !== events.id
          "
          class="btn btn-light ms-5"
          @click="createTicket(events.id)"
        >
          Attend
        </button>
      </div>
    </div>
  </div>
  <h2 class="ms-4">See Whos is attending</h2>
  <div class="row m-4 bg-secondary">
    <div class="col-md-1 p-3" v-for="t in ticket" :key="t.id">
      <Tickets :ticket="t" />
    </div>
  </div>
  <OffCanvas id="offcanvasExample" />
</template>


<script>
import { computed, watchEffect } from "@vue/runtime-core"
import { useRoute } from "vue-router"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { eventsService } from "../services/EventsService"
import { AppState } from "../AppState"
import { ticketsService } from '../services/TicketsService'
export default {
  setup() {
    let capacity = AppState.events.capacity
    const route = useRoute()
    watchEffect(async () => {
      try {
        if (route.name = 'Event') {
          await eventsService.getActiveEvent(route.params.id)
          await ticketsService.getAllTickets(route.params.id)

        }
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error message')
      }
    })
    return {
      async createTicket(id) {
        try {
          let newTicket = {
            accountId: AppState.account.id,
            eventId: AppState.ActiveEvent.id,
          }
          capacity -= 1
          await ticketsService.createTicket(newTicket)

        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error message')
        }
      },
      async cancelEvent(id) {
        try {
          await eventsService.cancel(id)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, "error message")
        }
      }
      ,
      events: computed(() => AppState.ActiveEvent),
      account: computed(() => AppState.account),
      coverImg: computed(() => `url('${AppState.ActiveEvent.coverImg}')`),
      ticket: computed(() => AppState.ticket),
      capacity: computed(() => AppState.events),
      myTicket: computed(() => AppState.myTickets)
    }
  }
}
</script>


<style lang="scss" scoped>
.cover-img {
  background-image: v-bind(coverImg);
  background-size: cover;
  background-position: center;
  backdrop-filter: blur(50px);
}
img {
  height: 50vh;
  width: 60vh;
}
.read-text {
  text-shadow: 2px 1px black;
}
.pp {
  height: 10vh;
  width: 10vh;
  border-radius: 50%;
}
</style>