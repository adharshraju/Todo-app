import { PageViewModel, template, route } from "@nivinjoseph/n-app";
import "./list-todos-view.scss"; // importing css for the template
import { inject } from "@nivinjoseph/n-ject";
import { given } from "@nivinjoseph/n-defensive";
import { TodoService } from "../../../sdk/services/todo-service/todo-service";
import { Todo } from "../../../sdk/proxies/todo/todo";
import { Routes } from "../routes";


@template(require("./list-todos-view.html")) // path to the template
@route(Routes.listTodos) // route that the page is going to be shown at
@inject("TodoService") //  dependency for this VM, this gets injected in the constructor, these dependencies are installed in client.ts
export class ListTodosViewModel extends PageViewModel
{
    private readonly _todoService: TodoService;
    private _todos: ReadonlyArray<Todo>;


    public get todos(): ReadonlyArray<Todo>
    {
        const sortedTodos = this._todos.slice().sort((a, b) =>
        {
            if (a.date && b.date)
            {
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            }
            else if (a.date)
            {
                return -1;
            }
            else
            {
                return 1;
            }
        });

        return sortedTodos.where(t => !t.isDeleted);
    } // getters used to reveal VM properties to the template


    public constructor(todoService: TodoService) // dependency getting injected
    {
        super();
        given(todoService, "todoService").ensureHasValue().ensureIsObject(); // defensive checks.
        this._todoService = todoService;
        this._todos = [];
    }


    /**
     * Life cycle methods for pages, in order of when they are called.
     */

    protected override onCreate(): void
    {
        super.onCreate();
        console.log("on Create, when the Vm is created, but the template has not been mounted in the DOM.");
    }

    protected override onMount(element: HTMLElement): void
    {
        super.onMount(element);
        console.log("onMount, when the page template is mounted on the DOM, you get the HTML element as a parameter here to manipulate it, like using Jquery for example.");
    }

    protected override onEnter(): void
    {
        super.onEnter();
        console.log("onEnter, when the page has appeared, usually used to fetch data to show on the page. The parameters for this function would be any query/path params of the url defined in the route");
        this._todoService.getTodos()
            .then(t => this._todos = t)
            .catch(e => console.log(e));
    }

    protected override onLeave(): void
    {
        super.onLeave();
        console.log("onLeave, when the user is about to leave the page.");
    }

    protected override onDestroy(): void
    {
        super.onDestroy();
        console.log("onDestroy, when the page is removed from the DOM.");
    }
}