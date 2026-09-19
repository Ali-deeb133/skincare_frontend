import { useEffect, useRef } from 'react';

export const useReveal = (threshold: number = 0.20) => {
  const ref = useRef<HTMLElement>(null);

   useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold }
  );

  // 1. نأخذ نسخة محلية من المرجع الحالي
  const currentRef = ref.current;

  if (currentRef) {
    observer.observe(currentRef);
  }

  return () => {
    // 2. نستخدم النسخة المحلية هنا بدلاً من ref.current
    if (currentRef) {
      observer.unobserve(currentRef);
    }
  };
}, [threshold]);

  return ref;
};