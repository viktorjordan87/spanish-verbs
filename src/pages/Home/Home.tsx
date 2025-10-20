import "./Home.style.scss";
import { Search } from "./Search";
import { States } from "./States";
import { useAtom } from "jotai";
import { searchResultWordsAtom } from "@/states/verbs";
import { BookOpen } from "lucide-react";

function Home() {
  const [searchResultWords] = useAtom(searchResultWordsAtom);
  return (
    <section className="page-home p-4">
      <Search />
      {searchResultWords.length > 0 ? (
        <States />
      ) : (
        <div
          className="flex align-items-center justify-content-center"
          style={{ minHeight: "60vh" }}
        >
          <div className="text-center p-6 border-round-lg surface-ground">
            <div className="mb-4 flex align-items-center justify-content-center gap-2">
              <BookOpen size={48} className="text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-3 text-700">
              Welcome to Spanish Verbs
            </h2>
            <p className="text-600 text-lg mb-4 line-height-3">
              Start by searching for a Spanish verb above to explore its
              conjugations
            </p>
            <div className="flex align-items-center justify-content-center gap-2 text-500">
              <span className="text-sm">
                Type a verb name in the search box
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Home;
