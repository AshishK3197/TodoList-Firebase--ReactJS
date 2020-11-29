import React, { useState } from "react";
import "./Todo.css";
import db from "./firebase";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import {
	Button,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Modal,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	paper: {
		position: "absolute",
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

function Todo({ todoContent }) {
	const classes = useStyles();
	const [input, setInput] = useState("");
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const updateTodo = () => {
		//update the Todo
		db.collection("todos").doc(todoContent.id).set(
			{
				text: input,
			},
			{ merge: true }
		);

		setOpen(false);
	};

	return (
		<>
			<Modal open={open} onClose={handleClose}>
				<div className={classes.paper}>
					<h1>I am a modal</h1>
					<input
						placeholder={todoContent.todo}
						value={input}
						onChange={(event) => {
							setInput(event.target.value);
						}}
					/>
					<Button onClick={updateTodo}>Update Todo</Button>
				</div>
			</Modal>
			<List className="todo__list">
				<ListItemAvatar></ListItemAvatar>
				<ListItem>
					<ListItemText
						primary={todoContent.todo}
						secondary="Dummy Deadline 🕰"
					/>
				</ListItem>
				<Button onClick={handleOpen}>Update</Button>
				<DeleteForeverIcon
					onClick={() => db.collection("todos").doc(todoContent.id).delete()}
				/>
			</List>
		</>
	);
}

export default Todo;
