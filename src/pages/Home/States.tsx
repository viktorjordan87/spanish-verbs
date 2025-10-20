import {
  Clock,
  Clock3,
  Hourglass,
  Rocket,
  HelpCircle,
  Lightbulb,
  Settings,
  CheckCircle,
  History,
  FastForward,
  Award,
} from "lucide-react";
import { ConjugationDialog } from "./ConjugationDialog";
import { useState } from "react";
import { searchResultWordsAtom } from "@/states/verbs";
import { useVerb } from "@/hooks/useVerbsQuery";
import { useAtom } from "jotai";

interface TenseCardProps {
  icon: React.ReactNode;
  title: string;
  apiKey: string;
  onClick: () => void;
}

const TenseCard = ({ icon, title, onClick }: TenseCardProps) => {
  return (
    <div
      className="states-card border-round-lg shadow-2 hover:shadow-4 transition-all transition-duration-300 cursor-pointer hover:scale-105 p-4 flex flex-column align-items-center justify-start sm:justify-content-center text-center min-h-20rem border-1 gap-2"
      onClick={onClick}
    >
      <div
        className="mb-0 sm:mb-3 flex align-items-center justify-content-center"
        style={{ color: "var(--primary-color)" }}
      >
        {icon}
      </div>
      <span className="text-base sm:text-lg font-semibold line-height-3">
        {title}
      </span>
    </div>
  );
};

export const States = () => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedTense, setSelectedTense] = useState<string | undefined>(
    undefined
  );
  const tenses = [
    {
      icon: <Clock size={24} className="states-icon" />,
      title: "Presente",
      apiKey: "present",
    },
    {
      icon: <Clock3 size={24} className="states-icon" />,
      title: "Pretérito",
      apiKey: "preterite",
    },
    {
      icon: <Hourglass size={24} className="states-icon" />,
      title: "Imperfecto",
      apiKey: "imperfect",
    },
    {
      icon: <Rocket size={24} className="states-icon" />,
      title: "Futuro",
      apiKey: "future",
    },
    {
      icon: <HelpCircle size={24} className="states-icon" />,
      title: "Condicional",
      apiKey: "conditional",
    },
    {
      icon: <Lightbulb size={24} className="states-icon" />,
      title: "Subjuntivo Presente",
      apiKey: "presentSubjunctive",
    },
    {
      icon: <Settings size={24} className="states-icon" />,
      title: "Subjuntivo Imperfecto",
      apiKey: "imperfectSubjunctive",
    },
    {
      icon: <CheckCircle size={24} className="states-icon" />,
      title: "Presente Perfecto",
      apiKey: "presentPerfect",
    },
    {
      icon: <History size={24} className="states-icon" />,
      title: "Pluscuamperfecto",
      apiKey: "pastPerfect",
    },
    {
      icon: <FastForward size={24} className="states-icon" />,
      title: "Futuro Perfecto",
      apiKey: "futurePerfect",
    },
    {
      icon: <Award size={24} className="states-icon" />,
      title: "Condicional Perfecto",
      apiKey: "conditionalPerfect",
    },
  ];

  const [searchResultWords] = useAtom(searchResultWordsAtom);
  const { data: verb } = useVerb(searchResultWords[0]._id);

  return (
    <>
      <div className="states-container px-2 py-4 my-4 sm:p-4 mx-auto">
        <div className="states-grid-container">
          {tenses.map((tense, index) => (
            <TenseCard
              key={index}
              icon={tense.icon}
              title={tense.title}
              apiKey={tense.apiKey}
              onClick={() => {
                setSelectedTense(tense.apiKey);
                setDialogVisible(true);
              }}
            />
          ))}
        </div>
      </div>
      {verb &&
        selectedTense &&
        verb?.tenses?.[selectedTense as keyof typeof verb.tenses] && (
          <ConjugationDialog
            visible={dialogVisible}
            setVisible={setDialogVisible}
            verb={verb.word}
            tense={selectedTense}
            conjugation={
              verb.tenses[selectedTense as keyof typeof verb.tenses]!
            }
          />
        )}
    </>
  );
};
