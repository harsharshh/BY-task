"use client";

type FailureAlertProps = {
  title?: string;
  message: string;
  onDismiss?: () => void;
};

export function FailureAlert({
  title = "Unable to load live data",
  message,
  onDismiss,
}: FailureAlertProps) {
  return (
    <div
      role="alert"
      className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-amber-950"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold">{title}</p>
          <p className="mt-1 text-sm">{message}</p>
          <p className="mt-2 text-xs text-amber-800">
            Showing cached fallback data until the API is available again.
          </p>
        </div>
        {onDismiss ? (
          <button
            type="button"
            onClick={onDismiss}
            className="rounded-md px-2 py-1 text-sm font-medium hover:bg-amber-100"
            aria-label="Dismiss alert"
          >
            Dismiss
          </button>
        ) : null}
      </div>
    </div>
  );
}
