<?php

namespace App\Http\Controllers;

use App\Models\Researcher;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\DB;
use Throwable;
use Illuminate\Support\Facades\Auth;

use function GuzzleHttp\Promise\all;

class ResearchersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // return Researcher::orderBy('id', 'desc')->get();
        return DB::table('researchers')
            ->leftJoin('agencies', 'agencies.id', 'researchers.agency_id')
            ->select('researchers.*', 'agencies.agency_name')
            ->get();
    }

    public function display_researchers_by_name()
    {
        return Researcher::orderBy('name', 'asc')->get();
    }

    public function display_researchers_except_name()
    {
        return Researcher::where('email', '!=', Auth::user()->email)->orderBy('name', 'asc')->get();
    }

    public function get_researchers()
    {

        if ($_GET['filterName'] == "null" || $_GET['filterName'] == null) {
            $get_data = DB::table('researchers')
                ->leftJoin('users', 'users.email', 'researchers.email')
                ->select('researchers.*', 'users.role')
                ->where('researchers.status', '1')
                ->orderBy('researchers.name', 'asc')
                ->paginate(8);
        } else {
            $get_data = DB::table('researchers')
                ->leftJoin('users', 'users.email', 'researchers.email')
                ->select('researchers.*', 'users.role')
                ->where('researchers.name', 'like', '%' . $_GET['filterName'] . '%')
                ->where('researchers.status', '1')
                ->orderBy('researchers.name', 'asc')
                ->paginate(8);
        }

        return $get_data;
    }

    public function display_researcher_content($slug)
    {
        $data = [
            'status' => false
        ];

        $researcher = Researcher::select('*')
            ->where('slug',  $slug)
            ->first();

        if ($researcher) {
            $data['status'] = true;
            $data = $researcher;
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
        //
    }

    public function store(Request $request)
    {
    }

    public function update_researcher(Request $request)
    {

        $response = [
            'status' => false,
            'message' => "There was an error"
        ];

        $id = $request->id;

        $data = [
            'contact_no' => $request->contact_no,
            'occupation' => $request->occupation,
            'slug' => $request->slug,
            'place_of_assignment' => $request->place_of_assignment,
            'research_interest' => $request->research_interest,
            'expertise' => $request->expertise,
            'biography' => $request->biography,
            'agency_id' => $request->agency_id,
            'status' => $request->status,
        ];

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = md5(uniqid() . date('u')) . '.' . pathinfo($image->getClientOriginalName(), PATHINFO_EXTENSION);
            // UPLOAD
            $uploadImage = $image->storeAs("/public/researcher/", $imageName);
            if ($uploadImage) {
                $data['image'] = "/storage/researcher/" . $imageName;
            }
        }

        if ($request->hasFile('curriculum_vitae')) {
            $file = $request->file('curriculum_vitae');
            $fileName = md5(uniqid() . date('u')) . '.' .  pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION);
            // UPLOAD 
            $uploadFile = $file->storeAs("/public/researcher/", $fileName);
            if ($uploadFile) {
                $data['curriculum_vitae'] = "/storage/researcher/" . $fileName;
            }
        }

        $update_researcher = Researcher::where('id', $id)->update($data);

        if ($update_researcher) {
            $response['status'] = true;
            $response['message'] = "✔️ Successfully Update.";
            $response['payload'] = Researcher::where('id', $id)->first();
        } else {
            $response['message'] = "❌ Unauthorized";
        }


        return $response;
    }

    public function show($email)
    {
        // return Researcher::where('email', $email)->first();

        $data = [
            'status' => false
        ];
        $researcher = Researcher::where('email', '=', $email)
            ->where('email', Auth::user()->email)
            ->first();

        if ($researcher) {
            $data['status'] = true;
            $data = (object) array_merge((array) $researcher->toArray(), $data, (array) ['email' => Auth::user()->email]);
        }
        return Response::json($data);
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

    public function update_status(Request $request)
    {
        $response = [
            'status' => true,
            'message' => "There was an error"
        ];

        $id = $request->researcher_id;

        $data = [
            'status' => $request->status
        ];

        $update_researcher = Researcher::where('id', $id)->update($data);

        if ($update_researcher) {
            $response['status'] = true;
            $response['message'] = "✔️ Successfully Update.";
            $response['payload'] = DB::table('researchers')
                ->leftJoin('agencies', 'agencies.id', 'researchers.agency_id')
                ->select('researchers.*', 'agencies.agency_name')
                ->where('researchers.id', $id)
                ->first();
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
        //
    }
}
