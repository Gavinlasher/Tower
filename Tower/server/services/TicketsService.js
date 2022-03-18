import { dbContext } from '../db/DbContext'

class TicketsService {
  async createTicket(body) {
    const myEvent = await dbContext.TowerEvents.findById(body.eventId)
    myEvent.capacity--
    const ticket = await dbContext.Tickets.create(body)
    await ticket.populate('event')
    await ticket.populate('account')

    return ticket
  }
}

export const ticketsService = new TicketsService()
