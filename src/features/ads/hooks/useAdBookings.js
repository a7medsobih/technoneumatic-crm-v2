import { useQuery } from "@tanstack/react-query";

import { AdRepository } from "../api/adsRepository";
import { adKeys } from "../constants/adsQueryKeys";

export function useAdBookings(filters = {}) {
  return useQuery({
    queryKey: adKeys.bookingList(filters),
    queryFn: () => AdRepository.getBookings(filters),
    select: (response) => ({
      items: response.data.data ?? [],
      meta: response.data.meta ?? {},
    }),
  });
}
