import { ProductModel } from '../models/product'

export interface SearchModel {
  search: string
  limit: number
}

export interface SearchProduct {
  search: (search: SearchModel) => ProductModel[]
}
