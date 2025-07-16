import { useMutation, useQueryClient } from "@tanstack/react-query"
import { logout } from "../lib/api"

const useLogout = () => {
    const queryClient = useQueryClient()
    const { mutate: logoutMutation, isPending, isError } = useMutation({
        mutationFn: logout,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"]}) 
    })

    return { logoutMutation, isError, isPending }
}

export default useLogout