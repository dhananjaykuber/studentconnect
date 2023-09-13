import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  details: null,
  stages: null,
};

const kanbanSlice = createSlice({
  name: "kanban",
  initialState,
  reducers: {
    setProjectDetails: (state, action) => {
      state.details = action.payload;
    },
    setProjectStages: (state, action) => {
      state.stages = action.payload;
    },
    addStage: (state, action) => {
      state.stages = [...state.stages, action.payload];
    },
    addTask: (state, action) => {
      const index = state.stages.findIndex(
        (stage) => stage.id === action.payload.stageId,
      );

      if (index !== -1) {
        const updatedState = { ...state };
        const updatedStage = { ...updatedState.stages[index] };

        updatedStage.tasks.push(action.payload.task);

        updatedState.stages[index] = updatedStage;
      }
    },
  },
});

export const { setProjectDetails, setProjectStages, addStage, addTask } =
  kanbanSlice.actions;

export default kanbanSlice.reducer;
