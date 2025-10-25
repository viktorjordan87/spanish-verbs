import { InputText } from "primereact/inputtext";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

interface VocabularySearchProps {
  onSearch: (query: string) => void;
}

export const VocabularySearch = ({ onSearch }: VocabularySearchProps) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);

  useEffect(() => {
    onSearch(debouncedSearch);
  }, [debouncedSearch, onSearch]);

  return (
    <div className="p-inputgroup flex-1 max-w-30rem">
      <span className="p-inputgroup-addon">
        <Search size={16} />
      </span>
      <InputText
        placeholder="Search vocabulary..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full"
      />
    </div>
  );
};
