import { Dialog } from "primereact/dialog";
import { CircleX, CircleCheck } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { Gif } from "@/components/Gif";
import type { TenseConjugation } from "@/types";
import { useAtom } from "jotai";
import { isVosotrosEnabledAtom } from "@/states/settings";

//object keys to real conjugation keys
const conjugationKeys = {
  yo: "yo",
  tu: "tú",
  el: "él/ ella/ usted",
  nosotros: "nosotros",
  vosotros: "vosotros",
  ellos: "ellos/ ellas/ ustedes",
};

const tensesKeys = {
  present: "Presente",
  preterite: "Pretérito",
  imperfect: "Imperfecto",
  future: "Futuro",
  conditional: "Condicional",
  presentSubjunctive: "Subjunctivo Presente",
  imperfectSubjunctive: "Subjuntivo Imperfecto",
  presentPerfect: "Presente Perfecto",
  pastPerfect: "Pluscuamperfecto",
  futurePerfect: "Futuro Perfecto",
  conditionalPerfect: "Condicional Perfecto",
};

export const ConjugationDialog = ({
  visible,
  setVisible,
  verb,
  tense,
  conjugation,
}: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  verb: string;
  tense: string;
  conjugation: TenseConjugation;
}) => {
  const [isVosotrosEnabled] = useAtom(isVosotrosEnabledAtom);

  const headerElement = (
    <div className="flex flex-column align-items-start gap-2">
      <h3 className="font-bold text-2xl text-blue-400 mb-0">{verb}</h3>
      <h4 className="font-semibold text-base text-700 my-0">
        {tensesKeys[tense as keyof typeof tensesKeys]}
      </h4>
    </div>
  );

  const initialFollowUp = useMemo(
    () => ({
      yo: undefined,
      tu: undefined,
      el: undefined,
      nosotros: undefined,
      vosotros: undefined,
      ellos: undefined,
    }),
    []
  );

  const [followUp, setFollowUp] = useState<{
    [key in keyof TenseConjugation]: boolean | undefined;
  }>(initialFollowUp);

  // Reset followUp state when dialog closes
  useEffect(() => {
    if (!visible) {
      setFollowUp(initialFollowUp);
    }
  }, [visible, initialFollowUp]);

  const onClickOnPronoun = (pronoun: string) => {
    setFollowUp((prev) => ({
      ...prev,
      [pronoun as keyof TenseConjugation]:
        prev[pronoun as keyof TenseConjugation] === false ? undefined : false,
    }));
  };

  const onClickOnConjugation = (pronoun: string) => {
    setFollowUp((prev) => ({
      ...prev,
      [pronoun as keyof TenseConjugation]:
        prev[pronoun as keyof TenseConjugation] === true ? undefined : true,
    }));
  };

  const success = Object.entries(followUp)
    .filter(([pronoun]) => (isVosotrosEnabled ? true : pronoun !== "vosotros"))
    .every(([, value]) => value === true);

  return (
    <Dialog
      visible={visible}
      modal
      header={headerElement}
      className="conjugation-dialog"
      onHide={() => {
        if (!visible) return;
        setVisible(false);
      }}
    >
      <div className="conjugation-table">
        {Object.entries(conjugation)
          .filter(([pronoun]) =>
            isVosotrosEnabled ? true : pronoun !== "vosotros"
          )
          .map(([pronoun, conjugation]) => (
            <div key={pronoun} className="conjugation-row grid gap-4">
              <div
                className="pronoun col"
                onClick={() => onClickOnPronoun(pronoun)}
              >
                <span>
                  {conjugationKeys[pronoun as keyof typeof conjugationKeys]}
                </span>
                {followUp[pronoun as keyof TenseConjugation] === false && (
                  <CircleX className="text-red-500" />
                )}
              </div>
              <div
                className="conjugation col"
                onClick={() => onClickOnConjugation(pronoun)}
              >
                <span className="font-bold text-primary-400">
                  {conjugation}
                </span>

                {followUp[pronoun as keyof TenseConjugation] === true && (
                  <CircleCheck className="text-green-500" />
                )}
              </div>
            </div>
          ))}
      </div>

      <div className="flex align-items-center justify-content-center">
        <Gif success={success} />
      </div>
    </Dialog>
  );
};
