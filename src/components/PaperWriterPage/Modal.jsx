import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { Input } from "@mui/material";
import { DocsContext } from "../../state/docs/docs-context";
import { CurrDocContext } from "../../state/currDoc/currDoc-context";
import { CurrContentContext } from "../../state/currContent/currContent-context";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #008b8b",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [input, setInput] = React.useState("");
  const { docsState, docsDispatch } = React.useContext(DocsContext);
  const { currDoc, currDocDispatch } = React.useContext(CurrDocContext);
  const { currContent, currContentDispatch } =
    React.useContext(CurrContentContext);

  const onInput = (event) => {
    setInput(event.target.value);
  };

  function addDoc() {
    const newDoc = {
      label: input,
      content: "",
    };

    //add to the docsState here...
    docsDispatch({
      type: "ADD",
      doc: newDoc,
    });

    currDocDispatch(newDoc);
    currContentDispatch(newDoc.content);
    setInput("");
    handleClose();
  }

  return (
    <div>
      <Button onClick={handleOpen}>
        <AddIcon />
        New Document
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Input
            placeholder="Enter new document name..."
            onInput={onInput}
            value={input}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                addDoc();
              }
            }}
            // sx={{
            //   width: "350",
            // }}
          />
          <IconButton onClick={() => addDoc()}>
            <AddIcon />
          </IconButton>
        </Box>
      </Modal>
    </div>
  );
}
