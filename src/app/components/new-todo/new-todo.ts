import { Component, inject } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { TodoStore } from '../../store/todo.store'
import { LucideAngularModule, FilePlus } from 'lucide-angular'

@Component({
	selector: 'app-new-todo',
	imports: [FormsModule, LucideAngularModule],
	templateUrl: './new-todo.html',
	styleUrl: './new-todo.scss',
})
export class NewTodo {
	protected readonly todoStore = inject(TodoStore)

	readonly FilePlusIcon = FilePlus

	newTitle = ''

	newTodo(title: string) {
		this.todoStore.addTodo(title)
	}
}
