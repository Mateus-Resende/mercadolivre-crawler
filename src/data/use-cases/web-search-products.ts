import { SearchProduct, SearchModel } from '../../domain/use-cases/search-product'
import { ProductModel } from '../../domain/models/product'
import { WebCrawlerRepository } from '../protocols/web-crawler-repository'

export class WebSearchProduct implements SearchProduct {
  private readonly marketplaceRepository: WebCrawlerRepository

  constructor (marketplaceRepository: WebCrawlerRepository) {
    this.marketplaceRepository = marketplaceRepository
  }

  async search (search: SearchModel): Promise<ProductModel[]> {
    const products = await this.marketplaceRepository.search(search)
    return products
  }
}
