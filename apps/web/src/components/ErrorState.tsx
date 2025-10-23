interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <div className="text-center">
        <svg
          className="w-16 h-16 text-red-500 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <p className="text-lg font-medium text-gray-900 mb-2">오류 발생</p>
        <p className="text-sm text-gray-600">{message}</p>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          aria-label="사진 다시 불러오기"
          className="px-6 py-2 bg-[#111111] text-white rounded-xl font-semibold hover:bg-[#333333] transition-colors"
        >
          다시 시도
        </button>
      )}
    </div>
  );
}

