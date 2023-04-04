import React, { useState, useContext } from "react";
import OpenAIAPI from "react-openai-api";
import { Grid } from "@mui/material";
import { Box } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import { Button } from "@mui/material";

export const Tools = () => {
  const [input, setInput] = useState("");

  function onInput(event) {
    setInput(event.target.value);
  }

  return (
    <Box
      component="form"
      sx={{
        margin: "2vh",
      }}
    >
      <OutlinedInput
        multiline
        placeholder="Enter text here..."
        onInput={onInput}
        color="primary"
      />
      <Button>Translate</Button>
      <Button>Define</Button>
      <Button>Synonyms</Button>
      <Button>Antonyms</Button>
    </Box>
  );
};
