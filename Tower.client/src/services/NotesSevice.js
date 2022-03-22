import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class NotesService {
  async createNote(body) {
    const res = await api.post('api/comments', body)

    AppState.notes = [...AppState.notes, res.data]
  }
  async getAllNotes(id) {
    const res = await api.get('api/events/' + id + '/comments')
    AppState.notes = res.data
  }
  async remove(id) {
    const res = await api.delete('api/comments/' + id)
    AppState.notes = AppState.notes.filter(n => n.id != id)
  }
}


export const notesService = new NotesService()