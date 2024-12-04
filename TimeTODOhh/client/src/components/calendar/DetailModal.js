import React from 'react';
import Modal from 'react-modal';
import styles from './DetailModal.module.css';

Modal.setAppElement('#root');

function DetailModal({ isOpen, event, onRequestClose, onEdit }) {
    if (!event) return null;

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className={styles.modalContent}
            overlayClassName={styles.modalOverlay}
        >
            <div>
                <h2>{event.title}</h2>
                <p>
                    <strong>Start:</strong> {new Date(event.start).toLocaleString()}
                </p>
                <p>
                    <strong>End:</strong>{' '}
                    {event.end ? new Date(event.end).toLocaleString() : 'N/A'}
                </p>
                <p>
                    <strong>Description:</strong> {event.description || 'No description'}
                </p>
                <p>
                    <strong>Location:</strong> {event.location || 'No location'}
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <button onClick={onEdit} style={{ padding: '10px 20px', backgroundColor: 'green', color: 'white', borderRadius: '5px' }}>
                        Edit
                    </button>
                    <button onClick={onRequestClose} style={{ padding: '10px 20px', backgroundColor: 'red', color: 'white', borderRadius: '5px' }}>
                        Close
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default DetailModal;
