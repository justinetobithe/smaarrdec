<?php

namespace App\Http\Controllers;

use App\Models\Events;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Throwable;

class EventsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Events::orderBy('id', 'desc')->get();
    }

    public function display_event_content($slug)
    {
        $data = [
            'status' => false
        ];

        $event = Events::select('*')
            ->where('event_slug', $slug)
            ->first();
        if ($event) {
            $data['status'] = true;
            $data = $event;
        }

        return Response::json($data);
    }

    public function get_event_content($id)
    {
        $data = [
            'status' => true
        ];

        $event = Events::find($id);

        if ($event) {
            $event->select('*')->where('id', $id)->first();
            $data = $event;
        } else {
            $data['status'] = false;
        }

        return Response::json($data);
    }

    public function get_upcoming_events($title)
    {
        $date = today()->format('Y-m-d');
        return Events::select('*')
            ->where('date_started', '>=', $date)
            ->where('event_title', '!=', $title)
            ->orderBy('id', 'desc')
            ->get();
    }

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

        $data = [
            'event_title' => $request->event_title,
            'author_id' => $request->author_id,
            'event_description' => $request->event_description,
            'event_content' => $request->event_content,
            'event_location' => $request->event_location,
            'event_slug' => $request->event_slug,
            'date_started' => $request->date_started,
            'date_ended' => $request->date_ended,
            'status' => $request->status

        ];

        if ($request->hasFile('event_image')) {
            $file = $request->file('event_image');

            $filename = md5(uniqid() . date('u')) . '.' . pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION);
            // UPLOAD
            $upload = $file->storeAs("/public/events/", $filename);
            if ($upload) {
                $data['event_image'] = "/storage/events/" . $filename;
            }
        }

        $create_event = Events::create($data);

        if ($create_event) {
            $response['status'] = true;
            $response['message'] = "✔️ Successfully Added.";
            $response['payload'] = [
                'events' => [
                    'event_title' => $create_event->event_title,
                    'author_id' => $create_event->author_id,
                    'event_description' => $create_event->event_description,
                    'event_content' => $create_event->event_content,
                    'event_location' => $create_event->event_location,
                    'event_slug' => $create_event->event_slug,
                    'date_started' => $create_event->date_started,
                    'date_ended' => $create_event->date_ended,
                    'status' => $create_event->status,
                    'event_image' => $create_event->event_image,
                ]
            ];
        } else {
            $response['message'] = "❌ Unauthorized";
        }

        return $response;
    }



    public function update_status(Request $request)
    {
        $response = [
            "status" => false,
            "message" => "There was an error"
        ];

        $id = $request->id;

        $data = [
            'status' => $request->status
        ];

        $update_event = Events::where('id', $id)->update($data);

        if ($update_event) {
            $response['status'] = true;
            $response['message'] = "✔️ Successfully Added.";
            $response['payload'] = Events::where('id', $id)->first();
        } else {
            $response['message'] = "❌ Unauthorized";
        }

        return $response;
    }


    public function update_event(Request $request)
    {
        $response = [
            'status' => false,
            'message' => "There was an error"
        ];


        $event_id = $request->id;

        $data = [
            'event_title' => $request->event_title,
            'event_description' => $request->event_description,
            'event_content' => $request->event_content,
            'event_location' => $request->event_location,
            'date_started' => $request->date_started,
            'date_ended' => $request->date_ended,
            'status' => $request->status,
        ];

        if ($request->hasFile('event_image')) {
            $file = $request->file('event_image');

            // GENERATE FILENAME
            $filename = md5(uniqid() . date('u')) . '.' . pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION);
            // UPLOAD
            $upload = $file->storeAs("/public/events/", $filename);
            if ($upload) {
                $data['event_image'] = "/storage/events/" . $filename;
            }
        }

        $update_researcher = Events::where('id', $event_id)->update($data);
        if ($update_researcher) {
            $response['status'] = true;
            $response['message'] = "✔️ Successfully Update.";
            $response['payload'] = Events::where('id', $event_id)->first();
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
            'status' => true,
            'message' => "There was an error"
        ];

        $event = Events::find($id);

        if ($event) {
            $event->delete();
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
