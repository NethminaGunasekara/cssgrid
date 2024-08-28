import { createSlice } from "@reduxjs/toolkit";

interface AreaType {
  id: number;
  rowStart: number;
  colStart: number;
  rowEnd: number;
  colEnd: number;
}

interface GridState {
  columns: number;
  rows: number;
  selectedArea?: number;

  areas: Array<AreaType>;
}

const initialState: GridState = {
  columns: 6,
  rows: 6,
  selectedArea: 1,

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
  },
});

export default gridSlice.reducer;
export const { setColumns, setRows } = gridSlice.actions;
export type { GridState };
