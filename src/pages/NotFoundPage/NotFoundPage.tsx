import React from 'react';
import { Button } from '../../components/ui/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-sakura-base pt-35 px-6 flex flex-col items-center text-center">
      <span className="text-6xl mb-6">🌸</span>
      <p className="text-xs text-sakura-accent font-medium tracking-widest uppercase mb-2">
        Error 404
      </p>
      <h1 className="font-display text-4xl text-sakura-ink italic mb-3">Page not found</h1>
      <p className="text-sm text-sakura-muted max-w-sm mb-8">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Button to="/">Back to Home</Button>
        <Button to="/search" variant="ghost">
          Browse Products
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
