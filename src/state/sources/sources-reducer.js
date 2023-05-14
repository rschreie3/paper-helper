import { cloneDeep } from "lodash";

export const sourcesReducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      return { sources: [...state.sources, action.source] };
    }
    case "MODIFY": {
      let updatedSources = cloneDeep(state.sources);
      updatedSources.splice(action.index, 1, action.source);

      return { sources: updatedSources };
    }
    case "DELETE": {
      let updatedSources = cloneDeep(state.sources);
      updatedSources.splice(action.index, 1);
      return { sources: updatedSources };
    }
  }
};
