import { load } from 'cheerio'
import Axios from 'axios'
import { ProductModel } from '../../../../domain/models/product'

export class ProductPage {
  private readonly NAME = '.ui-pdp-container__top-wrapper .ui-pdp-title'
  private readonly PRICE = '.price-tag > meta'
  private readonly STATE = '.ui-pdp-container__top-wrapper .ui-pdp-header .ui-pdp-header__subtitle .ui-pdp-subtitle'
  private readonly STORE = '.ui-pdp-buybox .ui-pdp-seller .ui-pdp-action-modal.ui-pdp-seller__link-trigger a.ui-pdp-action-modal__link span.ui-pdp-color--BLUE'
  private page = null as any
  private url = null as string

  async loadPage (url: string): Promise<any> {
    this.url = url
    this.page = await Axios.get(url)
  }

  parseProduct (): ProductModel {
    const link = this.url
    const $ = load(this.page.data)
    const name = $(this.NAME).text()
    const priceElement = $(this.PRICE)[0]
    const price = priceElement ? Number(priceElement.attribs.content) : null
    const store = $(this.STORE).text()
    const state = $(this.STATE).text().split('|')[0]

    return {
      name,
      link,
      price,
      store,
      state
    }
  }
}
