import React, { useState, useEffect } from "react";

const Home = () => {
	const [input, setInput] = useState({ label: "", done: false });
	const [arrTodo, setArrTodo] = useState([]);
	const [deleteShown, setDeleteShown] = useState(null);
	const [firstRender, setFirstRender] = useState(false);

	useEffect(() => {
		getList();
	}, []);

	useEffect(() => {
		if (firstRender) {
			updateList();
		}
	}, [arrTodo]);

	const validateInputEnter = (e) => {
		const labels = arrTodo.map((e) => e.label);
		const newInput = e.target.value.trim();
		console.log(e);
		if (e.key == "Enter") {
			if (newInput != "" && !labels.includes(newInput)) {
				setArrTodo([...arrTodo, input]);
				e.target.value = "";
			} else {
				alert("No se pueden repetir tareas o introducir tareas vacias");
			}
		}
	};

	const validateInputClick = (e) => {
		const labels = arrTodo.map((e) => e.label);
		const newInput = input.label.trim();
		console.log(e);

		if (e.type == "click") {
			if (newInput != "" && !labels.includes(newInput)) {
				setArrTodo([...arrTodo, input]);
				e.target.value = "";
			} else {
				alert("No se pueden repetir tareas o introducir tareas vacias");
			}
		}
	};

	const getList = async () => {
		const Response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/ederdon",
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		const result = await Response.json();
		setArrTodo(result);
		setFirstRender(true);
	};

	const updateList = async () => {
		await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/ederdon",
			{
				method: "PUT", // or 'POST'
				body: JSON.stringify(arrTodo), // data can be a `string` or  an {object} which comes from somewhere further above in our application
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
	};

	return (
		<div className="container">
			<div className="mb-3 w-75 mx-auto">
				<label htmlFor="exampleInputEmail1" className="form-label">
					<h2 className="h2">To-dos</h2>
				</label>
				<div className="d-flex justify-content-start">
					<div className="w-75">
						{" "}
						<input
							type="text"
							className="form-control"
							value={input.label}
							onChange={(e) => {
								setInput({ ...input, label: e.target.value });
							}}
							onKeyDown={(e) => {
								validateInputEnter(e);
							}}
						/>
					</div>
					<div>
						{" "}
						<button
							type="button"
							className="btn btn-light"
							value={input.label}
							onClick={(e) => {
								validateInputClick(e);
							}}>
							Add
						</button>
					</div>
				</div>
				{arrTodo.map((e, i) => {
					if (i != 0) {
						return (
							<div
								key={i}
								className="d-flex justify-content-between"
								onMouseEnter={() => setDeleteShown(i)}
								onMouseLeave={() => setDeleteShown(null)}>
								<div className="form-control">{e.label}</div>
								<div>
									{deleteShown == i && (
										<button
											type="button"
											className="btn-close text-end"
											aria-label="Close"
											onClick={() => {
												setArrTodo(
													arrTodo.filter(
														(v, index) =>
															index !== i
													)
												);
												/* 	if (arrTodo.length == 0)
													arrTodo = [
														{ label: "", done: false },
													]; */
											}}></button>
									)}
								</div>
							</div>
						);
					}
				})}
				<div>
					{" "}
					<p className="h6">
						{" "}
						{arrTodo.length > 1
							? arrTodo.length - 1 + " items left"
							: "add something to-do"}
					</p>
				</div>
			</div>
		</div>
	);
};

export default Home;
