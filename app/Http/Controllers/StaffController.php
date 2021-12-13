<?php

namespace App\Http\Controllers;

use App\Models\Staff;
use Exception;
use Illuminate\Http\Request;

class StaffController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Staff::orderBy('id', 'desc')->get();
    }


    public function science_research_assistant()
    {
        return Staff::orderBy('id', 'desc')->where("position", "Science Research Assistant")->get();
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
            'message' => "There was an error."
        ];


        $check_staff = Staff::select('fname', 'lname')->where('fname', '=', $request->fname, 'and', 'lname', '=', $request->lname)->first();

        if ($check_staff) {
            $response['message'] = "❌ Staff Already Exist";
        } else {

            $data = [
                'fname' => $request->fname,
                'lname' => $request->lname,
                'position' => $request->position,
                'status' => $request->status,
            ];

            if ($request->hasFile('image_file')) {
                $file = $request->file('image_file');

                // GENERATE FILENAME
                $filename = md5(uniqid() . date('u')) . '.' . pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION);
                // UPLOAD
                $upload = $file->storeAs("/public/staff/", $filename);
                if ($upload) {
                    $data['image_file'] = "/storage/staff/" . $filename;
                }
            }  

            $insert_staff = Staff::create($data);

            if ($insert_staff) {
                $response['status'] = true;
                $response['message'] = "✔️ Successfully Update.";
                $response['payload'] = json_encode([
                    'staff' => [
                        'fname' => $insert_staff->fname,
                        'lname' => $insert_staff->lname,
                        'position' => $insert_staff->position,
                        'image_file' => $insert_staff->image_file,
                        'status' => $insert_staff->status,
                    ]
                ]);
            } else {
                $response['message'] = "❌ Unauthorized";
            }
        }

        return $response;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
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

    public function update_staff(Request $request)
    {
        $response = [
            'status' => false,
            'message' => "There was an error"
        ];

        $id = $request->staff_id;

        $data = [
            'fname' => $request->fname,
            'lname' => $request->lname,
            'position' => $request->position,
            'status' => $request->status,
        ];

        if ($request->hasFile('image_file')) {
            $file = $request->file('image_file');

            // GENERATE FILENAME
            $filename = md5(uniqid() . date('u')) . '.' . pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION);
            // UPLOAD
            $upload = $file->storeAs("/public/staff/", $filename);
            if ($upload) {
                $data['image_file'] = "/storage/staff/" . $filename;
            } else {
                $data['image_file'] = "/storage/staff/img_avatar.png";
            }
        }

        $update_staff = Staff::where('id', $id)->update($data);

        if ($update_staff) {
            $response['status'] = true;
            $response['message'] = "✔️ Successfully Update.";
            $response['payload'] = Staff::where('id', $id)->first();
        } else {
            $response['message'] = "❌ Unauthorized";
        }


        return $response;
    }

    public function destroy($id)
    {
        $response = [
            'status' => false,
            'message' => 'There was an error'
        ];

        $staff = Staff::find($id);

        if ($staff) {
            $staff->delete();
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
