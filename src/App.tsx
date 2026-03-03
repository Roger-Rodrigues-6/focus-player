import { useState } from "react"
import { usePomodoro } from "./features/pomodoro/hooks/usePomodoro"
import { TimerDisplay } from "./features/pomodoro/components/TimerDisplay"
import { Controls } from "./features/pomodoro/components/Controls"

function App() {
  const {
    timeLeft,
    session,
    isRunning,
    start,
    pause,
    reset,
    setConfig,
  } = usePomodoro()

  const [focusUrl, setFocusUrl] = useState("")
  const [breakUrl, setBreakUrl] = useState("")
  const [customFocus, setCustomFocus] = useState(25)
  const [customBreak, setCustomBreak] = useState(5)

  function handlePreset(type: "short" | "long" | "custom") {
    if (type === "short") {
      setConfig({ focusMinutes: 25, breakMinutes: 5 })
    }

    if (type === "long") {
      setConfig({ focusMinutes: 50, breakMinutes: 10 })
    }

    if (type === "custom") {
      setConfig({ focusMinutes: customFocus, breakMinutes: customBreak })
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
      <main className="w-full max-w-md px-4 py-8 text-center">

        <h1 className="text-lg font-medium opacity-70 mb-8">
          Focus Player
        </h1>

        {/* Timer */}
        <TimerDisplay timeLeft={timeLeft} session={session} />

        {/* Controls */}
        <Controls
          isRunning={isRunning}
          onStart={start}
          onPause={pause}
          onReset={reset}
        />

        {/* Time Presets */}
        <div className="mt-10 space-y-4">

          <div className="flex justify-center gap-3">
            <button
              onClick={() => handlePreset("short")}
              className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition"
            >
              25 / 5
            </button>

            <button
              onClick={() => handlePreset("long")}
              className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition"
            >
              50 / 10
            </button>
          </div>

          {/* Custom */}
          <div className="flex gap-3 justify-center">
            <input
              type="number"
              value={customFocus}
              onChange={(e) => setCustomFocus(Number(e.target.value))}
              className="w-20 px-2 py-2 rounded-lg bg-zinc-800 text-center"
            />
            <span className="self-center opacity-50">/</span>
            <input
              type="number"
              value={customBreak}
              onChange={(e) => setCustomBreak(Number(e.target.value))}
              className="w-20 px-2 py-2 rounded-lg bg-zinc-800 text-center"
            />
            <button
              onClick={() => handlePreset("custom")}
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition"
            >
              Apply
            </button>
          </div>
        </div>

        {/* Playlist Inputs */}
        <div className="mt-10 space-y-4 text-left">

          <div>
            <label className="text-xs uppercase opacity-50">
              Focus Playlist
            </label>
            <input
              value={focusUrl}
              onChange={(e) => setFocusUrl(e.target.value)}
              placeholder="YouTube playlist or video URL"
              className="w-full mt-1 px-4 py-2 rounded-lg bg-zinc-800 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <div>
            <label className="text-xs uppercase opacity-50">
              Break Playlist
            </label>
            <input
              value={breakUrl}
              onChange={(e) => setBreakUrl(e.target.value)}
              placeholder="YouTube playlist or video URL"
              className="w-full mt-1 px-4 py-2 rounded-lg bg-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

        </div>

        {/* Player Placeholder */}
        <div className="mt-10 rounded-xl overflow-hidden">
          <div className="aspect-video bg-zinc-800 flex items-center justify-center text-sm opacity-40">
            YouTube Player
          </div>
        </div>

      </main>
    </div>
  )
}

export default App