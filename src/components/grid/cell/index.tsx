import { useLayoutEffect, useRef } from "react";
import styles from "./Cell.module.scss";

export interface CellProps {
  id: number;
  row: number;
  col: number;
}

export default function Cell(props: CellProps) {
  const cellRef = useRef<HTMLDivElement>(null);

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
