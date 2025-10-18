import { AutoComplete } from "primereact/autocomplete";

export const Search = () => {
  return (
    <div className="auto-complete-container p-inputgroup flex-1">
      <span className="p-inputgroup-addon">
        <i className="pi pi-search"></i>
      </span>
      <AutoComplete placeholder="Search" />
    </div>
  );
};
