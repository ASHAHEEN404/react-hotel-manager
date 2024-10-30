import TableOperation from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

const CabinTableOperations = () => {
  return (
    <TableOperation className="">
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "with-discount", label: "With discount" },
          { value: "no-discount", label: "No discount" },
        ]}
      />

      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-dec", label: "Sort by name (Z-A)" },
          { value: "regular_price-asc", label: "Sort by price (low first)" },
          { value: "regular_price-dec", label: "Sort by price (high first)" },
          { value: "max_capacity-asc", label: "Sort by capacity (low first)" },
          { value: "max_capacity-dec", label: "Sort by capacity (high first)" },
        ]}
      />
    </TableOperation>
  );
};

export default CabinTableOperations;
