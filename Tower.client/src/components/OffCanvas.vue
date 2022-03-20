<template>
  <div
    class="offcanvas offcanvas-start"
    tabindex="-1"
    id="offcanvas"
    aria-labelledby="offcanvasExampleLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title text-dark" id="offcanvasExampleLabel">
        Edit Event
      </h5>
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <div class="text-dark">
        <form @submit.prevent="editEvent">
          <div class="row p-3">
            <div class="col-md-12">
              <label for="">Name:</label>
              <input v-model="editable.name" type="text" name="" id="" />
            </div>
            <div class="col-md-12">
              <label for="">Description:</label>
              <input v-model="editable.description" type="text" name="" id="" />
            </div>
            <div class="col-md-12">
              <label for="">Cancel</label>
              <select v-model="editable.isCanceled" type="text">
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>
          <button class="btn btn-dark" type="submit">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import { ref } from "@vue/reactivity"
import { eventsService } from "../services/EventsService"
import { AppState } from "../AppState"
export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      async editEvent() {
        await eventsService.edit(AppState.ActiveEvent.id, editable.value)
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>