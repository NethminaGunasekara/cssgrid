import { useRef, useState, useEffect } from "react";
import styles from "./Area.module.scss";
import * as Icons from "./Icons";
import { useDispatch, useSelector } from "react-redux";
import { setAreaPosition } from "../../../services/state/grid/gridSlice";
import { RootState } from "../../../services/state/store";

interface AreaProps {
  id: number;
  selected: boolean;
  rowStart: number;
  colStart: number;
  rowEnd: number;
  colEnd: number;
}

// Element position (x, y)
interface Position {
  x: number;
  y: number;
}

const initialPosition: Position = {
  x: 0,
  y: 0,
};

export default function Area(props: AreaProps) {
  const area = useRef<HTMLDivElement>(null);
  const moveButton = useRef<HTMLButtonElement>(null);
  const gridState = useSelector((state: RootState) => state.grid);
  const dispatch = useDispatch();

  interface DraggableState {
    canDrag: boolean;
    cursorPosition: Position;
    areaPosition: Position;
  }

  // Set initial state
  const [state, setState] = useState<DraggableState>({
    canDrag: false,
    cursorPosition: initialPosition,
    areaPosition: initialPosition,
  });

  // Update area position in state
  const updateAreaPosition = (reset?: boolean) => {
    if (area.current) {
      const areaRect = area.current.getBoundingClientRect();

      if (reset) {
        dispatch(
          setAreaPosition({
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          })
        );

        return;
      }

      dispatch(
        setAreaPosition({
          top: areaRect.top,
          right: areaRect.right,
          bottom: areaRect.bottom,
          left: areaRect.left,
        })
      );
    }
  };

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
          areaPosition: initialPosition,
        });
      }
    };

    const onMouseUp = () => {
      setState({
        canDrag: false,
        cursorPosition: initialPosition,
        areaPosition: initialPosition,
      });

      // Reset the area position
      updateAreaPosition(true);
    };

    // Reposition self on mouse move
    const onMouseMove = (event: MouseEvent) => {
      if (state.canDrag) {
        setState({
          ...state,
          areaPosition: {
            x: state.areaPosition.x + event.movementX,
            y: state.areaPosition.y + event.movementY,
          },
        });

        // Update area position in state
        updateAreaPosition();
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
