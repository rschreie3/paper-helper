import React, { useState, useContext } from "react";
import { Box } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { ApiContext } from "../../state/apiKey/apiKey-context";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

export const Tools = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const { apiKey, apiKeyDispatch } = useContext(ApiContext);

  function onInput(event) {
    setInput(event.target.value);
  }

  const createRequest = async (props) => {
    const url =
      "https://api.openai.com/v1/engines/text-davinci-003/completions";

    let prompt =
      props.option === "define"
        ? `Dictionary definition of "${input}", use html formatting`
        : props.option === "synonyms"
        ? `Give 10 synonyms for "${input}", use html formatting to display as a bulleted list`
        : props.option === "antonyms"
        ? `Give 10 antonyms for "${input}", use html formatting to display as a bulleted list`
        : props.option === "sentence"
        ? `Give 3 sentences with the word "${input}", use html formatting to display as a bulleted list and to bold the word ${input}`
        : "Give me the infinity symbol";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey.apiKey}`,
      },
      body: JSON.stringify({
        prompt: prompt,
        max_tokens: 1024,
        temperature: 0,
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

      <Box
        sx={{
          minHeight: 350,
          maxWidth: 500,
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 7,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: 2,
          borderColor: "#008b8b",
          borderRadius: 2,
          padding: 2,
        }}
      >
        {/* <Item> */}
        <div dangerouslySetInnerHTML={{ __html: response.trim() }} />
        {/* </Item> */}
      </Box>
    </Box>
  );
};
