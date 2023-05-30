import React, { useState, useContext, useReducer } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Box, Button, Stack } from "@mui/material";
import { Autocomplete, TextField } from "@mui/material";
import { DocsContext } from "../../state/docs/docs-context";
import { CurrDocContext } from "../../state/currDoc/currDoc-context";
import { CurrContentContext } from "../../state/currContent/currContent-context";
import { OutlinedInput } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { SourcesContext } from "../../state/sources/sources-context";

export const WritePaper = () => {
  const [input, setInput] = useState("");
  const { docsState, docsDispatch } = useContext(DocsContext);
  const { currDoc, currDocDispatch } = useContext(CurrDocContext);
  const { currContent, currContentDispatch } = useContext(CurrContentContext);
  const [unchanged, setUnchanged] = useState(true);
  const { sourcesDispatch } = useContext(SourcesContext);

  const onInput = (event) => {
    setInput(event.target.value);
  };

  function addDoc() {
    const newDoc = {
      label: input,
      content: "",
      sources: [
        {
          type: "Article",
          author: "",
          title: "",
          pubDate: null,
          pubName: "",
          pubLocation: "",
          edition: "",
          pageNumbers: "",
        },
      ],
    };

    docsDispatch({
      type: "ADD",
      doc: newDoc,
    });

    currDocDispatch(newDoc);
    currContentDispatch(newDoc.content);
    sourcesDispatch({ type: "SWITCHDOC", sourceList: singleSourceList });
    setInput("");
  }

  const save = () => {
    const newDoc = {
      label: currDoc.currDoc.label,
      content: currContent.currContent,
      sources: currDoc.currDoc.sources,
    };

    docsDispatch({
      type: "MODIFY",
      doc: newDoc,
    });

    currDocDispatch(newDoc);

    setUnchanged(true);
  };

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

  return (
    <>
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
            sourcesDispatch({
              type: "SWITCHDOC",
              sourceList:
                doc.sources.length > 0 ? doc.sources : singleSourceList,
            });
          }}
          value={(currDoc.currDoc && currDoc.currDoc) || null}
        />

        <OutlinedInput
          placeholder="Enter new document name..."
          autoFocus
          onInput={onInput}
          value={input}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              addDoc();
            }
          }}
        />
        <IconButton onClick={() => addDoc()}>
          <AddIcon />
        </IconButton>

        <Button
          variant="contained"
          onClick={save}
          disabled={!currDoc.currDoc || unchanged}
        >
          Save
        </Button>
      </Stack>

      <Editor
        apiKey="y4j6negfnxfleke6xmkd8kxfm1uc1s29q21by3tfdhu9nwki"
        plugins="wordcount"
        init={{
          height: 550,
          // skin: "oxide-dark",
          browser_spellcheck: true,
        }}
        disabled={!currDoc.currDoc}
        value={currContent.currContent}
        onEditorChange={(newValue, editor) => {
          currContentDispatch(newValue);
          setUnchanged(false);
        }}
      />
    </>
  );
};
