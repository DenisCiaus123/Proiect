import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import logo from "./images/logo_light.png";
import { Body } from "./components/Body";
import './global.css';

export const App = () => {
  return (
    <div>
      <Header title="Trivi-Oh!" subtitle="Subtitlu" logo={logo} />
      <Body />
      <Footer />
    </div>
  );
};
