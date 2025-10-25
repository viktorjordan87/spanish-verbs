import { SwiperCard } from "./SwiperCard";
import {
  useGetRandomTranslations,
  useRefreshRandomTranslations,
} from "@/hooks/useTranslationsQuery";
import { Loader2 } from "lucide-react";
import { Button } from "primereact/button";
import "./Random.style.scss";

export const Random = () => {
  const { data, isLoading, refetch } = useGetRandomTranslations(9);
  const { refreshRandomTranslations } = useRefreshRandomTranslations();

  const handleRefresh = () => {
    refreshRandomTranslations();
    refetch();
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );

  if (data?.length === 0)
    return (
      <>
        <Button
          text
          icon="pi pi-refresh"
          onClick={handleRefresh}
          className="p-button-rounded"
          tooltip="Refresh cards"
          tooltipOptions={{ position: "bottom" }}
        />
        <div className="flex justify-center items-center h-64">
          <p>No data found</p>
        </div>
      </>
    );

  return (
    <div className="mx-4">
      <Button
        text
        icon="pi pi-refresh"
        onClick={handleRefresh}
        className="random-refresh-button p-button-rounded p-button-sm"
        tooltip="Refresh cards"
        tooltipOptions={{ position: "bottom" }}
      />
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-bold mt-0 mb-1">
          Learn 9 random words and memorize them
        </h3>
      </div>
      <div className="random-container">
        {data?.map((item, index) => (
          <SwiperCard key={index} data={item} />
        ))}
      </div>
    </div>
  );
};
