import { useQuery, useMutation, useQueryClient } from 'react-query'
import { handleApiError } from '../services/api'
import toast from 'react-hot-toast'

export const useApi = (queryKey, queryFn, options = {}) => {
  return useQuery(queryKey, queryFn, {
    onError: (error) => {
      handleApiError(error)
    },
    ...options
  })
}

export const useApiMutation = (mutationFn, options = {}) => {
  const queryClient = useQueryClient()
  
  return useMutation(mutationFn, {
    onError: (error) => {
      handleApiError(error)
    },
    onSuccess: (data, variables, context) => {
      if (options.successMessage) {
        toast.success(options.successMessage)
      }
      if (options.invalidateQueries) {
        options.invalidateQueries.forEach(queryKey => {
          queryClient.invalidateQueries(queryKey)
        })
      }
      if (options.onSuccess) {
        options.onSuccess(data, variables, context)
      }
    },
    ...options
  })
}
