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

  it("should keep alternating sessions", () => {
    let session = "focus"

    session = getNextSession(session)
    expect(session).toBe("break")

    session = getNextSession(session)
    expect(session).toBe("focus")

    session = getNextSession(session)
    expect(session).toBe("break")
  })

  it("should convert minutes to seconds correctly", () => {
    expect(minutesToSeconds(1)).toBe(60)
    expect(minutesToSeconds(5)).toBe(300)
    expect(minutesToSeconds(25)).toBe(1500)
  })

  it("should format time correctly", () => {
    expect(formatTime(65)).toBe("01:05")
    expect(formatTime(60)).toBe("01:00")
    expect(formatTime(0)).toBe("00:00")
  })

  it("should format seconds less than 10 correctly", () => {
    expect(formatTime(9)).toBe("00:09")
  })

})