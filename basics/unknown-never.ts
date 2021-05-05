let userInput: unknown; // in this case 'unknown' is better than 'any type'
let userName: string;

userInput = 'hdfjgalg';
userInput = 5;

if (typeof userInput === 'string') {
    userName = userInput;
}

function generateError (message: string, code: number): never {
    throw {
        message, errorCode: code
    }
   // while (true) {} 2 way when 'never' can be used
}
generateError("This is the error", 500);