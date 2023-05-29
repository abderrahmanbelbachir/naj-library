<?php

namespace App\Http\Controllers;

use App\Http\Requests\BookRequest;
use App\Http\Resources\BookTypeResource;
use App\Models\Book;
use App\Models\BookType;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        $bookTypes = BookType::all();
        $books = Book::orderBy('created_at', 'desc')
            ->when($request->get('type'), function ($q) use ($request) {
                $q->whereIn('book_type', $request->get('type'));
            })
            ->when($request->get('name'), function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->get('name') . '%');
            })->with('type')->get();

        return Inertia::render('Book/List', [
            'books' => $books,
            'bookTypes' => BookTypeResource::collection($bookTypes),
            'query' => [
                'name' => $request->name,
                'type' => $request->type
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        $bookTypes = BookType::all();
        return Inertia::render('Book/CreateBook', [
            'bookTypes' => BookTypeResource::collection($bookTypes)
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(BookRequest $request)
    {
        Book::create([
            'name' => $request->name,
            'book_type' => $request->book_type,
            'shelf' => $request->shelf
        ]);
        return Redirect::route('book.index');
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function show($id)
    {
        return Redirect::route('book.edit', $id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Inertia\Response
     */
    public function edit($id)
    {
        $bookTypes = BookType::all();
        $book = Book::where('id' , $id)->first();

        return Inertia::render('Book/EditBook', [
            'book' => $book,
            'bookTypes' => BookTypeResource::collection($bookTypes)
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(BookRequest $request, $id)
    {
        Book::where('id', $id)->update([
            'name' => $request->name,
            'book_type' => $request->book_type,
            'shelf' => $request->shelf
        ]);
        return Redirect::route('book.index');

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy($id)
    {
        try {

            Book::where('id', $id)->delete();
            return Redirect::route('book.index');


        } catch (\Exception $e) {

            Log::error($e);
            return Redirect::route('book.index');

        }
    }
}
