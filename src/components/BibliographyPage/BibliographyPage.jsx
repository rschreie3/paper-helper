import React, { useState, useContext } from "react";
import { Autocomplete, Box, TextField } from "@mui/material";
import { Stack, Select } from "@mui/material";
import { DocsContext } from "../../state/docs/docs-context";

export const BibliographyPage = () => {
  const { docsState, docsDispatch } = useContext(DocsContext);
  const [currDoc, setCurrDoc] = useState(null);
  const [sources, setSources] = useState([
    {
      label: "testSource",
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

      <Stack></Stack>
    </>
  );
};
