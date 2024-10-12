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
			<h1 className="text-[#eee] text-4xl">Password Generator</h1>
		</>
	);
}

export default App;
