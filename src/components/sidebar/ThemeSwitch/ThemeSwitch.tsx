import "./ThemeSwitch.scss";
import * as Icons from "./Icons";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../../services/state/theme/themeSlice";
import { Theme } from "../../../types/types";
import { RootState } from "../../../services/state/store";

export default function ThemeSwitch() {
  const dispatch = useDispatch();
  const themeState = useSelector((state: RootState) => state.theme.theme);

  return (
    <button
      className="theme-switch"
      onClick={() =>
        dispatch(
          themeState == Theme.LIGHT
            ? setTheme(Theme.DARK)
            : setTheme(Theme.LIGHT)
        )
      }
    >
      <Icons.LightMode />
      <Icons.DarkMode />
    </button>
  );
}
