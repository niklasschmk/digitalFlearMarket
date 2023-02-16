declare module 'express-session' {
    interface Session {
        isLoggedIn: boolean;
        role: string;
        username: string;
    }
}
export {};
