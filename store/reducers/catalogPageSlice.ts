import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  IAction,
  IAddCommentPayload,
  IResultsState,
  IState,
} from "./catalogPageSlice.model";

export const fetchProducts = createAsyncThunk(
  "catalogPage/fetchProducts",
  async (link: string, { rejectWithValue }) => {
    try {
      const response = await fetch(link);

      if (!response.ok) throw new Error("Server Error!");

      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const defaultState: IState = {
  filtersState: {
    isOnlyFavorites: false,
    selectedCountries: [],
  },
  resultsState: {
    isLoaded: false,
    productsData: [],
    error: null,
  },
  filteredProductsData: [],
};

const catalogPageSlice = createSlice({
  name: "catalogPage",
  initialState: defaultState,
  reducers: {
    addComment(state: IState, action: IAction) {
      const productId = (action.payload as IAddCommentPayload).id;
      const newComment = (action.payload as IAddCommentPayload).comment;

      const cloneFilteredArr = [...state.filteredProductsData];
      const cloneOriginalArr = [...state.resultsState.productsData];
      const indexInFilteredArr = cloneFilteredArr.findIndex(
        (item) => item.id === productId
      );
      const indexInOriginalArr = cloneOriginalArr.findIndex(
        (item) => item.id === productId
      );

      if (indexInFilteredArr === -1 || indexInOriginalArr === -1) return;
      cloneFilteredArr[indexInFilteredArr].comments.push(newComment);
      cloneOriginalArr[indexInOriginalArr].comments.push(newComment);

      state.filteredProductsData = cloneFilteredArr;
      state.resultsState.productsData = cloneOriginalArr;
    },
    toggleIsFavoriteProduct(state: IState, action: IAction) {
      const productId = action.payload as string;
      const cloneFilteredArr = [...state.filteredProductsData];
      const cloneOriginalArr = [...state.resultsState.productsData];
      const indexInFilteredArr = cloneFilteredArr.findIndex(
        (item) => item.id === productId
      );
      const indexInOriginalArr = cloneOriginalArr.findIndex(
        (item) => item.id === productId
      );

      if (indexInFilteredArr === -1 || indexInOriginalArr === -1) return;
      cloneFilteredArr[indexInFilteredArr].isFavorite =
        !cloneFilteredArr[indexInFilteredArr].isFavorite;
      cloneOriginalArr[indexInOriginalArr].isFavorite =
        !cloneOriginalArr[indexInOriginalArr].isFavorite;

      state.filteredProductsData = cloneFilteredArr;
      state.resultsState.productsData = cloneOriginalArr;
    },
    toggleIsOnlyFavorites(state: IState, action: IAction) {
      state.filtersState = {
        ...state.filtersState,
        isOnlyFavorites: !state.filtersState.isOnlyFavorites,
      };

      state.filteredProductsData = state.filtersState.isOnlyFavorites
        ? state.resultsState.productsData.filter(
            (itemData) => itemData.isFavorite === true
          )
        : state.resultsState.productsData;
    },
    toggleSelectedCountries(state: IState, action: IAction) {
      const country = action.payload as string;
      const selectedCountriesArr = state.filtersState.selectedCountries;

      state.filtersState = {
        ...state.filtersState,
        selectedCountries: selectedCountriesArr.includes(country)
          ? selectedCountriesArr.filter((item) => item !== country)
          : [...selectedCountriesArr, country],
      };

      state.filteredProductsData =
        state.filtersState.selectedCountries.length === 0
          ? state.resultsState.productsData
          : state.resultsState.productsData.filter((itemData) =>
              state.filtersState.selectedCountries.includes(itemData.country)
            );
    },
    setResultsState(state: IState, action: IAction) {
      state.resultsState = action.payload as IResultsState;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.resultsState.isLoaded = false;
      state.resultsState.error = null;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.resultsState.isLoaded = true;
      state.resultsState.error = null;
      state.resultsState.productsData = action.payload;
      state.filteredProductsData = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.resultsState.isLoaded = true;
      state.resultsState.error = action.payload as string;
    });
  },
});

export const {
  toggleSelectedCountries,
  toggleIsOnlyFavorites,
  setResultsState,
  toggleIsFavoriteProduct,
  addComment,
} = catalogPageSlice.actions;
export default catalogPageSlice.reducer;
