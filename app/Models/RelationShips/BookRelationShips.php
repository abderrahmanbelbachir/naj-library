<?php

namespace App\Models\RelationShips;

use App\Models\BookType;

trait BookRelationShips
{

    public function type()
    {
        return $this->hasOne(BookType::class, 'id', 'book_type');
    }
}
