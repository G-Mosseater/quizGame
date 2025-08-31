import { useState, useEffect } from "react";
//setting the timer duration through a prop to be configurable

export default function QuestionTimer({ timeout, onTimeout, mode }) {
  //timeout is the time value
  const [remainingTime, setRemainingTime] = useState(timeout);

  //when updating the remaining time the component gets executed again
  // useEffect for setTimeout so we ont end up with multiple timers
  useEffect(() => {
    console.log('setting timeout')
   const timer =  setTimeout(onTimeout, timeout);
    return () => {
        clearTimeout(timer)
    }
  }, [timeout, onTimeout]); //if timeout or onTimeout changes, re-execute the function

  // use effect to make sure the set interval is not executet all the time and avoid a infinite loop
  useEffect(() => {
        console.log('setting interval')

    // update the state every 100ms for the progress bar to load
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingtime) => prevRemainingtime - 100);
    }, 100);
    // clean un function or the progressbar wont work properly
    return () => {clearInterval(interval)}
  }, []); //prop or state values as a dependancy array (we have none)

  return <progress id="question-time" max={timeout} value={remainingTime}  className={mode}/>; //max value is the timeout value, the current value is the remaining time
} // set remaining time is 'timeout' but it decreases while time expires
