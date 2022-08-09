import React, {useEffect} from 'react';
import {useTimer} from 'react-timer-hook';

export default function Timer({expiryTimestamp, match}) {
    const {
        seconds,
        minutes,
        start,
        pause,
        restart,
    } = useTimer({expiryTimestamp, autoStart: false, onExpire: () => console.log('onExpire called')});

    useEffect(() => {
        match?.matchDuration?.isClockStarted ? start() : pause()
    }, [match?.matchDuration])

    useEffect(() => {
        restart(match.matchDetails.activeHalfTime, false)
    }, [match?.matchDetails.activeHalfTime])

    return (
        <div>
            <span>{minutes}</span> : <span>{seconds}</span>
        </div>
    );
}
