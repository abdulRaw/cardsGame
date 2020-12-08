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

const Score = (props) => {
  return <>Score</>;
};

const Timmer = (props) => {
  return <>Time</>;
};

let SPADESCards = [];
let HEARTSCards = [];
let DIAMONDSCards = [];
let CLUBSCards = [];
let SCATERcards = [];
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
  SCATERcards = cards ? cards.map((card, index) => {
        if (card.isPlaced) {
          switch (card.type) {
            case cardTypeObj.SPADES: {
              SPADESCards.push(card);
              break;
            }
            case cardTypeObj.DIAMONDS: {
              DIAMONDSCards.push(card);
              break;
            }
            case cardTypeObj.CLUBS: {
              CLUBSCards.push(card);
              break;
            }
            case cardTypeObj.HEARTS: {
              HEARTSCards.push(cards);
              break;
            }
            default:
              break;
          }
          return false;
        } else return card;
      })
    : null;



  return (<>{ cards.length > 0 ? 

    <div>
      <button onClick = {handleLogOut}>LogOut</button>
      <div id="game-score-board">
        {/* <Score color={} Score={} /> <Timmer color={} timmer={} /> */}
      </div>
      <div className="cards-scattered">
      {<CardLoader view="card" cards={SCATERcards} />}
      </div>

      <div className="cards-holders">

      {
        <CardHolder
          holderType={cardTypeObj.SPADES.name}
          topCard={
            SPADESCards.length > 0
              ? SPADESCards[SPADESCards.length - 1]
              : null
          }
        />
      }
      {
        <CardHolder
          holderType={cardTypeObj.CLUBS.name}
          topCard={
            CLUBSCards.length > 0
              ? CLUBSCards[CLUBSCards.length - 1]
              : null
          }
        />
      }
      {
        <CardHolder
          holderType={cardTypeObj.HEARTS.name}
          //HEARTSCards
          topCard={
            HEARTSCards.length > 0
              ? HEARTSCards[HEARTSCards.length - 1]
              : null
          }
        />
      }
      {
        <CardHolder
          holderType={cardTypeObj.DIAMONDS.name}
          topCard={
            DIAMONDSCards.length > 0
              ? DIAMONDSCards[DIAMONDSCards.length - 1]
              : null
          }
        />
      }
      </div>
    </div>
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
