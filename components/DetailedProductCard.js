import styles from "../styles/components/DetailedProductCard.module.scss";

function DetailedCard({ cardData }) {
  if (!cardData) return <strong>sorry, data not found</strong>;

  return (
    <div className={styles.card}>
      <span className={styles["card__title"]}>
        {cardData?.title || "title not found"}
      </span>
      <div className={styles["card__img-contain"]}>
        <img
          src={cardData.avatar}
          alt="card image"
          className={styles["card__img"]}
        />
      </div>
      <span className={styles["card__description"]}>
        Description: {cardData?.description || "description not found"}
      </span>
    </div>
  );
}

export default DetailedCard;
