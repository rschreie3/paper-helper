import React, { useState, useContext } from "react";
import { Box } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";

export const Tools = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState("");

  function onInput(event) {
    setInput(event.target.value);
  }

  // function handleDefine() {
  //   <OpenAIAPI
  //     apiKey="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"
  //     payload={{
  //       prompt: "Define " + input,
  //       maxTokens: 25,
  //       temperature: 0.2,
  //       n: 1,
  //     }}
  //     responseHandler={() => defineResponseHandler()}
  //   />;
  // }

  function handleSyn() {}

  function handleAnt() {}

  return (
    <Box
      component="form"
      sx={{
        margin: "2",
      }}
    >
      <div align="center">
        <OutlinedInput
          multiline
          placeholder="Enter text here..."
          onInput={onInput}
          sx={{
            margin: 2,
          }}
        />
      </div>

      <div align="center">
        {/* <Button onClick={handleDefine}>Define</Button>
        <Button onClick={handleSyn}>Synonyms</Button>
        <Button onClick={handleAnt}>Antonyms</Button> */}
      </div>

      <div align="center">
        <TextField
          multiline
          minRows={8}
          sx={{
            margin: 4,
            minWidth: "75vh",
          }}
          value={results}
        />
      </div>
    </Box>
  );
};
