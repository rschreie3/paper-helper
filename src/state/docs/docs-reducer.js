import { cloneDeep } from "lodash";

export const docsReducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      return { docs: [...state.docs, action.doc] };
    }
    case "MODIFY": {
      let newDocs = cloneDeep(state.docs);
      const updatedDocs = newDocs.filter((x) => !(x.id === action.doc.label));
      return { docs: updatedDocs };
    }
  }
};
