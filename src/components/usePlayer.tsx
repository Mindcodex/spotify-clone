"use client"
import { usePlayerStore } from "@/store/playerStore"
import { useEffect, useRef } from "react";


export const usePlayer = () => {
    const {currentMusic, isPlaying, setIsPlaying, setCurrentMusic, volume, setVolume, songIndex, setIsRepeat, isRepeat, isRepeatOne, setSongIndex, setIsRepeatOne, currentTime, setCurrentTime} = usePlayerStore((state) => state)
    const { currentSong, currentPlaylistInfo, currentPlaylistMusic } = currentMusic
    const previousVolumeRef = useRef(volume)
    const isVolumeSilenced = volume < 0.1
    const audioRef = useRef<HTMLAudioElement>(null)
    const duration: number = audioRef?.current?.duration ?? 0

    const play = () => {
        setIsPlaying(!isPlaying)
    }
    const handleClickVolume = () => {
        if (isVolumeSilenced) {
            setVolume(previousVolumeRef.current)
        } else {
            previousVolumeRef.current = volume
            setVolume(0)
        }
    }
    const handleRepeat = () => {
        if (!isRepeat) setIsRepeat(true)
        if (isRepeat) setIsRepeatOne(true)
        if (isRepeat && isRepeatOne) {
            setIsRepeat(false)
            setIsRepeatOne(false)
        }
    }

    const forward = () => {
        console.log(songIndex)
        if (!currentSong || !currentPlaylistMusic) return;

        if (songIndex < currentPlaylistMusic.length - 1 && !isRepeatOne) {
            setCurrentMusic({
                currentSong: currentPlaylistMusic[songIndex + 1],
                currentPlaylistInfo,
                currentPlaylistMusic
            });
            setSongIndex(songIndex + 1);
            setIsPlaying(true);
            return;
        }
        if (audioRef.current && !isRepeat) {
            setCurrentMusic({
                currentSong: currentPlaylistMusic[0],
                currentPlaylistInfo,
                currentPlaylistMusic,
            });
            setIsPlaying(false);
            audioRef.current.currentTime = 0;
            return;
        }

        if (!isRepeatOne && isRepeat) {
            setCurrentMusic({
                currentSong: currentPlaylistMusic[0],
                currentPlaylistInfo,
                currentPlaylistMusic
            });
            setIsPlaying(true);
            setSongIndex(0)
            return;
        }
        setCurrentMusic({
            currentSong: currentPlaylistMusic[songIndex],
            currentPlaylistInfo,
            currentPlaylistMusic
        });
    };
    const backward = () => {
        if (currentSong && currentPlaylistMusic && songIndex > 0 && currentTime < 5) {
            setCurrentMusic(
                {
                    currentSong: currentPlaylistMusic[songIndex - 1],
                    currentPlaylistInfo,
                    currentPlaylistMusic
                }
            )
            setSongIndex(songIndex - 1)
            setIsPlaying(true)
        }
        else {
            if (currentSong && currentPlaylistMusic) {
                setCurrentMusic(
                    {
                        currentSong: currentPlaylistMusic[songIndex],
                        currentPlaylistInfo,
                        currentPlaylistMusic
                    }
                )
                setSongIndex(songIndex - 1)
                setIsPlaying(true)
            }
        }

    }

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime)
        }

    }

    useEffect(() => {
        isPlaying ?
            audioRef.current?.play() :
            audioRef.current?.pause()
    }, [isPlaying, songIndex])

    useEffect(() => {
        if (currentSong && audioRef.current && isPlaying) {
            const src = `/music/${currentPlaylistInfo?.id}/0${currentSong.id}.mp3`
            audioRef.current.src = src ?? "/music/01/01.mp3"
            audioRef.current.volume = volume
            audioRef.current.play()
            if (currentSong) setSongIndex(currentSong?.id - 1)
        }
    }, [currentMusic])

    useEffect(() => {
        if (audioRef.current) audioRef.current.addEventListener('timeupdate', handleTimeUpdate)

        return () => {
            if (audioRef.current) audioRef.current.removeEventListener('timeupdate', handleTimeUpdate)
        }
    }, [])

    useEffect(() => {
        if (audioRef.current) audioRef.current.volume = volume
    }, [volume])

    useEffect(() => {
        if (audioRef && currentTime == audioRef.current?.duration) {
            forward()
        }
    }, [currentTime])



    return {
        play,
        forward,
        backward,
        isVolumeSilenced,
        handleClickVolume,
        handleRepeat,
        audioRef,
        songDuration: duration,
        currentTime,
        currentMusic,
        isPlaying,
        currentPlaylistInfo,
        currentSong,
        volume,
        setVolume,
        isRepeat,
        isRepeatOne,
        setCurrentMusic,
        setIsPlaying,
        setCurrentTime,
        setSongIndex

    }
}