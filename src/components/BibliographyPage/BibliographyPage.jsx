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
      type: "Book",
      author: "Author",
      title: "title here",
      pubDate: "",
      pubName: "or website",
      pubLocation: "publisher location",
      edition: "",
      pageNumbers: "pageNums",
      style: "MLA",
    },
  ]);
  const [currSource, setCurrSource] = useState(sources[0]);

  const addSource = () => {
    const newSource = {
      type: "",
      author: "",
      title: "",
      pubDate: "",
      pubName: "",
      pubLocation: "",
      edition: "",
      pageNumbers: "",
      style: "",
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
      : props.attribute == "style"
      ? (newSource.style = props.value)
      : console.log("Unable to change this value as it doesn't exist");

    var updatedSources = cloneDeep(sources);
    updatedSources.splice(props.index, 1, newSource);
    setSources(updatedSources);
  };

  return (
    <>
      <Box
        sx={{
          margin: "15px",
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
      </Box>

      {sources.map((source, index) => (
        <Box key={index}>
          <Stack direction="row" spacing={1} sx={{ margin: "2vh" }}>
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
              label="Publisher"
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

            <FormControl sx={{ width: "15vh" }}>
              <InputLabel id="style">Style</InputLabel>
              <Select
                labelId="style"
                label="Style"
                value={source.style}
                onFocus={() => {
                  setCurrSource(source);
                }}
                onChange={(event) => {
                  changeSourceAttributeValue({
                    index: index,
                    attribute: "style",
                    value: event.target.value,
                  });
                }}
              >
                <MenuItem value="MLA">MLA</MenuItem>
                <MenuItem value="APA">APA</MenuItem>
                <MenuItem value="Chicago">Chicago</MenuItem>
              </Select>
            </FormControl>

            <IconButton
              variant="outlined"
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

      <div align="center">
        <IconButton size="small" onClick={addSource}>
          <AddIcon />
          Add Source
        </IconButton>
      </div>

      <div
        align="center"
        style={{ bottom: "5vh", right: "5vh", position: "absolute" }}
      >
        <Button variant="contained" size="large">
          Create Bibliography
        </Button>
      </div>
    </>
  );
};
