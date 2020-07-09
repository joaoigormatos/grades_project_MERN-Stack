
import { logger } from '../config/logger.js'
const createSchema = (mongoose) => {
  const schema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    subject: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    lastModified: {
      type: Date,
      default: Date.now(),
      required: true
    },
  });
  return schema;
}

export default (mongoose) => {
  try {
    const shema = createSchema(mongoose)
    const GradesModel = mongoose.model('grades', shema)
    return GradesModel
  }
  catch (error) {
    logger.error(error.message)
  }
}