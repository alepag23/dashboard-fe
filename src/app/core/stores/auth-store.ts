import { ProfileUserType } from "../../shared/models/auth-model"


type AuthState = {
    user: ProfileUserType | null;
}