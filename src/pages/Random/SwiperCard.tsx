import { useState } from "react";
import { InputSwitch } from "primereact/inputswitch";
import type { Translation } from "@/types";
import { useUpdateTranslation } from "@/hooks";

export const SwiperCard = ({ data }: { data: Translation }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMemorized, setIsMemorized] = useState(data.memorized || false);
  const updateTranslation = useUpdateTranslation();

  const handleCardClick = (e: React.MouseEvent) => {
    // Only flip if the click is not on the switch or its container
    if (!(e.target as HTMLElement).closest(".memorized-switch")) {
      setIsFlipped(!isFlipped);
    }
  };

  const handleMemorizedToggle = (checked: boolean) => {
    setIsMemorized(checked);
    updateTranslation.mutate({
      id: data._id,
      translation: { memorized: checked },
    });
  };

  return (
    <div className="flip-card" onClick={handleCardClick}>
      <div className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}>
        <div className="flip-card-front bg-blue-700 border-round shadow-2 p-4 flex flex-column align-items-center justify-content-center">
          <div className="flex flex-column align-items-center justify-content-center">
            <div className="text-white text-sm font-semibold mb-2 opacity-80">
              SPANISH
            </div>
            <div className="text-white text-2xl font-bold text-center">
              {data.word}
            </div>
          </div>
          <div className="memorized-switch absolute bottom-0 right-0 p-2 flex align-items-center gap-2">
            <InputSwitch
              style={{ scale: 0.8, transformOrigin: "right center" }}
              checked={isMemorized}
              onChange={(e) => handleMemorizedToggle(e.value)}
            />
          </div>
        </div>
        <div className="flip-card-back bg-orange-600 border-round shadow-2 p-4 flex flex-column align-items-center justify-content-center">
          <div className="text-white text-sm font-semibold mb-2 opacity-80">
            ENGLISH
          </div>
          <div className="text-white text-xl font-bold text-center mb-4">
            {data.translations.english}
          </div>
          <div className="text-white text-sm font-semibold mb-2 opacity-80">
            MAGYAR
          </div>
          <div className="text-white text-xl font-bold text-center mb-0">
            {data.translations.hungarian}
          </div>
        </div>
      </div>
    </div>
  );
};
