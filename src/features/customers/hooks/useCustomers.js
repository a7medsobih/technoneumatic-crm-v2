import { useQuery } from "@tanstack/react-query";

import { CustomersRepository } from "../api/customersRepository";
import { customerKeys } from "../constants/customersQueryKeys";

export function useCustomers(filters = {}) {
  return useQuery({
    queryKey: customerKeys.list(filters),
    queryFn: () => CustomersRepository.getAll(filters),
    select: (response) => ({
      items: response.data.data ?? [],
      meta: response.data.meta ?? {},
    }),
  });
}
