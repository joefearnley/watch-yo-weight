<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Weight;

class WeightController extends Controller
{
    public function all()
    {
        return response()->json(Weight::all()->sortBy('date'));
    }

    public function add(Request $request)
    {
        $weight = new Weight();
        $weight->weight = $request->input('weight');
        $weight->date = $request->input('date');
        $weight->save();

        $response = [
            'success' => true,
            'message' => 'Weight Added.'
        ];

        return response()->json($response);
    }

    public function delete(Request $request)
    {
        try {
            Weight::destroy($request->input('id'));
        } catch (Excpetion $e) {
            $response = [
                'success' => false,
                'message' => $e->getMessage()
            ];

            return response()->json($response);
        }

        $response = [
            'success' => true,
            'message' => 'Weight Deleted.'
        ];

        return response()->json($response);
    }

    public function chartData()
    {
        $weights = Weight::all()->sortBy('date');

        $response = [
            'dates' => $weights->lists('date')->toArray(),
            'weights' => $weights->lists('weight')->toArray()
        ];

        return response()->json($response);
    }
}
