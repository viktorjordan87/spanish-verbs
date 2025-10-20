import { useSearchVerbs } from "@/hooks/useVerbsQuery";
import { AutoComplete } from "primereact/autocomplete";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { useAtom } from "jotai";
import { searchResultWordsAtom } from "@/states/verbs";

export const Search = () => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<
    { _id: string; word: string }[]
  >([]);
  const [debouncedSearch] = useDebounce(search, 500);
  const { data: searchResults } = useSearchVerbs(debouncedSearch);
  const [, setSearchResultWords] = useAtom(searchResultWordsAtom);

  useEffect(() => {
    setSuggestions(searchResults || []);
  }, [searchResults]);

  return (
    <div className="auto-complete-container p-inputgroup flex-1">
      <span className="p-inputgroup-addon">
        <i className="pi pi-search"></i>
      </span>
      <AutoComplete
        placeholder="Search"
        value={search}
        onChange={(e) =>
          setSearch(typeof e.value === "string" ? e.value : e.value?.word ?? "")
        }
        suggestions={suggestions}
        completeMethod={() => {}}
        field="word"
        onSelect={(e) => setSearchResultWords([e.value])}
      />
    </div>
  );
};
