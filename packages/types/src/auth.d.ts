export interface LoginRequest {
    email: string;
    password: string;
}
export interface RegisterRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}
export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: UserDto;
}
export interface UserDto {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    avatarUrl?: string;
    locale: string;
    timezone: string;
}
export interface RefreshTokenRequest {
    refreshToken: string;
}
export interface JwtPayload {
    sub: string;
    email: string;
    iat: number;
    exp: number;
}
export interface TwoFactorSetupResponse {
    secret: string;
    qrCode: string;
}
export interface TwoFactorVerifyRequest {
    token: string;
}
