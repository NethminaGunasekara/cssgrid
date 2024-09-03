import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AreaType {
  id: number;
  rowStart: number;
  colStart: number;
  rowEnd: number;
  colEnd: number;
}

interface AreaPosition {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

interface ColumnPosition {
  row: number;
  col: number;
}

interface GridState {
  columns: number;
  rows: number;
  selectedArea: number;
  selectedAreaPosition: AreaPosition;
  nextAreaStart?: ColumnPosition;

  areas: Array<AreaType>;
}

const initialState: GridState = {
  columns: 6,
  rows: 6,
  selectedArea: 1,
  selectedAreaPosition: { top: 0, right: 0, bottom: 0, left: 0 },

  areas: [
    {
      id: 1,
      rowStart: 1,
      colStart: 1,
      rowEnd: 3,
      colEnd: 3,
    },
  ],
};

export const gridSlice = createSlice({
  name: "grid",
  initialState,

  reducers: {
    setColumns: (state, action) => {
      state.columns = action.payload;
    },
    setRows: (state, action) => {
      state.rows = action.payload;
    },
    setSelectedArea: (state, action) => {
      state.selectedArea = action.payload;
    },
    setAreaPosition: (state, action: PayloadAction<AreaPosition>) => {
      state.selectedAreaPosition = action.payload;
    },

    setNextAreaStart: (state, action: PayloadAction<ColumnPosition>) => {
      state.nextAreaStart = action.payload;
    },
  },
});

export default gridSlice.reducer;
export const { setColumns, setRows, setAreaPosition, setNextAreaStart } =
  gridSlice.actions;
export type { GridState, AreaPosition };
