import { Schema } from 'mongoose'

export const CommentSchma = new Schema({
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
  eventId: { type: Schema.Types.ObjectId, ref: 'TowerEvent' },
  body: { type: String, required: true }
},
  { timestamps: true, toJSON: { virtuals: true } }
)

CommentSchma.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Profile',
  justOne: true
})
