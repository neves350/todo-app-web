import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import type { Filter } from '../../models/filters.model'
import type { Observable } from 'rxjs'
import type { Todo } from '../../models/todo.model'
import { environment } from '../../../environments/environment'

export interface TodoResponse {
	data: Todo[]
	total: number
}

@Injectable({
	providedIn: 'root',
})
export class TodoApiService {
	private readonly http = inject(HttpClient)
	private readonly baseUrl = '/todos'

	listTodos(filter: Filter = 'all'): Observable<TodoResponse> {
		const url = `${environment.apiUrl}${this.baseUrl}?filter=${filter}`

		return this.http.get<TodoResponse>(url)
	}

	createTodo(title: string): Observable<Todo> {
		const url = `${environment.apiUrl}${this.baseUrl}`

		return this.http.post<Todo>(url, { title })
	}

	updateTodo(
		id: string,
		payload: Partial<Pick<Todo, 'title' | 'completed'>>,
	): Observable<Todo> {
		const url = `${environment.apiUrl}${this.baseUrl}/${id}`

		return this.http.put<Todo>(url, payload)
	}

	deleteTodo(id: string): Observable<void> {
		const url = `${environment.apiUrl}${this.baseUrl}/${id}`

		return this.http.delete<void>(url)
	}
}
