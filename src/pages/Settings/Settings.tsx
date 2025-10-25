import { ThemeSwitcher } from "./ThemeSwitcher";
import { Vosotros } from "./Vosotros";
import { Password } from "./Password";

export const Settings = () => {
  return (
    <>
      <h1 className="text-2xl pl-4 mb-0 font-bold">Settings</h1>
      <div className="p-4 flex flex-row flex-wrap gap-4">
        <div className="flex justify-center">
          <ThemeSwitcher />
        </div>
        <div className="flex justify-center">
          <Vosotros />
        </div>
        <div className="flex justify-center">
          <Password />
        </div>
      </div>
    </>
  );
};
