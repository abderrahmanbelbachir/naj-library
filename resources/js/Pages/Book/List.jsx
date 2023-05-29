import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import BookFilter from "@/Pages/Book/Partials/Filter";
import DeleteBook from "@/Pages/Book/Partials/Delete";
import PrimaryButton from "@/Components/PrimaryButton";


export default function BookList({books, bookTypes, query, auth}) {

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Books</h2>}
        >
            <Head title="Books"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    <div className="ml-4">
                        <a href={'/book/create'} className="text-indigo-600 hover:text-indigo-900">
                            <PrimaryButton className="inline-block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 active:bg-blue-600 my-2" >
                                Create Book
                            </PrimaryButton>
                        </a>
                    </div>
                    <BookFilter bookTypes={bookTypes} query={query} ></BookFilter>


                    <div className="flex flex-col">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 align-middle inline-block min-w-full px-4 sm:px-6 lg:px-8">
                                <div className="shadow overflow-hidden border-b
                                border-gray-200 sm:rounded-lg hidden md:block">
                                    <table className="min-w-full divide-y divide-gray-200 ">
                                        <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Type
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Shelf
                                            </th>

                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Actions
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                        {books.map(book => (
                                            <tr key={book.id}>
                                                <td className="px-0 pb-2 whitespace-nowrap">
                                                    <div className="flex items-center">

                                                        <div className="ml-4">
                                                            <div
                                                                className="text-sm font-medium text-gray-900">{book.name}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-0 pb-2 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {book.type.name}
                                                    </div>
                                                </td>

                                                <td className="px-0 pb-2 whitespace-nowrap text-sm text-gray-500">
                                                    {book.shelf}
                                                </td>
                                                <td className="px-0 pb-2 whitespace-nowrap text-sm font-medium">
                                                    <a href={'/book/' + book.id + '/edit'} className="text-indigo-600 hover:text-indigo-900">
                                                        <PrimaryButton className="inline-block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 active:bg-blue-600 my-2" >
                                                            Edit
                                                        </PrimaryButton>
                                                    </a>
                                                    <DeleteBook book={book} className="max-w-xl" ></DeleteBook>

                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="block md:hidden ">
                                    {books.map(book => (
                                        <div key={book.id} className="shadow overflow-hidden border-b border-gray-200 rounded-lg my-4">



                                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-2">
                                                <div className="p-2 text-gray-900"><strong>Name: </strong> {book.name}</div>
                                                <div className="p-2 text-gray-900"><strong>Type: </strong> {book.type.name}</div>
                                                <div className="p-2 text-gray-900"><strong>Shelf: </strong> {book.shelf}</div>
                                                <div className="p-2 text-gray-900 text-right">

                                                    <a href={'/book/' + book.id + '/edit'} className="text-indigo-600 hover:text-indigo-900">
                                                        <PrimaryButton className="inline-block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 active:bg-blue-600 my-2" >
                                                            Edit
                                                        </PrimaryButton>
                                                    </a>
                                                    <DeleteBook book={book} className="max-w-xl inline-block mx-2" ></DeleteBook>

                                                </div>

                                            </div>

                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
