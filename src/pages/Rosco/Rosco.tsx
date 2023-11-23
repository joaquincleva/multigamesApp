import { Box, FormControl, Grid, TextField } from "@mui/material";
import { useState } from "react";

const Rosco = () => {
  const [counter, setCounter] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [responseText, setResponseText] = useState("");  
  const [answerText, setAnswerText] = useState("");

  const handleEnterKey = (key: string) =>{
    if(key == "Enter"){
      if(answerText.toLowerCase() == responseText.toLowerCase()){
        setCounter(counter+1)
        setCounter(correctAnswers+1)
        setResponseText("")
      } else {
        setCounter(counter+1)
        setResponseText("")
      }
    }else if(key == "Escape"){
        setResponseText("")
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "lightblue",
        width: "100%",
        height: "100%",
      }}
    >
      <FormControl>
        <TextField
          placeholder="Ingresar respuesta"
          value={responseText}
          onChange={(e) => {
            setResponseText(e.target.value)
          }}
          onKeyDown={(e)=>{
            handleEnterKey(e.key)
          }}
        ></TextField>
      </FormControl>
    </Box>
  );
};

export default Rosco;
