import { CreateTodoDto, UpdateTodoDto } from "../dtos";
import { TodoEntity } from "../entities/todoEntity";

export abstract class TodoDataSource {
    
    abstract create( createTodoDto: CreateTodoDto ): Promise<TodoEntity>
    abstract getAll(): Promise<TodoEntity[]> // Todo: recibir una paginación
    abstract findById( id: number ): Promise<TodoEntity>
    abstract updateById( updateTodoDto: UpdateTodoDto ): Promise<TodoEntity>
    abstract deleteById( id: number ): Promise<TodoEntity>
}