import * as React from "react";
import TextField from "@mui/material/TextField";
import { ApiContext } from "../../state/apiKey/apiKey-context";

export const SecretPage = () => {
  const { apiKey, apiKeyDispatch } = React.useContext(ApiContext);

  return (
    <>
      <h6>API Key:</h6>
      <TextField
        value={apiKey.apiKey}
        onChange={(event) => apiKeyDispatch(event.target.value)}
        fullWidth
      />
      <div>Create an api key at openai.com to interact with the website</div>
    </>
  );
};
