import { useEffect } from "react";
import {useHistory} from "react-router-dom"
import { MY_SITE_NAME } from "../../../components/AppContants";
import {Card as ClassCard,ObjectToString, StringToObject } from "./gameHelpers";

import { cardsDataActionCreator } from "../gameBoard/gameBoardRedux/actionCreator";
import { cardTypeObj } from "../cardLoader/card/cardConstants";
import { connect } from "react-redux";
import CardHolder from "../cardHolder/cardHolder";
import CardLoader from "../cardLoader/cardLoader";
import Loading from "../../Loading/Loading";
import "./GameBoard.css"

const SmallDisplayBoard = (props) => {
  const {name,value} = props;
  //console.log(name,value);
return <><span className="btn">{`${name} : ${value}`}</span></>;
};

let spades_Cards = [];
let hearts_cards = [];
let diamonds_Cards = [];
let clubs_cards = [];
let scattered_cards = [];
const GameBoard = (props) => {
  const { cards, userName } = props;
  const history = useHistory();
  //console.log(cards, "from component...");

  // setting props to local storage
  useEffect(() => {
    //console.log("calling side effects.....");
    const preservedCardData = localStorage.getItem(
      MY_SITE_NAME + "DATA_OF" + userName
    );

    console.log(preservedCardData, "preserved data.....");
    if (!preservedCardData || StringToObject(preservedCardData).length <= 0) {
      console.log("cerating new data....");
      const data = ClassCard.cardDataCreator();
      props.cardsDataActionCreator(data);
    } else {
      console.log("using data from local storage..")
      console.log(StringToObject(preservedCardData),preservedCardData);
      props.cardsDataActionCreator(StringToObject(preservedCardData));
    }

    return () => {
      //console.log("calling un mount......");

      //localStorage.setItem(MY_SITE_NAME + "DATA_OF" + userName,ObjectToString([...cards]))
      
    };
  }, []);

  const handleLogOut = (event)=>{
    //console.log(props);
    localStorage.setItem(MY_SITE_NAME + "DATA_OF" + userName,ObjectToString([...cards]))
    event.preventDefault();
    history.push("/");
    console.log("bye bye...")
    
  }


  //console.log(cards,"from compponents.....")
  scattered_cards = cards ? cards.filter((card, index) => {
        if (card.isPlaced) {
          switch (card.type) {
            case cardTypeObj.SPADES: {
              spades_Cards.push(card);
              break;
            }
            case cardTypeObj.DIAMONDS: {
              diamonds_Cards.push(card);
              break;
            }
            case cardTypeObj.CLUBS: {
              clubs_cards.push(card);
              break;
            }
            case cardTypeObj.HEARTS: {
              hearts_cards.push(cards);
              break;
            }
            default:
              break;
          }
          return false;
        } else {
            console.log("nxnciak");
          return true};
      })
    : null;

    console.log(scattered_cards,"scattered cards...");



  return (<>{ cards.length > 0 ? 

    <>
      
      <div className="gameBoard-main-header">
        <SmallDisplayBoard name={"score"} value={52-scattered_cards.length} /> <SmallDisplayBoard name={"Timmer"} value={0} />
        <button onClick = {handleLogOut}>LogOut</button>
      </div>
      <div className="cards-scattered">
      {<CardLoader view="card" cards={scattered_cards} />}
      </div>

      <div className="cards-holders">

      {
        <CardHolder
          holderType={cardTypeObj.SPADES.name}
          topCard={
            spades_Cards.length > 0
              ?spades_Cards [spades_Cards.length - 1]
              : null
          }
        />
      }
      {
        <CardHolder
          holderType={cardTypeObj.CLUBS.name}
          topCard={
            clubs_cards.length > 0
              ? clubs_cards[clubs_cards.length - 1]
              : null
          }
        />
      }
      {
        <CardHolder
          holderType={cardTypeObj.HEARTS.name}
          //hearts_cards
          topCard={
            hearts_cards.length > 0
              ? hearts_cards[hearts_cards.length - 1]
              : null
          }
        />
      }
      {
        <CardHolder
          holderType={cardTypeObj.DIAMONDS.name}
          topCard={
            diamonds_Cards.length > 0
              ? diamonds_Cards[diamonds_Cards.length - 1]
              : null
          }
        />
      }
      </div>
    </>
: <Loading/>}</>
    );
};

const mapPropsToState = (store) => {
  //console.log(store, "from map...");
  return {
    cards: store.gameBoardReducer.cardsData,
    isgameOver: store.gameBoardReducer.gameOver,
    userName: store.userReducer.userName,
  };
};

export default connect(mapPropsToState, { cardsDataActionCreator })(GameBoard);
