import { TodoEntity } from "../../entities/todoEntity";
import { TodoRepository } from "../../repositories/todoRepository";

export interface GetTodoUseCase {
    execute(id: number): Promise<TodoEntity>
}

export class GetTodo implements GetTodoUseCase {

    constructor(
        private readonly repository: TodoRepository
    ) { }

    execute(id: number): Promise<TodoEntity> {
        return this.repository.findById(id)
    }

}