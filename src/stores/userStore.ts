import { IUser, users } from "./authStore";

export class UserStore {
    user: IUser | null = null;
    users = new Map<string, IUser>();

    get userArrays() {
        return Array.from(this.users.values());
    }

    load_users = async () => {
        users.forEach(user => {
            this.users.set(user.id, user)
        })
    }

    get_user_by_id = (id: string | null) => {
        this.user = this.userArrays.find(user => user.id === id) || null        
    }

}