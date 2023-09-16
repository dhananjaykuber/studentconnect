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
        (stage) => stage._id === action.payload.stageId,
      );

      if (index !== -1) {
        const updatedState = { ...state };
        const updatedStage = { ...updatedState.stages[index] };

        updatedStage.tasks.push(action.payload.task);

        updatedState.stages[index] = updatedStage;

        state = updatedStage;
      }
    },
    addMember: (state, action) => {
      const updatedState = { ...state.details };

      updatedState.members.push(action.payload);

      state.details = updatedState;
    },
    moveTask: (state, action) => {
      const source = action.payload.source;
      const destination = action.payload.destination;

      const sourceStageIndex = state.stages.findIndex(
        (stage) => stage._id === source.droppableId,
      );
      const destinationStageIndex = state.stages.findIndex(
        (stage) => stage._id === destination.droppableId,
      );

      if (sourceStageIndex !== -1 && destinationStageIndex !== -1) {
        const taskToMove = state.stages[sourceStageIndex].tasks[source.index];
        state.stages[sourceStageIndex].tasks.splice(source.index, 1);

        state.stages[destinationStageIndex].tasks.splice(
          destination.index,
          0,
          taskToMove,
        );
      }
    },
  },
});

export const {
  setProjectDetails,
  setProjectStages,
  addStage,
  addTask,
  addMember,
  moveTask,
} = kanbanSlice.actions;

export default kanbanSlice.reducer;
