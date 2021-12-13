<?php

namespace App\Http\Controllers;

use App\Models\Slider;
use Exception;
use Illuminate\Http\Request;

class SlidersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Slider::orderBy('id', 'desc')->get();
    }

    public function display_slider()
    {
        return Slider::orderBy('id', 'asc')->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $response = [
            'status' => false,
            'message' => "There was an error"
        ];

        $image_url = '';

        // CHECK IF THERE ARE ATTACHMENTS ADDED
        if ($request->hasFile('background_image')) {
            $file = $request->file('background_image');

            try {
                // GENERATE FILENAME
                $filename = md5(uniqid() . date('u')) . '.' . pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION);
                // UPLOAD
                $upload = $file->storeAs("/public/slider/", $filename);
                if ($upload) {
                    $image_url = "/storage/slider/" . $filename;
                }
            } catch (Exception $e) {
                $response['message'] = $e->getMessage();
            }
        }

        $create_slider = Slider::create([
            'slider_name' => $request->slider_name,
            'slider_content' => $request->slider_content,
            'background_image' => $image_url,
            'status' => $request->status
        ]);

        if ($create_slider) {
            $response['status'] = true;
            $response['message'] = "✔️ Succesfully Added.";
            $response['payload'] = json_encode([
                'commodities' => [
                    'slider_name' => $create_slider->slider_name,
                    'content' => $create_slider->slider_content,
                    'background_image' => $image_url,
                    'status' => $create_slider->status
                ]
            ]);
        } else {
            $response['message'] = "❌ Unauthorized";
        }

        return $response;
    }

    public function update_slider(Request $request)
    {
        $response = [
            'status' => false,
            'message' => "There was an error"
        ]; 

        $id = $request->slider_id;
        $slider_name = $request->slider_name;

        $data = [
            'status' => $request->status,
        ];

        if ($request->hasFile('background_image')) {
            $file = $request->file('background_image');

            $filename = md5(uniqid() . date('u')) . '.' . pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION);
            // UPLOAD
            $upload = $file->storeAs("/public/slider/", $filename);
            if ($upload) {
                $data['background_image'] = "/storage/slider/" . $filename;
            }
        }

        $update_slider = Slider::where('id', '=', $id, 'and', 'slider_name', '=', $slider_name)->update($data);

        if ($update_slider) {
            $response['status'] = true;
            $response['message'] = "✔️ Successfully Update.";
            $response['payload'] = Slider::where('id', $id)->first();
        } else {
            $response['message'] = "❌ Unauthorized";
        }


        return $response;
    }

    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $response = [
            'status' => false,
            'message' => 'There was an error'
        ];

        $project = Slider::find($id);

        if ($project) {
            $project->delete();
            $response['status'] = true;
            $response['message'] = "✔️ Successfully Deleted";
            $response['payload'] = [
                'id' => $id,
                'method' => 'DELETE'
            ];
        } else {
            $response['message'] = "❌ Unauthorized";
        }


        return $response;
    }
}
