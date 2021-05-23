import React, { Dispatch, ReactNode } from 'react';
import { Modal, Button } from '@material-ui/core';
import "../scss/component/_modal.scss";

type Props = {
	open: boolean;
	setOpen : Dispatch<boolean>;
	title : string;
	children : ReactNode;
	button? : string;
}

const ModalComponent = ({open, setOpen, title, children, button} : Props) => {
	return (
		<Modal
			open={open}
			onClose={() => setOpen(false)}
			className="modal"
		>
			<div className="modal-con">
				<div className="modal-title">{title}</div>
				{
					button &&
					<Button className="modal-button" variant="contained" color="primary">{button}</Button>
				}
				<div className="modal-content">
					{children}
				</div>
			</div>
		</Modal>
	);
};

export default ModalComponent;