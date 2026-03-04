import { useEffect, useRef } from "react"

declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
  }
}

export function useYouTubePlayer(
  onReady: (player: any) => void,
  onStateChange?: (event: any) => void
) {
  const playerRef = useRef<any>(null)
  const initializedRef = useRef(false)

  useEffect(() => {
    if (initializedRef.current) return
    initializedRef.current = true

    function createPlayer() {
      playerRef.current = new window.YT.Player("youtube-player", {
        height: "100%",
        width: "100%",
        origin: window.location.origin,
        playerVars: {
          playsinline: 1,
        },
        events: {
          onReady: (event: any) => {
            onReady(event.target)
          },
          onStateChange: (event: any) => {
            if (onStateChange) onStateChange(event)
          },
        },
      })
    }

    if (window.YT && window.YT.Player) {
      createPlayer()
      return
    }

    const tag = document.createElement("script")
    tag.src = "https://www.youtube.com/iframe_api"
    document.body.appendChild(tag)

    window.onYouTubeIframeAPIReady = () => {
      createPlayer()
    }
  }, [])

  return playerRef
}