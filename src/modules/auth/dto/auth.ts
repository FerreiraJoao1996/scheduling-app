export interface AuthDTO {
    id: string;
    accessToken: string;
    refreshToken: string;
    roleId: number;
    maxAge?: number;
}