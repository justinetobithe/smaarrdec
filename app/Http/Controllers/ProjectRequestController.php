<?php

namespace App\Http\Controllers;

use App\Events\AdminNotificationsEvent;
use App\Events\ResearcherNotificationsEvent;
use App\Models\AdminsNotification;
use App\Models\ProjectRequest;
use App\Models\ResearchersNotification;
use Illuminate\Http\Request;

class ProjectRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ProjectRequest::orderBy('id', 'desc')->get();
    }

    public function get_project_request($email)
    {
        return ProjectRequest::where('researcher_email', $email)->orderBy('id', 'desc')->get();
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $response = [
            'status' => false,
            'message' => 'There was an error'
        ];

        $data = [
            'researcher_email' => $request->researcher_email,
            'title' => $request->title,
            'subject' => $request->subject,
            'message' => $request->message,
            'read_type' => $request->read_type,
            'status' => $request->status,
        ];

        $create_project_request = ProjectRequest::create($data);

        if ($create_project_request) {

            $create_admin_notification = AdminsNotification::create([
                'request_type' => 2,
                'notification_title' => $create_project_request->title,
                'notification_text' => $create_project_request->message,
                'url' => '/admin/request-project/researcher/view',
                'read_type' => 0,
                'status' => 1
            ]);

            if ($create_admin_notification) {

                event(new AdminNotificationsEvent($create_admin_notification));

                $response['payload'] = $create_admin_notification;
            }

            $response['status'] = true;
            $response['message'] = "✔️ Successfully Send";
            $response['payload'] = [
                'project_request' => [
                    'id' => $create_project_request->id,
                    'researcher_email' => $create_project_request->researcher_email,
                    'title' => $create_project_request->title,
                    'subject' => $create_project_request->subject,
                    'message' => $create_project_request->message,
                    'read_type' => $create_project_request->read_type,
                    'status' => $create_project_request->status,
                ]
            ];
        } else {
            $response['message'] = "❌ Unauthorized";
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

        $response = [
            'status' => false,
            'message' => 'There was an error'
        ];

        $researcher_email = $request->researcher_email;

        $project_request = ProjectRequest::where('id', $id)->update([
            'read_type' => $request->read_type
        ]);

        if ($project_request) {

            $create_researcher_notification = ResearchersNotification::create([
                'researcher_email' => $researcher_email,
                'request_type' => 1,
                'notification_title' => 'Admin response',
                'notification_text' => 'Admin viewed your request',
                'url' => '/admin/request-project/view',
                'read_type' => 0,
                'status' => 1
            ]);

            if ($create_researcher_notification) {

                event(new ResearcherNotificationsEvent($create_researcher_notification));

                $response['payload'] = $create_researcher_notification;
            }

            $response['status'] = true;
            $response['message'] = "✔️ Successfully mark as read.";
            $response['payload'] = [
                'id' => $id,
                'read_type' => $request->read_type,
            ];
        }

        return $response;
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
