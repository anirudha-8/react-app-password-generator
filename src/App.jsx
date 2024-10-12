import { useCallback, useState } from "react";
import "./App.css";

function App() {
	const [length, setLength] = useState(8);
	const [numberAllowed, setNumberAllowed] = useState(false);
	const [charAllowed, setCharAllowed] = useState(false);
	const [password, setPassword] = useState("");

	const passwordGenerator = useCallback(() => {
		let pass = "";

		let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

		if (numberAllowed) str += "01234567890";

		if (charAllowed) str += "!@#$%^&*()-_=+[]{}~|<>?/";

		for (let i = 0; i < length; i++) {
			let charIndex = Math.floor(Math.random * str.length + 1);
			pass = str.charAt(charIndex);
		}
		setPassword(pass);
	}, [length, numberAllowed, charAllowed, setPassword]);

	return (
		<>
			<div className="w-full max-w-xl mx-auto my-8 px-4 py-3 text-[#eee] bg-gray-800 rounded-lg shadow-md">
				<h1 className="text-3xl text-center mb-4">
					Password Generator
				</h1>
				<div className="shadow rounded flex overflow-hidden mb-4">
					<input
						type="text"
						name="password"
						id="password"
						value={password}
						className="outline-none w-full px-3 py-2"
						placeholder="password will be generated here..."
						readOnly
					/>
					<button className="outline-none bg-blue-500 px-4 py-3 shrink-0 hover:bg-blue-600">
						COPY
					</button>
				</div>
			</div>
		</>
	);
}

export default App;
