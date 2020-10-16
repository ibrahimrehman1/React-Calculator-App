import React, {Component} from 'react';
import {Button, Input} from "@material-ui/core"

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentValue: ""
    }
    this.change = this.change.bind(this);
    this.giveAnswer = this.giveAnswer.bind(this);
    this.arr = ["+", "-", "*", "/"];
  }

  change(event){  
      let state = false;
      let value = null;
      if (event.target.value){
        if (event.target.value.length < this.state.currentValue.length){
          this.setState({currentValue: event.target.value.length >= 1 ? this.state.currentValue.slice(0, this.state.currentValue.length-1):""})
          return
        }
      }
      else if (!event.target.value && !event.target.innerText){
        this.setState({currentValue: ""})
        return
      }
      if (!event.target.value){
        value = event.target.innerText;
      }else{
        value = event.target.value[event.target.value.split("").length - 1];
      }
      if (value === "+" || value === "-" || value === "*" || value === "/"){
        for (let i in this.arr){
          state = this.state.currentValue.endsWith(this.arr[i]);
          if (state){
            break;
          }
        }
      }
      if ((+value || this.state.currentValue || value === ".") && state === false){
        this.setState({
          currentValue: this.state.currentValue.concat(value)
        })
      }
      
  }

  giveAnswer(){
    if (this.state.currentValue){
      let ans = String(eval(this.state.currentValue));
      this.setState({
        currentValue: ans === "0" ? "" : ans,
      })
    }
  }

  render(){
    return (
      <main className="main-div">
        <div className="container">
          <Input onChange={this.change} value={this.state.currentValue} style={{borderBottom: "1px solid rgba(63, 81, 181, 0.5)", width: "100%", margin: "6px"}}/>
          <br />
            
            {["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", ".", "0", "Ans", "+"].map((obj, index)=>{
              if (obj !== "Ans"){
                return(
                <React.Fragment key={index}>
                  <Button type="button" variant="outlined" color="primary" style={{fontWeight: "bolder", margin: "6px"}} onClick={this.change}>{obj}</Button>
                  {(obj === "/" || obj === "*" || obj === "-" || obj === "+") ? <br /> : null}
                </React.Fragment>
              )
            }else{
                return(<Button key={index} type="button" variant="outlined" color="primary" style={{fontWeight: "bolder", margin: "6px"}} onClick={this.giveAnswer}>{obj}</Button>)
            }
              })}
            <Button type="button" variant="outlined" color="primary" style={{fontWeight: "bolder", margin: "6px"}} onClick={()=> this.setState({currentValue: ""})}>Reset</Button>
        </div>
      </main>
    );
  }
}

export default App;
