import React, { useState, useContext } from "react";
import { Box } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { ApiContext } from "../../state/apiKey/apiKey-context";

export const Tools = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const { apiKey, apiKeyDispatch } = useContext(ApiContext);

  function onInput(event) {
    setInput(event.target.value);
  }

  const createRequest = async (props) => {
    // const apiKey = "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";
    const url =
      "https://api.openai.com/v1/engines/text-davinci-003/completions";

    const prompt =
      props.option === "define"
        ? `Dictionary definition of "${input}"`
        : props.option === "synonyms"
        ? `Give 10 synonyms for "${input}"`
        : props.option === "antonyms"
        ? `Give 10 antonyms for "${input}"`
        : props.option === "sentence"
        ? `Use "${input}" in a sentence"`
        : "Give me the infinity symbol";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey.apiKey}`,
      },
      body: JSON.stringify({
        prompt: prompt,
        max_tokens: 100,
      }),
    });

    const data = await response.json();
    const stringData = data.choices[0].text;
    setResponse(stringData);
  };

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
