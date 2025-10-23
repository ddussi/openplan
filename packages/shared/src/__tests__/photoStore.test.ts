import { act, renderHook } from '@testing-library/react';
import { usePhotoStore } from '../stores/photoStore';
import type { PhotoData } from '../stores/photoStore';

// localStorage mock
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('photoStore', () => {
  const mockPhoto: PhotoData = {
    id: '0',
    author: 'Test Author',
    width: 5000,
    height: 3333,
    url: 'https://unsplash.com/photos/test',
    download_url: 'https://picsum.photos/id/0/5000/3333',
  };

  beforeEach(() => {
    // 각 테스트 전에 localStorage 초기화
    localStorageMock.clear();
    // 스토어 초기화
    usePhotoStore.getState().resetStore();
  });

  it('should have initial state', () => {
    const { result } = renderHook(() => usePhotoStore());

    expect(result.current.photo).toBeNull();
    expect(result.current.hasViewed).toBe(false);
    expect(result.current.lastViewedAt).toBeNull();
  });

  it('should set photo and update hasViewed', () => {
    const { result } = renderHook(() => usePhotoStore());

    act(() => {
      result.current.setPhoto(mockPhoto);
    });

    expect(result.current.photo).toEqual(mockPhoto);
    expect(result.current.hasViewed).toBe(true);
    expect(result.current.lastViewedAt).toBeGreaterThan(0);
  });

  it('should clear photo but keep hasViewed', () => {
    const { result } = renderHook(() => usePhotoStore());

    // 먼저 사진 설정
    act(() => {
      result.current.setPhoto(mockPhoto);
    });

    expect(result.current.photo).toEqual(mockPhoto);
    expect(result.current.hasViewed).toBe(true);

    // 사진 제거
    act(() => {
      result.current.clearPhoto();
    });

    expect(result.current.photo).toBeNull();
    expect(result.current.hasViewed).toBe(true); // hasViewed는 유지
  });

  it('should reset store to initial state', () => {
    const { result } = renderHook(() => usePhotoStore());

    // 사진 설정
    act(() => {
      result.current.setPhoto(mockPhoto);
    });

    expect(result.current.hasViewed).toBe(true);

    // 스토어 리셋
    act(() => {
      result.current.resetStore();
    });

    expect(result.current.photo).toBeNull();
    expect(result.current.hasViewed).toBe(false);
    expect(result.current.lastViewedAt).toBeNull();
  });

  it('should update lastViewedAt timestamp', () => {
    const { result } = renderHook(() => usePhotoStore());

    const beforeTime = Date.now();

    act(() => {
      result.current.setPhoto(mockPhoto);
    });

    const afterTime = Date.now();

    expect(result.current.lastViewedAt).toBeGreaterThanOrEqual(beforeTime);
    expect(result.current.lastViewedAt).toBeLessThanOrEqual(afterTime);
  });

  it('should handle multiple photo updates', () => {
    const { result } = renderHook(() => usePhotoStore());

    const photo1: PhotoData = { ...mockPhoto, id: '1', author: 'Author 1' };
    const photo2: PhotoData = { ...mockPhoto, id: '2', author: 'Author 2' };

    act(() => {
      result.current.setPhoto(photo1);
    });

    expect(result.current.photo?.id).toBe('1');
    expect(result.current.photo?.author).toBe('Author 1');

    act(() => {
      result.current.setPhoto(photo2);
    });

    expect(result.current.photo?.id).toBe('2');
    expect(result.current.photo?.author).toBe('Author 2');
  });

  // Note: localStorage persistence는 통합 테스트에서 확인
  // Zustand persist middleware는 실제 브라우저 환경에서 테스트하는 것이 적합
});

