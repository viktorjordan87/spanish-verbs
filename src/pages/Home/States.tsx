import {
  Clock,
  Clock3,
  Hourglass,
  Rocket,
  HelpCircle,
  Lightbulb,
  Settings,
  Hand,
} from "lucide-react";
import { ConjugationDialog } from "./ConjugationDialog";
import { useState } from "react";

interface TenseCardProps {
  icon: React.ReactNode;
  title: string;
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
  const tenses = [
    {
      icon: <Clock size={24} className="states-icon" />,
      title: "Presente",
    },
    {
      icon: <Clock3 size={24} className="states-icon" />,
      title: "Pretérito",
    },
    {
      icon: <Hourglass size={24} className="states-icon" />,
      title: "Imperfecto",
    },
    {
      icon: <Rocket size={24} className="states-icon" />,
      title: "Futuro",
    },
    {
      icon: <HelpCircle size={24} className="states-icon" />,
      title: "Condicional",
    },
    {
      icon: <Lightbulb size={24} className="states-icon" />,
      title: "Subjuntivo Presente",
    },
    {
      icon: <Settings size={24} className="states-icon" />,
      title: "Subjuntivo Imperfecto",
    },
    {
      icon: <Hand size={24} className="states-icon" />,
      title: "Imperativo",
    },
  ];

  return (
    <>
      <div className="states-container px-2 py-4 my-4 sm:p-4 mx-auto">
        <div className="states-grid-container">
          {tenses.map((tense, index) => (
            <TenseCard
              key={index}
              icon={tense.icon}
              title={tense.title}
              onClick={() => setDialogVisible(true)}
            />
          ))}
        </div>
      </div>
      <ConjugationDialog
        visible={dialogVisible}
        setVisible={setDialogVisible}
        verb="hablar"
        tense="Presente"
        conjugation={{
          yo: "hablo",
          tú: "hablas",
          él: "habla",
          nosotros: "hablamos",
          vosotros: "habláis",
          ellos: "hablan",
        }}
      />
    </>
  );
};
