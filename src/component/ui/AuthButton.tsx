import { Check } from "lucide-react";

interface Props {
  loading: boolean;
  success?: boolean;
  children: React.ReactNode;
}

export default function AuthButton({ loading, success, children }: Props) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`
        relative w-full py-3 rounded-xl font-semibold
        flex items-center justify-center
        overflow-hidden
        transition-all duration-300
        ${
          loading
            ? "bg-pink-400 cursor-not-allowed"
            : success
            ? "bg-green-500"
            : "bg-pink-500 hover:bg-pink-600 active:scale-95"
        }
      `}
    >
      {/* النص */}
      <span
        className={`
          transition-all duration-200
          ${loading || success ? "opacity-0 scale-90" : "opacity-100"}
        `}
      >
        {children}
      </span>

      {/* Spinner */}
      {loading && (
        <svg
          className="animate-spin h-5 w-5 absolute text-white"
          viewBox="0 0 24 24"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="white"
            strokeWidth="4"
            strokeOpacity="0.25"
            fill="none"
          />
          <path
            d="M22 12a10 10 0 00-10-10"
            stroke="white"
            strokeWidth="4"
          />
        </svg>
      )}

      {/* Success */}
      {success && (
        <Check
          className="absolute text-white animate-scale-in"
          size={20}
        />
      )}
    </button>
  );
}