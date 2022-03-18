import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { CommentSchma } from '../models/Comment'
import { TicketSchema } from '../models/Ticket'
import { TowerEventSchema } from '../models/TowerEvent'
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');

  TowerEvents = mongoose.model('TowerEvent', TowerEventSchema)
  Tickets = mongoose.model('Ticket', TicketSchema)

  Comments = mongoose.model('Comment', CommentSchma)
}

export const dbContext = new DbContext()
