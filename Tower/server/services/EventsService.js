import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class EventsService {
  cancel(id) {
    throw new Error('Method not implemented.')
  }

  async edit(update) {
    const original = await dbContext.TowerEvents.findById(update.eventId)
    if (original.creatorId.toString() !== update.creatorId) {
      throw new Forbidden('This is not your event to change')
    }
    if (original.isCanceled) {
      throw new BadRequest('there is no event')
    }
    original.name = update.name ? update.name : original.name
    original.description = update.description ? update.description : original.description
    await original.save()
    return original
  }

  async getById(id) {
    const towerEvent = await dbContext.TowerEvents.findById(id)
    if (!towerEvent) {
      throw new BadRequest('there is not an event tied to this id')
    }
    return towerEvent
  }

  async getAll(query = {}) {
    const towerEvents = await dbContext.TowerEvents.find(query)
    return towerEvents
  }

  async create(body) {
    const todayDate = new Date().toLocaleString
    if (body.startDate.toString() <= todayDate) {
      throw new BadRequest('Has to be a date in the furture!')
    }
    const towerEvent = await dbContext.TowerEvents.create(body)
    return towerEvent
  }

  async cancelEvent(update) {
    const original = await dbContext.TowerEvents.findById(update.eventId)
    if (original.creatorId.toString() !== update.creatorId) {
      throw new BadRequest('This is  not your event to cancel')
    }
    original.isCanceled = !original.isCanceled
    await original.save()
    return original.isCanceled ? 'Canceled' : 'not Canceled'
  }
}

export const eventsService = new EventsService()
