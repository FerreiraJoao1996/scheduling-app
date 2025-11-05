export interface AuthDTO {
    id: number;
    accessToken: string;
    refreshToken: string;
    roleId: number;
    maxAge?: number;
}