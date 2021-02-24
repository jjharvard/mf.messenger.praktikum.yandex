export interface HistoryState {
    currUri: string,
    length: number
}

export interface UserProfile {
    id: number,
    first_name: string,
    second_name: string,
    display_name?: string,
    login: string,
    avatar?: string,
    email: string,
    phone: string
}

export interface ChatData {
    id: number,
    avatar?: string,
    created_by: number,
    title: string,
    isActive: boolean
}

export interface UserData {
    id: number,
    first_name: string,
    second_name: string,
    display_name?: string,
    login: string,
    avatar?: string,
    email: string,
    phone: string,
    isActive: boolean
}

export interface MessageData {
    id: number,
    user_id: number,
    chat_id: number,
    content: string,
    time: string
}
