import { usePlayer } from "./usePlayer"
import { playlists, type Song } from "@/lib/data"
import { useState } from "react";
interface Props {
  songs: Song[]
  listId: string
}
const Time = () => <svg
  role="img"
  height="16"
  width="16"
  viewBox="0 0 16 16"
  fill="currentColor"

><path
  d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"
></path><path
  d="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25z"
></path></svg>;

const Play = () => <svg role="img" viewBox="0 0 24 24" width={24} fill="currentColor"
>
  <path fill="currentColor" d="M8 5.14v14l11-7-11-7z"></path>
  </svg>;
export const Pause = () => (
  <svg  role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor"><path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path></svg>
)


export const MusicTable = ({ songs, listId }: Props) => {

  const { isPlaying, setCurrentMusic, setIsPlaying, currentMusic } = usePlayer()
  const { currentSong, currentPlaylistInfo } = currentMusic

  const songIndex = currentSong?.id ?? 0
  const handleClick = (i: number) => {
    if (songIndex - 1 == i && currentPlaylistInfo?.albumId == Number(listId)) {
      setIsPlaying(!isPlaying)
      return
    }
    setCurrentMusic({
      currentSong: songs[i],
      currentPlaylistMusic: songs,
      currentPlaylistInfo: playlists[Number(listId) - 1]
    })
    setIsPlaying(true)
  }
  return (

    <table className="table-auto text-left min-w-full divide-y divide-gray-500/20">
      <thead className="">
        <tr className="text-zinc-400 text-sm">
          <th className="px-4 py-2 font-light">#</th>
          <th className="px-4 py-2 font-light">Título</th>
          <th className="px-4 py-2 font-light">Álbum</th>
          <th className="px-4 py-2 font-light"><Time /></th>
        </tr>
      </thead>

      <tbody>
        <tr className="h-[16px]"></tr>
        {
          songs.map((song, index) => (
            <tr className="border-spacing-0 text-gray-300 text-sm font-light hover:bg-white/10 overflow-hidden transition duration-300 group" key={index}>
              <td className="px-2 py-2 rounded-tl-lg rounded-bl-lg w-5">
                <button className=" hidden group-hover:block" onClick  = {()=> handleClick(index)} >
                  {isPlaying && songIndex - 1 == index? <Pause />: <Play/>}
                </button>
                <span className="group-hover:hidden w-6 block text-center">
                  {index + 1}
                </span>
              </td>
              <td className="px-4 py-2 flex gap-3">
                <picture className="">
                  <img src={song.image} alt={song.title} className="w-11 h-11" />
                </picture>
                <div className="flex flex-col">
                  <h3 className={`text-white text-base font-normal ${isPlaying && songIndex - 1 == index? "text-green-500": "text-white"}`}>{song.title}</h3>
                  <span>{song.artists.join(", ")}</span>
                </div>
              </td>
              <td className="px-4 py-2">{song.album}</td>
              <td className="px-4 py-2 rounded-tr-lg rounded-br-lg">{song.duration}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}
