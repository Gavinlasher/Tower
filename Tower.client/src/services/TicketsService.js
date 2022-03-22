import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TicketsService {
  async createTicket(ticketData) {
    const res = await api.post('api/tickets', ticketData)

    const newTicket = { ...res.data, name: res.data.account.name, picture: res.data.account.picture }
    AppState.ticket.push(newTicket)
    AppState.ActiveEvent.capacity--

  }
  async getAllTickets(id) {
    const res = await api.get('api/events/' + id + '/tickets')
    logger.log(res.data)
    AppState.ticket = res.data
  }
  async remove(id) {
    const res = await api.delete('api/tickets/' + id)

    AppState.myTickets = AppState.myTickets.filter(t => t.id != id)
    AppState.ActiveEvent.capacity++
  }
}
export const ticketsService = new TicketsService()