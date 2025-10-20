import type { Verb } from "@/types";
import { useVerbs } from "../../hooks";
import { DataView } from "primereact/dataview";
import { Tag } from "primereact/tag";
import { Card } from "primereact/card";
import { useCallback, useState } from "react";
import { BookOpen, Calendar, Languages } from "lucide-react";
import type { DataViewPageEvent } from "primereact/dataview";
import { searchResultWordsAtom } from "@/states/verbs";
import { useAtom } from "jotai";
import { useNavigate } from "react-router";

export const List = () => {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(16);
  const [, setSearch] = useAtom(searchResultWordsAtom);
  const navigate = useNavigate();

  // Calculate page number for API (1-based)
  const page = Math.floor(first / rows) + 1;

  const { data: verbs } = useVerbs({ page, limit: rows });

  const onClickItem = useCallback((verb: Verb) => {
    setSearch([{ _id: verb._id!, word: verb.word! }]);
    navigate(`/`);
  }, []);

  const itemTemplate = useCallback((verb: Verb) => {
    const formatDate = (dateString?: string) => {
      if (!dateString) return "N/A";
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    };

    const getTenseCount = (verb: Verb) => {
      if (!verb.tenses) return 0;
      return Object.keys(verb.tenses).length;
    };

    return (
      <div
        className="col-12 sm:col-6 lg:col-4 xl:col-3 p-2"
        key={verb._id}
        onClick={() => onClickItem(verb)}
      >
        <Card className="border-round-lg shadow-2 hover:shadow-4 transition-all transition-duration-300 cursor-pointer hover:scale-105 h-full">
          <div className="flex flex-column gap-3 h-full">
            {/* Verb Word - Main Title */}
            <div className="flex align-items-center gap-2">
              <BookOpen size={24} style={{ color: "var(--primary-color)" }} />
              <h3 className="m-0 text-2xl font-bold text-primary">
                {verb.word}
              </h3>
            </div>

            {/* Tense Count Badge */}
            <div className="flex align-items-center gap-2">
              <Languages size={18} className="text-500" />
              <span className="text-sm text-600">
                {getTenseCount(verb)} tense
                {getTenseCount(verb) !== 1 ? "s" : ""} available
              </span>
            </div>

            {/* Tags for available tenses */}
            {verb.tenses && Object.keys(verb.tenses).length > 0 && (
              <div className="flex flex-wrap gap-1">
                {Object.keys(verb.tenses)
                  .slice(0, 3)
                  .map((tense) => (
                    <Tag
                      key={tense}
                      value={tense}
                      severity="info"
                      className="text-xs"
                    />
                  ))}
                {Object.keys(verb.tenses).length > 3 && (
                  <Tag
                    value={`+${Object.keys(verb.tenses).length - 3} more`}
                    severity="secondary"
                    className="text-xs"
                  />
                )}
              </div>
            )}

            {/* Date Added */}
            <div className="flex align-items-center gap-2 mt-auto pt-2 border-top-1 border-300">
              <Calendar size={14} className="text-400" />
              <span className="text-xs text-500">
                Added: {formatDate(verb.createdAt)}
              </span>
            </div>
          </div>
        </Card>
      </div>
    );
  }, []);

  const onPage = useCallback((event: DataViewPageEvent) => {
    setFirst(event.first);
    setRows(event.rows);
  }, []);

  return (
    <div className="p-4">
      <div className="mb-4">
        <h1 className="text-4xl font-bold m-0 mb-2">Spanish Verbs</h1>
        <p className="text-600 m-0">
          Browse and explore your collection of Spanish verbs
        </p>
      </div>
      <DataView
        value={verbs?.items}
        layout="grid"
        itemTemplate={itemTemplate}
        paginator
        lazy
        rows={rows}
        first={first}
        totalRecords={verbs?.total}
        onPage={onPage}
        emptyMessage="No verbs found. Start by adding some Spanish verbs to your collection."
        pt={{
          content: {
            className: "bg-transparent",
          },
        }}
      />
    </div>
  );
};
