//this is optional file used for hashing the password


import bcrypt from 'bcrypt';

const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (err) {
        throw new Error('Error hashing password');
    }
};

const comparePassword = async (password, hashed) => {
    try {
        const isMatch = await bcrypt.compare(password, hashed);
        return isMatch;
    } catch (err) {
        throw new Error('Error comparing passwords');
    }
};

export { hashPassword, comparePassword };