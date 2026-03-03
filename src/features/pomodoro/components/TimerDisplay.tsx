import { formatTime } from "../domain/pomodoroEngine"

interface TimerDisplayProps {
  timeLeft: number
  session: "focus" | "break"
}

export function TimerDisplay({ timeLeft, session }: TimerDisplayProps) {
  const isFocus = session === "focus"

  return (
    <div className="mb-10">
      <div
        className={`text-7xl sm:text-8xl font-bold transition-colors duration-300 ${
          isFocus ? "text-green-500" : "text-blue-400"
        }`}
      >
        {formatTime(timeLeft)}
      </div>

      <div className="mt-3 text-xs tracking-[0.3em] uppercase opacity-50">
        {session}
      </div>
    </div>
  )
}