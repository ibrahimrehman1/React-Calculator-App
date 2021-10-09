import React, {useState} from 'react';
import {Button, Input} from "@material-ui/core"


const App = () => {
  const [currentValue, setCurrentValue] = useState('');
  const [arr, setArr] = useState(["+", "-", "*", "/"]);

  const change = (event) => {
    let state = false;
      let value = null;
      if (event.target.value){
        if (event.target.value.length < currentValue.length) {
          setCurrentValue(event.target.value >= 1 ? currentValue.slice(0, currentValue.length - 1) : '');
          return
        }
      }
      else if (!event.target.value && !event.target.innerText) {
        setCurrentValue('');
        return
      }
      if (!event.target.value){
        value = event.target.innerText;
      }else{
        value = event.target.value[event.target.value.split("").length - 1];
      }
      if (value === "+" || value === "-" || value === "*" || value === "/"){
        for (let i in arr){
          state = currentValue.endsWith(arr[i]);
          if (state){
            break;
          }
        }
      }
    if ((+value || currentValue || value === ".") && state === false) {
      setCurrentValue(currentValue.concat(value));
      }
  }


  const giveAnswer = () => {
    if (currentValue){
      let ans = String(eval(currentValue));
      setCurrentValue(ans === "0" ? "" : ans);
    }
  }

  return (
    <main className="main-div">
        <div className="container">
          <Input onChange={change} value={currentValue} style={{borderBottom: "1px solid rgba(63, 81, 181, 0.5)", width: "100%", margin: "6px"}}/>
          <br />
            
            {["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", ".", "0", "Ans", "+"].map((obj, index)=>{
              if (obj !== "Ans"){
                return(
                <React.Fragment key={index}>
                  <Button type="button" variant="outlined" color="primary" style={{fontWeight: "bolder", margin: "6px"}} onClick={change}>{obj}</Button>
                  {(obj === "/" || obj === "*" || obj === "-" || obj === "+") ? <br /> : null}
                </React.Fragment>
              )
            }else{
                return(<Button key={index} type="button" variant="outlined" color="primary" style={{fontWeight: "bolder", margin: "6px"}} onClick={giveAnswer}>{obj}</Button>)
            }
              })}
            <Button type="button" variant="outlined" color="primary" style={{fontWeight: "bolder", margin: "6px"}} onClick={()=> setCurrentValue('')}>Reset</Button>
        </div>
      </main>
  )

}
  //   this.state = {
  //     currentValue: ""
  //   }
  //   this.change = this.change.bind(this);
  //   this.giveAnswer = this.giveAnswer.bind(this);
  //   this.arr = ["+", "-", "*", "/"];
  // }}

export default App;
