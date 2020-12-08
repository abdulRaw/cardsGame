import Card from "../cardLoader/card/card";

const CardHolder = (props) => {
  const { topCard, holderType } = props;
  console.log(topCard, holderType,"Card Holder......");
  return (
    <>
      <Card isDrag={false} view={"card"} card={topCard} shape={holderType}>
        <span style={{ fontSize: ".5em", fontWeight: "bold" }}>{"Drop"}</span>
        <br />
        <span style={{ fontSize: ".5em", fontWeight: "bold" }}>
          {holderType}
        </span>
      </Card>
    </>
  );
};

export default CardHolder;
