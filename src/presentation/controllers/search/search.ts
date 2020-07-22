import { MissingParamError } from '../../errors'
import { HttpRequest, HttpResponse, Controller } from '../../protocols'
import { badRequest, serverError, ok, noContent } from '../../helpers/http/http-helper'
import { SearchProduct } from '../../../domain/use-cases/search-product'

export class SearchController implements Controller {
  private readonly searchProduct: SearchProduct

  constructor (searchProduct: SearchProduct) {
    this.searchProduct = searchProduct
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['search', 'limit']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { search, limit } = httpRequest.body
      const products = await this.searchProduct.search({ search, limit })
      return products.length > 0 ? ok(products) : noContent()
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}
