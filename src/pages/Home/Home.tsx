import "./Home.style.scss";
import { Search } from "./Search";
import { States } from "./States";

function Home() {
  return (
    <section className="page-home p-4">
      <Search />
      <States />
    </section>
  );
}

export default Home;
