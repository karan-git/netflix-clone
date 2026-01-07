import { useQuery } from "@tanstack/react-query";
import { movieService } from "@/services/movieService";

export const useMovieDetails = (id: string) => {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: () => movieService.getMovieDetails(id),
    enabled: !!id,
  });
};
