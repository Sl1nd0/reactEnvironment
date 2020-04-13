import React, { Component } from 'react';
var FA = require('react-fontawesome');

import { FaPlay } from 'react-icons/fa';
import { FaPause } from 'react-icons/fa';
import { FaSyncAlt } from 'react-icons/fa';
import { FaBeer } from 'react-icons/fa';

var break_l = 5;
var session_l = 25;
var time_length = "25:00";
var started = false;
var seconds = 0;
var value = 0;
var decrement = false;

class App extends Component{

   constructor(props) {

      super(props);
    
      this.state = {
         breakL: 5, 
         sessionL: 25,
         timeLength: "25:00",
         timeMins: 25,
         timeSecs: 0,
         start: false,
      }

      this.breakIncrement = this.breakIncrement.bind(this);
      this.breakDecrement = this.breakDecrement.bind(this);
      this.sessionIncrement = this.sessionIncrement.bind(this);
      this.sessionDecrement = this.sessionDecrement.bind(this);
      this.startCount = this.startCount.bind(this);
      this.pauseCount = this.pauseCount.bind(this);
      this.resetMe = this.resetMe.bind(this);

    }

    breakIncrement() {

      this.setState(state=>({
         breakL: this.state.breakL + 1
       }));

    }

    breakDecrement() {
       
      let breakL = this.state.breakL;

      if (breakL > 0) {
         breakL -= 1;
      }

      this.setState({
         breakL: breakL
      });

   }

   sessionIncrement() {

      this.setState({
         sessionL: this.state.sessionL + 1
      });

   }

   sessionDecrement() {

      let sessionL = this.state.sessionL;

      if (sessionL > 0) {
         sessionL -= 1;
      }

      this.setState({
         sessionL: sessionL
      });

  }

  startCount() {
     
   alert('Pressed ' + started);
   //alert('Pressed ' + this.state.start);   
     this.setState(state=>({
      start: !this.state.start
    }));
     
     //alert('sTARTED ' + started);
  }

  pauseCount() {
     
   this.setState(state=>({
      start: false
    }));

  }

  resetMe() {

   this.setState(state=>({
      breakL: 5
    }));

    this.setState(state=>({
      sessionL: 25
    }));

    this.setState(state=>({
      timeMins: 25
    }));

    this.setState(state=>({
      timeSecs: 0
    }));

    this.setState(state=>({
      start: false
    }));

    this.setState(state=>({
      timeLength: "25:00"
    }));
    
  }

  componentDidUpdate() {

   console.log(started + ' in');

      if (started) {
         value = 1;
      } else {
         value = 0;
      }

      if (this.state.timeSecs == 1) {
         decrement = true;
      }

      console.log(decrement);

      if (decrement && this.state.timeSecs == 60) {
        
         this.setState(state=>({
            timeMins: this.state.timeMins - 1
          }));

          this.setState(state=>({
            sessionL: this.state.timeMins - 1
          }));
          
          alert('Got there ' + this.state.timeMins);
          decrement = false;

      }

  }

   componentDidMount() {

         let count = setInterval(() => {

            if (started == false) {
             
               count = clearInterval();
            }
            
            this.setState(prevState=>({
               timeSecs: prevState.timeSecs - value
            }));
            
         }, 1000);

   }
  
   render(){

      started = this.state.start;
      this.state.timeMins = this.state.sessionL;

      if (this.state.timeSecs == 0 && started) {
         this.state.timeSecs = 60;
      }

      if (started) {
         //this.cloudER();
      }
      
      return (
            <div id = "div"> 
               
               <h1 id = "head"> <b> Pomodoro Clock </b> </h1> 

               <div id = "s">
                  <label id = "break-label"> Break Length </label> &emsp; &emsp; <label id = "session-label"> Session Length </label> <br/>
                  <button id="break-increment" className="btn btn-primary" onClick= {this.breakIncrement} > up </button>
                  &nbsp;&nbsp;   <label id="break-length"> {this.state.breakL} </label>  &nbsp;&nbsp;
                  <button id="break-decrement"  className="btn btn-primary" onClick= {this.breakDecrement}> down </button>
                  &emsp; &emsp; &emsp; &emsp; &emsp; 
                  <button id="session-increment"  className="btn btn-primary" onClick= {this.sessionIncrement}> up </button>
                  &nbsp;&nbsp;  <label id="session-length"> {this.state.sessionL}  </label>   &nbsp;&nbsp;
                  <button id="session-decrement"  className="btn btn-primary" onClick= {this.sessionDecrement}> down </button>
               </div>
            
               <div id = "session"> <h2> <b> Session </b> </h2>
                  {this.state.timeMins} : {this.state.timeSecs < 10? '0' +  this.state.timeSecs : this.state.timeSecs }
               <div id="timer-label">
                  <label id="time-left">  </label>
               </div>

               </div><br/>
               <div>
                   <FaPlay size="50px" onClick = {this.startCount}/> <FaPause size="50px" onClick = {this.pauseCount}/> <FaSyncAlt size="50px"  onClick = {this.resetMe}/>


                   <button onClick = {this.startCount}> Start </button> <button onClick = {this.pauseCount}> Pause </button> <button  onClick = {this.resetMe}>Reset</button>

               </div>

            </div>
      );
   }

}

export default App;