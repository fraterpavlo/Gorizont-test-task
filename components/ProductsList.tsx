import { ProductCard } from "./productCard";
import styles from "../styles/components/ProductsList.module.scss";
import MyModal from "./MyModal";
import DetailedProductCard from "./DetailedProductCard";
import { useCallback, useMemo, useState } from "react";
import { useAppSelector } from "../hooks/hooks";
import { getFilteredProducts, getResultsState } from "../store/selectors";
import React from "react";

export function ProductsList() {
  const resultsState = useAppSelector(getResultsState);
  const filteredProductsData = useAppSelector(getFilteredProducts);
  const [isVisibleCardModal, setIsVisibleCardModal] = useState(false);
  const [currentModalData, setCurrentModalData] = useState(null);

  function showDetailedCard(itemData) {
    setIsVisibleCardModal(true);
    setCurrentModalData(itemData);
  }

  const cardList = useMemo(() => {
    return filteredProductsData.map((itemData) => (
      <ProductCard
        key={itemData.id}
        cardData={itemData}
        onClickCallBack={() => showDetailedCard(itemData)}
      />
    ));
  }, [filteredProductsData]);

  return (
    <div className={styles["products-list"]}>
      {!resultsState.isLoaded && "Loading..."}
      {resultsState.error && <strong>{resultsState.error}</strong>}
      {!resultsState.error && resultsState.isLoaded && cardList}
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
