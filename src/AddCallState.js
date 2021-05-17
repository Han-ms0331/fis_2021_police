import React from 'react';
import Modal from 'react-modal';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};

const AddCallState = (props) => {
	const { open, closeSave, closeCancle, uid } = props;

	return (
		<Modal isOpen={open} onRequestClose={closeCancle} style={customStyles}>
			{open ? (
				<div>
					<div>
						<span>담당자 이름: </span>
						<input type='text' placeholder='담당자 이름' />
					</div>
					<div>
						<span>연락일자: </span>
						<input type='date' placeholder='연락일자' />
					</div>
					<div>
						<span>인/아웃바운드: </span>
						<input type='text' placeholder='인/아웃바운드' />
					</div>
					<div>
						<span>담당자 이메일 주소: </span>
						<input type='text' placeholder='담당자 이메일 주소' />
					</div>
					<div>
						<span>담당자 전화번호: </span>
						<input type='text' placeholder='담당자 전화번호' />
					</div>
					<div>
						<span>시설 참여 여부: </span>
						<input type='text' placeholder='시설 참여 여부' />
					</div>
					<div>
						<span>기록자 이름: </span>
						<input type='text' placeholder='기록자 이름' value={uid} />
					</div>
					<div>
						<span>특이사항: </span>
						<input type='text' placeholder='특이사항' />
					</div>
					<button onClick={closeSave}>저장</button>
					<button onClick={closeCancle}>취소</button>
				</div>
			) : null}
		</Modal>
	);
};

export default AddCallState;
