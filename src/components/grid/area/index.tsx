import { useRef, useState, useEffect } from "react";
import styles from "./Area.module.scss";
import * as Icons from "./Icons";

interface AreaProps {
  id: number;
  selected: boolean;
  rowStart: number;
  colStart: number;
  rowEnd: number;
  colEnd: number;
}

export default function Area(props: AreaProps) {
  const area = useRef<HTMLDivElement>(null);
  const moveButton = useRef<HTMLButtonElement>(null);

  interface DraggableState {
    canDrag: boolean;
    cursorPosition: { x: number; y: number };
    areaPosition: { x: number; y: number };
  }

  // Set initial state
  const [state, setState] = useState<DraggableState>({
    canDrag: false,
    cursorPosition: { x: 0, y: 0 },
    areaPosition: { x: 0, y: 0 },
  });

  useEffect(() => {
    const gridArea = area.current as HTMLDivElement;
    const gridMoveButton = moveButton.current as HTMLButtonElement;

    // Set grid area
    gridArea.style.gridArea = `${props.rowStart} / ${props.colStart} / ${props.rowEnd} / ${props.colEnd}`;
    gridArea.style.transform = `translate(${state.areaPosition.x}px, ${state.areaPosition.y}px)`;

    // Toggle canDrag on mouse events
    const onMouseDown = (event: MouseEvent) => {
      if (gridArea) {
        setState({
          canDrag: true,
          cursorPosition: { x: event.clientX, y: event.clientY },
          areaPosition: { x: 0, y: 0 },
        });
      }
    };

    const onMouseUp = () =>
      setState({
        canDrag: false,
        cursorPosition: { x: 0, y: 0 },
        areaPosition: { x: 0, y: 0 },
      });

    // Reposition self on mouse move
    const onMouseMove = (event: MouseEvent) => {
      if (state.canDrag) {
        console.log(state.cursorPosition.x, state.cursorPosition.y);

        setState({
          ...state,
          areaPosition: {
            x: state.areaPosition.x + event.movementX,
            y: state.areaPosition.y + event.movementY,
          },
        });
      }
    };

    if (gridMoveButton) {
      window.addEventListener("mousemove", onMouseMove);
      gridMoveButton.addEventListener("mousedown", onMouseDown);
      window.addEventListener("mouseup", onMouseUp);

      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        gridMoveButton.removeEventListener("mousedown", onMouseDown);
        window.removeEventListener("mouseup", onMouseUp);
      };
    }
  }, [state, props]);

  return (
    <>
      <div
        id={`area-${props.id.toString()}`}
        ref={area}
        className={styles.area}
      >
        {props.selected && (
          <>
            <button ref={moveButton}>
              <Icons.MoveArea />
            </button>

            <button>
              <Icons.ResizeArea />
            </button>

            <p>.area-{props.id}</p>
          </>
        )}
      </div>
    </>
  );
}
