export const toolsContentReducer = (state, action) => {
  switch (action.type) {
    case "INPUT": {
      return { input: action.input, response: state.response };
    }
    case "RESPONSE": {
      return { input: state.input, response: action.response };
    }
  }
};
