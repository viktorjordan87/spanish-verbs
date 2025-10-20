import { isVosotrosEnabledAtom } from "@/states/settings";
import { useAtom } from "jotai";
import { Card } from "primereact/card";
import {
  SelectButton,
  type SelectButtonChangeEvent,
} from "primereact/selectbutton";

export const Vosotros = () => {
  const [isVosotrosEnabled, setIsVosotrosEnabled] = useAtom(
    isVosotrosEnabledAtom
  );
  return (
    <Card title="Vosotros is enabled" className="max-w-20rem">
      <div className="flex flex-column gap-4">
        <SelectButton
          className="w-full"
          options={[
            { label: "Enabled", value: true },
            { label: "Disabled", value: false },
          ]}
          value={isVosotrosEnabled}
          onChange={(e: SelectButtonChangeEvent) =>
            setIsVosotrosEnabled(e.value)
          }
        />
      </div>
      <p>
        Vosotros is a Spanish pronoun that is used to address a group of people.
        Do you want to enable it?
      </p>
    </Card>
  );
};
