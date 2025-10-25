import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { translationsApi } from '../api';
import type { CreateTranslationRequest } from '../types';

// Query keys
export const translationsKeys = {
  all: ['translations'] as const,
  lists: () => [...translationsKeys.all, 'list'] as const,
  list: (params?: { page?: number; limit?: number; q?: string }) => 
    [...translationsKeys.lists(), params] as const,
  random: (number: number) => [...translationsKeys.all, 'random', number] as const,
};

// Get translations list with pagination and search
export function useTranslations(params?: { page?: number; limit?: number; q?: string }) {
  return useQuery({
    queryKey: translationsKeys.list(params),
    queryFn: () => translationsApi.getTranslations(params),
    staleTime: Infinity, //infinite
  });
}

// Create translation mutation
export function useCreateTranslation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (translation: CreateTranslationRequest) => 
      translationsApi.createTranslation(translation),
    onSuccess: () => {
      // Invalidate and refetch translations list
      queryClient.invalidateQueries({ queryKey: translationsKeys.lists() });
    },
  });
}

// Update translation mutation
export function useUpdateTranslation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, translation }: { 
      id: string; 
      translation: { 
        memorized?: boolean;
        word?: string;
        translations?: {
          english?: string;
          hungarian?: string;
        };
      } 
    }) =>
      translationsApi.updateTranslation(id, translation),
    onSuccess: () => {
      // Invalidate and refetch translations list
      queryClient.invalidateQueries({ queryKey: translationsKeys.lists() });
    },
  });
}

// Get random translations
export function useGetRandomTranslations(number: number) {
  return useQuery({
    queryKey: translationsKeys.random(number),
    queryFn: () => translationsApi.getRandomTranslations(number),
    staleTime: Infinity, //infinite
  });
}

// Delete translation mutation
export function useDeleteTranslation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => translationsApi.deleteTranslation(id),
    onSuccess: () => {
      // Invalidate and refetch translations list
      queryClient.invalidateQueries({ queryKey: translationsKeys.lists() });
    },
  });
}

// Refresh random translations hook
export function useRefreshRandomTranslations() {
  const queryClient = useQueryClient();

  const refreshRandomTranslations = () => {
    // Clear the cache for random translations
    queryClient.invalidateQueries({ queryKey: translationsKeys.all });
  };

  return { refreshRandomTranslations };
}