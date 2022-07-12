import styles from "../styles/Home.module.scss"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>Battery levels are not always available</p>
      <p>
        Powered by{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://stockholmebikes.se/"
        >
          Stockholm eBike
        </a>
        &apos;s API
      </p>
      <p>
        Made by{" "}
        <a
          href="https://github.com/mattiasmucherie"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          Mattias Mucherie
        </a>
      </p>
    </footer>
  )
}
export default Footer
