import { Component, inject, signal } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NgClass } from '@angular/common'
import { TodoStore } from '../../store/todo.store'
import { LucideAngularModule, Trash, SquarePen, Check } from 'lucide-angular'
import { toast } from 'ngx-sonner'

@Component({
	selector: 'app-list',
	imports: [FormsModule, LucideAngularModule, NgClass],
	templateUrl: './list.html',
	styleUrl: './list.scss',
})
export class List {
	private readonly todoStore = inject(TodoStore)

	readonly TrashIcon = Trash
	readonly SquarePenIcon = SquarePen
	readonly CheckIcon = Check

	todos = this.todoStore.filteredTodos
	editingId = signal<string | null>(null)

	toggleTodo(id: string) {
		this.todoStore.toggleTodos(id)
	}

	startEditing(id: string, inputElement: HTMLInputElement) {
		this.editingId.set(id)
		setTimeout(() => {
			inputElement.focus()
			inputElement.select()
		}, 0)
	}

	confirmEdit(id: string, title: string) {
		const todo = this.todos().find((t) => t.id === id)
		if (todo && todo.title !== title && title.trim()) {
			this.renameTodo(id, title)
			toast.success('Task updated', {
				description: 'Your task has been successfully updated.',
			})
		}
		this.editingId.set(null)
	}

	cancelEdit() {
		this.editingId.set(null)
	}

	renameTodo(id: string, title: string) {
		this.todoStore.renameTodo(id, title)
	}

	removeTodo(id: string) {
		this.todoStore.removeTodo(id)

		toast.error('Task deleted', {
			description: 'Your task has been successfully deleted.',
		})
	}

	isEditing(id: string): boolean {
		return this.editingId() === id
	}
}
