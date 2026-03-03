interface ControlsProps {
  isRunning: boolean
  onStart: () => void
  onPause: () => void
  onReset: () => void
}

export function Controls({
  isRunning,
  onStart,
  onPause,
  onReset,
}: ControlsProps) {
  return (
    <div className="flex justify-center gap-4 mb-8">
      {!isRunning ? (
        <button
          onClick={onStart}
          className="px-5 py-2 bg-green-600 rounded-lg hover:bg-green-500 transition"
        >
          Start
        </button>
      ) : (
        <button
          onClick={onPause}
          className="px-5 py-2 bg-yellow-500 rounded-lg hover:bg-yellow-400 transition"
        >
          Pause
        </button>
      )}

      <button
        onClick={onReset}
        className="px-5 py-2 bg-red-600 rounded-lg hover:bg-red-500 transition"
      >
        Reset
      </button>
    </div>
  )
}