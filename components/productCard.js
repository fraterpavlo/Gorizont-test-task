import Link from "next/link";
import Image from "next/image";
import styles from "../styles/components/ProductCard.module.scss";
import { toggleIsFavoriteProductById } from "../api/apiRequests";
import cn from "classnames";
import { useState } from "react";
import HeartIcon from '../icons/heartIcon'

export function ProductCard({ cardData, onClickCallBack }) {
  const [isFavorite, setIsFavorite] = useState(cardData.isFavorite);

  const myLoader = ({ src }) => {
    return `${cardData.avatar}`; //!найти картинки по размерам
  };

  async function onAddToFavoriteHandler(e) {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    await toggleIsFavoriteProductById(cardData.id, !cardData.isFavorite);
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
