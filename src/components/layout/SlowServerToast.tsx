import { useSlowServerStore } from '../../hooks/useSlowServerHint';
import Toast from '../ui/Toast';

const MESSAGE = 'The server is waking up after being inactive. This can take up to a minute.';

// Mounted once in the Layout. Shown while any request tracked by
// useSlowServerHint has been loading for too long.
export const SlowServerToast = () => {
  const isSlow = useSlowServerStore((state) => state.slowCount > 0);

  return <Toast message={isSlow ? MESSAGE : null} variant="info" position="top" />;
};
