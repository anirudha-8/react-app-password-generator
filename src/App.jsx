import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
	const [length, setLength] = useState(8);
	const [numberAllowed, setNumberAllowed] = useState(false);
	const [characterAllowed, setCharacterAllowed] = useState(false);
	const [password, setPassword] = useState("");

	const [copyBtnVal, setCopyBtnVal] = useState("COPY");

	// if something changes in the dependencies, optimize the "passwordGenerator" method.
	// main purpose -> for optimization, using memoization, add this dependencies in cache memory.
	const passwordGenerator = useCallback(() => {
		let pass = "";

		let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

		if (numberAllowed) str += "01234567890";

		if (characterAllowed) str += "!@#$%^&*()-_=+[]{}~|<>?/";

		for (let i = 0; i < length; i++) {
			let charIndex = Math.floor(Math.random() * str.length);
			pass += str.charAt(charIndex);
		}
		setPassword(pass);
	}, [length, numberAllowed, characterAllowed, setPassword]);

	// if something changes in the dependencies, re run the "passwordGenerator" method.
	// main purpose -> re-run when something changes
	useEffect(() => {
		passwordGenerator();
	}, [length, numberAllowed, characterAllowed, passwordGenerator]);

	// to copy the reference of password
	const passwordRef = useRef(null);

	// method for copy password to clipboard
	const copyPasswordToClipboard = useCallback(() => {
		passwordRef.current?.select();
		window.navigator.clipboard.writeText(password);
	}, [password]);

	return (
		<>
			<div className="w-full max-w-xl mx-auto my-8 px-4 py-3 text-[#eee] bg-gray-800 rounded-lg shadow-md">
				<h1 className="text-3xl text-center mb-4">
					Password Generator
				</h1>
				<div className="shadow rounded flex overflow-hidden mb-4 text-blue-500">
					<input
						type="text"
						name="password"
						id="password"
						value={password}
						className="outline-none w-full px-3 py-2"
						placeholder="password will be generated here..."
						readOnly
						ref={passwordRef}
					/>
					<button
						className="outline-none text-[#eee] bg-blue-500 px-4 py-3 shrink-0 hover:bg-blue-600"
						onClick={() => {
							copyPasswordToClipboard();
							setCopyBtnVal("COPIED");
							setTimeout(() => {
								setCopyBtnVal("COPY");
							}, 2000);
						}}
					>
						{copyBtnVal}
					</button>
				</div>
				<div className="flex text-md gap-x-4">
					<div className="flex items-center gap-x-1">
						<input
							type="range"
							name="range"
							id="range"
							min={6}
							max={50}
							className="cursor-pointer"
							onChange={(e) => setLength(e.target.value)}
						/>
						<label htmlFor="range" className="cursor-pointer">
							Length: {length}
						</label>
					</div>
					<div className="flex items-center gap-x-1">
						<input
							type="checkbox"
							name="numberInput"
							id="numberInput"
							defaultChecked={numberAllowed}
							className="cursor-pointer"
							onChange={() => setNumberAllowed((prev) => !prev)}
						/>
						<label htmlFor="numberInput" className="cursor-pointer">
							Number
						</label>
					</div>
					<div className="flex items-center gap-x-1">
						<input
							type="checkbox"
							name="characterInput"
							id="characterInput"
							defaultChecked={characterAllowed}
							className="cursor-pointer"
							onChange={() =>
								setCharacterAllowed((prev) => !prev)
							}
						/>
						<label
							htmlFor="characterInput"
							className="cursor-pointer"
						>
							Character
						</label>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
