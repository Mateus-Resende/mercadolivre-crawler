import { MissingParamError } from '../../errors'
import { HttpRequest, HttpResponse } from '../../protocols'

export class SearchController {
  handle (httpRequest: HttpRequest): HttpResponse {
    return {
      statusCode: 400,
      body: new MissingParamError('search')
    }
  }
}
