import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  // Pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // FILTER
  const filterValue = searchParams.get("status") || "all";
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  // SORT
  const sortByRaw = searchParams.get("sortBy") || "start_date-desc";
  const [sortByField, sortByDirection] = sortByRaw.split("-");
  const sortBy = {
    field: sortByField,
    direction: sortByDirection,
  };

  const {
    data, // Updated: get data directly
    error,
    isLoading,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page], // If filter value is changed the data will be refetched
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // Ensure `bookings` and `count` are extracted safely from `data`
  const bookings = data?.data || [];
  const count = data?.count || 0;

  // Prefetching
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { bookings, error, isLoading, count };
}
