import { useEffect, useRef, useState } from "react"
import type { SessionType } from "../domain/pomodoroEngine"
import {
  getNextSession,
  minutesToSeconds,
} from "../domain/pomodoroEngine"

export interface PomodoroConfig {
  focusMinutes: number
  breakMinutes: number
}

interface UsePomodoroReturn {
  timeLeft: number
  session: SessionType
  isRunning: boolean
  start: () => void
  pause: () => void
  reset: () => void
  setConfig: (config: PomodoroConfig) => void
}

const DEFAULT_CONFIG: PomodoroConfig = {
  focusMinutes: 25,
  breakMinutes: 5,
}

export function usePomodoro(): UsePomodoroReturn {
  const [config, setConfigState] = useState(DEFAULT_CONFIG)
  const [session, setSession] = useState<SessionType>("focus")
  const [timeLeft, setTimeLeft] = useState(
    minutesToSeconds(DEFAULT_CONFIG.focusMinutes)
  )
  const [isRunning, setIsRunning] = useState(false)

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  function clearTimer() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  function start() {
    if (isRunning) return
    console.log("▶️ START")
    setIsRunning(true)
  }

  function pause() {
    console.log("⏸️ PAUSE")
    setIsRunning(false)
  }

  function reset() {
    console.log("🔄 RESET")
    setIsRunning(false)

    const resetTime =
      session === "focus"
        ? minutesToSeconds(config.focusMinutes)
        : minutesToSeconds(config.breakMinutes)

    setTimeLeft(resetTime)
  }

  function setConfig(newConfig: PomodoroConfig) {
    console.log("⚙️ CONFIG UPDATED", newConfig)
    setIsRunning(false)
    setConfigState(newConfig)

    const initialTime =
      session === "focus"
        ? minutesToSeconds(newConfig.focusMinutes)
        : minutesToSeconds(newConfig.breakMinutes)

    setTimeLeft(initialTime)
  }

  useEffect(() => {
    if (!isRunning) {
      clearTimer()
      return
    }

    console.log("⏳ Running session:", session)

    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          const nextSession = getNextSession(session)
          console.log("🔁 Auto switching:", session, "→", nextSession)

          setSession(nextSession)

          return nextSession === "focus"
            ? minutesToSeconds(config.focusMinutes)
            : minutesToSeconds(config.breakMinutes)
        }

        return prev - 1
      })
    }, 1000)

    return () => clearTimer()
  }, [isRunning, session, config])

  return {
    timeLeft,
    session,
    isRunning,
    start,
    pause,
    reset,
    setConfig,
  }
}