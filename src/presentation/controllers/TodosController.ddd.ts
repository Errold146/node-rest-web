import { Request, Response } from "express"
import { prisma } from "../../data/postgres"
import { CreateTodoDto, UpdateTodoDto,TodoRepository } from "../../domain"

export class TodosController {

    // Dependency Injection
    constructor(
        private readonly todoRepository: TodoRepository
    ){}

    public getTodos = async ( req: Request, res: Response ) => {

        const todos = await this.todoRepository.getAll()
        return res.json( todos )
    }

    public getTodoById = async ( req: Request, res: Response ) => {
        const id = +req.params.id
        if ( isNaN(id) ) return res.status(400).json({ error: 'ID argument is not a number'})
        
        try {
            const todo = await this.todoRepository.findById( id )
            res.json( todo )

        } catch (error) {
            res.status(400).json({ error })
        }
    }

    public createTodo = async ( req: Request, res: Response ) => {
        
        const [ error, createTodoDto ] = CreateTodoDto.create(req.body)
        if ( error ) return res.status(400).json({ error });

        const todo = await this.todoRepository.create( createTodoDto! )
        res.json( todo )
    }

    public updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        const [ error, updatedTodoDto ] = UpdateTodoDto.update({
            ...req.body,
            id
        })
        if ( error ) return res.status(400).json({ error })

        const updateTodo = await this.todoRepository.updateById( updatedTodoDto! )
        res.json( updateTodo )
    };

    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' });

        const deletedTodo = await this.todoRepository.deleteById( id )
        res.json( deletedTodo )
        
    }
}