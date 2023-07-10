import Link from "next/link";
import Image from "next/image";
import styles from "../styles/components/ProductCard.module.scss";
import { toggleIsFavoriteProductById } from "../api/apiRequests";
import cn from "classnames";
import { useState } from "react";
import HeartIcon from "../icons/heartIcon";
import React from "react";
import { useAppDispatch } from "../hooks/hooks";
import { toggleIsFavoriteProduct } from "../store/reducers/catalogPageSlice";

export function ProductCard({ cardData, onClickCallBack }) {
  const [isFavorite, setIsFavorite] = useState(cardData.isFavorite);
  const dispatch = useAppDispatch();

  const myLoader = ({ src }) => {
    return `${cardData.avatar}`;
  };

  async function onAddToFavoriteHandler(e) {
    e.stopPropagation();
    await toggleIsFavoriteProductById(cardData.id, !isFavorite);
    setIsFavorite(!isFavorite);
    dispatch(toggleIsFavoriteProduct(cardData.id));
  }

  return (
    <div className={styles["card"]} onClick={() => onClickCallBack()}>
      <div className={styles["card__img-container"]}>
        <Image
          className={styles["card__img"]}
          loader={myLoader}
          src={cardData.avatar}
          fill
          alt="Picture"
        />
      </div>
      <div className={styles["card__description-container"]}>
        <span className={styles["card__title"]}>{cardData.title}</span>
        <button
          onClick={onAddToFavoriteHandler}
          className={cn(styles["card__add-to-favorite-btn"], {
            [styles["card__add-to-favorite-btn_active"]]: isFavorite,
          })}
        >
          <HeartIcon />
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
