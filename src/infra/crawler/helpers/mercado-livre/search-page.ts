import { ProductModel } from '../../../../domain/models/product'
import Axios from 'axios'
import $ from 'cheerio'
import { ProductPage } from './product-page'

export class SearchPage {
  private readonly URL = 'https://lista.mercadolivre.com.br/'
  private readonly VIEW_TYPE = '_DisplayType_LF'
  private readonly LINK_CLASS = '.item__info-title'
  private page = null as any
  private readonly productUrls = []

  async loadPage (search: string): Promise<void> {
    const uri = [this.URL, search.split(' ').join('-'), this.VIEW_TYPE].join('')
    this.page = await Axios.get(uri)
  }

  async getProductsList (limit: number): Promise<ProductModel[]> {
    const items = $(this.LINK_CLASS, this.page.data)
    const max = Math.min(limit, items.length)
    for (let i = 0; i < max; i++) {
      this.productUrls.push($(this.LINK_CLASS, this.page.data)[i].attribs.href)
    }

    return Promise.all(
      this.productUrls.map(async url => {
        const productPage = new ProductPage()
        await productPage.loadPage(url)
        return productPage.parseProduct()
      })
    )
  }
}
