import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createMessages} from '../../../store/messages';

export default function MessageFormModal({receiver, setShowModal}) {
    const dispatch = useDispatch();
    const [msg, setMsg] = useState("");

    const lgInUserId = useSelector((state) => state.session.user.id);

    const onSend = async function (e) {
        e.preventDefault();
        const msgOrErrors = await dispatch(
            createMessages({
                sender_id:lgInUserId,
                receiver_id: receiver.id,
                message: msg,
            })
        );
        if (!msgOrErrors.errors) {
            setMsg('');
            setShowModal(false);
        }
    };

    return (
        <form onSubmit={onSend} className='message__form-modal'>
            <h2>Message {receiver.first_name}</h2>
            <div className='message__form-modal__message-and-button'>
                <textarea 
                    value={msg}
                    onChange={(e) => {
                        setMsg(e.target.value);
                    }}
                    className='message__form-input'
                    maxLength={500}
                    rows={3}
                    required
                />
                <button type='submit' className='message__form-modal__button'>
                    <i className='fas fa-play fa-2x'></i>
                </button>
            </div>
        </form>
    );
}