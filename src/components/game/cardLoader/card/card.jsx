import React, { useRef, useState, useEffect } from "react";
import { cardTypeObj } from "./cardConstants";
import { cardsDataActionCreator } from "../../gameBoard/gameBoardRedux/actionCreator";
import { Card as ClassCard } from "../../gameBoard/gameHelpers";
import { connect } from "react-redux";
import { cardDragActionOrigin } from "./cardRedux/actionCreator";
import "./Card.css";

const Card = (props) => {
  const { card, view, isDrag, shape, cardsData } = props;
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const pressed= useState(card ? card.isDraging : false);
  
  const ref = useRef();
  useEffect(() => {
    if (ref.current) {
      ref.current.style.transform = `translate(${position.x}px, ${position.y}px)`;
    }
    return () => {

    };
  }, [position]);

  const onMouseMove = (event) => {
    if(event.target.name==="card" && card.isDraging===false) return;
    console.log("============================",card,event);
    event.preventDefault();

    if (pressed) {
      setPosition({
        x: position.x + event.movementX,
        y: position.y + event.movementY,
      });
    }
  };

  const onMouseUp = (event) => {
    const { eventObj, eventRef,initalPos } = props;
    const currentDropCardType = event.target.dataset.id;
    console.log(currentDropCardType, "current id...");
    const copyOfData = [...cardsData];
    eventRef.current.style ={offsetLeft:initalPos.x , offsetTop:initalPos.y};
    const prevEventdataIndex = copyOfData.findIndex((ele,index)=> ele._id===eventObj._id) 
    copyOfData[prevEventdataIndex].isDraging = false;

    if(currentDropCardType===eventObj.type){
      console.log("one at rite position.....");
      copyOfData[prevEventdataIndex].isPlaced = true;
      props.cardsDataActionCreator(copyOfData);
      props.cardDragActionOrigin(null);
      return;
    }
    if(currentDropCardType>=1 && currentDropCardType<=52){
      console.log("Drop on number....")
      props.cardsDataActionCreator(copyOfData);
      props.cardDragActionOrigin(null);
      return;
    }
    console.log("reseting....");
    props.cardDragActionOrigin(null);
    props.cardsDataActionCreator(ClassCard.cardDataCreator());
    

    

    
   
    //eventRef.current.style.transform = `translate(${initalPos.x}px, ${initalPos.y}px)`;
    
   

    // moving card to its placeholder.....;
    
  };

  const onMouseDown = (event) => {
    console.log(event.target.dataset.id);

    if(event.target.dataset.id >=1 && event.target.dataset.id<=52){
    event.preventDefault();
    console.log(event.target.id);
    const copyOfData = [...cardsData];
    const selectedCardsIndex = copyOfData.indexOf(card, 0);
    const eventObj = copyOfData[selectedCardsIndex];
    copyOfData[selectedCardsIndex].isDraging = true;
    console.log("updating ... dragable card...");
    console.log(selectedCardsIndex);
    const initalPos ={
      x: event.target.style.offsetLeft,
      y: event.target.style.offsetTop
    }
    props.cardDragActionOrigin({ eventObj, ref,initalPos});
    props.cardsDataActionCreator(copyOfData);

    console.log("mouse down", event);
  }
  else{
    return;
  }
}
  ;

  // console.log(card);

  const innerShapes = card
    ? [...Array(card.value).keys()].map((ele) => (
        <>
          <span>{card.shape}</span>
          {ele % 3 === 0 ? <br /> : null}{" "}
        </>
      ))
    : null;

  const handleStop = (event) => {
    console.log("drag stop...", event.target.dataset.id);
  };

  const uiOfCard = (
    <>
      <div
        ref={ref}
        className={`${view}`}
        style={{
          color: card ? card.color : "black",
          zIndex: card && card.isDraging ? 1 : null,
        }}
        data-id={card ? card._id : shape}
        onMouseMove={ card && card.isDraging ? onMouseMove:null}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}

        name={card ? "card" : "Shape"}
      >
        <div>
          <span>{card ? card.value : ""}</span>
          <span>{card ? cardTypeObj[card.type].symbol : ""}</span>
          {props.children}
        </div>
      </div>
    </>
  );
  return <>{uiOfCard}</>;
};

const mappropsToState = (store) => {
  return {
    cardsData: store.gameBoardReducer.cardsData,
    eventObj: store.cardReducer.eventObj,
    eventRef: store.cardReducer.ref,
    initalPos:store.cardReducer.initalPos
  };
};

export default connect(mappropsToState, {
  cardsDataActionCreator,
  cardDragActionOrigin,
})(Card);
