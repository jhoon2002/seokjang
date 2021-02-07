import http from "@/api/http";

export function login(userId, password) {
    return http.post('/login', {userId, password});
}