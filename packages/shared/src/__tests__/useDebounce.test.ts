import { renderHook, waitFor } from '@testing-library/react';
import { useDebounce } from '../hooks/useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    
    expect(result.current).toBe('initial');
  });

  it('should debounce value changes', async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'first', delay: 500 },
      }
    );

    expect(result.current).toBe('first');

    // 값 변경
    rerender({ value: 'second', delay: 500 });
    
    // 아직 디바운스 중이므로 이전 값 유지
    expect(result.current).toBe('first');

    // 500ms 경과
    jest.advanceTimersByTime(500);

    await waitFor(() => {
      expect(result.current).toBe('second');
    });
  });

  it('should cancel previous timer on rapid changes', async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      {
        initialProps: { value: 0 },
      }
    );

    expect(result.current).toBe(0);

    // 연속으로 값 변경 (연타)
    rerender({ value: 1 });
    jest.advanceTimersByTime(200); // 200ms
    
    rerender({ value: 2 });
    jest.advanceTimersByTime(200); // 400ms (누적)
    
    rerender({ value: 3 });
    jest.advanceTimersByTime(200); // 600ms (누적)

    // 아직 마지막 값이 적용 안 됨 (마지막 변경 후 500ms 안 지남)
    expect(result.current).toBe(0);

    // 마지막 변경 후 500ms 경과
    jest.advanceTimersByTime(300); // 총 900ms

    await waitFor(() => {
      expect(result.current).toBe(3); // 마지막 값만 적용
    });
  });

  it('should handle different delay times', async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'test', delay: 1000 },
      }
    );

    rerender({ value: 'changed', delay: 1000 });
    
    // 500ms 경과 (아직 적용 안 됨)
    jest.advanceTimersByTime(500);
    expect(result.current).toBe('test');

    // 추가 500ms 경과 (총 1000ms, 적용됨)
    jest.advanceTimersByTime(500);

    await waitFor(() => {
      expect(result.current).toBe('changed');
    });
  });

  it('should work with number values', async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      {
        initialProps: { value: 0 },
      }
    );

    rerender({ value: 42 });
    jest.advanceTimersByTime(300);

    await waitFor(() => {
      expect(result.current).toBe(42);
    });
  });
});

