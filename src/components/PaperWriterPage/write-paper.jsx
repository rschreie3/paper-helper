import React, { useState, useContext, useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Button, Stack } from "@mui/material";
import { Autocomplete, TextField } from "@mui/material";
import { DocsContext } from "../../state/docs/docs-context";
import Modal from "./Modal";

export const WritePaper = () => {
  const editorRef = useRef(null);
  const { docsState, docsDispatch } = useContext(DocsContext);
  const [currDoc, setCurrDoc] = useState(null);
  const [currContent, setCurrContent] = useState("");
  // useEffect(() => setCurrContent(""), []);
  const [unchanged, setUnchanged] = useState(true);

  const save = () => {
    const newDoc = {
      label: currDoc.label,
      content: currContent,
    };

    setCurrDoc(newDoc);

    docsDispatch({
      type: "MODIFY",
      doc: newDoc,
    });

    setUnchanged(true);
  };

  return (
    <>
      <Editor
        apiKey="y4j6negfnxfleke6xmkd8kxfm1uc1s29q21by3tfdhu9nwki"
        plugins="wordcount"
        init={{
          height: 600,
          // skin: "oxide-dark",
        }}
        initialValue="Select a document..."
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
          disablePortal
          disableClearable
          id="combo-box"
          options={docsState.docs}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Document" autoFocus />
          )}
          onChange={(event, doc) => {
            setCurrDoc(doc);
            setCurrContent(doc.content);
          }}
          value={currDoc}
        />

        <Modal />

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
