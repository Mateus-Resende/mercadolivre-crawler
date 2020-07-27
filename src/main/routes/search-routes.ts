import { Router } from 'express'

export default (router: Router): void => {
  router.post('/crawler-search', (req, res) => {
    res.json({ ok: 'ok' })
  })
}
