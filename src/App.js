import { useState, useEffect } from "react";
import {
	Button,
	FormControl,
	Input,
	InputLabel,
	FormHelperText,
} from "@material-ui/core";
import "./App.css";
import Todo from "./Todo";
import db from "./firebase";
import firebase from "firebase";

function App() {
	const [todos, setTodos] = useState([]);
	const [input, setInput] = useState("");

	//when the app loads up we need to fetch all the todo's from the firestore database as they get added/removed.

	useEffect(() => {
		db.collection("todos")
			.orderBy("timestamp", "desc")
			.onSnapshot((snapshot) => {
				// console.log(
				// 	snapshot.docs.map((doc) => {
				// 		return doc.data().text;
				// 	})
				// );
				//the above commented code is responsible for listening to the database and whenever there is a change just go and fetch the lastes set of todos.
				setTodos(
					snapshot.docs.map((doc) => {
						return { id: doc.id, todo: doc.data().text };
					})
				);
			});
	}, [input]);
	//everytime the page reloads useEffect fires off.
	//everytime the input changes useEffect fires off again.

	const addTodo = (event) => {
		console.log("I am working");
		setTodos([...todos, input]);
		setInput("");
		event.preventDefault();
		db.collection("todos").add({
			text: input,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});
	};

	// console.log(!todos);
	return (
		<div className="App">
			<h1>TodoList</h1>
			<form>
				<FormControl>
					<InputLabel>✅ Write a Todo</InputLabel>
					<Input
						id="my-input"
						aria-describedby="my-helper-text"
						value={input}
						onChange={(event) => {
							setInput(event.target.value);
						}}
					/>
					{/* <FormHelperText id="my-helper-text">
						We'll never share your email.
					</FormHelperText> */}
				</FormControl>

				<Button
					disabled={!input}
					type="submit"
					onClick={addTodo}
					variant="contained"
					color="primary"
				>
					Add Todo
				</Button>
				<ul>
					{todos.map((todo, index) => {
						return <Todo key={index} todoContent={todo} />;
					})}
				</ul>
			</form>
		</div>
	);
}

export default App;
