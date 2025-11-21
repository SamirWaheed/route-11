//1_Convert the string "123" to a number and add 7

function convertSTRIntoNum(userString, num) {
    let newNumber = Number(userString);
    return newNumber + num;
}
// console.log(convertSTRIntoNum("123", 7));

/////__________________________///////
//2.  Check if the given variable is falsy and return "Invalid" if it is

function isInvalid(data) {
    if (!data) {
        return "Invalid";
    } else {
        return "Valid"
    }
}
// console.log(isInvalid("0")) ;
// console.log(isInvalid(0))  ;

/////__________________________///////
// 3.  Use for loop to print all numbers between 1 and 10, skipping even numbers 


function oddNums(arrNum) {
    let oddArr = [];
    for (let i = 0; i < arrNum.length; i++) {
        if (arrNum[i] % 2 === 0) {
            continue;
        }
        oddArr.push(arrNum[i]);
    }
    return oddArr;
}
// console.log(oddNums([1,2,3,4,5,6,7,8,9,10]))

/////__________________________///////
// 4.  Create an array of numbers and return only the even numbers 

function evenNums(arrayNumber) {
    let even = arrayNumber.filter((num) => {
        return num % 2 === 0;
    })
    return even;
}
// console.log(evenNums([1,2,3,4,5,6,7,8,9,10]));

/////__________________________///////
// 5-Use the spread operator to merge two arrays
function mergeArr(arr_1, arr_2) {
    let mergedArray = [...arr_1, ...arr_2];
    return mergedArray;
}
// console.log(mergeArr([1,2,3],[4,5,6]));

/////__________________________///////
// 6-Use a switch statement to return the day of the week given a number 

function returnDay(num) {
    switch (num) {
        case 1:
            return "SaturDay";
        case 2:
            return "Sunday";
        case 3:
            return "Monday";
        case 4:
            return "Tuesday";
        case 5:
            return "Wednesday";
        case 6:
            return "Thursday";
        case 7:
            return "FriDay";
        default:
            console.log("Invalid Number")
    }
};
//  console.log(returnDay(6));

/////__________________________///////
// 7-Create an array of strings and return their lengths using map 

function itmLen(arr) {
    function returnLen(item) {
        return item.length;
    }
    let newArr = arr.map(returnLen);
    return newArr;
};
//console.log(itmLen(["a", "ab", "abc"] ));

/   ////__________________________///////
//8- Write a function that checks if a number is divisible by 3 and 5


function checkDiv(number) {
    if (number % 3 === 0 &&
        number % 5 === 0) {
        return `${number} : Divisible by both `
    } else if (number % 3 === 0) {
        return `${number} : Divisible by 3 `
    } else if (number % 5 === 0) {
        return `${number} : Divisible by 5 `
    }
    return `${number} : Not  divisible by both `

}
//console.log(checkDiv(15));

                            /////__________________________///////

// 9.Write a function using arrow syntax 

let sqrNum = (number) => {
    return Math.pow(number, 2);
};
//console.log(sqrNum(4));

/////__________________________//////
// 10. Write a function that destructures an object 

function destructing({
    name,
    age = 0
}) {
    return `${name} is ${age} years old `;
}
let person = {
    name: "Sameer",
    age: 24,
    address: "any place",
    phone_number: "015485",

}
// console.log(destructing(person));

/////__________________________///////
// 11. Write a function that accepts multiple parameters


function sumNums(...num) {
    let total = 0;
    for (let i of num) {
        total += i;
    }
    return Math.round(total);
};
//console.log(sumNums(100,2333,54.22))

/////__________________________///////
// 12.  Write a function that returns a promise 

function timMessage() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("success");
            reject("error");
        }, 3000);
        
    })
}
// timMessage()
//     .then(mess => {
//             console.log(mess)
//         }

//     )
//     .catch("error")

/////__________________________///////
// 13.  Write a function to find the largest number in an array. (0.5 Grade) 

function findBigger(numArr) {

    let largest = numArr[0];

    for (let num of numArr) {

        if (num > largest) {
            largest = num;
        }
    }
    return largest;
}
//console.log(findBigger([1, 3, 7, 2, 4] ))

/////__________________________///////
// 14.  Write a function that takes an object and returns an array containing only its keys
function retArr(object) {
    let key_array = [];
    for (key in object) {
        key_array.push(key);
    }
    return key_array;
}
let perInfo = {
    name: "Samir",
    age: 24,
    address: "ayMkan"
}
// console.log( retArr ( perInfo ));

        /////__________________________///////
// 15.  Write a function that splits a string into an array of words based on spaces.

function splitArr(inputArr) {
    let newArr = inputArr.split(" ");
    return newArr;
}
// console.log(splitArr("The quick brown fox"));

// essay 

/*
1-What is the difference between forEach and for...of? When would you use each? 

    - forEach : Expects synchronous function and doesn't wait promises
                because  it isn't way to stop using break or continue.
                So it doesn't efficient with async code.

    - for..of : It is contain on [break, continue, return , await],
                works with array iterative [ map ,set  string],
                the best choices with async code.

2.  What is hoisting and what is the Temporal Dead Zone (TDZ)? Explain with examples.
    
    -Hoisting : moves variable and declarations to memory before using the code.
        examples : console.log(x);
                    var x = 5       // will return undefined 
    
    -TDZ      : It is the period where a let and const take a place in memory
                but can't be used it before declarations
        
        examples : console.log (x) //  Will return initialization error
                   let x = 5 ; 

3.  What are the main differences between == and ===?
    == : checks value only.
    ===: checks value and type without type conversion .

4.  Explain how try-catch works and why it is important in async operations.
        - it works on tow stages ==> try : run code normally.
                                    catch: handles errors inside try.
        - in async code : it handles everything in one block .

5.  What’s the difference between type conversion and coercion? Provide examples of each. 

    conversion : you choose to change the type
            like : Number ("5") ==> 5 as initialization
    coercion   : JavaScript changes the type  
            like : console.log("5" + 5) ==> 55 as a string.

*/

