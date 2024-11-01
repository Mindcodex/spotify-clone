import { playlists, songs, type Playlist, type Song } from "@/lib/data";
import { create } from "zustand";

interface Music {
  currentPlaylistInfo?: Playlist, 
  currentSong?: Song, 
  currentPlaylistMusic?: Song[]
}
type SongData = {
  playlistMusic:Song[]
  isPlaying: boolean,
  currentMusic: Music,
  volume: number,
  isLiked: boolean,
  isDisliked: boolean,
  isRepeat: boolean,
  isRepeatOne: boolean,
  songIndex: number,
  currentTime: number,
  setVolume: (volume:number) => void,
  setIsPlaying: (isPlaying: boolean) => void,
  setCurrentMusic: (currentMusic:Music) => void,
  setIsLiked: (isLiked:boolean) => void,
  setIsDisliked: (isDisliked:boolean) => void,
  setPlaylistMusic: (music:Song[]) => void,
  setSongIndex: (music:number) => void,
  setIsRepeat: (music:boolean) => void,
  setIsRepeatOne: (music:boolean) => void,
  setCurrentTime: (time: number) => void
}

export const usePlayerStore = create<SongData>((set) => ({

  playlistMusic: songs,
  isPlaying: false,
  currentMusic: {},
  volume: 1,
  isRepeat: false,
  isRepeatOne: false,
  currentTime: 0,
  songIndex: 0,
  isDisliked: false,
  isLiked:false,
  setIsLiked: (isLiked:boolean) => set({isLiked}),
  setIsDisliked: (isDisliked:boolean) => set({isDisliked}),
  setCurrentTime: (currentTime:number) => set({currentTime}),
  setSongIndex: (songIndex:number) => set({songIndex}),
  setRepeatOne: (isRepeatOne:boolean) => set({isRepeatOne}),
  setRepeat: (isRepeat:boolean) => set({isRepeat}),
  setVolume: (volume:number) => set({ volume }),
  setIsPlaying: (isPlaying:boolean) => set({ isPlaying }),
  setCurrentMusic: (currentMusic:Music) => set({ currentMusic }),
  setPlaylistMusic: (music:Song[]) => set({playlistMusic: music}),
  setIsRepeat: (isRepeat:boolean) => set({isRepeat}),
  setIsRepeatOne:(isRepeatOne:boolean) => set({isRepeatOne})

}))