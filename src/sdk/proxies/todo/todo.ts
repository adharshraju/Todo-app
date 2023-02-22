export interface Todo
{
    id: string;
    title: string;
    description: string | null;
    date: string | null;
    isCompleted: boolean;
    isDeleted: boolean;
    isExpired: boolean;


    update(title: string, description?: string, date?: string): Promise<void>;
    complete(): Promise<void>;
    delete(): Promise<void>;
}