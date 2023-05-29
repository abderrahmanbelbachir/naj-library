import {useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import { useForm } from '@inertiajs/react';

export default function DeleteBook({book, className = '' }) {
    const [confirmingBookDeletion, setConfirmingBookDeletion] = useState(false);

    const {
        delete: destroy,
        processing,
        reset,
    } = useForm({});

    const confirmBookDeletion = () => {
        setConfirmingBookDeletion(true);
    };

    const deleteBook = (e) => {
        e.preventDefault();

        destroy(route('book.destroy', book.id), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingBookDeletion(false);
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>

            <DangerButton onClick={confirmBookDeletion} className="inline-block">Delete</DangerButton>

            <Modal show={confirmingBookDeletion} onClose={closeModal}>
                <form onSubmit={deleteBook} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Are you sure you want to delete the book <strong>{book.name}</strong> ?
                    </h2>


                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                        <DangerButton className="ml-3" disabled={processing}>
                            Delete Book
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
