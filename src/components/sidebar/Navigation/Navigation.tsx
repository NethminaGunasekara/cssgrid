import "./Navigation.module.scss";
import Item from "./Item";
import * as Icons from "../Icons";

export default function Navigation() {
  return (
    <nav>
      <ul>
        <Item Icon={Icons.Home} isActive />
        <Item Icon={Icons.Options} />
        <Item Icon={Icons.SavedGrids} />
        <Item Icon={Icons.GitHub} />
      </ul>
    </nav>
  );
}
