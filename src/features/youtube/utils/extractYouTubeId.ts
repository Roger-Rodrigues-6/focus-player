export function extractVideoOrPlaylistId(url: string) {
  try {
    const parsed = new URL(url)

    const videoId = parsed.searchParams.get("v")
    const playlistId = parsed.searchParams.get("list")

    return { videoId, playlistId }
  } catch {
    return { videoId: null, playlistId: null }
  }
}