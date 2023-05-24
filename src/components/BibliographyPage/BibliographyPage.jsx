import React, { useState, useContext } from "react";
import { Autocomplete, Box, TextField } from "@mui/material";
import { Stack } from "@mui/material";
import { Divider } from "@mui/material";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { DocsContext } from "../../state/docs/docs-context";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers";
import { Button } from "@mui/material";
import { cloneDeep } from "lodash";
import { ApiContext } from "../../state/apiKey/apiKey-context";
import { CurrDocContext } from "../../state/currDoc/currDoc-context";
import { CurrContentContext } from "../../state/currContent/currContent-context";
import { SourcesContext } from "../../state/sources/sources-context";

export const BibliographyPage = () => {
  const { docsState, docsDispatch } = useContext(DocsContext);
  const { currDoc, currDocDispatch } = useContext(CurrDocContext);
  const { currContent, currContentDispatch } = useContext(CurrContentContext);
  const { sources, sourcesDispatch } = useContext(SourcesContext);
  const [currSource, setCurrSource] = useState(sources.sources[0]);
  const [format, setFormat] = useState("MLA");
  const { apiKey } = useContext(ApiContext);
  const [sourcesSaved, setSourcesSaved] = useState(false);

  const singleSourceList = [
    [
      {
        type: "",
        author: "",
        title: "",
        pubDate: null,
        pubName: "",
        pubLocation: "",
        edition: "",
        pageNumbers: "",
      },
    ],
  ];

  const addSource = () => {
    const newSource = {
      type: "",
      author: "",
      title: "",
      pubDate: null,
      pubName: "",
      pubLocation: "",
      edition: "",
      pageNumbers: "",
    };

    sourcesDispatch({
      type: "ADD",
      source: newSource,
      index: sources.sources.size,
    });
    setSourcesSaved(false);
  };

  const deleteSource = (props) => {
    sourcesDispatch({
      type: "DELETE",
      source: {},
      index: props.index,
    });
    setSourcesSaved(false);
  };

  const saveSources = () => {
    const newDoc = {
      label: currDoc.currDoc.label,
      content: currDoc.currDoc.content,
      sources: sources.sources,
    };

    docsDispatch({
      type: "MODIFY",
      doc: newDoc,
    });

    currDocDispatch(newDoc);
    setSourcesSaved(true);
  };

  const changeSourceAttributeValue = (props) => {
    var newSource = cloneDeep(currSource);

    props.attribute == "type"
      ? (newSource.type = props.value)
      : props.attribute == "author"
      ? (newSource.author = props.value)
      : props.attribute == "title"
      ? (newSource.title = props.value)
      : props.attribute == "pubDate"
      ? (newSource.pubDate = props.value)
      : props.attribute == "pubName"
      ? (newSource.pubName = props.value)
      : props.attribute == "pubLocation"
      ? (newSource.pubLocation = props.value)
      : props.attribute == "edition"
      ? (newSource.edition = props.value)
      : props.attribute == "pageNumbers"
      ? (newSource.pageNumbers = props.value)
      : console.log("Unable to change this value as it doesn't exist");

    sourcesDispatch({
      type: "MODIFY",
      source: newSource,
      index: props.index,
    });
  };

  const onCreateClicked = async () => {
    const url =
      "https://api.openai.com/v1/engines/text-davinci-003/completions";

    let prompt = `Create a bibliography with the following sources: \n`;

    for (let ind = 0; ind < sources.sources.length; ind++) {
      const source = sources.sources[ind];
      prompt +=
        `Source ${ind + 1}: Type: ${source.type} ` +
        `Author: ${source.author} Title: ${source.title} ` +
        `Date Published: ${source.pubDate} Publisher/Website: ${source.pubName} ` +
        `Publisher Location/URL: ${source.pubLocation} Edition: ${source.edition} ` +
        `Page Numbers: ${source.pageNumbers} \n`;
    }

    prompt += ` format according to the ${format} format using html styling tags`;

    console.log(prompt);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey.apiKey}`,
      },
      body: JSON.stringify({
        prompt: prompt,
        max_tokens: 2048,
        temperature: 0,
      }),
    });

    const data = await response.json();
    const stringData = data.choices[0].text;

    // const split = currContent.currContent.split("Bibliography");
    // const oldBibRemoved = split[0];

    const newContent = currContent.currContent + "<br />" + stringData;

    const newDoc = {
      label: currDoc.currDoc.label,
      content: newContent,
      sources: sources.sources,
    };

    docsDispatch({
      type: "MODIFY",
      doc: newDoc,
    });

    currDocDispatch(newDoc);
    currContentDispatch(newContent);
  };

  return (
    <>
      <Stack
        direction="row"
        // justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{
          margin: 5,
        }}
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Stack direction="row" spacing={2}>
          <Autocomplete
            disablePortal
            disableClearable
            id="combo-box"
            options={docsState.docs}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Select a Document..." autoFocus />
            )}
            onChange={(event, doc) => {
              currDocDispatch(doc);
              currContentDispatch(doc.content);
              sourcesDispatch({
                type: "SWITCHDOC",
                sourceList:
                  doc.sources.length > 0 ? doc.sources : singleSourceList,
              });
            }}
            value={(currDoc.currDoc && currDoc.currDoc) || null}
          />

          <FormControl sx={{ width: "15vh" }}>
            <InputLabel id="style">Style</InputLabel>
            <Select
              labelId="style"
              label="Style"
              value={format}
              onChange={(event) => {
                setFormat(event.target.value);
              }}
            >
              <MenuItem value="MLA">MLA</MenuItem>
              <MenuItem value="APA">APA</MenuItem>
              <MenuItem value="Chicago">Chicago</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center">
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={addSource}
          >
            Add
          </Button>

          <Button
            variant="outlined"
            onClick={saveSources}
            disabled={!currDoc.currDoc}
          >
            Save
          </Button>

          <Button
            variant="contained"
            disabled={!currDoc.currDoc || !sourcesSaved}
            onClick={onCreateClicked}
          >
            Create
          </Button>
        </Stack>
      </Stack>

      {sources.sources.map((source, index) => (
        <Box key={index} sx={{ margin: "2vh" }}>
          <Stack direction="row" spacing={1}>
            <FormControl sx={{ width: "15vh" }}>
              <InputLabel id="type">Type</InputLabel>
              <Select
                labelId="type"
                label="Type"
                onFocus={() => setCurrSource(source)}
                value={source.type}
                onChange={(event) => {
                  changeSourceAttributeValue({
                    index: index,
                    attribute: "type",
                    value: event.target.value,
                  });
                }}
              >
                <MenuItem value="Book">Book</MenuItem>
                <MenuItem value="Article">Article</MenuItem>
                <MenuItem value="Website">Website</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Author"
              value={source.author}
              onFocus={() => setCurrSource(source)}
              onChange={(event) => {
                changeSourceAttributeValue({
                  index: index,
                  attribute: "author",
                  value: event.target.value,
                });
              }}
            />

            <TextField
              label="Title"
              value={source.title}
              onFocus={() => {
                setCurrSource(source);
              }}
              onChange={(event) => {
                changeSourceAttributeValue({
                  index: index,
                  attribute: "title",
                  value: event.target.value,
                });
              }}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateField
                label="Date Published"
                disableFuture
                value={source.pubDate}
                onFocus={() => {
                  setCurrSource(source);
                }}
                onChange={(date) => {
                  changeSourceAttributeValue({
                    index: index,
                    attribute: "pubDate",
                    value: date,
                  });
                }}
                format="MM/YYYY"
              />
            </LocalizationProvider>

            <TextField
              label="Publisher/Website"
              value={source.pubName}
              onFocus={() => {
                setCurrSource(source);
              }}
              onChange={(event) => {
                changeSourceAttributeValue({
                  index: index,
                  attribute: "pubName",
                  value: event.target.value,
                });
              }}
            />

            <TextField
              label="Location/URL"
              value={source.pubLocation}
              onFocus={() => {
                setCurrSource(source);
              }}
              onChange={(event) => {
                changeSourceAttributeValue({
                  index: index,
                  attribute: "pubLocation",
                  value: event.target.value,
                });
              }}
            />

            <TextField
              label="Edition/Version"
              value={source.edition}
              onFocus={() => {
                setCurrSource(source);
              }}
              onChange={(event) => {
                changeSourceAttributeValue({
                  index: index,
                  attribute: "edition",
                  value: event.target.value,
                });
              }}
            />

            <TextField
              label="Page Numbers"
              value={source.pageNumbers}
              onFocus={() => {
                setCurrSource(source);
              }}
              onChange={(event) => {
                changeSourceAttributeValue({
                  index: index,
                  attribute: "pageNumbers",
                  value: event.target.value,
                });
              }}
            />

            <IconButton
              onClick={() => {
                setCurrSource(source);
                deleteSource({ index: index });
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Stack>
        </Box>
      ))}
    </>
  );
};
