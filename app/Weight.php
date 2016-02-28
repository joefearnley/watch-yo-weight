<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Weight extends Model
{

    public function formattedWeight()
    {
        return number_format($this->weight, 2) . ' lbs';
    }

    public function formattedDate()
    {
        return date('F j, Y', strtotime($this->date));
    }
}
