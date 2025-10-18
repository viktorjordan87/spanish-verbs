import { Dialog } from "primereact/dialog";

interface ConjugationData {
  yo: string;
  tú: string;
  él: string;
  nosotros: string;
  vosotros: string;
  ellos: string;
}

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
  conjugation: ConjugationData;
}) => {
  const headerElement = (
    <div className="flex flex-column align-items-start gap-2">
      <h3 className="font-bold text-2xl capitalize text-blue-400 mb-0">
        {verb}
      </h3>
      <h4 className="font-semibold text-base text-700 my-0">{tense}</h4>
    </div>
  );

  return (
    <Dialog
      visible={visible}
      modal
      header={headerElement}
      style={{ width: "50rem", minHeight: "75vh" }}
      onHide={() => {
        if (!visible) return;
        setVisible(false);
      }}
    >
      <div className="conjugation-table">
        <div className="grid">
          <div className="col-12 md:col-6">
            <div className="conjugation-row">
              <span className="pronoun">yo</span>
              <span className="conjugation">{conjugation.yo}</span>
            </div>
            <div className="conjugation-row">
              <span className="pronoun">tú</span>
              <span className="conjugation">{conjugation.tú}</span>
            </div>
            <div className="conjugation-row">
              <span className="pronoun">él/ella/ud.</span>
              <span className="conjugation">{conjugation.él}</span>
            </div>
          </div>
          <div className="col-12 md:col-6">
            <div className="conjugation-row">
              <span className="pronoun">nosotros/as</span>
              <span className="conjugation">{conjugation.nosotros}</span>
            </div>
            <div className="conjugation-row">
              <span className="pronoun">vosotros/as</span>
              <span className="conjugation">{conjugation.vosotros}</span>
            </div>
            <div className="conjugation-row">
              <span className="pronoun">ellos/ellas/uds.</span>
              <span className="conjugation">{conjugation.ellos}</span>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
