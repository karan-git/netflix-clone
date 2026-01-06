import { useQuery } from "@tanstack/react-query";
import { homeService } from "@/services/homeService";

export const useSettings = () => {
  return useQuery({
    queryKey: ["settings"],
    queryFn: () => homeService.getSettings(),
  });
};

export const useWidgetData = (widgetId: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["widget", widgetId],
    queryFn: () => homeService.getWidgetData(widgetId),
    enabled: !!widgetId && enabled,
  });
};
