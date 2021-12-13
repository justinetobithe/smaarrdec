<?php

namespace App\Http\Controllers;

use App\Models\Agency;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Throwable;

class AgenciesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Agency::orderBy('id', 'desc')->get();
    }

    public function get_agencies_ascending()
    {
        return Agency::orderBy('agency_name', 'asc')->get();
    }

    public function get_agencies_by_name()
    {
        return Agency::orderBy('agency_name', 'asc')->distinct()->get();
    }

    public function get_agencies()
    {

        if ($_GET['filterName'] == "null") {
            $get_data = DB::table('agencies')->orderBy('agency_name', 'asc')->paginate(8);
        } else {
            $get_data = DB::table('agencies')->where('agency_name', 'like', '%' . $_GET['filterName'] . '%')->orderBy('agency_name', 'asc')->paginate(8);
        }

        return $get_data;
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
            'status' => true,
            'message' => "There was an error."
        ];

        $image_url = '';

        if ($request->hasFile('logo_url')) {
            $file = $request->file('logo_url');

            try {
                $filename = md5(uniqid() .  date('u')) . '.' . pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION);

                $upload = $file->storeAs("/public/agencies/", $filename);
                if ($upload) {
                    $image_url = "/storage/agencies/" . $filename;
                }
            } catch (Exception $e) {
                $response['message'] = $e->getMessage();
            }
        } else {
            $image_url = "/storage/agencies/default.jpg";
        }

        try {
            $create_agency = Agency::create([
                'agency_name' => $request->agency_name,
                'region' => $request->region,
                'acronym' => $request->acronym,
                'site_url' => $request->site_url,
                'logo_url' => $image_url,
                'status' => 1
            ]);

            if ($create_agency) {
                $response['status'] = true;
                $response['message'] = "✔️ Succesfully Added.";
                $response['payload'] = json_encode([
                    'agencies' => [
                        'agency_name' => $create_agency->agency_name,
                        'region' => $create_agency->region,
                        'acronym' => $create_agency->acronym,
                        'site_url' => $create_agency->site_url,
                        // 'content' => $create_agency->content,
                        'logo_url' => $image_url,
                        'status' => $create_agency->status
                    ]
                ]);
            }
        } catch (Throwable $e) {
            $response['message'] = $e->getMessage();
        }
        return $response;
    }

    public function update_agency_status(Request $request)
    {
        $response = [
            'status' => true,
            'message' => "There was an error"
        ];

        $id = $request->agency_id;

        $data = [
            'site_url' => $request->site_url,
            'status' => $request->status,
        ];

        $update_agency = Agency::where('id', $id)->update($data);

        if ($update_agency) {
            $response['status'] = true;
            $response['message'] = "✔️ Successfully Update.";
            $response['payload'] = Agency::where('id', $id)->first();
        } else {
            $response['message'] = "❌ Unauthorized";
        }


        return $response;
    }

    public function update_agency(Request $request)
    {
        $response = [
            'status' => false,
            'message' => 'There was an error'
        ];

        $id = $request->id;


        if ($request->hasFile('logo_url')) {
            $file = $request->file('logo_url');

            // GENERATE FILENAME
            $filename = md5(uniqid() . date('u')) . '.' . pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION);
            // UPLOAD
            $upload = $file->storeAs("/public/agencies/", $filename);
            if ($upload) {
                $image_url = "/storage/agencies/" . $filename;
            }

            $dataWithImage = [
                'agency_name' => $request->agency_name,
                'region' => $request->region,
                'acronym' => $request->acronym,
                'site_url'  => $request->site_url,
                'logo_url' => $image_url
            ];

            $update_agency = Agency::where('id',  $id)->update($dataWithImage);

            if ($update_agency) {
                // SET RESPONSE
                $response['status'] = true;
                $response['message'] = "✔️ Successfully Update.";
                $response['payload'] = Agency::where('id', $id)->first();
            } else {
                $response['message'] = "❌ Unauthorized";
            }
        } else {

            $dataWithoutImage = [
                'agency_name' => $request->agency_name,
                'region' => $request->region,
                'acronym' => $request->acronym,
                'site_url'  => $request->site_url,
            ];

            $update_agency = Agency::where('id',  $id)->update($dataWithoutImage);

            if ($update_agency) {
                // SET RESPONSE
                $response['status'] = true;
                $response['message'] = "✔️ Successfully Update.";
                $response['payload'] = Agency::where('id', $id)->first();
            } else {
                $response['message'] = "❌ Unauthorized";
            }
        }

        return $response;
    }

    public function show($id)
    {
        return Agency::select('*')->where('id', $id)->first();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
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

        $agency = Agency::find($id);

        if ($agency) {
            $agency->delete();
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

    public function data()
    {
        //
    }
}
