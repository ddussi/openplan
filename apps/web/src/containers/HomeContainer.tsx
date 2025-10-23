'use client';

import { useRouter } from 'next/navigation';
import { usePhotoStore, usePhotoQuery, useDebounce } from '@repo/shared';
import { useState, useEffect } from 'react';
import { HomePage } from '@/components/HomePage';

export function HomeContainer() {
  const router = useRouter();
  const { setPhoto, hasViewed, photo } = usePhotoStore();
  const [clickCount, setClickCount] = useState(0);
  const { refetch, isFetching, error } = usePhotoQuery();
  
  const debouncedClickCount = useDebounce(clickCount, 500);

  // 이미 조회 이력이 있고 데이터가 있으면 자동으로 /result로 이동
  useEffect(() => {
    if (hasViewed && photo && clickCount === 0) {
      router.push('/result');
    }
  }, [hasViewed, photo, clickCount, router]);

  // 디바운스된 클릭 실행
  useEffect(() => {
    if (debouncedClickCount > 0) {
      const fetchData = async () => {
        const result = await refetch();
        if (result.data) {
          setPhoto(result.data);
          router.push('/result');
        }
      };
      fetchData();
    }
  }, [debouncedClickCount, refetch, setPhoto, router]);

  const handleClick = () => {
    setClickCount((prev) => prev + 1);
  };

  const handleRetry = () => {
    setClickCount(0);
    refetch();
  };

  // 디바운스 중이거나 API 호출 중일 때만 로딩
  const isDebouncing = clickCount > 0 && clickCount !== debouncedClickCount;
  const isLoading = isDebouncing || isFetching;

  return (
    <HomePage
      name="이마루한"
      isLoading={isLoading}
      isFetching={isFetching}
      error={error}
      onNext={handleClick}
      onRetry={handleRetry}
    />
  );
}

