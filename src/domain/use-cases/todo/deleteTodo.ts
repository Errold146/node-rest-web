import { TodoEntity } from "../../entities/todoEntity";
import { TodoRepository } from "../../repositories/todoRepository";

export interface DeleteTodoUseCase {
    execute(id: number): Promise<TodoEntity>
}

export class DeleteTodo implements DeleteTodoUseCase {

    constructor(
        private readonly repository: TodoRepository
    ) { }

    execute(id: number): Promise<TodoEntity> {
        return this.repository.deleteById(id)
    }

}