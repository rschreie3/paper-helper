import React from "react";
import { Editor } from "@tinymce/tinymce-react";

export const WritePaper = () => {
  return (
    <Editor
      apiKey="y4j6negfnxfleke6xmkd8kxfm1uc1s29q21by3tfdhu9nwki"
      plugins="wordcount"
      init={{
        height: 600,
        // skin: "oxide-dark",
      }}
      //   value={state}
      //   onEditorChange={handlechange}
    />
  );
};

//   export default WritePaper;
