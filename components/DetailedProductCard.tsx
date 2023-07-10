import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "../styles/components/DetailedProductCard.module.scss";
import cn from "classnames";
import { addCommentById } from "../api/apiRequests";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { addComment } from "../store/reducers/catalogPageSlice";
import { getFilteredProducts } from "../store/selectors";

function DetailedCard({ cardData }) {
  if (!cardData) return <strong>sorry, data not found</strong>;
  const filteredProductsData = useAppSelector(getFilteredProducts);
  const [cardDataState, setCardDataState] = useState(cardData);
  const dispatch = useAppDispatch();
  let textArea = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setCardDataState(
      filteredProductsData.find((item) => item.id === cardData.id)
    );
  }, [filteredProductsData, cardData]);

  function onSubmitHandler(e: React.MouseEvent<HTMLInputElement>) {
    e.preventDefault();
    const comment = textArea.current.value;
    const commentArr = [...cardDataState.comments, comment];
    addCommentById(cardDataState.id, commentArr);
    dispatch(
      addComment({
        id: cardDataState.id,
        comment: comment,
      })
    );
    textArea.current.value = "";
  }

  // const commentsList = useMemo(() => {
  //   return cardDataState.comments?.map((comment, idx) => (
  //     <div
  //       key={`${idx}_${comment[0]}`}
  //       className={styles["comments__item-container"]}
  //     >
  //       <span className={styles["comments__author"]}>Anonym</span>
  //       <p className={styles["comments__text"]}>{comment}</p>
  //     </div>
  //   ));
  // }, [cardDataState]);

  const commentsList = cardDataState.comments?.map((comment, idx) => (
    <div
      key={`${idx}_${comment[0]}`}
      className={styles["comments__item-container"]}
    >
      <span className={styles["comments__author"]}>Anonym</span>
      <p className={styles["comments__text"]}>{comment}</p>
    </div>
  ));

  return (
    <div className={styles.card}>
      <span className={styles["card__title"]}>
        {cardDataState?.title || "title not found"}
      </span>
      <div className={styles["card__img-contain"]}>
        <img
          src={cardData.avatar}
          alt="card image"
          className={styles["card__img"]}
        />
      </div>
      <span className={styles["card__description"]}>
        Description: {cardDataState?.description || "description not found"}
      </span>
      <div
        className={cn(
          styles["card__comments-list-container"],
          styles["comments"]
        )}
      >
        {commentsList}
        <form
          action=""
          className={cn(styles["card__create-comment-form"], styles["form"])}
        >
          <textarea
            ref={textArea}
            className={cn(styles["form__textarea"])}
            placeholder="Оставить комментарий:"
            name="comment"
          ></textarea>
          <input
            type="submit"
            className={cn(styles["form__submit-btn"])}
            onClick={onSubmitHandler}
          />
        </form>
      </div>
    </div>
  );
}

export default DetailedCard;
