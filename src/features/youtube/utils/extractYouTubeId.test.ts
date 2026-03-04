import { describe, it, expect } from "vitest"
import { extractVideoOrPlaylistId } from "./extractYouTubeId"

describe("extractYouTubeId", () => {

  it("should extract video id from watch url", () => {
    const result = extractVideoOrPlaylistId(
      "https://www.youtube.com/watch?v=abc123"
    )

    expect(result.videoId).toBe("abc123")
  })

  it("should extract playlist id", () => {
    const result = extractVideoOrPlaylistId(
      "https://www.youtube.com/playlist?list=PL123"
    )

    expect(result.playlistId).toBe("PL123")
  })

})