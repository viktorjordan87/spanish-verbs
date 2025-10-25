import { adminPasswordAtom } from "@/states/settings";
import { useAtom } from "jotai";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Lock } from "lucide-react";

export const Password = () => {
  const [password, setPassword] = useAtom(adminPasswordAtom);

  return (
    <Card title="Admin Password" className="max-w-20rem">
      <div className="flex flex-column gap-4">
        <div className="p-inputgroup">
          <span className="p-inputgroup-addon">
            <Lock size={16} />
          </span>
          <InputText
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full"
            autoComplete="new-password"
            name="admin-password-settings"
          />
        </div>
      </div>
      <p>
        Set your admin password to create new translations. This password is
        stored locally in your browser.
      </p>
    </Card>
  );
};
