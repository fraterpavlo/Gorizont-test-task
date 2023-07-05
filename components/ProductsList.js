import { ProductCard } from "./productCard";
import styles from "../styles/components/ProductsList.module.scss";
import MyModal from "./MyModal";
import DetailedProductCard from "./DetailedProductCard";
import { useState } from "react";

export function ProductsList({ dataList }) {
  if (dataList.error) {
    return <h3>{dataList.error}</h3>;
  }

  const [isVisibleCardModal, setIsVisibleCardModal] = useState(false);
  const [currentModalData, setCurrentModalData] = useState(null);

  function showDetailedCard(itemData) {
    setIsVisibleCardModal(true);
    setCurrentModalData(itemData);
  }

  const cardList = dataList.map((itemData) => (
    <ProductCard
      key={itemData.id}
      cardData={itemData}
      onClickCallBack={() => showDetailedCard(itemData)}
    />
  )); //! UseMemo

  return (
    <div className={styles["products-list"]}>
      {cardList}
      <MyModal
        isVisible={isVisibleCardModal}
        setVisible={setIsVisibleCardModal}
      >
        <DetailedProductCard cardData={currentModalData} />
      </MyModal>
    </div>
  );
}

export default ProductsList;
