import { MissingParamError } from '../../errors'
import { HttpRequest, HttpResponse } from '../../protocols'
import { badRequest } from '../../helpers/http/http-helper'

export class SearchController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['search', 'limit']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
