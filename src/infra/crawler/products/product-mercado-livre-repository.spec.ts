import nock, { back as nockBack } from 'nock'
import axios from 'axios'
import http from 'axios/lib/adapters/http'
import { MercadoLivreRepository } from './product-mercado-livre-repository'

nockBack.fixtures = './test/recorded-results/products'
nock.disableNetConnect()
axios.defaults.adapter = http

const makeSut = (): MercadoLivreRepository => {
  return new MercadoLivreRepository()
}

const prepareScope = (scope: any): any => {
  scope.filteringRequestBody = (body, aRecordedBody) => {
    if (typeof (body) !== 'string' || typeof (aRecordedBody) !== 'string') {
      return body
    }

    const recordedBodyResult = /timestamp:([0-9]+)/.exec(aRecordedBody)
    if (recordedBodyResult) {
      const recordedTimestamp = recordedBodyResult[1]
      return body.replace(
        /(timestamp):([0-9]+)/g,
        (match, key: string, value) => `${key}:${recordedTimestamp}`
      )
    } else {
      return body
    }
  }
}

describe('ProductMercadoLivreRepository', () => {
  describe('search()', () => {
    test('Should return an array of products on success', async () => {
      const { nockDone } = await nockBack('mechanical-keyboard-search.json', { before: prepareScope })
      const sut = makeSut()

      const searchParams = {
        text: 'teclado mecanico',
        limit: 50
      }
      const products = await sut.search(searchParams)
      expect(products).toBeInstanceOf(Array)
      expect(products.length).toEqual(searchParams.limit)
      nockDone()
    }, 10000)
  })
})
