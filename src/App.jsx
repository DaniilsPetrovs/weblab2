import { useEffect, useState } from 'react';

import { TodoCreate, TodoFilter, TodoList } from './components';

const initialStateTodos = JSON.parse(localStorage.getItem('todos')) || [];

const App = () => {
	const [todos, setTodos] = useState(initialStateTodos);
	const [filter, setFilter] = useState('all');

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos));
	}, [todos]);

	const createTodo = (title) => {
		const newTodo = {
			id: Date.now(),
			title,
			completed: false,
		};
		setTodos([...todos, newTodo]);
	};

	const toggleTodo = (id) => {
		const newTodos = todos.map((todo) => {
			if (todo.id === id) {
				todo.completed = !todo.completed;
			}
			return todo;
		});
		setTodos(newTodos);
	};

	const deleteTodo = (id) => {
		const newTodos = todos.filter((todo) => todo.id !== id);
		setTodos(newTodos);
	};

	const updateFilter = (filter) => setFilter(filter);

	const filteredTodos = () => {
		switch (filter) {
			case 'all':
				return todos;
			case 'active':
				return todos.filter((todo) => !todo.completed);
			case 'completed':
				return todos.filter((todo) => todo.completed);
			default:
				return todos;
		}
	};

	return (
		<div className="min-h-screen bg-gray-300 dark:bg-slate-900">
			<main className="container pt-12 h-full mx-auto px-6 md:max-w-xl">
				<TodoCreate createTodo={createTodo} />
				<TodoList todos={filteredTodos()} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
				<TodoFilter filter={filter} updateFilter={updateFilter} />
			</main>
		</div>
	);
};

export default App;
