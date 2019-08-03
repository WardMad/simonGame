import React from "react";
import "./App.css";
import { style } from "./functions";
import $ from "jquery";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameColors: ["#green", "#blue", "#red", "#yellow"],
      count: 0,
      toggle: false,
      computerTurn: [],
      playerTurn: [],
      showPlayerMove: [],
      clickable: false,
      sound: {
        blue: new Audio(
          "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"
        ),
        red: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
        yellow: new Audio(
          "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"
        ),
        green: new Audio(
          "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
        )
      },
      strict: false
    };
  }
  handleClick = e => {
    const value = e.target.value;
    this.state.showPlayerMove.push(value);

    if (e.target.className === "start") {
      this.addCount();
    } else if (value === "#blue") {
      this.setState(this.state.sound.blue.play());
    } else if (value === "#red") {
      this.setState(this.state.sound.red.play());
    } else if (value === "#yellow") {
      this.setState(this.state.sound.yellow.play());
    } else if (value === "#green") {
      this.setState(this.state.sound.green.play());
    } else alert("side effect");
    this.playerTurn();
  };

  newGame = () => {
    this.setState({
      computerMove: [],
      showPlayerMove: [],
      count: 0
    });
  };
  addCount = () => {
    this.state.count++;
    this.generateMove();
  };

  generateMove = () => {
    let randomizeColor = this.state.gameColors[Math.floor(Math.random() * 4)];
    this.state.computerTurn.push(randomizeColor);
    // //player turn optional
    // this.setState({ playerTurn: this.state.computerTurn });

    let i = 0;
    let turn = setInterval(() => {
      this.computerMove(this.state.computerTurn[i]);
      i++;
      if (i >= this.state.computerTurn.length) {
        clearInterval(turn);
      }
    }, 900);
    this.clearPlayer();
  };

  clearPlayer = () => {
    this.setState({
      //optional
      showPlayerMove: [],
      playerTurn: []
    });
  };
  computerMove = sound => {
    $(sound).addClass("anim");
    setTimeout(() => {
      if (sound === "#green") {
        this.setState(this.state.sound.green.play());
      } else if (sound === "#blue") {
        this.setState(this.state.sound.blue.play());
      } else if (sound === "#red") {
        this.setState(this.state.sound.red.play());
      } else if (sound === "#yellow") {
        this.setState(this.state.sound.yellow.play());
      }
      $(sound).removeClass("anim");
    }, 400);
  };
  playerTurn = () => {
    console.log(this.state.showPlayerMove);

    for (var i = 0; i < this.state.computerTurn.length; i++) {
      console.log(this.state.computerTurn);
      console.log(this.state.computerTurn[this.state.showPlayerMove.length - 1] === 
        this.state.showPlayerMove[this.state.showPlayerMove.length - 1]);

      if (this.state.computerTurn[i] === this.state.showPlayerMove[i] ) {
        console.log("next Turn");
       
      } else  console.log('wrong')
      
    }
  };

  render() {
    return (
      <div className="main-wrap">
        <div className="outer-circle">
          <div className="upper">
            <button id="green" onClick={this.handleClick} value={"#green"} />
            <button id="red" onClick={this.handleClick} value={"#red"} />
          </div>
          <div className="lower">
            <button id="yellow" onClick={this.handleClick} value={"#yellow"} />
            <button id="blue" onClick={this.handleClick} value={"#blue"} />
          </div>
        </div>
        <div className="inner">
          {/* {(window.onload = this.generateMove)} */}
          <h2>Simon</h2>
          {this.state.count}
          <br />
          <br />
          <button className="start" onClick={this.handleClick}>
            Move
          </button>
        </div>
      </div>
    );
  }
}

export default App;
