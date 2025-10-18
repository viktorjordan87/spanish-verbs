import { Header } from "./Header";
import { Main } from "./Main";
import { Footer } from "./Footer";
import "./layout.style.scss";

export const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};
