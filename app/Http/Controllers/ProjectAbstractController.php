<?php

namespace App\Http\Controllers;

use App\Models\ProjectAbstract;
use Illuminate\Http\Request;
use Throwable;

class ProjectAbstractController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if ($_GET['filterProject'] != "" || $_GET['filterProject'] != null || $_GET['filterProject'] != "undefined") {
            $get_data = ProjectAbstract::where('project_id', $_GET['filterProject'])->orderBy('id', 'desc')->get();
        } else {
            $get_data = null;
        }

        return $get_data;
    }


    public function get_all_project_abstract()
    {
        return ProjectAbstract::where("status", "1")->orderBy('id', 'desc')->get();
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


    public function update_abstract(Request $request)
    {
        $response = [
            'status' => true,
            'message' => "There was an error"
        ];

        $id = $request->report_id;

        $data = [
            'status' => $request->status
        ];

        $update_report = ProjectAbstract::where('id', $id)->update($data);

        if ($update_report) {
            $response['status'] = true;
            $response['message'] = "✔️ Successfully Added.";
            $response['payload'] =  ProjectAbstract::where('id', $id)->first();
        } else {
            $response['message'] = "❌ Unauthorized";
        }

        return $response;
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
            'status' => true,
            'message' => "There was an error"
        ];


        $attached_file = '';

        // CHECK IF THERE ARE ATTACHMENTS ADDED
        if ($request->hasFile('attached_file')) {
            $file = $request->file('attached_file');

            try {
                // GENERATE FILENAME
                $filename = md5(uniqid() . date('u')) . '.' . pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION);
                // UPLOAD
                $upload = $file->storeAs("/public/project-abstract/", $filename);
                if ($upload) {
                    $attached_file = "/storage/project-abstract/" . $filename;
                }
            } catch (Throwable $e) {
                $response['message'] = $e->getMessage();
            }
        }


        $create_project_report = ProjectAbstract::create([
            'project_id' => $request->project_id,
            'abstract_name' => $request->abstract_name,
            'attached_file' => $attached_file,
            'status' => $request->status
        ]);

        if ($create_project_report) {
            $response['status'] = true;
            $response['message'] = "✔️ Successfully Added.";
            $response['payload'] = [
                'project_reports' => [
                    'project_id' => $create_project_report->project_id,
                    'abstract_name' => $create_project_report->abstract_name,
                    'attached_file' => $attached_file,
                    'status' => 0
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
        return ProjectAbstract::where('project_id', $id)
            ->where('status', '1')->get();
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

        $report = ProjectAbstract::find($id);

        if ($report) {
            $report->delete();
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
