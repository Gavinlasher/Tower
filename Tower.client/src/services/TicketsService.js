import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TicketsService {
  async createTicket(ticketData) {
    const res = await api.post('api/tickets', ticketData)
    logger.log(res.data)
    const newTicket = { ...res.data, name: res.data.account.name, picture: res.data.account.picture }
    AppState.ticket.push(newTicket)
  }
  async getAllTickets(id) {
    const res = await api.get('api/events/' + id + '/tickets')
    logger.log(res.data)
    AppState.ticket = res.data
  }
}
export const ticketsService = new TicketsService()