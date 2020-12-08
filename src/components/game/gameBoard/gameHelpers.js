import { cardType,cardTypeObj } from "../cardLoader/card/cardConstants";
const powerCards = ["J", "Q", "K"];

export class Card{
  constructor(id, type, value,color,shape,isDraging) {
    this._id = id
    this.type = type;
    this.value = value;
    this.isPlaced = false;
    this.color = color;
    this.shape = shape
    this.isDraging =isDraging;
  
  }
  setIsDraging=(val)=>{
    this.isDraging = val;
  }
  static getCardValue = (value) => {
    return value < 11 ? value : powerCards[value % 11];
  };
  static shuffleArray = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };
  static cardDataCreator = () => {
    //console.log("calling Data ...creator....");
    const data = [];
    let i = 1;
    while (i <= 4) {
      for (let k = 1; k <= 13; k++) {
        data.unshift(
          new Card(data.length + 1, cardType[i - 1], Card.getCardValue(k),cardTypeObj[cardType[i - 1]].color,cardTypeObj[cardType[i-1]].symbol,false)
        );
      }
      i++;
    }
    Card.shuffleArray(data);
    //console.log(data);
    return data;
  };
}

export const StringToObject = (stringData) => {
  return JSON.parse(stringData);
};
export const ObjectToString = (objectData) => {
  console.log("converting data to string....");
  return JSON.stringify(objectData);
};
