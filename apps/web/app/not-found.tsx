import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
      <div className="text-center px-5">
        <h1 className="text-6xl font-bold text-[#111111] mb-4">404</h1>
        <p className="text-2xl font-semibold text-[#111111] mb-8">페이지를 찾을 수 없습니다</p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-[#111111] text-white rounded-xl font-semibold hover:bg-[#333333] transition-colors"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </main>
  );
}

