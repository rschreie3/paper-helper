import { cloneDeep } from "lodash";

export const sourcesReducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      return {
        sources: [...state.sources, action.source],
        currSource: state.currSource,
      };
    }
    case "MODIFY": {
      let updatedSources = cloneDeep(state.sources);
      updatedSources.splice(action.index, 1, action.source);

      return { sources: updatedSources, currSource: state.currSource };
    }
    case "DELETE": {
      let updatedSources = cloneDeep(state.sources);
      updatedSources.splice(action.index, 1);
      return { sources: updatedSources, currSource: state.currSource };
    }
    case "SWITCHDOC": {
      return { sources: action.sourceList, currSource: action.sourceList[0] };
    }
    case "CURR": {
      return { sources: state.sources, currSource: action.source };
    }
  }
};
