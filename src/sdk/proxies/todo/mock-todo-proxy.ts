import { Todo } from "./todo";
import { given } from "@nivinjoseph/n-defensive";


export class MockTodoProxy implements Todo
{
    private readonly _id: string;
    private _title: string;
    private _description: string | null;
    private _date: string | null;
    private _isCompleted: boolean;
    private _isDeleted: boolean;



    public get id(): string { return this._id; }
    public get title(): string { return this._title; }
    public get description(): string | null { return this._description; }
    public get date(): string | null { return this._date; }
    public get isCompleted(): boolean { return this._isCompleted; }
    public get isDeleted(): boolean { return this._isDeleted; }
    public get isExpired(): boolean
    {
        if (this._date != null && !this._isCompleted)
        {
            if (new Date(this._date).getTime() <= new Date().getTime())   
            {
                return true;
            }
        }
        return false;
    }


    public constructor(id: string, title: string, description?: string, date?: string)
    {
        given(id, "id").ensureHasValue().ensureIsString();
        this._id = id.trim();

        given(title, "title").ensureHasValue().ensureIsString();
        this._title = title;

        given(description as string, "description").ensureIsString();
        this._description = description || null;

        given(date as string, "date").ensureIsString();
        this._date = date || null;

        this._isCompleted = false;
        this._isDeleted = false;
    }


    public async update(title: string, description?: string, date?: string): Promise<void>
    {
        given(title, "title").ensureHasValue().ensureIsString();
        given(description as string, "description").ensureIsString();
        given(date as string, "date").ensureIsString();

        this._title = title.trim();
        this._description = description ? description.trim() : null as any;
        this._date = date ? date : null as any;
    }

    public async complete(): Promise<void>
    {
        given(this, "this").ensure(t => !t._isCompleted, "completing Todo that is already complete");

        this._isCompleted = true;
    }

    public async delete(): Promise<void>
    {
        given(this, "this").ensure(t => !t._isDeleted, "deleting Todo that is already deleted");

        this._isDeleted = true;
    }
}