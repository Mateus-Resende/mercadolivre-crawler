import { SearchController } from '../../presentation/controllers/search/search'
import { WebSearchProduct } from '../../data/use-cases/web-search-products'
import { MercadoLivreRepository } from '../../infra/crawler/products/product-mercado-livre-repository'

export const makeSearchController = (): SearchController => {
  const marketplaceRepository = new MercadoLivreRepository()
  const webSearchProduct = new WebSearchProduct(marketplaceRepository)
  return new SearchController(webSearchProduct)
}
