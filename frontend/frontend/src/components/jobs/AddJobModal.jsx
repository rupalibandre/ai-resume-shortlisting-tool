import Modal from "../modals/Modal";
import JobForm from "../forms/JobForm";

function AddJobModal({ isOpen, onClose, onSave }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Job"
    >
      <JobForm
        onSave={onSave}
        onClose={onClose}
      />
    </Modal>
  );
}

export default AddJobModal;