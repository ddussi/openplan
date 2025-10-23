'use client';

import { useRouter } from 'next/navigation';
import { usePhotoStore, usePhotoQuery, useDebounce } from '@repo/shared';
import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { ErrorState } from '@/components/ErrorState';

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

  // 에러 상태 처리
  if (error) {
    return (
      <main className="min-h-screen bg-[#FAFAFA]">
        <Header name="이마루한" variant="light" />
        <div className="flex items-center justify-center min-h-[calc(100vh-52px)]">
          <ErrorState
            message="사진을 불러올 수 없습니다. 네트워크 연결을 확인해주세요."
            onRetry={handleRetry}
          />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <Header name="이마루한" variant="light" />

      <div className="flex flex-col justify-between items-start min-h-[calc(100vh-52px)]">
        <div className="flex-1 flex items-center justify-center w-full px-[10px]">
          <h2 className="text-[28px] lg:text-[32px] font-semibold leading-[140%] tracking-[-0.02em] text-[#111111] text-center max-w-full px-4">
            안녕하세요
            <br />
            이마루한입니다.
          </h2>
        </div>

        <section className="w-full px-5 py-10 flex flex-col md:flex-row md:justify-center items-center gap-2.5">
          <button
            onClick={handleClick}
            disabled={isFetching}
            aria-label={isLoading ? '사진을 불러오는 중입니다' : '다음 사진 보기'}
            aria-busy={isLoading}
            className="w-full md:w-[335px] h-12 lg:h-[60px] bg-[#111111] rounded-xl flex items-center justify-center px-3 gap-1.5 disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span className="text-base lg:text-2xl font-semibold leading-[148%] tracking-[-0.02em] text-white text-center">
                  로딩중...
                </span>
              </>
            ) : (
              <span className="text-base lg:text-2xl font-semibold leading-[148%] tracking-[-0.02em] text-white text-center">
                다음
              </span>
            )}
          </button>
        </section>
      </div>
    </main>
  );
}

