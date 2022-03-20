<template>
  <form @submit.prevent="createEvent">
    <div class="row justify-content-center">
      <div class="row p-3">
        <div class="col-12">
          <label for="">Name: </label>
          <input v-model="editable.name" type="text" name="" id="" />
        </div>
      </div>
      <div class="row p-3">
        <div class="col-12">
          <label for="">Description: </label>
          <input v-model="editable.description" type="text" name="" id="" />
        </div>
      </div>
      <div class="row p-3">
        <div class="col-12">
          <label for="">Cover Image: </label>
          <input v-model="editable.coverImg" type="text" name="" id="" />
        </div>
      </div>
      <div class="row p-3">
        <div class="col-12">
          <label for="">Location: </label>
          <input v-model="editable.location" type="text" name="" id="" />
        </div>
      </div>
      <div class="row p-3">
        <div class="col-12">
          <label for="">Capacity Limit: </label>
          <input v-model="editable.capacity" type="number" name="" id="" />
        </div>
        <div class="row p-3">
          <div class="col-12">
            <label for="">Start Date: </label>
            <input v-model="editable.startDate" type="date" name="" id="" />
          </div>
        </div>
        <div class="row p-3">
          <div class="col-12">
            <label for="">Type of Event </label>
            <select v-model="editable.type" name="" id="">
              <option value="expos">expos</option>
              <option value="convention">convention</option>
              <option value="exhibit">exhibit</option>
              <option value="sport">sport</option>
              <option value="digital">digital</option>
              <option value="concert">concert</option>
            </select>
          </div>
        </div>
      </div>
      <div class="row p-3 justify-content-end">
        <div class="col-4">
          <button class="btn btn-primary" type="submit">Submit</button>
        </div>
      </div>
    </div>
  </form>
</template>


<script>
import { ref } from "@vue/reactivity"
import { eventsService } from "../services/EventsService"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { Modal } from "bootstrap"
import { useRouter } from "vue-router"
import { AppState } from "../AppState"
export default {
  setup() {
    const editable = ref({})
    const router = useRouter()
    return {
      editable,
      async createEvent() {
        try {
          await eventsService.createEvent(editable.value)
          router.push({
            name: 'Event',
            params: { id: AppState.ActiveEvent.id }
          })
          Modal.getOrCreateInstance(
            document.getElementById("create-event")
          ).hide();
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, "error")
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>