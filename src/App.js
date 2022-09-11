import React, { useState } from "react";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import { Helmet } from "react-helmet";
import styled from "styled-components";

const StyledButton = styled(Button)`
  font-weight: bolder;
  margin: 6px !important;
`;

const StyledInput = styled(Input)`
  border-bottom: 1px solid rgba(63, 81, 181, 0.5);
  width: 100%;
  margin: 6px;
`;

const Container = styled.div`
  padding: 20px;
  border: 1px solid rgba(63, 81, 181, 0.5);
  display: inline-block;
  position: relative;
  top: 100px;
  border-radius: 30px;
`;

const Main = styled.main`
  text-align: center;
`;
const App = () => {
  const [currentValue, setCurrentValue] = useState("");
  const [arr, setArr] = useState(["+", "-", "*", "/"]);

  const change = (event) => {
    let state = false;
    let value = null;
    if (event.target.value) {
      if (event.target.value.length < currentValue.length) {
        setCurrentValue(
          event.target.value >= 1
            ? currentValue.slice(0, currentValue.length - 1)
            : ""
        );
        return;
      }
    } else if (!event.target.value && !event.target.innerText) {
      setCurrentValue("");
      return;
    }
    if (!event.target.value) {
      value = event.target.innerText;
    } else {
      value = event.target.value[event.target.value.split("").length - 1];
    }
    if (value === "+" || value === "-" || value === "*" || value === "/") {
      for (let i in arr) {
        state = currentValue.endsWith(arr[i]);
        if (state) {
          break;
        }
      }
    }
    if ((+value || currentValue || value === ".") && state === false) {
      setCurrentValue(currentValue.concat(value));
    }
  };

  const giveAnswer = () => {
    if (currentValue) {
      let ans = String(eval(currentValue));
      setCurrentValue(ans === "0" ? "" : ans);
    }
  };

  return (
    <Main>
      <Helmet>
        <title>React Calculator Application</title>
      </Helmet>
      <Container>
        <StyledInput onChange={change} value={currentValue} />
        <br />

        {[
          "7",
          "8",
          "9",
          "/",
          "4",
          "5",
          "6",
          "*",
          "1",
          "2",
          "3",
          "-",
          ".",
          "0",
          "Ans",
          "+",
        ].map((obj, index) => {
          if (obj !== "Ans") {
            return (
              <React.Fragment key={index}>
                <StyledButton
                  type="button"
                  variant="outlined"
                  color="primary"
                  onClick={change}
                >
                  {obj}
                </StyledButton>
                {obj === "/" || obj === "*" || obj === "-" || obj === "+" ? (
                  <br />
                ) : null}
              </React.Fragment>
            );
          } else {
            return (
              <StyledButton
                key={index}
                type="button"
                variant="outlined"
                color="primary"
                onClick={giveAnswer}
              >
                {obj}
              </StyledButton>
            );
          }
        })}
        <StyledButton
          type="button"
          variant="outlined"
          color="primary"
          onClick={() => setCurrentValue("")}
        >
          Reset
        </StyledButton>
      </Container>
    </Main>
  );
};
export default App;
