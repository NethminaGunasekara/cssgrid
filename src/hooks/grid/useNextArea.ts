import { useDispatch, useSelector } from "react-redux";
import { CellPosition } from "../../components/grid/cell";
import { RootState } from "../../services/state/store";
import { useEffect } from "react";
import {
  AreaPosition,
  setNextAreaStart,
} from "../../services/state/grid/gridSlice";

export default function useNextArea(
  cellPosition?: CellPosition,
  row: number,
  col: number,
  id: number
) {
  const gridState = useSelector((state: RootState) => state.grid);
  const dispatch = useDispatch();

  const setCellColor = () => {
    const cell = document.getElementById(`cell-${id}`);

    if (cell) {
      cell.style.backgroundColor = "yellow";
    }
  };

  useEffect(() => {
    function setNextArea(check: boolean) {
      check && dispatch(setNextAreaStart({ row, col }));
    }

    function handleDrag(
      cellPosition: CellPosition,
      areaPosition: AreaPosition
    ) {
      // If the current cell is at top left corner
      if (col == 1 && row == 1) {
        setNextArea(
          areaPosition.left < cellPosition.right &&
            areaPosition.top < cellPosition.bottom
        );
      }

      // If the current cell is at top right corner
      else if (col == gridState.columns && row == 1) {
        setNextArea(
          areaPosition.left > cellPosition.left &&
            areaPosition.top < cellPosition.bottom
        );
      }

      // If the current cell is at top row
      else if (row == 1 && col > 1 && col < gridState.columns) {
        setNextArea(
          areaPosition.top < cellPosition.bottom &&
            areaPosition.left > cellPosition.left &&
            areaPosition.left < cellPosition.right
        );
      }

      // If the current cell is at left column
      else if (col == 1 && row > 1 && row < gridState.rows) {
        setNextArea(
          areaPosition.left < cellPosition.right &&
            areaPosition.top > cellPosition.top &&
            areaPosition.top < cellPosition.bottom
        );
      }

      // If the current cell is at right column
      else if (col == gridState.columns && row > 1 && row < gridState.rows) {
        setNextArea(
          areaPosition.left > cellPosition.left &&
            areaPosition.top > cellPosition.top &&
            areaPosition.top < cellPosition.bottom
        );
      }

      // If the current cell is at bottom left corner
      else if (col == 1 && row == gridState.rows) {
        setNextArea(
          areaPosition.left < cellPosition.right &&
            areaPosition.top > cellPosition.top
        );
      }

      // If the current cell is at bottom right corner
      else if (col == gridState.columns && row == gridState.rows) {
        setNextArea(
          areaPosition.left > cellPosition.left &&
            areaPosition.top > cellPosition.top
        );
      }

      // If the current cell is at bottom row
      else if (row == gridState.rows && col > 1 && col < gridState.columns) {
        setNextArea(
          areaPosition.top > cellPosition.top &&
            areaPosition.left > cellPosition.left &&
            areaPosition.left < cellPosition.right
        );
      } else {
        // Area top and left between all four cell corners
        setNextArea(
          areaPosition.top > cellPosition.top &&
            areaPosition.left > cellPosition.left &&
            areaPosition.top < cellPosition.bottom &&
            areaPosition.left < cellPosition.right
        );
      }
    }

    // Current position of the selected area
    const areaPosition = gridState.selectedAreaPosition;

    if (cellPosition) {
      handleDrag(cellPosition, areaPosition);
    }
  }, [col, gridState.columns, gridState.selectedAreaPosition, row]);

  return {
    nextAreaStart: {
      row: 0,
      col: 0,
    },
  };
}
