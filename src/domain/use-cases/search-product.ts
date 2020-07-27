import { ProductModel } from '../models/product'

export interface SearchModel {
  text: string
  limit: number
}

export interface SearchProduct {
  search: (search: SearchModel) => Promise<ProductModel[]>
}
