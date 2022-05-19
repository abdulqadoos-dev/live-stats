
export const _matchPasswords = (password, confirmPassword, setState) => (password === confirmPassword ? setState(false) : setState(true));

export const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}