import styles from "./Sidebar.module.scss";
import Logo from "./Logo";
import Navigation from "./Navigation/Navigation";
import ThemeSwitch from "./ThemeSwitch/ThemeSwitch";

export default function Sidebar() {
  return (
    <>
      <aside className={styles.sidebar}>
        <Logo />
        <Navigation />
        <ThemeSwitch />
      </aside>
    </>
  );
}
