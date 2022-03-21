<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
  <div class="row">
    <div
      class="text-light col-md-12 bg-secondary rounded shadow m-1"
      v-for="t in myTicket"
      :key="t.id"
    >
      <div>
        <img :src="t.event.coverImg" alt="" />
      </div>
      <div>
        <h1>{{ t.event.name }}</h1>
        <button class="btn btn-danger" @click="removeTicket(t.id)">
          Delete Ticket
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, watchEffect } from 'vue'
import { AppState } from '../AppState'
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { accountService } from "../services/AccountService"
import { ticketsService } from "../services/TicketsService"
export default {
  name: 'Account',
  setup() {
    watchEffect(async () => {
      try {
        await accountService.getMyTickets()
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, "error message")
      }
    })
    return {
      account: computed(() => AppState.account),
      myTicket: computed(() => AppState.myTickets),
      async removeTicket(id) {
        try {
          await ticketsService.remove(id)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'message error')
        }
      }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
