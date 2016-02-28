<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Weight;

class HomeController extends Controller
{
    public function index()
    {
        $weights = Weight::all()->sortBy('date');
        return view('home.index')->withWeights($weights);
    }
}
