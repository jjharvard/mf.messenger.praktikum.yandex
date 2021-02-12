export interface HistoryState {
    currUri: string,
    length: number
}

export interface UserProfile {
    first_name: string,
    second_name: string,
    display_name?: string,
    login: string,
    avatar?: string,
    email: string,
    phone: string
}
