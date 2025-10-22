import type { PhotoData } from '@repo/shared';

interface InfoSectionProps {
  label: string;
  value: string | number;
  isLink?: boolean;
}

function InfoSection({ label, value, isLink = false }: InfoSectionProps) {
  return (
    <div className="flex-1">
      <div className="text-[15px] font-medium leading-[140%] tracking-[-0.02em] text-[#111111]">
        {label}
      </div>
      {isLink ? (
        <a
          href={String(value)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[15px] font-medium leading-[140%] tracking-[-0.02em] text-[#111111] opacity-50 underline break-all"
        >
          {value}
        </a>
      ) : (
        <div className="text-[15px] font-medium leading-[140%] tracking-[-0.02em] text-[#111111] opacity-50">
          {value}
        </div>
      )}
    </div>
  );
}

interface PhotoInfoProps {
  photo: PhotoData;
}

export function PhotoInfo({ photo }: PhotoInfoProps) {
  return (
    <div className="w-full flex flex-col gap-3">
      {/* Section 1: ID & Author */}
      <div className="bg-white rounded-2xl p-5 border border-black/[0.01]">
        <div className="flex flex-col md:flex-row gap-4">
          <InfoSection label="id" value={photo.id} />
          <InfoSection label="author" value={photo.author} />
        </div>
      </div>

      {/* Section 2: Width & Height */}
      <div className="bg-white rounded-2xl p-5 border border-black/[0.01]">
        <div className="flex flex-col md:flex-row gap-4">
          <InfoSection label="width" value={photo.width} />
          <InfoSection label="height" value={photo.height} />
        </div>
      </div>

      {/* Section 3: URLs */}
      <div className="bg-white rounded-2xl p-5 border border-black/[0.01]">
        <div className="flex flex-col gap-4">
          <InfoSection label="url" value={photo.url} isLink />
          <InfoSection label="download_url" value={photo.download_url} isLink />
        </div>
      </div>
    </div>
  );
}

