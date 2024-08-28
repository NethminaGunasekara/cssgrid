import styles from "./Header.module.scss";

export default function Header() {
  return (
    <>
      <header className={styles.header}>
        <h1>CSS Grid Generator</h1>
        <p>
          Made with ☕ by{" "}
          <a href="https://github.com/NethminaGunasekara" target="_blank">
            Nethmina
          </a>
        </p>
      </header>
    </>
  );
}
