import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import Select from "react-select";

export default function Create({ bookTypes, className = '' }) {

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        name: '',
        book_type: '',
        shelf: ''
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('book.store'));
    };

    const loadDefaultValue = (type) => {
        return bookTypes.data.find(bookType => bookType.value === type);
    }

    return (
        <section >
            <header>
                <h2 className="text-lg font-medium text-gray-900">Create Book</h2>

            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
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
                            required
                            onChange={(e) => setData('book_type', e.value)} />

                    <InputError className="mt-2" message={errors.book_type} />
                </div>

                <div>
                    <InputLabel htmlFor="shelf" value="Shelf" />

                    <TextInput
                        id="shelf"
                        className="mt-1 block w-full"
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
