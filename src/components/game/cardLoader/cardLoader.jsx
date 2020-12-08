import React from "react";
import Card from "./card/card";
import Loading from "../../Loading/Loading";
const CardLoader = (props) => {
  const { cards, view } = props;
  //console.log(cards)
  return (
    <>
      {cards ? (
        cards.map((card, index) => {
          return <Card view={view} key={card._id} card={card} isDrag={true}/>;
        })
      ) : (
        <Loading />
      )}
    </>
  );
};

export default CardLoader;
