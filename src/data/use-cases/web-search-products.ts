import { SearchProduct, SearchModel } from '../../domain/use-cases/search-product'
import { ProductModel } from '../../domain/models/product'
import { MarketplaceRepository } from '../protocols/marketplace-repository'

export class WebSearchProduct implements SearchProduct {
  private readonly marketplaceRepository: MarketplaceRepository

  constructor (marketplaceRepository: MarketplaceRepository) {
    this.marketplaceRepository = marketplaceRepository
  }

  async search (search: SearchModel): Promise<ProductModel[]> {
    const products = await this.marketplaceRepository.search(search)
    return products
  }
}
