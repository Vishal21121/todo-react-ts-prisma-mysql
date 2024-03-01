export interface User {
    id: string;
    username: string;
}

export interface CreateUserData {
    username: string;
    email: string;
    password: string;
}