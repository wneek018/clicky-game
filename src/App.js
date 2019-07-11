import React, { Component } from 'react';
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import cards from "./cards.json";
import './App.css';

class App extends Component {
  // sets this.state.cards to the cards json array
  state = {
    cards,
    score: 0,
    highscore: 0
  };

  gameOver = () => {
    // if current score is greater than highscore
    if (this.state.score > this.state.highscore) {
      // the highscore is now the current score
      this.setState({highscore: this.state.score}, function() {
        // console.log the highscore
        console.log(this.state.highscore);
      });
    }
    // set all card counts to zero
    this.state.cards.forEach(card => {
      card.count = 0;
    });
    alert(`Game Over \nScore: ${this.state.score}`);
    // set current score to zero
    this.setState({ score: 0 });
    // return out of gameOver
    return true;
  }

  clickCount = id => {
    this.state.cards.find((o, i) => {
      if (o.id === id) {
        if (cards[i].count === 0) {
          cards[i].count = cards[i].count + 1;
          this.setState({score: this.state.score + 1}, function() {
            console.log(this.state.score);
          });
          this.state.cards.sort(() => Math.random() - .5)
          return true;
        } else {
          this.gameOver();
        }
      }
    });
  }

  // Map over this.state.cards and render a Card component for each card object
  render() {
    return (
      <Wrapper>
        <Title score={this.state.score} highscore={this.state.highscore}>Clicky Game</Title>
        {this.state.cards.map(card => (
          <Card
            clickCount={this.clickCount}
            id={card.id}
            key={card.id}
            image={card.image}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;