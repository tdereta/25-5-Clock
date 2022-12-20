import React from 'https://esm.sh/react@18.2.0'
import ReactDOM from 'https://esm.sh/react-dom@18.2.0'

const App = () => {
  const [breakCounter, setBreakCounter] = React.useState(5)
  const [sessionCounter, setSessionCounter] = React.useState(25)
  const [countDownType, setCountDownType] = React.useState('Session')
  const [timer, setTimer] = React.useState(1500)
  const [run, setRun] = React.useState(false);
  
  const breakInc = () => {
    if (breakCounter < 60) {
      setBreakCounter(breakCounter + 1)
    }
  }
  
  const breakDec = () => {
    if (breakCounter > 1) { 
      setBreakCounter(breakCounter - 1)
    }
  }
  
  const sessionInc = () => {
    if(sessionCounter < 60) {
      setSessionCounter(sessionCounter + 1)
      setTimer(timer + 60)
    }
  }
  
  const sessionDec = () => {
    if(sessionCounter > 1) {
      setSessionCounter(sessionCounter - 1)
      setTimer(timer - 60)
    }
  }
  
  const reset = () => {
  clearTimeout(countDown)
  setRun(false)
  setBreakCounter(5)
  setSessionCounter(25)
  setTimer(1500)
  setCountDownType('Session')
  const beep = document.getElementById('beep')
  beep.pause()
  beep.currentTime = 0
}
  
  const timerFormat = () => {
  const minutes = Math.floor(timer / 60)
  const seconds = timer - minutes * 60
  const minutesFormat = minutes < 10 ? '0' + minutes : minutes
  const secondsFormat = seconds < 10 ? '0' + seconds : seconds
  return `${minutesFormat}:${secondsFormat}`
}
  
   const countDown = setTimeout(() => {
    if(timer && run) {
      setTimer(timer - 1)
    }
  }, 1000)
  
const goTimer = () => {
    clearTimeout(countDown)
    setRun(false)
    if (run) {
      setRun(false)
    } else {
      setRun(true)
    }
  }
  
  const breakLength = () => {
    const beep = document.getElementById('beep')
      if (!timer && countDownType === 'Session') {
        setTimer(breakCounter * 60)
        setCountDownType('Break')
        beep.play()
      }
    
      if (!timer && countDownType === 'Break') {
        setTimer(sessionCounter * 60)
        setCountDownType('Session')
        beep.pause()
        beep.currentTime = 0;
    }
}
  
  const bothTimers = () => {
    if(run) {
      countDown
      breakLength()
    } else {
      clearTimeout(countDown)
    }
  }
  
  React.useEffect(() => {
    bothTimers()
  }, [run, countDown, setTimer])
  
const label = countDownType === 'Session' ? 'Session' : 'Break'

  return (
    <div id="wrapper">
      <h2>25 + 5 Clock</h2>
      <div className="length">
        <div className="break">
          <h3 id="break-label">Break Length</h3>
          <div className="buttons">
            <button id="break-increment" onClick={() => breakInc()}>+</button>
            <div id="break-length">{breakCounter}</div>
            <button id="break-decrement" onClick={() => breakDec()}>-</button>
          </div>  
        </div>
        <div className="break">
          <h3 id="session-label">Session Length</h3>
          <div className="buttons">
            <button id="session-increment" onClick={() => sessionInc()}>+</button>
            <div id="session-length">{sessionCounter}</div>
            <button id="session-decrement" onClick={() => sessionDec()}>-</button>
          </div>
        </div>
      </div>
      <div id="session">
        <div className="timer">
          <h3 id="timer-label">{label}</h3>
          <h4 id="time-left">{timerFormat()}</h4>
        </div>
        <div className="start-stop-reset">
          <button id="start_stop" onClick={goTimer}>Start/Stop</button>
          <button id="reset" onClick={reset}>Reset</button>
        </div>
      </div>
      <audio id="beep" preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" />
    </div>
  )
 }
ReactDOM.render(<App />, document.getElementById('root'))