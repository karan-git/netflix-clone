import api from "@/lib/axios";
import { SubscriptionStatusResponse } from "@/types/user";

export const userService = {
  getSubscriptionStatus: async (): Promise<SubscriptionStatusResponse> => {
    const response = await api.get<SubscriptionStatusResponse>(
      "/user/subscription/status"
    );
    return response.data;
  },
};
