import { Schema } from 'mongoose'

export const TicketSchema = new Schema({
  eventId: { type: Schema.Types.ObjectId, ref: 'TowerEvent', required: true },
  accountId: { type: Schema.Types.ObjectId, ref: 'Account' }
}, { timestamps: true, toJSON: { virtuals: true } })

TicketSchema.index({ eventId: 1, accountId: 1 }, { unique: true })

TicketSchema.virtual('event', {
  localField: 'eventId',
  foreignField: '_id',
  justOne: true,
  ref: 'TowerEvent'
})

TicketSchema.virtual('account', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
