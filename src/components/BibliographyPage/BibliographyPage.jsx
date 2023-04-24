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

export const BibliographyPage = () => {
  const { docsState, docsDispatch } = useContext(DocsContext);
  const [currDoc, setCurrDoc] = useState(null);
  const [sources, setSources] = useState([
    {
      type: "book",
      author: "author",
      title: "title here",
      pubDate: "date published",
      pubName: "or website",
      pubLocation: "publisher location",
      sourceEdition: "",
      pageNumbers: "pageNums",
      style: "mla, apa, or chicago",
    },
  ]);

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

      <Stack direction="row" spacing={1} sx={{ margin: "2vh" }}>
        <FormControl sx={{ width: "15vh" }}>
          <InputLabel id="type">Type</InputLabel>
          <Select
            labelId="type"
            // value={}
            label="Type"
            //onChange={}
          >
            <MenuItem value="Book">Book</MenuItem>
            <MenuItem value="Article">Article</MenuItem>
            <MenuItem value="Website">Website</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Author"
          // value={} onChange={(event: React.ChangeEvent<HTMLInputElement>) ={setName(event.target.value);}}
        />

        <TextField
          label="Title"
          // value={} onChange={(event: React.ChangeEvent<HTMLInputElement>) ={setName(event.target.value);}}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="Date Published" />
        </LocalizationProvider>

        <TextField label="Publisher" />

        <TextField label="Location/URL" />

        <TextField label="Edition/Version" />

        <TextField label="Page Numbers" />

        <IconButton variant="outlined">
          <DeleteIcon />
        </IconButton>

        <IconButton>
          <AddIcon />
        </IconButton>
      </Stack>
    </>
  );
};
