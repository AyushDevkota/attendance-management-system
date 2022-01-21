import classes from "./modal.module.css";

import { AiOutlineClose } from "react-icons/ai";

const Modal = (props) => {
	return (
		<div className={classes.overlay}>
			<div className={classes.modal}>
				<AiOutlineClose
					style={{
						position: "absolute",
						top: "4%",
						right: "5%",
						fontSize: "20px",
						cursor: "pointer",
						color: "white",
					}}
					onClick={() => props.setShowModal(false)}
				/>
				{props.children}
			</div>
		</div>
	);
};

export default Modal;
