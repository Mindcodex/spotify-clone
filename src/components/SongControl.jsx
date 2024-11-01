import { useEffect, useState } from "react"
import { Slider } from "./Slider"
import { usePlayer } from "./usePlayer"

export const SongControl = ({ audio }) => {
    const {currentTime} = usePlayer()
  
  
    const formatTime = time => {
      if (time == null) return `0:00`
  
      const seconds = Math.floor(time % 60)
      const minutes = Math.floor(time / 60)
  
      return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }
  
    const duration = audio?.current?.duration ?? 0
  
    return (
      <div className="flex gap-x-3 text-xs pt-2">
        <span className="opacity-50 w-12 text-right">{formatTime(currentTime)}</span>
  
        <Slider
          value={[currentTime]}
          max={audio?.current?.duration ?? 0}
          min={0}
          className="w-[518.39px]"
          onValueChange={(value) => {
            const [newCurrentTime] = value
            audio.current.currentTime = newCurrentTime
          }}
        />
  
        <span className="opacity-50 w-12">
          {duration ? formatTime(duration) : '0:00'}
        </span>
      </div>
    )
  }