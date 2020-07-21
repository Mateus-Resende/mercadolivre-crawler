import { MissingParamError } from '../../errors'
import { HttpRequest, HttpResponse } from '../../protocols'
import { badRequest } from '../../helpers/http/http-helper'
import { SearchProduct } from '../../../domain/use-cases/search-product'

export class SearchController {
  private readonly searchProduct: SearchProduct

  constructor (searchProduct: SearchProduct) {
    this.searchProduct = searchProduct
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['search', 'limit']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    const { search, limit } = httpRequest.body
    this.searchProduct.search({ search, limit })
  }
}
