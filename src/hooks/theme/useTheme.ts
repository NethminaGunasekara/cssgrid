import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Theme } from "../../types/types";
import { RootState } from "../../services/state/store";
import { setTheme } from "../../services/state/theme/themeSlice";

export default function useTheme() {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    // localStorage.removeItem("theme");
    console.log(theme);

    // If "localStorage" has a theme and state has Theme.Initial as theme
    if (storedTheme && theme == Theme.Initial) {
      document.documentElement.setAttribute("data-theme", storedTheme);
      dispatch(setTheme(storedTheme as Theme));
    }

    // If "localStorage" and state has two different themes
    else if (storedTheme && storedTheme != theme) {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }

    // If state has a theme
    else if (theme != Theme.Initial) {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }

    // If no theme is stored in either "localStorage" or state
    else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      dispatch(setTheme(Theme.LIGHT));
    } else {
      dispatch(setTheme(Theme.DARK));
    }
  }, [theme]);
}
