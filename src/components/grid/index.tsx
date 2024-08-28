import { useLayoutEffect, useRef } from "react";
import styles from "./Grid.module.scss";
import { useSelector } from "react-redux";
import Area from "./area";
import Cell from "./cell";
import { RootState } from "../../services/state/store";

export default function Grid() {
  const grid = useRef<HTMLElement>(null);
  const gridState = useSelector((state: RootState) => state.grid);

  const columns = gridState.columns;
  const rows = gridState.rows;

  /**
   * Creates an array of Cell components.
   * Row and column indices of each Cell are used to
   * calculate its position in the grid.
   *
   * @returns {JSX.Element[]}
   */
  const createGrid = () => {
    const gridCells = [];
    let cellId = 1;

    for (let i = 1; i < columns + 1; i++) {
      for (let j = 1; j < rows + 1; j++) {
        gridCells.push(<Cell key={cellId} id={cellId} row={i} col={j} />);
        cellId++;
      }
    }

    return gridCells;
  };

  const getAreas = () => {
    const areas = [];

    for (const area of gridState.areas) {
      areas.push(
        <Area
          key={area.id}
          id={area.id}
          selected={gridState.selectedArea === area.id}
          rowStart={area.rowStart}
          colStart={area.colStart}
          rowEnd={area.rowEnd}
          colEnd={area.colEnd}
        />
      );

      return areas;
    }
  };

  // Set grid size
  useLayoutEffect(() => {
    if (grid.current) {
      grid.current.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
      grid.current.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    }

    const area = document.getElementById("area-1");

    if (area) {
      const rect = area.getBoundingClientRect();
      const x = rect.left + window.scrollX;
      const y = rect.top + window.scrollY;

      console.log(y);
    }
  });

  return (
    <>
      <main className={styles.grid} ref={grid}>
        {/* Grid areas */}
        {getAreas()}
        {/* 6x6 grid of cells */}
        {createGrid()}
      </main>
    </>
  );
}
