import img1 from './images/1.webp';
import img2 from './images/2.webp';
import img3 from './images/3.webp';
import img4 from './images/4.webp';
import img5 from './images/5.webp';
import img6 from './images/6.webp';
import img7 from './images/7.webp';
import img8 from './images/8.webp';
import React, { useState, useEffect } from "react";
import './App.css';

//allow for images to be called with vairables with require
const images = {img1, img2, img3, img4, img5, img6, img7, img8};
let tracker = [0, 0, 0, 0, 0, 0, 0, 0];

function App() {

  const [order, setOrder] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
  const [score, setScore] = useState(-1);




  const randomizeOrder = () => {
    let orderCopy = [...order];
    let currentIndex = orderCopy.length;
    let randomIndex;

    //Knuth shuffle
    while(currentIndex !== 0) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [orderCopy[currentIndex], orderCopy[randomIndex]] = [orderCopy[randomIndex], orderCopy[currentIndex]];

    }

    setOrder(orderCopy);
  };

  function clickedImage (x) {
    tracker[x-1] += 1;
  }

  useEffect(() => {

    function checkGame () {
      //if win
      if (tracker.every(x => x === 1)) {
        alert("Congratulations, you won!");
        setScore(0);
        tracker = [0, 0, 0, 0, 0, 0, 0, 0];
      }
      //if clicked photo more than once
      else if (tracker.includes(2)) {
        alert("You lose, try again!");
        setScore(0);
        tracker = [0, 0, 0, 0, 0, 0, 0, 0];
      }
      //add score
      else {
        setScore(score + 1);
      }

    }

    checkGame();


  }, [order]);


  return (
    <div id="main">
      <h1>Memory Game</h1>
      <h4>Test your memory! Images are shuffled every time they are clicked. Do not click on an image more than once or your score resets!</h4>
      <h2>Score: {score}</h2>
      <div className="images">
        {order.map(function(x){
          return (
          <img src={images["img" + x]} className="character" alt={"Character " + x} key={x}
            onClick={() => {clickedImage(x);
                            randomizeOrder();}}/>
          )
        })}
      </div>
    </div>
  );
}

export default App;
