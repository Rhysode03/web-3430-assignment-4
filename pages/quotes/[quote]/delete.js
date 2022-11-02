import { useState } from "react";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import { toast } from "react-toastify";
import { mutate, useSWRConfig } from "swr";

export default function Delete({ quote }) {
  let { mutate } = useSWRConfig();
  const [modalOpen, setModalOpen] = useState(false);
  
  async function deleteQuote() {
    fetch(`/api/quotes/${quote}`, {
      method: "DELETE"
    })
      .then((res) => {
        if (!res.ok) throw Error(res.statusText);
        mutate('/api/quotes')
        toast.success(`Successfully deleted`);
      })
      .catch((err) => {
        toast.success(`Falied to delete your quote: ${err.message}`);
      });
  }
  return (
    <>
      <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen}>
        <ModalBody>
          <p>Are you sure you want to delete this quote?</p>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setModalOpen(!modalOpen)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => [deleteQuote(), setModalOpen(!modalOpen)]}
          >
            Delete
          </button>
        </ModalFooter>
      </Modal>
      <div className="btn btn-danger" onClick={() => setModalOpen(!modalOpen)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-trash-fill"
          viewBox="0 0 16 16"
        >
          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
        </svg>
      </div>
    </>
  );
}
