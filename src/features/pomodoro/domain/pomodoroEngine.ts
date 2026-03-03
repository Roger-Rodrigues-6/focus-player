export type SessionType = "focus" | "break"

/**
 * Returns the next session type
 */
export function getNextSession(current: SessionType): SessionType {
  return current === "focus" ? "break" : "focus"
}

/**
 * Converts minutes to seconds
 */
export function minutesToSeconds(minutes: number): number {
  return minutes * 60
}

/**
 * Formats seconds into mm:ss
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60

  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
}