import { Auth0Provider } from '@bcwdev/auth0provider'
import { ticketsService } from '../services/TicketsService'
import BaseController from '../utils/BaseController'

export class TicketsController extends BaseController {
  constructor() {
    super('api/tickets')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTicket)
  }

  async createTicket(req, res, next) {
    try {
      req.body.account = req.userInfo.id

      const ticket = await ticketsService.createTicket(req.body)
      res.send(ticket)
    } catch (error) {
      next(error)
    }
  }
}