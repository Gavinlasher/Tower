<template>
  <div class="bg-white bordered text-dark rounded shadow p-2">
    <div class="d-flex">
      <img :src="note.creator.picture" alt="" class="img-fluid pp me-2" />
      {{ note.creator.name }}
      <i
        v-if="note.creatorId == account.id"
        class="mdi mdi-delete selectable ms-5"
        @click="remove(note.id)"
        title="delete note"
      ></i>
    </div>
    <div>
      <p>{{ note.body }}</p>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { notesService } from "../services/NotesSevice"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { AppState } from "../AppState"
export default {
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
      account: computed(() => AppState.account),
      async remove(id) {
        try {
          await notesService.remove(id)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, ' error message')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.pp {
  height: 10vh;
  width: 10vh;
  border-radius: 50%;
}
</style>