import { WebCrawlerRepository } from '../../../data/protocols/web-crawler-repository'
import { SearchModel } from '../../../domain/use-cases/search-product'
import { ProductModel } from '../../../domain/models/product'
import { SearchPage } from '../helpers/mercado-livre/search-page'

export class MercadoLivreRepository implements WebCrawlerRepository {
  async search (search: SearchModel): Promise<ProductModel[]> {
    const searchPage = new SearchPage()
    await searchPage.loadPage(search.text)
    return searchPage.getProductsList()
  }
}
