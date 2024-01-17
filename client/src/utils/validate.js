export function checkValidData (email, password){
    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    if(!isEmailValid){
        return 'Email is not valid';
    }
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    if(!isPasswordValid){
        return 'Password must contain atleast 8 letters with capital, small alphabets and numbers';
    }
    return null;
}