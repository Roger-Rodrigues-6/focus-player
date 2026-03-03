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
  const [config, setConfigState] = useState<PomodoroConfig>(DEFAULT_CONFIG)
  const [session, setSession] = useState<SessionType>("focus")
  const [timeLeft, setTimeLeft] = useState(
    minutesToSeconds(DEFAULT_CONFIG.focusMinutes)
  )
  const [isRunning, setIsRunning] = useState(false)

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  /**
   * Clears active interval safely
   */
  function clearTimer() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  /**
   * Switch session and reset timer
   */
  function switchSession() {
    const nextSession = getNextSession(session)
    setSession(nextSession)

    const nextTime =
      nextSession === "focus"
        ? minutesToSeconds(config.focusMinutes)
        : minutesToSeconds(config.breakMinutes)

    setTimeLeft(nextTime)
  }

  /**
   * Starts countdown
   */
  function start() {
    if (isRunning) return
    setIsRunning(true)
  }

  /**
   * Pauses countdown
   */
  function pause() {
    setIsRunning(false)
  }

  /**
   * Resets current session timer
   */
  function reset() {
    setIsRunning(false)

    const resetTime =
      session === "focus"
        ? minutesToSeconds(config.focusMinutes)
        : minutesToSeconds(config.breakMinutes)

    setTimeLeft(resetTime)
  }

  /**
   * Updates configuration
   */
  function setConfig(newConfig: PomodoroConfig) {
    setIsRunning(false)
    setConfigState(newConfig)

    const initialTime =
      session === "focus"
        ? minutesToSeconds(newConfig.focusMinutes)
        : minutesToSeconds(newConfig.breakMinutes)

    setTimeLeft(initialTime)
  }

  /**
   * Main countdown effect
   */
  useEffect(() => {
    if (!isRunning) return

    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearTimer()
          switchSession()
          return 0
        }

        return prev - 1
      })
    }, 1000)

    return () => {
      clearTimer()
    }
  }, [isRunning])

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