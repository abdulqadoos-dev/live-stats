import {FIRST_HALF, FOURTH_HALF, MATCH_HALF, SECOND_HALF, THIRD_HALF} from "../state/constants/Constans";

export const _matchPasswords = (password, confirmPassword, setState) => (password === confirmPassword ? setState(false) : setState(true));

export const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const time = new Date();
const timeInSec = time.getSeconds() + 500
export const numberOfHalf = [
    {label: 1, value: FIRST_HALF, time: time.setSeconds(timeInSec)},
    {label: 2, value: SECOND_HALF, time: time.setSeconds(timeInSec)},
    {label: "H", value: MATCH_HALF, time: time.setSeconds(timeInSec)},
    {label: 3, value: THIRD_HALF, time: time.setSeconds(timeInSec)},
    {label: 4, value: FOURTH_HALF, time: time.setSeconds(timeInSec)}
]

