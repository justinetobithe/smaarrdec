<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectCategory;
use Illuminate\Http\Request;
use Throwable;

class ProjectCategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ProjectCategory::orderBy('id', 'asc')->get();
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
            'status' => true,
            'message' => "There was an error"
        ];

        try {

            $create_project_category = ProjectCategory::create([
                'project_category_name' => $request->project_category_name,
                'project_category_description' => $request->project_category_description,
                'status' => $request->status
            ]);

            if ($create_project_category) {
                $response['status'] = true;
                $response['message'] = "✔️ Succesfully Added.";
                $response['payload'] = json_encode([
                    'project_categories' => [
                        'project_category_name' => $create_project_category->project_category_name,
                        'project_category_description' => $create_project_category->project_category_description,
                        'status' => $create_project_category->status
                    ]
                ]);
            } else {
                $response['message'] = "❌ Unaothorized";
            }
        } catch (Throwable $e) {
            $response['message'] = $e->getMessage();
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
    }

    public function update_status(Request $request)
    {
        $response = [
            'status' => true,
            'message' => "There was an error."
        ];

        $data =  [
            'project_category_description' => $request->project_category_description,
            'status' => $request->status
        ];

        $update_project_category = ProjectCategory::where('id', $request->id)->update($data);

        if ($update_project_category) {
            $response['status'] = true;
            $response['message'] = "✔️ Successfully Update.";
            $response['payload'] =  ProjectCategory::where('id', $request->id)->first();
        } else {
            $response['message'] = "❌ Unauthorized";
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
        $response = [
            'status' => true,
            'message' => 'There was an error'
        ];

        $project_category = ProjectCategory::find($id);

        $data = [
            'project_category_id' => '0'
        ];

        if ($project_category) {
            Project::where('project_category_id', $id)->update($data);
            $project_category->delete();
            $response['status'] = true;
            $response['message'] = "✔️ Successfully Deleted";
            $response['payload'] = [
                'id' => $id,
                'method' => 'DELETE'
            ];
        } else {
            $response['message'] = "Unauthorized";
        }

        return $response;
    }
}
