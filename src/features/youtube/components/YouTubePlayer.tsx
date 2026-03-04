import { useEffect, useRef, useState } from "react"
import { useYouTubePlayer } from "../hooks/useYouTubePlayer"
import { extractVideoOrPlaylistId } from "../utils/extractYouTubeId"

interface Props {
  url: string
  shouldPlay: boolean
}

export function YouTubePlayer({ url, shouldPlay }: Props) {
  const [player, setPlayer] = useState<any>(null)
  const currentUrlRef = useRef<string | null>(null)
  const shouldPlayRef = useRef(false)

  shouldPlayRef.current = shouldPlay

  useYouTubePlayer(
    (ytPlayer) => {
      setPlayer(ytPlayer)
    },
    (event) => {
      // When media is ready (CUED state = 5)
      if (event.data === 5 && shouldPlayRef.current) {
        event.target.playVideo()
      }
    }
  )

  useEffect(() => {
    if (!player) return

    if (!url) {
      player.stopVideo()
      currentUrlRef.current = null
      return
    }

    if (currentUrlRef.current === url) return

    currentUrlRef.current = url

    const { videoId, playlistId } = extractVideoOrPlaylistId(url)

    player.stopVideo()

    if (playlistId) {
      player.cuePlaylist({ list: playlistId, index: 0 })
    } else if (videoId) {
      player.cueVideoById(videoId)
    }
  }, [url, player])

  useEffect(() => {
    if (!player) return

    if (!shouldPlay) {
      player.pauseVideo()
    }
  }, [shouldPlay, player])

  return (
    <div className="w-full aspect-video rounded-xl overflow-hidden bg-black">
      <div id="youtube-player" className="w-full h-full" />
    </div>
  )
}