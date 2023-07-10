import MainLayout from "../components/MainLayout";
import { getAllProducts } from "../api/apiRequests";
import ProductsList from "../components/ProductsList";
import styles from "../styles/pages/products.module.scss";
import { useEffect } from "react";
import { fetchProducts } from "../store/reducers/catalogPageSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  getFilteredProducts,
  getFiltersState,
  getProductsData,
} from "../store/selectors";
import { FiltersAside } from "../components/filtersAside";

const Products = ({ props }) => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(getFiltersState);
  const filteredProducts = useAppSelector(getFilteredProducts);

  useEffect(() => {
    dispatch(
      fetchProducts("https://649b5496bf7c145d023a3abb.mockapi.io/cards")
    );
  }, [props]);

  return (
    <MainLayout>
      <h1 className={styles["h1"]}>Фотокарточки</h1>
      <div className={styles["content-container"]}>
        <FiltersAside />
        <ProductsList />
      </div>
    </MainLayout>
  );
};

export default Products;

export async function getServerSideProps(context) {
  const products = await getAllProducts();

  return {
    props: {
      products,
    },
  };
}
