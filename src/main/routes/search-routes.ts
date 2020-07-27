import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeSearchController } from '../factories/search'

export default (router: Router): void => {
  router.post('/crawler-search', adaptRoute(makeSearchController()))
}
