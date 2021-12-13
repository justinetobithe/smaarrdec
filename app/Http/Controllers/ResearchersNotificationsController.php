<?php

namespace App\Http\Controllers;

use App\Models\ResearchersNotification;
use Illuminate\Http\Request;

class ResearchersNotificationsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    public function get_researchers_notifications($email)
    {
        return ResearchersNotification::where('email', $email)->orderBy('id', 'desc')->get();
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
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
    { {
            $response = [
                'status' => false,
                'message' => 'There was an error'
            ];

            // $unread_notifications = AdminsNotification::select('id')->where('read_type', 0)->get();


            $notification = ResearchersNotification::where('id', $id)->update([
                'read_type' => $request->read_type
            ]);

            if ($notification) {
                // SET RESPONSE
                $response['status'] = true;
                $response['message'] = "✔️ Successfully Update.";
                $response['payload'] = [
                    'id' => $id,
                    'read_type' => $request->read_type,
                ];
            }

            return $response;
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
