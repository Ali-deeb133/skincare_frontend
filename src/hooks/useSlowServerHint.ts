import { useEffect } from 'react';
import { create } from 'zustand';

// The free-tier backend sleeps when idle and needs about a minute to wake up.
// A request still loading after this long is most likely waiting for that.
const SLOW_AFTER = 10_000;

// Counts the loading states that have passed SLOW_AFTER. Shared by every
// caller, so SlowServerToast shows one hint however many requests are slow,
// and hides it only when all of them have finished.
interface SlowServerStore {
  slowCount: number;
  add: () => void;
  remove: () => void;
}

export const useSlowServerStore = create<SlowServerStore>((set) => ({
  slowCount: 0,
  add: () => set((state) => ({ slowCount: state.slowCount + 1 })),
  remove: () => set((state) => ({ slowCount: Math.max(0, state.slowCount - 1) })),
}));

export const useSlowServerHint = (loading: boolean) => {
  const add = useSlowServerStore((state) => state.add);
  const remove = useSlowServerStore((state) => state.remove);

  useEffect(() => {
    if (!loading) return;

    let counted = false;
    const timer = setTimeout(() => {
      counted = true;
      add();
    }, SLOW_AFTER);

    // Runs when loading ends or the component unmounts.
    return () => {
      clearTimeout(timer);
      if (counted) remove();
    };
  }, [loading, add, remove]);
};
