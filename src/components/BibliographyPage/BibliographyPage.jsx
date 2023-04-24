import React, { useState, useContext } from "react";
import { Autocomplete, Box, TextField } from "@mui/material";
import { Stack } from "@mui/material";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { DocsContext } from "../../state/docs/docs-context";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { Button } from "@mui/material";
import { cloneDeep } from "lodash";

export const BibliographyPage = () => {
  const { docsState, docsDispatch } = useContext(DocsContext);
  const [currDoc, setCurrDoc] = useState(null);
  const [sources, setSources] = useState([
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
  ]);
  const [currSource, setCurrSource] = useState(sources[0]);

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

    var updatedSources = cloneDeep(sources);
    updatedSources = [...updatedSources, newSource];
    setSources(updatedSources);
  };

  const deleteSource = (props) => {
    var updatedSources = cloneDeep(sources);
    updatedSources.splice(props.index, 1);
    setSources(updatedSources);
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

    var updatedSources = cloneDeep(sources);
    updatedSources.splice(props.index, 1, newSource);
    setSources(updatedSources);
  };

  return (
    <>
      <Stack
        direction="row"
        justifyContent="flex-start"
        spacing={5}
        sx={{
          margin: "5vh",
        }}
      >
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
            setCurrDoc(doc);
          }}
          value={currDoc}
        />

        <FormControl sx={{ width: "15vh" }}>
          <InputLabel id="style">Style</InputLabel>
          <Select
            labelId="style"
            label="Style"
            // value={}
            // onFocus={() => {
            //   setCurrSource(source);
            // }}
            // onChange={(event) => {
            //   changeSourceAttributeValue({
            //     index: index,
            //     attribute: "style",
            //     value: event.target.value,
            //   });
            // }}
          >
            <MenuItem value="MLA">MLA</MenuItem>
            <MenuItem value="APA">APA</MenuItem>
            <MenuItem value="Chicago">Chicago</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {sources.map((source, index) => (
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
              <DatePicker
                label="Date Published"
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
              color="warning"
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

      <Stack
        // direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ margin: "5vh" }}
      >
        <Button variant="outlined" startIcon={<AddIcon />} onClick={addSource}>
          Add Source
        </Button>

        <Button variant="contained" size="large">
          Create Bibliography
        </Button>
      </Stack>
    </>
  );
};
