import { Pause, Play } from "./Player"
import { usePlayerStore } from '@/store/playerStore'
import { usePlayer } from "./usePlayer"
import { playlists, songs } from "@/lib/data"

export function CardPlayButton({ id, size = 'small' }) {
  const { currentMusic, setCurrentMusic, setIsPlaying, isPlaying } = usePlayer()
  const isPlayingPlaylist = isPlaying && currentMusic?.currentPlaylistInfo.id === id

  const handleClick = () => {
    console.log(playlists[Number(id) - 1])
    if (isPlayingPlaylist) {
      setIsPlaying(false)
      return
    }
    setCurrentMusic({
      currentPlaylistInfo: playlists[Number(id) - 1],
      currentSong: songs.filter(song => song.albumId == id)[0],
      currentPlaylistMusic: songs.filter(song=> song.albumId == id)
    })
    setIsPlaying(true)
  }

  const iconClassName = size === 'small' ? 'w-4 h-4' : 'w-5 h-5'


  return (
    <button onClick={handleClick} className="card-play-button rounded-full bg-green-500 p-4 hover:scale-105 transition hover:bg-green-400">
      {isPlayingPlaylist ? <Pause className={iconClassName} /> : <Play className={iconClassName} />}
    </button>
  )
}