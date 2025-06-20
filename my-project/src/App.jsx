import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import logo from "./images/logo_light.png";
import { MainContent } from "./components/MainContent";
import styles from "./components/styles/Shared.module.css";

export const App = () => {
  return (
    <div className={styles["app-layout"]}>
      <Header
        title="Trivi-Oh!"
        subtitle="Test your knowledge-ho!"
        logo={logo}
        onClick={() => window.location.reload()}
      />
      <MainContent />
      <Footer />
    </div>
  );
};
