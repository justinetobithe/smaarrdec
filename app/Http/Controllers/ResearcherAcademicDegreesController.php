<?php

namespace App\Http\Controllers;

use App\Models\ResearcherAcademicDegree;
use Illuminate\Http\Request;

class ResearcherAcademicDegreesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
    }

    public function get_academic_degrees($researcher_id)
    {
        return ResearcherAcademicDegree::where('researcher_id', $researcher_id)->orderBy('id', 'desc')->get();
    }
    public function fetch_academic_degrees($researcher_id)
    {
        return ResearcherAcademicDegree::where('researcher_id', $researcher_id)->orderBy('id', 'desc')->get();
    }
    public function create()
    {
    }

    public function store(Request $request)
    {
        $response = [
            'status' => false,
            'message' => 'There was an error'
        ];

        $create_academic_degree = ResearcherAcademicDegree::create([
            'researcher_id' => $request->researcher_id,
            'school_name' => $request->school_name,
            'school_address' => $request->school_address,
            'program' => $request->program,
            'degree_id' => $request->degree_id,
            'year' => $request->year,
            'status' => $request->status,
        ]);

        if ($create_academic_degree) {
            $response['status'] = true;
            $response['message'] = "✔️ Successfully Added.";
            $response['payload'] = [
                'researcher_acedemic_degrees' => [
                    'id' => $create_academic_degree->id,
                    'researcher_id' => $create_academic_degree->researcher_id,
                    'school_name' => $create_academic_degree->school_name,
                    'school_address' => $create_academic_degree->school_address,
                    'program' => $create_academic_degree->program,
                    'degree_id' => $create_academic_degree->degree_id,
                    'year' => $create_academic_degree->year,
                    'status' => $create_academic_degree->status,
                ]
            ];
        } else {
            $response['message'] = "❌ Unauthorized";
        }

        return $response;
    }

    public function update_academic_degrees(Request $request)
    {
        $response = [
            'status' => false,
            'message' => 'There was an error'
        ];

        $id = $request->id;

        $data = [
            'researcher_id' => $request->researcher_id,
            'school_name' => $request->school_name,
            'school_address' => $request->school_address,
            'program' => $request->program,
            'degree_id' => $request->degree_id,
            'year' => $request->year,
            'status' => $request->status,
        ];

        $update_academic_degree = ResearcherAcademicDegree::where('id', $id)->update($data);

        if ($update_academic_degree) {
            $response['status'] = true;
            $response['message'] = "✔️ Successfully Update.";
            $response['payload'] =  ResearcherAcademicDegree::where('id', $id)->first();
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

        $academic_degrees = ResearcherAcademicDegree::find($id);

        if ($academic_degrees) {
            $academic_degrees->delete();
            $response['status'] = true;
            $response['message'] = "✔️ Successfully Deleted.";
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
