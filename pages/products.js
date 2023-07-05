import MainLayout from "../components/MainLayout";
import { getAllProducts } from "../api/apiRequests";
import ProductsList from "../components/ProductsList";
import styles from "../styles/pages/products.module.scss";

const Products = ({ products }) => {
  return (
    <MainLayout>
      <h1 className={styles["h1"]}>Фотокарточки</h1>
      <ProductsList dataList={products} />
    </MainLayout>
  );
};

export default Products;

export async function getStaticProps(context) {
  const products = await getAllProducts();
  return {
    props: {
      products,
    },
    revalidate: 5,
  };
}
