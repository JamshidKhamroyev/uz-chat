import { QueryClient, useMutation } from "@tanstack/react-query"
import { signup } from "../lib/api"

const useSignup = () => {
    const queryClient = new QueryClient()

    const { mutate, isPending, error } = useMutation({
        mutationFn: signup,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"]})
    })

    return { mutate, isPending, error }
}

export default useSignup