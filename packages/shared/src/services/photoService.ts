import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import type { PhotoData } from '../stores/photoStore';

const PHOTO_API_URL = 'https://picsum.photos/id/0/info';

// Repository Pattern: API 호출 추상화
export const photoService = {
  fetchPhoto: async (): Promise<PhotoData> => {
    const response = await fetch(PHOTO_API_URL);

    if (!response.ok) {
      throw new Error(`Failed to fetch photo: ${response.status}`);
    }

    return response.json();
  },
};

// TanStack Query Hook
export const usePhotoQuery = (): UseQueryResult<PhotoData, Error> => {
  return useQuery({
    queryKey: ['photo'],
    queryFn: photoService.fetchPhoto,
    enabled: false, // 자동 호출 비활성화 (버튼 클릭 시에만 refetch로 호출)
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
    retry: 2,
    refetchOnWindowFocus: false,
  });
};

