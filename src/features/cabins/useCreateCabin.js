import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useState } from "react";

export function useCreateCabin() {
  const [isFormOpen, setIsFormOpen] = useState(true);

  const queryClient = useQueryClient();

  const { reset } = useForm({});
  const { isLoading: isCreated, mutate: createCabin } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("Cabin has been Sucessfully Created");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
      setIsFormOpen(false);
    },
    onError: (err) => toast.error(err.message),
  });

  return { isFormOpen, isCreated, createCabin };
}
