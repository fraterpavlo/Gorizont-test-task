export interface IProductData {
  title: string;
  description: string;
  avatar: string;
  price: string;
  isFavorite: boolean;
  comments: string[];
  country: string;
  id: string;
}

export interface IAction {
  type: string;
  payload: boolean | string | IResultsState | IAddCommentPayload;
}

export interface IState {
  filtersState: IFiltersState;
  resultsState: IResultsState;
  filteredProductsData: IProductData[];
}

export interface IFiltersState {
  isOnlyFavorites: boolean;
  selectedCountries: string[];
}

export interface IResultsState {
  isLoaded: boolean;
  productsData: IProductData[];
  error: null | string;
}

export interface IAddCommentPayload {
  id: string;
  comment: string;
}
