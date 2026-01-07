import api from "@/lib/axios";
import { MovieDetailResponse, SubtitleResponse } from "@/types/movie";

export const movieService = {
  getMovieDetails: async (id: string): Promise<MovieDetailResponse> => {
    const response = await api.get<MovieDetailResponse>(
      `/movie/${id}/detail/website`
    );
    return response.data;
  },
  getSignedUrl: async (
    hlsFileName: string,
    drm: boolean = false
  ): Promise<string> => {
    const response = await api.get<{ status: boolean; signedVideoUrl: string }>(
      `/movie/hls-signed-url`,
      {
        params: { hlsFileName, drm },
      }
    );
    return response.data.signedVideoUrl;
  },
  getSubtitles: async (movieId: string | number): Promise<SubtitleResponse> => {
    const response = await api.get<SubtitleResponse>(`/subtitle/${movieId}`);
    return response.data;
  },
};
