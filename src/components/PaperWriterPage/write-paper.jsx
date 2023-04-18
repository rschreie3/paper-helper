import React, { useState, useContext, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Button, Stack } from "@mui/material";
import { Autocomplete, TextField } from "@mui/material";
import { DocsContext } from "../../state/docs/docs-context";
import Modal from "./Modal";

export const WritePaper = () => {
  const editorRef = useRef(null);
  const [dirty, setDirty] = useState(false);
  const { docsState, docsDispatch } = useContext(DocsContext);
  const [currDoc, setCurrDoc] = useState("");

  const save = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      setDirty(false);
      editorRef.current.setDirty(false);

      //save content
      console.log(content);
    }
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
        value={currDoc && currDoc.content}
        onInit={(evt, editor) => (editorRef.current = editor)}
        onDirty={() => setDirty(true)}
      />

      <Stack
        sx={{ margin: "10px" }}
        alignItems="center"
        direction="row"
        spacing={2}
      >
        <Autocomplete
          disablePortal
          id="combo-box"
          options={docsState.docs}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Document" />}
        />

        <Modal />

        <Button variant="contained" onClick={save} disabled={!dirty}>
          Save Document
        </Button>
      </Stack>
    </>
  );
};
