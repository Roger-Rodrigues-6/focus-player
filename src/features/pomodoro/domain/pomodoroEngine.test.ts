import { describe, it, expect } from "vitest"
import {
  getNextSession,
  minutesToSeconds,
  formatTime,
} from "./pomodoroEngine"

describe("Pomodoro Engine", () => {
  it("should switch from focus to break", () => {
    expect(getNextSession("focus")).toBe("break")
  })

  it("should switch from break to focus", () => {
    expect(getNextSession("break")).toBe("focus")
  })

  it("should convert minutes to seconds correctly", () => {
    expect(minutesToSeconds(5)).toBe(300)
  })

  it("should format time correctly", () => {
    expect(formatTime(65)).toBe("01:05")
  })
})