export interface User {
    id: string;
    username: string;
}

export interface loginUserData {
    email: string;
    password: string;
}

export interface CreateUserData extends loginUserData {
    username: string;
}