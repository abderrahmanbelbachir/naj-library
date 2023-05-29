import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import Select from "react-select";

export default function Update({ book, bookTypes }) {

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: book.name,
        book_type: book.book_type,
        shelf: book.shelf
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('book.update' , book.id));
    };

    const loadDefaultValue = (type) => {
        console.log('load default value : ' , type);
        return bookTypes.data.find(bookType => bookType.value === type);
    }

    return (
        <section >
            <header>
                <h2 className="text-lg font-medium text-gray-900">Update Book {book.id}</h2>

            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="type" value="Book Type"/>

                    <Select id="type" options={bookTypes.data}
                            defaultValue={loadDefaultValue(book.book_type)}
                            required
                            onChange={(e) => setData('book_type', e.value)} />

                    <InputError className="mt-2" message={errors.book_type} />
                </div>

                <div>
                    <InputLabel htmlFor="shelf" value="Shelf" />

                    <TextInput
                        id="shelf"
                        className="mt-1 block w-full"
                        value={data.shelf}
                        onChange={(e) => setData('shelf', e.target.value)}
                        required
                        isFocused
                        autoComplete="shelf"
                    />

                    <InputError className="mt-2" message={errors.shelf} />
                </div>



                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
