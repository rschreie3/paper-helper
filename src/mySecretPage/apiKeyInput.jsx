import * as React from "react";
import TextField from "@mui/material/TextField";
import { ApiContext } from "../state/apiKey/apiKey-context";

export const SecretPage = () => {
  const { apiKey, apiKeyDispatch } = React.useContext(ApiContext);

  return (
    <TextField
      value={apiKey.apiKey}
      onChange={(event) => apiKeyDispatch(event.target.value)}
    />
  );
};
