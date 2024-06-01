// import { logger } from '../../shared/logger'

const controller = {
  // eslint-disable-next-line no-unused-vars
  testFeature: async (req, res) => {
    try {
      // logger.info(req);
      return res.status(200).send({ success: true })
    } catch (e) {
      return res.status(400).send({ error: true, message: e?.message || 'Something went wrong' })
    }
  },
}

export default controller
