import { Auth0Provider } from '@bcwdev/auth0provider'
import { eventsService } from '../services/EventsService'
import BaseController from '../utils/BaseController'

export class EventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAll)
      .get('/:eventId', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:eventId', this.edit)
      .delete('/:eventId', this.cancel)
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const towerEvent = await eventsService.create(req.body)
      res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }

  async getAll(req, res, next) {
    try {
      const towerEvents = await eventsService.getAll(req.query)
      res.send(towerEvents)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      req.body.eventId = req.params.eventId
      const towerEvent = await eventsService.getById(req.body.eventId)
      res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.eventId = req.params.eventId
      const updateEvent = await eventsService.edit(req.body)
      res.send(updateEvent)
    } catch (error) {
      next(error)
    }
  }

  async cancel(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.eventId = req.params.eventId
      const message = await eventsService.cancelEvent(req.body)
      res.send(message)
    } catch (error) {
      next(error)
    }
  }
}
