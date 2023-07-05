import { createPortal } from 'react-dom';
import TimerForm from '../TimerForm/TimerForm';

const ModalWindow = function ({ timerId, timerData }) {
  console.log(timerId, timerData);

  return <TimerForm modal={true} timerId={timerId} timerData={timerData} />;
};

const Modal = function ({ timerData, timerId }) {
  console.log(document.getElementById('modal-root'));

  return (
    <>
      {createPortal(
        <ModalWindow
          timerId={timerId}
          timerData={{
            hours: timerData.hours,
            minutes: timerData.minutes,
            seconds: timerData.seconds,
            timerName: timerData.timerName,
            closeModal: timerData.closeModal,
          }}
        />,
        document.getElementById('modal-root')
      )}
      {createPortal(
        <div onClick={timerData.closeModal} className='blur' />,
        document.getElementById('overlay-root')
      )}
    </>
  );
};

export default Modal;
