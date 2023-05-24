import React, { useState, useContext } from "react";
import { Box } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { ApiContext } from "../../state/apiKey/apiKey-context";
import { ToolsContentContext } from "../../state/toolsPage/tools-content-context";

export const Tools = () => {
  const { toolsContent, toolsContentDispatch } =
    useContext(ToolsContentContext);
  const { apiKey, apiKeyDispatch } = useContext(ApiContext);

  function onInput(event) {
    toolsContentDispatch({
      type: "INPUT",
      input: event.target.value,
    });
  }

  const createRequest = async (props) => {
    const url =
      "https://api.openai.com/v1/engines/text-davinci-003/completions";

    let prompt =
      props.option === "define"
        ? `Dictionary definition of "${toolsContent.input}", use html formatting`
        : props.option === "synonyms"
        ? `Give 10 synonyms for "${toolsContent.input}", use html formatting to display as a bulleted list`
        : props.option === "antonyms"
        ? `Give 10 antonyms for "${toolsContent.input}", use html formatting to display as a bulleted list`
        : props.option === "sentence"
        ? `Give 3 sentences with the word "${toolsContent.input}", use html formatting to display as a bulleted list and to bold the word ${toolsContent.input}`
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
    toolsContentDispatch({
      type: "RESPONSE",
      response: stringData,
    });
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
        <div
          dangerouslySetInnerHTML={{ __html: toolsContent.response.trim() }}
        />
      </Box>
    </Box>
  );
};
