import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useReviewService from '../../services/ReviewService';
import { Button } from '@mui/material';
import './deleteConfirmed.scss';

function DeleteConfirmationModal({ onDelete, onClose }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <p>Вы уверены, что хотите удалить этот отзыв?</p>
        <Button variant="contained" size="medium" type="submit" onClick={() => onDelete()}>Да</Button>
        <Button variant="contained" size="medium" type="submit" onClick={() => onClose()}>Нет</Button>
      </div>
    </div>
  );
}

function DeleteConfirmed() {
  const [showModal, setShowModal] = useState(true);

  const {deleteReview} = useReviewService();

  const navigate = useNavigate();

  const {reviewId} = useParams();

  const handleDelete = async e => {
    await deleteReview({reviewId});
    setShowModal(false);
    navigate(`/administrator`)
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate(`/administrator`)
  };

  return (
    <div>
      {showModal && (
        <DeleteConfirmationModal
          onDelete={handleDelete}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default DeleteConfirmed;
 