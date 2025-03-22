import { TodoEntity } from "../../entities/todoEntity";
import { TodoRepository } from "../../repositories/todoRepository";

export interface GetAllTodosUseCase {
    execute(): Promise<TodoEntity[]>
}

export class GetAllTodos implements GetAllTodosUseCase {

    constructor(
        private readonly repository: TodoRepository
    ) { }

    execute(): Promise<TodoEntity[]> {
        return this.repository.getAll()
    }

}