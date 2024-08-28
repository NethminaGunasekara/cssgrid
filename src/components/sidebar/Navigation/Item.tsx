import { FC } from "react";
import styles from "./Item.module.scss";
import { getClassList } from "../../../styles/utils/helpers";

export default function Item({
  Icon,
  isActive,
}: {
  Icon: FC;
  isActive?: boolean;
}) {
  return (
    <li
      className={
        isActive ? getClassList(styles.item, styles.active) : styles.item
      }
    >
      <a href="#">
        <Icon />
      </a>
    </li>
  );
}
