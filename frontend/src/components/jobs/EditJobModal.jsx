import Modal from "../modals/Modal";
import JobForm from "../forms/JobForm";

function EditJobModal({
  isOpen,
  onClose,
  selectedJob,
  onUpdate,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Job"
    >
      <JobForm
        initialData={selectedJob}
        onSave={onUpdate}
        onClose={onClose}
      />
    </Modal>
  );
}

export default EditJobModal;
