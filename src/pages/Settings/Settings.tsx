import { ThemeSwitcher } from "./ThemeSwitcher";

export const Settings = () => {
  return (
    <div className="p-4 max-w-30rem">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="flex justify-center">
        <ThemeSwitcher />
      </div>
    </div>
  );
};
