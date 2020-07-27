import $ from 'cheerio'
import Axios from 'axios'
import { ProductModel } from '../../../../domain/models/product'

export class ProductPage {
  private readonly NAME = '.item-title__primary'
  private readonly PRICE = '.price-tag'
  private readonly STATE = '.item-conditions'
  private readonly STORE = '.seller-view-more-link'
  private page = null as any
  private url = null as string

  async loadPage (url: string): Promise<any> {
    this.url = url
    this.page = await Axios.get(url)
  }

  parseProduct (): ProductModel {
    const link = this.url
    const name = $(this.NAME, this.page.data).text()
    const price = $(this.PRICE, this.page.data).text()
    const store = $(this.STORE, this.page.data).text()
    const state = $(this.STATE, this.page.data).text()

    return {
      name,
      link,
      price,
      store,
      state
    }
  }
}
