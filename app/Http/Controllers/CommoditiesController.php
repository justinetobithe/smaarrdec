<?php

namespace App\Http\Controllers;

use App\Models\Commodity;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;

class CommoditiesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Commodity::orderBy('id', 'desc')->get();
    }

    public function get_commodity_content($id)
    {
        $data = [
            'status' => true
        ];

        $commodity = Commodity::find($id);

        if ($commodity) {
            $commodity->select('*')->where('id', $id)->first();
            $data = $commodity;
        } else {
            $data['status'] = false;
        }

        return  Response::json($data);
    }

    public function get_commodity_ascending()
    {
        return Commodity::orderBy('commodity_name', 'asc')->get();
    }


    public function get_commodities()
    {

        // $get_data = DB::table('commodities');


        if ($_GET['filterName'] == "null") {
            $get_data = DB::table('commodities')->orderBy('commodity_name', 'asc')->paginate(8);
        } else {
            $get_data = DB::table('commodities')->where('commodity_name', 'like', '%' . $_GET['filterName'] . '%')->orderBy('commodity_name', 'asc')->paginate(8);
        }

        return $get_data;
    }

    public function priority_commodities()
    {
        return Commodity::orderBy('commodity_name', 'asc')->where("priority_type", 1)->get();
    }

    public function display_commodity_content($slug)
    {
        $data = [
            'status' => false
        ];

        $commodity = Commodity::select('*')
            ->where('commodity_slug', $slug)
            ->first();

        if ($commodity) {
            $data['status'] = true;
            $data = $commodity;
        }

        return Response::json($data);
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
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

        $image_url = '';

        // CHECK IF THERE ARE ATTACHMENTS ADDED
        if ($request->hasFile('commodity_image')) {
            $file = $request->file('commodity_image');

            try {
                // GENERATE FILENAME
                $filename = md5(uniqid() . date('u')) . '.' . pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION);
                // UPLOAD
                $upload = $file->storeAs("/public/commodity/", $filename);
                if ($upload) {
                    $image_url = "/storage/commodity/" . $filename;
                }
            } catch (Exception $e) {
                $response['message'] = $e->getMessage();
            }
        } else {
            $image_url = "/storage/commodity/default.png";
        }


        $create_commodities = Commodity::create([
            'commodity_name' => $request->commodity_name,
            'commodity_content' => $request->commodity_content,
            'commodity_slug' => $request->commodity_slug,
            'commodity_image' => $image_url
        ]);

        if ($create_commodities) {
            $response['status'] = true;
            $response['message'] = "✔️ Succesfully Added.";
            $response['payload'] = json_encode([
                'commodities' => [
                    'commodity_name' => $create_commodities->commodity_name,
                    'commodity_content' => $create_commodities->commodity_content,
                    'commodity_slug' => $create_commodities->commodity_slug,
                    'commodity_image' => $image_url
                ]
            ]);
        } else {
            $response['message'] = "❌ Unauthorized";
        }

        return $response;
    }

    public function update_details(Request $request)
    {
        $response = [
            'status' => true,
            'message' => "There was an error"
        ];

        $image_url = '';

        $id = $request->commodity_id;
        $commodity_name = $request->commodity_name;


        // CHECK IF THERE ARE ATTACHMENTS ADDED
        if ($request->hasFile('commodity_image')) {
            $file = $request->file('commodity_image');

            try {
                // GENERATE FILENAME
                $filename = md5(uniqid() . date('u')) . '.' . pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION);
                // UPLOAD
                $upload = $file->storeAs("/public/commodity/", $filename);
                if ($upload) {
                    $image_url = "/storage/commodity/" . $filename;
                }
                $dataWithImage = [
                    'commodity_image' => $image_url,
                    'priority_type' => $request->priority_type,
                    'status' => $request->status,
                ];

                $update_commodity = Commodity::where('id', '=', $id, 'and', 'commodity_name', '=', $commodity_name)->update($dataWithImage);
                if ($update_commodity) {
                    $response['status'] = true;
                    $response['message'] = "✔️ Successfully Update.";
                    $response['payload'] = Commodity::where('id', $id)->first();
                } else {
                    $response['message'] = "❌ Unauthorized";
                }
            } catch (Exception $e) {
                $response['message'] = $e->getMessage();
            }
        } else {
            $dataWithoutImage = [
                'priority_type' => $request->priority_type,
                'status' => $request->status,
            ];

            $update_commodity = Commodity::where('id', '=', $id, 'and', 'commodity_name', '=', $commodity_name)->update($dataWithoutImage);
            if ($update_commodity) {
                $response['status'] = true;
                $response['message'] = "✔️ Successfully Update.";
                $response['payload'] = Commodity::where('id', $id)->first();
            } else {
                $response['message'] = "❌ Unauthorized";
            }
        }

        return $response;
    }

    public function update_commodity(Request $request)
    {
        $response = [
            'status' => true,
            'message' => "There was an error"
        ];

        $image_url = '';

        $commodity_id = $request->commodity_id;


        // CHECK IF THERE ARE ATTACHMENTS ADDED
        if ($request->hasFile('commodity_image')) {
            $file = $request->file('commodity_image');

            try {
                // GENERATE FILENAME
                $filename = md5(uniqid() . date('u')) . '.' . pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION);
                // UPLOAD
                $upload = $file->storeAs("/public/commodity/", $filename);
                if ($upload) {
                    $image_url = "/storage/commodity/" . $filename;
                }
                $dataWithImage = [
                    'commodity_name' => $request->commodity_name,
                    'commodity_slug' => $request->commodity_slug,
                    'commodity_content' => $request->commodity_content,
                    'commodity_image' => $image_url,
                ];

                $update_commodity = Commodity::where('id', $commodity_id)->update($dataWithImage);
                if ($update_commodity) {
                    $response['status'] = true;
                    $response['message'] = "✔️ Successfully Update.";
                    $response['payload'] = Commodity::where('id', $commodity_id)->first();
                } else {
                    $response['message'] = "❌ Unauthorized";
                }
            } catch (Exception $e) {
                $response['message'] = $e->getMessage();
            }
        } else {
            $dataWithoutImage = [
                'commodity_name' => $request->commodity_name,
                'commodity_slug' => $request->commodity_slug,
                'commodity_content' => $request->commodity_content,
            ];

            $update_commodity = Commodity::where('id', $commodity_id)->update($dataWithoutImage);
            if ($update_commodity) {
                $response['status'] = true;
                $response['message'] = "✔️ Successfully Update.";
                $response['payload'] = Commodity::where('id', $commodity_id)->first();
            } else {
                $response['message'] = "❌ Unauthorized";
            }
        }

        return $response;
    }

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

        $commodity = Commodity::find($id);

        if ($commodity) {
            $commodity->delete();
            $response['status'] = true;
            $response['message'] = "✔️ Successfully Delete.";
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
