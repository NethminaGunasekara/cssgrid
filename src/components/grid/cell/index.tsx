import { useLayoutEffect, useRef } from "react";
import styles from "./Cell.module.scss";
import useNextArea from "../../../hooks/grid/useNextArea";

export interface CellProps {
  id: number;
  row: number;
  col: number;
}

export interface CellPosition {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export default function Cell(props: CellProps) {
  const cellRef = useRef<HTMLDivElement>(null);

  const getCellPosition = () => {
    const cellRect = cellRef.current?.getBoundingClientRect();

    if (cellRect)
      return {
        top: cellRect.top,
        right: cellRect.right,
        bottom: cellRect.bottom,
        left: cellRect.left,
      };
  };

  const cellPosition = getCellPosition();

  // Update or reset the next area position
  useNextArea(cellPosition, props.row, props.col, props.id);

  // Update cell position within the grid
  useLayoutEffect(() => {
    if (cellRef.current) {
      cellRef.current.style.gridArea = `${props.row} / ${props.col} / ${
        props.row + 1
      } / ${props.col + 1}`;
    }
  }, [props.col, props.id, props.row]);

  return (
    <>
      <div
        id={`cell-${props.id}`}
        ref={cellRef}
        className={styles.cell}
        data-row={props.row}
        data-col={props.col}
      ></div>
    </>
  );
}
