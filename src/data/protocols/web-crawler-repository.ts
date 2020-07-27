import { SearchModel } from '../../domain/use-cases/search-product'
import { ProductModel } from '../../domain/models/product'

export interface WebCrawlerRepository {
  search: (search: SearchModel) => Promise<ProductModel[]>
}
