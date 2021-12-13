<?php

namespace App\Http\Controllers;

use App\Models\ResearcherPublication;
use Illuminate\Http\Request;

class ResearcherPublicationsController extends Controller
{
    public function index()
    {
    }

    public function create()
    {
    }

    public function get_publications($researcher_id)
    {
        return ResearcherPublication::where('researcher_id', $researcher_id)->orderBy('id', 'asc')->get();
    }

    public function store(Request $request)
    {
        $response = [
            'status' => true,
            'message' => "There was an error"
        ];

        $create_publications = ResearcherPublication::create([
            'researcher_id' => $request->researcher_id,
            'title' => $request->title,
            'description' => $request->description,
            'type' => $request->type,
            'members' => $request->members,
            'year' => $request->year,
            'url' => $request->url,
            'status' => $request->status,
        ]);

        if ($create_publications) {
            $response['status'] = true;
            $response['message'] = "✔️ Successfully Added.";
            $response['payload'] = [
                'researcher_publications' => [
                    'id' => $create_publications->id,
                    'researcher_id' => $create_publications->researcher_id,
                    'title' => $create_publications->title,
                    'description' => $create_publications->description,
                    'type' => $create_publications->type,
                    'members' => $create_publications->members,
                    'year' => $create_publications->year,
                    'url' => $create_publications->url,
                    'status' => $create_publications->status,
                ]
            ];
        } else {
            $response['message'] = "❌ Unauthorized";
        }

        return $response;
    }


    public function fetch_publications($researcher_id)
    {
        return ResearcherPublication::where('researcher_id', $researcher_id)->orderBy('id', 'asc')->get();
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
     * 
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
    }

    public function update_publication(Request $request)
    {
        $response = [
            'status' => false,
            'message' => "There was an error"
        ];

        $id = $request->id;

        $data = [
            'researcher_id' => $request->researcher_id,
            'title' => $request->title,
            'description' => $request->description,
            'type' => $request->type,
            'members' => $request->members,
            'year' => $request->year,
            'url' => $request->url,
            'status' => $request->status,
        ];

        $update_publications = ResearcherPublication::where('id', $id)->update($data);

        if ($update_publications) {
            $response['status'] = true;
            $response['message'] = "✔️ Successfully Update.";
            $response['payload'] = ResearcherPublication::where('id', $id)->first();
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
            'status' => false,
            'message' => "There was an error"
        ];

        $publication = ResearcherPublication::find($id);

        if ($publication) {
            $publication->delete();
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
