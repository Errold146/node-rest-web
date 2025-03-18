import { Request, Response } from "express"

let todos = [
    { id: 1, text: 'Buy Milk', completedAt: new Date() },
    { id: 2, text: 'Buy Rice', completedAt: null },
    { id: 3, text: 'Buy Beans', completedAt: new Date() },
]

export class TodosController {

    // Dependency Injection
    constructor() {}

    public getTodos = ( req: Request, res: Response ) => {

        return res.json(todos)
    }

    public getTodoById = ( req: Request, res: Response ) => {
        const id = +req.params.id
        if ( isNaN(id) ) return res.status(400).json({ error: 'ID argument is not a number'})
        const todo = todos.find( todo => todo.id === id );
        
        ( todo ) ? res.json(todo) : res.status(404).json({ msg: `Todo with id: ${id} not found` })
    }

    public createTodo = ( req: Request, res: Response ) => {
        
        const { text } = req.body
        if ( !text ) return res.status(400).json({ error: 'Text Property is Required'})
        
        const newTodo = {
            id: todos.length + 1,
            text,
            completedAt: null
        }
        todos.push(newTodo)

        res.json(newTodo)
    }

    public updateTodo = ( req: Request, res: Response ) => {
    
        const id = +req.params.id
        if ( isNaN(id) ) return res.status(400).json({ error: 'ID argument is not a number' });
        
        const todo = todos.find(todo => todo.id === id);
        if ( !todo ) return res.status(404).json({ error: `Todo whith ID ${ id } not found` });

        const { text, completedAt } = req.body

        todo.text = text || todo.text;
        ( completedAt === null ) 
            ? todo.completedAt = null 
            : todo.completedAt = new Date( completedAt || todo.completedAt )
        res.json(todo) // Referencia
    }

    public deleteTodo = ( req: Request, res: Response ) => {
        
        const id = +req.params.id
        const initialLength = todos.length;
        todos = todos.filter(todo => todo.id !== id);

        if (todos.length === initialLength) {
            return res.status(404).json({ error: `Todo with ID ${id} not found` });
        }

        res.json({ msg: 'Delete successful...' });
    }
}