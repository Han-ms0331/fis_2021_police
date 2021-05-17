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

const AddApplyState = (props) => {
	const { open, closeSave, closeCancle, uid } = props;

	return (
		<Modal isOpen={open} onRequestClose={closeCancle} style={customStyles}>
			{open ? (
				<div>
					<div>
						<span>현장요원: </span>
						<input type='text' placeholder='현장요원' />
					</div>
					<div>
						<span>진행여부: </span>
						<input type='text' placeholder='진행여부' />
					</div>
					<div>
						<span>예상 인원: </span>
						<input type='text' placeholder='예상 인원' />
					</div>
					<div>
						<span>예약 날짜: </span>
						<input type='date' placeholder='예약 날짜' />
					</div>
					<div>
						<span>방분 예정 날짜: </span>
						<input type='date' placeholder='방분 예정 날짜' />
					</div>
					<div>
						<span>방문 예정 시간: </span>
						<input type='time' placeholder='방문 예정 시간' />
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

export default AddApplyState;
