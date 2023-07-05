import Head from "next/head";
import Link from "next/link";
import styles from "../styles/components/MainLayout.module.scss";

const MainLayout = ({ children }) => {
  return (
    <div className={styles["page-wrapper"]}>
      <Head>
        <title>Главная страница</title>
      </Head>
      <header className={styles["header"]}>
        <nav className={styles["header__nav"]}>
          <Link className={styles["header__link"]} href={"/"}>
            Главная
          </Link>
          <Link className={styles["header__link"]} href={"/products"}>
            Фотокарточки
          </Link>
        </nav>
      </header>

      <div className={styles["main-content"]}>{children}</div>

      <footer className={styles["footer"]}>
        Вы также можете посмотреть мое <a href="https://grand-profiterole-87f573.netlify.app/" target="_blank">портфолио</a> 
      </footer>
    </div>
  );
};

export default MainLayout;
