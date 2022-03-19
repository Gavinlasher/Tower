import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NotesService {
  async getAll(query) {
    const comments = await dbContext.Comments.find(query).populate('creator')

    return comments
  }

  async createComment(body) {
    const comment = await dbContext.Comments.create(body)
    await comment.populate('creator')

    return comment
  }

  async remove(body) {
    const message = await dbContext.Comments.findById(body.id)
    if (message.creatorId.toString() !== body.creatorId) {
      throw new BadRequest('this is not your comment to delete')
    }
    await dbContext.Comments.findByIdAndDelete(body.id)
    return 'deleted'
  }
}

export const notesService = new NotesService()
