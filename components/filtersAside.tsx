import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  getFilteredProducts,
  getFiltersState,
  getProductsData,
} from "../store/selectors";
import {
  toggleIsOnlyFavorites,
  toggleSelectedCountries,
} from "../store/reducers/catalogPageSlice";
import styles from "../styles/components/FiltersAside.module.scss";
import cn from "classnames";

export function FiltersAside() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(getFiltersState);
  const products = useAppSelector(getProductsData);
  const filteredProducts = useAppSelector(getFilteredProducts);

  const onSelectCountryCallBack = (country: string) => {
    dispatch(toggleSelectedCountries(country));
  };

  const onOnlyFavoritesCallBack = () => {
    dispatch(toggleIsOnlyFavorites());
  };

  const countriesUniqueArr = products
    .map((itemData) => itemData.country)
    .filter((item, idx, arr) => arr.indexOf(item) === idx);

  return (
    <aside className={cn(styles["catalog-page__filters"], styles["filters"])}>
      <div
        className={cn(
          styles["filters__total-count-container"],
          styles["total-count"]
        )}
      >
        <span className={cn(styles["total-count__label"])}>Товаров </span>
        <span className={cn(styles["total-count__output"])}>
          {filteredProducts.length}
        </span>
      </div>
      <div
        className={cn(
          styles["filters__country-filter-container"],
          styles["country-filter"]
        )}
      >
        <span className={cn(styles["country-filter__label"])}>Страна</span>
        <div className={cn(styles["country-filter__countries-list-container"])}>
          {countriesUniqueArr.map((country) => (
            <label
              key={country}
              className={cn(
                styles["country-filter__countries-item"],
                styles["country-filter-item"]
              )}
            >
              <input
                className={cn(styles["country-filter-item__input_original"])}
                type="checkbox"
                onChange={() => onSelectCountryCallBack(country)}
                checked={filters?.selectedCountries.includes(country)}
              />
              <span
                className={cn(styles["country-filter-item__input_custom"])}
              ></span>
              {country}
            </label>
          ))}
        </div>
      </div>
      <label
        className={cn(
          styles["filters__only-favorites-item"],
          styles["only-favorites"]
        )}
      >
        <input
          className={cn(styles["only-favorites__input_original"])}
          type="checkbox"
          onChange={() => onOnlyFavoritesCallBack()}
          checked={filters?.isOnlyFavorites}
        />
        <span className={cn(styles["only-favorites__input_custom"])}></span>
        Только любимые
      </label>
    </aside>
  );
}
