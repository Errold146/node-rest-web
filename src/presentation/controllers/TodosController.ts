import { Request, Response } from "express"
import { prisma } from "../../data/postgres"
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos"

export class TodosController {

    // Dependency Injection
    constructor() {}

    public getTodos = async ( req: Request, res: Response ) => {

        const todo = await prisma.todo.findMany()
        return res.json( todo )
    }

    public getTodoById = async ( req: Request, res: Response ) => {
        const id = +req.params.id
        if ( isNaN(id) ) return res.status(400).json({ error: 'ID argument is not a number'})
        const todo = await prisma.todo.findUnique({ where: { id } });
        
        ( todo ) ? res.json(todo) : res.status(404).json({ msg: `Todo with id: ${id} not found` })
    }

    public createTodo = async ( req: Request, res: Response ) => {
        
        const [ error, createTodoDto ] = CreateTodoDto.create(req.body)
        if ( error ) return res.status(400).json({ error });

        const todo = await prisma.todo.create({
            data: createTodoDto!
        })

        res.json( todo )
    }

    public updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        const [ error, updatedTodoDto ] = UpdateTodoDto.update({
            ...req.body,
            id
        })
        if ( error ) return res.status(400).json({ error })

        const todo = await prisma.todo.findUnique({ where: { id } });
        if (!todo) return res.status(404).json({ error: `Todo with ID ${id} not found` });

        const updatedTodo = await prisma.todo.update({
            where: { id },
            data: updatedTodoDto!.values
        });

        res.json(updatedTodo); // Devuelve el registro actualizado
    };

    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' });

        const todo = await prisma.todo.findUnique({ where: { id } });
        if (!todo) return res.status(404).json({ error: `Todo with ID ${id} not found` });

        await prisma.todo.delete({ where: { id } });

        res.json({ msg: 'Delete successful...' , todo }); // Devuelve el mensaje de eliminación y el "todo" eliminado
    }
}