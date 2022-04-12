
export const _matchPasswords = (password, confirmPassword, setState) => (password === confirmPassword ? setState(false) : setState(true));