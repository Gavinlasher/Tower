import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class EventsSevices {
  async getAll() {
    const res = await api.get('api/events')
    logger.log(res.data)
    AppState.events = res.data
  }
  async filterEvents(type) {
    const res = await api.get('api/events' + '?type=' + type)
    logger.log(res.data)
    AppState.events = res.data


  }
  async createEvent(body) {
    const res = await api.post('api/events', body)
    logger.log(res.data)
    AppState.events = [...AppState.events, res.data]
    AppState.ActiveEvent = res.data

  }
  async getActiveEvent(id) {
    const res = await api.get('api/events/' + id)
    logger.log(res.data)
    AppState.ActiveEvent = res.data
  }
  async cancel(id) {
    const res = await api.delete('api/events/' + id)
    logger.log(res.data)
  }
}
export const eventsService = new EventsSevices()