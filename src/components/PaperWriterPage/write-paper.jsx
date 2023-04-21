import React, { useState, useContext, useReducer } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Button, Stack } from "@mui/material";
import { Autocomplete, TextField } from "@mui/material";
import { Select, MenuItem, InputLabel } from "@mui/material";
import { DocsContext } from "../../state/docs/docs-context";
import { CurrDocReducer } from "../../state/currDoc/currDoc-reducer";
import { CurrDocContext } from "../../state/currDoc/currDoc-context";
import Modal from "./Modal";

export const WritePaper = () => {
  const { docsState, docsDispatch } = useContext(DocsContext);
  const [currContent, setCurrContent] = useState("");
  const [unchanged, setUnchanged] = useState(true);

  const [currDoc, currDocDispatch] = useReducer(CurrDocReducer, docsState[0]);

  const save = () => {
    const newDoc = {
      label: currDoc.label,
      content: currContent,
    };

    docsDispatch({
      type: "MODIFY",
      doc: newDoc,
    });

    currDocDispatch({ doc: newDoc });

    setUnchanged(true);
  };

  return (
    <>
      <Editor
        apiKey="y4j6negfnxfleke6xmkd8kxfm1uc1s29q21by3tfdhu9nwki"
        plugins="wordcount"
        init={{
          height: 550,
          // skin: "oxide-dark",
        }}
        initialValue='<h1 style="text-align: center;">&nbsp;</h1><p>&nbsp;</p><p>&nbsp;</p><h1 style="text-align: center;">Create a document below to begin</h1>'
        disabled={!currDoc}
        value={currContent}
        onEditorChange={(newValue, editor) => {
          setCurrContent(newValue);
          setUnchanged(false);
        }}
      />

      <Stack
        sx={{ margin: "10px" }}
        alignItems="center"
        direction="row"
        spacing={2}
      >
        <Autocomplete
          disableClearable
          id="combo-box"
          options={docsState.docs}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Document" autoFocus />
          )}
          onChange={(event, doc) => {
            // setCurrDoc(doc);
            currDocDispatch({ doc: doc });
            setCurrContent(doc.content);
          }}
          value={currDoc && currDoc.label}
        />

        {/* <InputLabel id="select-label">Document:</InputLabel>
        <Select
          labelId="select-label"
          value={currDoc}
          // label="Document"
          onChange={(event, doc) => {
            currDocDispatch({ doc: doc });
            setCurrContent(doc.content);
          }}
          sx={{ width: 300 }}
        >
          {docsState.docs.map((doc, index) => (
            <MenuItem key={index} value={doc.conent}>
              {doc.label}
            </MenuItem>
          ))}
        </Select> */}

        <CurrDocContext.Provider value={{ currDoc, currDocDispatch }}>
          <Modal />
        </CurrDocContext.Provider>
        <Button
          variant="contained"
          onClick={save}
          disabled={!currDoc || unchanged}
        >
          Save
        </Button>
      </Stack>
    </>
  );
};
