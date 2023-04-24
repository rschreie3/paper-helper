import React, { useState, useContext, useReducer } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Button, Stack } from "@mui/material";
import { Autocomplete, TextField } from "@mui/material";
import { DocsContext } from "../../state/docs/docs-context";
import { CurrDocContext } from "../../state/currDoc/currDoc-context";
import { CurrContentContext } from "../../state/currContent/currContent-context";
import Modal from "./Modal";
import Dialog from "./Dialog";

export const WritePaper = () => {
  const { docsState, docsDispatch } = useContext(DocsContext);
  const { currDoc, currDocDispatch } = useContext(CurrDocContext);
  const { currContent, currContentDispatch } = useContext(CurrContentContext);
  const [unchanged, setUnchanged] = useState(true);

  const save = () => {
    const newDoc = {
      label: currDoc.currDoc.label,
      content: currContent.currContent,
    };

    docsDispatch({
      type: "MODIFY",
      doc: newDoc,
    });

    currDocDispatch(newDoc);

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
        disabled={!currDoc.currDoc}
        value={currContent.currContent}
        onEditorChange={(newValue, editor) => {
          currContentDispatch(newValue);
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
          renderInput={(params) => <TextField {...params} label="Document" />}
          onChange={(event, doc) => {
            currDocDispatch(doc);
            currContentDispatch(doc.content);
          }}
          value={(currDoc.currDoc && currDoc.currDoc) || null}
        />

        {/* <Modal /> */}
        <Dialog />

        <Button
          variant="contained"
          onClick={save}
          disabled={!currDoc.currDoc || unchanged}
        >
          Save
        </Button>
      </Stack>
    </>
  );
};
