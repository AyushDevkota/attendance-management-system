import { useState } from "react";
import Login from "./Components/Login";
import classes from "./App.module.css";
import Modal from "./Components/Modal";
import ModalForm from "./Components/ModalForm";
import Success from "./Components/Success";

function App() {
	const [showModal, setShowModal] = useState(false);
	const [success, setSuccess] = useState(false);
	const [msg, setMsg] = useState("");

	return (
		<main className={classes.container}>
			<button className={classes.btn} onClick={() => setShowModal(true)}>
				submit attendance
			</button>
			{success && <Success msg={msg} />}
			<Login />
			{showModal && (
				<Modal setShowModal={setShowModal}>
					<ModalForm
						setShowModal={setShowModal}
						setSuccess={setSuccess}
						setMsg={setMsg}
					/>
				</Modal>
			)}
		</main>
	);
}

export default App;
