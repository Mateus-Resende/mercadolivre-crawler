import { MissingParamError } from '../../errors'
import { HttpRequest, HttpResponse } from '../../protocols'

export class SearchController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['search', 'limit']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return {
          statusCode: 400,
          body: new MissingParamError(field)
        }
      }
    }
  }
}
