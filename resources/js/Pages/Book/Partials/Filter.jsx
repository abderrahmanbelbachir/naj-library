import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, useForm, usePage} from '@inertiajs/react';
import Dropdown from "@/Components/Dropdown.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {Transition} from "@headlessui/react";
import Select from 'react-select';


export default function BookFilter({bookTypes, query}) {
    const queryParams = usePage().props.query;
    const formTypes = [];

    const {data, setData, patch, get, errors, processing, recentlySuccessful} = useForm({
        name: queryParams.name ?? '',
        type: queryParams.type ?? '',
    });

    const submit = (e) => {
        e.preventDefault();
        get(route('book.index'));
    };

    const setTypesInput = (types) => {
      types.map(type => {
          formTypes.push(type.value);
      })
        setData('type' , formTypes);
    };

    const loadDefaultValue = (types) => {
        return bookTypes.data.filter(bookType => types.indexOf(bookType.value.toString()) !== -1);
    }

    return (
        <div className="flex flex-col">
            <div className="-my-2 sm:-mx-6 lg:-mx-8 mb-4">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow border-b border-gray-200 sm:rounded-lg">
                        <form onSubmit={submit} className="mt-6 space-y-6 p-4">
                            <div>
                                <InputLabel htmlFor="name" value="Book Name"/>

                                <TextInput
                                    id="name"
                                    className="mt-1 block w-full"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    isFocused
                                    autoComplete="name"
                                />


                            </div>

                            <div >
                                <InputLabel htmlFor="type" value="Book Type"/>

                                <Select id="type" isMulti options={bookTypes.data}
                                        defaultValue={loadDefaultValue(data.type)}
                                        onChange={(e) => setTypesInput(e)} />
                            </div>


                            <div className="flex items-center gap-4">
                                <PrimaryButton disabled={processing}>Search</PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
