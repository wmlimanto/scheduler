import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  const transition = function(newMode, replace = false) {
    setMode(newMode)
    setHistory(prev => 
      replace ?
      [...prev.slice(0,-1), newMode]
      :
      [...prev, newMode]
      )
  }

  const back = function() {
    const newHistory = [...history]
    newHistory.pop()
    setHistory(newHistory)
    newHistory.length > 1
    ? setMode(newHistory[newHistory.length -1])
    : setMode(initial)
  }

  return { mode, transition, back };
}