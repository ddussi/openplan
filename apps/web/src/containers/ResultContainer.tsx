'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { usePhotoStore } from '@repo/shared';
import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { PhotoInfo } from '@/components/PhotoInfo';
import { InfoCardSkeleton, Skeleton } from '@/components/Skeleton';

export function ResultContainer() {
  const router = useRouter();
  const { photo, hasViewed, clearPhoto } = usePhotoStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 조회 이력이 없으면 1초 후 메인으로 이동
    if (!hasViewed || !photo) {
      const timer = setTimeout(() => {
        router.push('/');
      }, 1000);
      return () => clearTimeout(timer);
    }

    // 스켈레톤 표시 시간
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [hasViewed, photo, router]);

  const handleCancel = () => {
    clearPhoto();
    router.push('/');
  };

  if (!hasViewed || !photo) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#FAFAFA] relative">
      {/* Background blur layer */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#D9D9D9] to-transparent" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(${photo.download_url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(10.9px)',
          }}
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header name="이마루한" variant="dark" />

        <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-10 px-5 py-10">
          {/* Image */}
          <div className="w-full max-w-[335px] md:max-w-[728px] lg:max-w-[660px]">
            {isLoading ? (
              <Skeleton className="w-full aspect-[16/10] rounded-3xl" />
            ) : (
              <Image
                src={photo.download_url}
                alt={`Photo by ${photo.author}`}
                width={photo.width}
                height={photo.height}
                className="w-full h-auto rounded-3xl"
                priority
              />
            )}
          </div>

          {/* Info sections */}
          {isLoading ? (
            <div className="w-full max-w-[335px] md:max-w-[728px] lg:max-w-[660px] flex flex-col gap-3">
              <InfoCardSkeleton />
              <InfoCardSkeleton />
              <InfoCardSkeleton />
              <Skeleton className="w-full md:w-[154px] h-12" />
            </div>
          ) : (
            <div className="w-full max-w-[335px] md:max-w-[728px] lg:max-w-[660px] flex flex-col gap-3">
              <PhotoInfo photo={photo} />

              <button
                onClick={handleCancel}
                className="w-full md:w-[154px] h-12 bg-[#111111] rounded-xl flex items-center justify-center px-3 gap-1.5 md:self-start hover:bg-[#333333] transition-colors"
              >
                <span className="text-base font-semibold leading-[148%] tracking-[-0.02em] text-white text-center">
                  이전
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

