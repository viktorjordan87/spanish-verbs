import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { verbsApi } from '../api';
import type { CreateVerbRequest, UpdateVerbRequest } from '../types';

// Query keys
export const verbsKeys = {
  all: ['verbs'] as const,
  lists: () => [...verbsKeys.all, 'list'] as const,
  list: (params?: { page?: number; limit?: number; q?: string }) => 
    [...verbsKeys.lists(), params] as const,
  details: () => [...verbsKeys.all, 'detail'] as const,
  detail: (id: string) => [...verbsKeys.details(), id] as const,
  search: (query: string) => [...verbsKeys.all, 'search', query] as const,
};

// Get verbs list
export function useVerbs(params?: { page?: number; limit?: number; q?: string }) {
  return useQuery({
    queryKey: verbsKeys.list(params),
    queryFn: () => verbsApi.getVerbs(params),
    staleTime: Infinity, //infinite
  });
}

// Get single verb
export function useVerb(id: string) {
  return useQuery({
    queryKey: verbsKeys.detail(id),
    queryFn: () => verbsApi.getVerb(id),
    enabled: !!id,
    staleTime: Infinity, //infinite
  });
}

// Create verb mutation
export function useCreateVerb() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (verb: CreateVerbRequest) => verbsApi.createVerb(verb),
    onSuccess: () => {
      // Invalidate and refetch verbs list
      queryClient.invalidateQueries({ queryKey: verbsKeys.lists() });
    },
  });
}

// Update verb mutation
export function useUpdateVerb() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, verb }: { id: string; verb: UpdateVerbRequest }) =>
      verbsApi.updateVerb(id, verb),
    onSuccess: (updatedVerb, { id }) => {
      // Update the specific verb in cache
      queryClient.setQueryData(verbsKeys.detail(id), updatedVerb);
      // Invalidate lists to refetch
      queryClient.invalidateQueries({ queryKey: verbsKeys.lists() });
    },
  });
}

// Delete verb mutation
export function useDeleteVerb() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => verbsApi.deleteVerb(id),
    onSuccess: (_, id) => {
      // Remove the verb from cache
      queryClient.removeQueries({ queryKey: verbsKeys.detail(id) });
      // Invalidate lists to refetch
      queryClient.invalidateQueries({ queryKey: verbsKeys.lists() });
    },
  });
}

// Search verbs mutation
export function useSearchVerbs(query: string) {
  return useQuery({
    queryKey: verbsKeys.search(query),
    queryFn: () => verbsApi.searchVerbs(query),
    enabled: query !== '', //enabled only if query is not empty
    staleTime: Infinity, //infinite
  });
}