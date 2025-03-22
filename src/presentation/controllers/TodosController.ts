import { Request, Response } from "express"
import { CreateTodoDto, UpdateTodoDto,TodoRepository, GetAllTodos, GetTodo, CreateTodo, UpdateTodo, DeleteTodo } from "../../domain"

export class TodosController {

    // Dependency Injection
    constructor(
        private readonly todoRepository: TodoRepository
    ){}

    public getTodos = ( req: Request, res: Response ) => {
        new GetAllTodos( this.todoRepository )
            .execute()
            .then( todos => res.json( todos ))
            .catch( error => res.status(400).json({ error }))
    }

    public getTodoById = ( req: Request, res: Response ) => {
        const id = +req.params.id
        if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' })
        new GetTodo( this.todoRepository )
            .execute( id )
            .then( todo => res.json( todo ))
            .catch( error => res.status(400).json({ error }))
    }

    public createTodo = ( req: Request, res: Response ) => {
        
        const [ error, createTodoDto ] = CreateTodoDto.create(req.body)
        if ( error ) return res.status(400).json({ error });

        new CreateTodo( this.todoRepository )
            .execute( createTodoDto! )
            .then( todo => res.json( todo ))
            .catch( error => res.status(400).json( error ))
    }

    public updateTodo = (req: Request, res: Response) => {
        const id = +req.params.id
        if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' })
        const [ error, updatedTodoDto ] = UpdateTodoDto.update({
            ...req.body,
            id
        })
        if ( error ) return res.status(400).json({ error })

        new UpdateTodo( this.todoRepository )
            .execute( updatedTodoDto! )
            .then( todo => res.json( todo ))
            .catch( error => res.status(400).json({ error }))
    }

    public deleteTodo = (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' })

        new DeleteTodo( this.todoRepository )
            .execute( id )
            .then( todo => res.json( todo ))
            .catch( error => res.status(400).json({ error }))
    }
}