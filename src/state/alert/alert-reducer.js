export const alertReducer = (state, action) => {
  switch (action.type) {
    case "SUCCESS": {
      return { successOpen: action.bool, warningOpen: state.warningOpen };
    }
    case "WARNING": {
      return { successOpen: state.successOpen, warningOpen: action.bool };
    }
  }
};
