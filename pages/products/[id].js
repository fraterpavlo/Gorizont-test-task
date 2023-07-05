import {useRouter} from "next/router";
import styles from "../../styles/pages/products/product.module.scss";
import MainLayout from "../../components/MainLayout";
import { getProductById } from "../../api/apiRequests";

export default function Product({ product }) {
  const { query } = useRouter();

  if (product.error) {
    return (
      <MainLayout>
        <div className={styles.product}>{product.error}</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className={styles.product}>
        <h1>Товар c id {query.id}</h1>
        <div>Название товара - {product.title}</div>
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps({ params }) {
  const product = await getProductById(params.id);
  return {
    props: { product },
  };
}
