import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TicketsService {
  async createTicket(eventId, accountId) {
    const res = await api.post('api/tickets', eventId, accountId)
    logger.log(res.data)
  }
}
export const ticketsService = new TicketsService()