import React, { useState, useContext } from "react";
import { Box } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";

export const Tools = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState("");
  const [response, setResponse] = useState("");

  function onInput(event) {
    setInput(event.target.value);
  }

  const createRequest = async (props) => {
    const apiKey = "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";
    const url =
      "https://api.openai.com/v1/engines/text-davinci-003/completions";

    // const myPrompt = () => {
    //   if (props.option === "define") {
    //     return `Dictionary definition of "${input}"`;
    //   } else if (props.option === "synonyms") {
    //     return `Give 10 synonyms for "${input}"`;
    //   } else if (props.option === "antonyms") {
    //     return `Give 10 synonyms for "${input}"`;
    //   } else {
    //     return `What is 5 + 5`;
    //   }
    // };

    const prompt =
      props.option === "define"
        ? `Dictionary definition of "${input}"`
        : props.option === "synonyms"
        ? `Give 10 synonyms for "${input}"`
        : props.option === "antonyms"
        ? `Give 10 synonyms for "${input}"`
        : props.option === "sentence"
        ? `Use "${input}" in a sentence`
        : "Give me the infinity symbol";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt: prompt,
        max_tokens: 100,
      }),
    });

    const data = await response.json();
    const definition = data.choices[0].text;
    setResponse(definition);
  };

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
        <Button onClick={() => createRequest({ option: "define" })}>
          Define
        </Button>
        <Button onClick={() => createRequest({ option: "sentence" })}>
          Sentence
        </Button>
        <Button onClick={() => createRequest({ option: "synonyms" })}>
          Synonyms
        </Button>
        <Button onClick={() => createRequest({ option: "antonyms" })}>
          Antonyms
        </Button>
      </div>

      <div align="center">
        <TextField
          multiline
          minRows={8}
          sx={{
            margin: 4,
            minWidth: "75vh",
            alignContent: "center",
          }}
          value={response}
        />
      </div>
    </Box>
  );
};
