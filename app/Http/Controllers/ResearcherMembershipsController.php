<?php

namespace App\Http\Controllers;

use App\Models\ResearcherMembership;
use Illuminate\Http\Request;

class ResearcherMembershipsController extends Controller
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

    public function get_membership($researcher_id)
    {
        return ResearcherMembership::where('researcher_id', $researcher_id)->get();
    }

    public function fetch_membership($researcher_id)
    {
        return ResearcherMembership::where('researcher_id', $researcher_id)->get();
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
 
        $create_membership = ResearcherMembership::create([
            'researcher_id' => $request->researcher_id,
            'organization' => $request->organization,
            'position' => $request->position,
            'address' => $request->address,
            'status' => $request->status,
        ]);

        if ($create_membership) {
            $response['status'] = true;
            $response['message'] = "✔️ Successfully Added.";
            $response['payload'] = [
                'researcher_membership' => [ 
                    'id' => $create_membership->id,
                    'researcher_id' => $create_membership->researcher_id,
                    'organization' => $create_membership->organization,
                    'position' => $create_membership->position,
                    'address' => $create_membership->address,
                    'status' => $create_membership->status,
                ]
            ];
        } else {
            $response['message'] = "❌ Unauthorized";
        }

        return $response;
    }


    public function update_membership(Request $request)
    {
        $response = [
            'status' => false,
            'message' => 'There was an error'
        ];

        $id = $request->id;

        $data = [
            'researcher_id' => $request->researcher_id,
            'organization' => $request->organization,
            'position' => $request->position,
            'address' => $request->address,
            'status' => $request->status,
        ];

        $update_membership = ResearcherMembership::where('id', $id)->update($data);

        if ($update_membership) {
            $response['status'] = true;
            $response['message'] = "✔️ Successfully Update.";
            $response['payload'] = ResearcherMembership::where('id', $id)->first();
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
            'message' => "There was an error"
        ];

        $researcher_membership = ResearcherMembership::find($id);

        if ($researcher_membership) {
            $researcher_membership->delete();
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
