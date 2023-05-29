<?php

namespace App\Models;

use App\Models\RelationShips\BookRelationShips;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Book extends Model
{
    use HasFactory, SoftDeletes, BookRelationShips;

    protected $fillable = ['name', 'book_type', 'shelf'];
}
