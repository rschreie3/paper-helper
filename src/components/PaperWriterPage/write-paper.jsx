import React, { useState, useContext, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Autocomplete, Button, Stack, TextField } from "@mui/material";
import { DocsContext } from "../../state/docs/docs-context";

export const WritePaper = () => {
  const editorRef = useRef(null);
  const [dirty, setDirty] = useState(false);
  const { docsState, docsDispatch } = useContext(DocsContext);

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
        //initialValue={initialValue}
        onInit={(evt, editor) => (editorRef.current = editor)}
        onDirty={() => setDirty(true)}
      />

      <Stack
        sx={{ margin: "10px", alignItems: "center" }}
        direction="row"
        spacing={2}
      >
        <div>
          <Autocomplete
            disablePortal
            id="combo-box"
            options={docsState}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Document" />}
          />
        </div>
        <div align="right">
          <Button variant="contained" onClick={save} disabled={!dirty}>
            Save
          </Button>
        </div>
      </Stack>
    </>
  );
};

//   export default WritePaper;
