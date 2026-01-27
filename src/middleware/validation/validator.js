const validator = {
    
            blogTitle: (val) => {
                if (typeof val !== "string") return {
                    valid: false,
                    msg: "Blog title must be a string"
                };
                if (val.trim().length < 3) return {
                    valid: false,
                    msg: "Blog title must be at least 3 characters"
                };
                return {
                    valid: true
                };
            },
            content: (val) => {
                if (typeof val !== "string") return {
                    valid: false,
                    msg: "Content must be a string"
                };
                const len = val.trim().length;
                if (len < 20) return {
                    valid: false,
                    msg: "Content must be at least 20 characters"
                };
                if (len > 712) return {
                    valid: false,
                    msg: "Content must be at most 712 characters"
                };
                return {
                    valid: true
                };
            },
            userName: (val) => {
                if (typeof val !== "string") return {
                    valid: false,
                    msg: "Username must be a string"
                };
                if (val.trim().length < 3) return {
                    valid: false,
                    msg: "Username must be at least 3 characters"
                };
                return {
                    valid: true
                };
            },


        userEmail: (emailValue) => {
            const emailPatter = /^[^\s@]+@[^\s@]+(\.[a-zA-Z]{2,})$/;
            const isEmailValid = emailPatter.test(emailValue);
            if (!isEmailValid) 
                return {
                    valid: false,
                    msg: "Email Not Matched"
                };
            return {valid : true};

        },

        userPassword: (pass) => {

            const passPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$%*&^]).{8,}$/;
            const isPassValid = passPattern.test(pass);
            if (!isPassValid) 
                return {
                    valid: false,
                    msg: "Password Not Matched"
                };
                return {valid : true}
        },

        userGender: (genderValue) => {

            const allowedGender = ['male', 'female'];
            const checkGender = allowedGender.includes(genderValue);
            if (!checkGender) 
                return {
                    valid: false,
                    msg: "Invalid gender"
                };
            return {valid : true}

        },

        userDateOfBirth: (date) => {
            const datePattern = /^\d{4}-\d{2}-\d{2}$/;
            const isValidDate = datePattern.test(date);
           if (!isValidDate) 
                return {
                    valid: false,
                    msg: "date Not Matched: yyyy-mm-dd"
                };
           return {valid : true}
        }
}



export function validSignup(body) {
    const inputs = {
        ...body
    }
    const requiredFields = ['userName', 'userEmail', 'userPassword', 'userGender', 'userDateOfBirth']

    const isEmpty = requiredFields.filter((field) => {
        return !inputs[field]
    });

    if (isEmpty.length > 0) {
        const error = new Error(`Missing Required Data ${isEmpty.join(', ')}`);
        error.statusCode = 400;
        throw error

    };

    for (const field of requiredFields) {
        const value = inputs[field];
        const {valid,msg} = validator[field](value);
        if (!valid) {   
            const error = new Error(msg);
            error.statusCode = 400;
            throw error
        }
    }
}

export function validLogin(body) {
    const inputs = {
        ...body
    }
    const requiredFields = ['userEmail', 'userPassword']

    const isEmpty = requiredFields.filter((field) => {
        return !inputs[field]
    });

    if (isEmpty.length > 0) {
        const error = new Error(`Missing Required Data ${isEmpty.join(', ')}`);
        error.statusCode = 400;
        throw error

    };

    for (const field of requiredFields) {
        const value = inputs[field];
        const {valid,msg} = validator[field](value);
        if (!valid) {   
            const error = new Error(msg);
            error.statusCode = 400;
            throw error
        }
    }
}


export function validUpdate(body) {
    const inputs = {
        ...body
    };

    const allowedData = [
        'firstName',
        'midName',
        'lastName',
        'userEmail',
        'userPassword',
        'userGender',
        'userDateOfBirth',
        'userPhone'
    ];

    const filterInputs = Object.keys(inputs).filter(key =>
        allowedData.includes(key)
    );

    if (!filterInputs.length) {
        const error = new Error("Not Valid Data to Update");
        error.statusCode = 400;
        throw error;
    }

    for (const field of filterInputs) {
        const value = inputs[field];
        if (validator[field] && !validator[field](value)) {
            const error = new Error(`Invalid Data ${field}`);
            error.statusCode = 400;
            throw error;
        }
    }
}


export function validBlog(body) {
    const inputs = {
        ...body
    }
    const requiredFields = ['userName', 'blogTitle', 'content']

    const isEmpty = requiredFields.filter((field) => {
        return !inputs[field]
    });

    if (isEmpty.length > 0) {
        const error = new Error(`Missing Required Data ${isEmpty.join(', ')}`);
        error.statusCode = 400;
        throw error

    };

    for (const field of requiredFields) {
        const value = inputs[field];
        const {valid,msg} = validator[field](value);
        if (!valid) {   
            const error = new Error(msg);
            error.statusCode = 400;
            throw error
        }
    }
}

export function validUpdateOnBlog(body) {
    const inputs = {
        ...body
    }
    const requiredFields = [ 'blogTitle', 'content']

    const isEmpty = requiredFields.filter((field) => {
        return !inputs[field]
    });

    if (isEmpty.length > 0) {
        const error = new Error(`Missing Required Data ${isEmpty.join(', ')}`);
        error.statusCode = 400;
        throw error

    };

    for (const field of requiredFields) {
        const value = inputs[field];
        const {valid,msg} = validator[field](value);
        if (!valid) {   
            const error = new Error(msg);
            error.statusCode = 400;
            throw error
        }
    }
}
