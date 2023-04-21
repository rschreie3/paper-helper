import { cloneDeep } from "lodash";

export const docsReducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      return { docs: [action.doc, ...state.docs] };
    }
    case "MODIFY": {
      let newDocs = cloneDeep(state.docs);
      const updatedDocs = newDocs.filter(
        (x) => !(x.label === action.doc.label)
      );
      return { docs: [action.doc, ...updatedDocs] };
    }
    case "SETFIRST": {
      let newDocs = cloneDeep(state.docs);
      const updatedDocs = newDocs.filter(
        (x) => !(x.label === action.doc.label)
      );
      return { docs: [action.doc, ...updatedDocs] };
    }
  }
};
