
import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class TicketsService {
  async getAllTickets(query) {
    const tickets = await dbContext.Tickets.find(query)
    return tickets
  }

  async getTickets(query) {
    const eventTicket = await dbContext.Tickets.find(query).populate('account')
    return eventTicket
  }

  async createTicket(body) {
    const myEvent = await dbContext.TowerEvents.findById(body.eventId)
    myEvent.capacity--
    await myEvent.save()
    const ticket = await dbContext.Tickets.create(body)
    await ticket.populate('event')
    await ticket.populate('account')

    return ticket
  }

  async remove(body) {
    const TicketRemove = await dbContext.Tickets.findById(body.id)
    if (TicketRemove.creatorId.toString() !== body.creatorId) {
      throw new BadRequest('not you ticket')
    }
    await dbContext.Tickets.findByIdAndDelete(body.id)
    return 'deleted'
  }
}

export const ticketsService = new TicketsService()
