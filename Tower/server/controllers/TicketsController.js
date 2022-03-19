import { Auth0Provider } from '@bcwdev/auth0provider'
import { ticketsService } from '../services/TicketsService'
import BaseController from '../utils/BaseController'

export class TicketsController extends BaseController {
  constructor() {
    super('api/tickets')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTicket)
      .delete('/:ticketId', this.remove)
  }

  async createTicket(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id

      const ticket = await ticketsService.createTicket(req.body)
      res.send(ticket)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.ticketId
      const message = await ticketsService.remove(req.body)
      res.send(message)
    } catch (error) {
      next(error)
    }
  }
}
