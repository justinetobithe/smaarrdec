<?php

namespace App\Http\Controllers;

use App\Events\AdminNotificationsEvent;
use App\Events\ResearcherNotificationsEvent;
use App\Models\AdminsNotification;
use App\Models\Agency;
use App\Models\Programs;
use App\Models\Project;
use App\Models\Researcher;
use App\Models\ResearchersNotification;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;

class ProgramsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return DB::table('programs')
            ->leftJoin('agencies', 'agencies.id', 'programs.implementing_agency')
            ->leftJoin('users', 'users.email', 'programs.added_by')
            ->select('programs.*', 'agencies.agency_name', 'users.name as user_name')
            ->where('programs.status', '1')
            ->orderBy('id', 'desc')
            ->get();
    }

    public function get_programs_ascending()
    {
        return Programs::orderBy('program_name', 'asc')->get();
    }

    public function get_all_programs()
    {
        return DB::table('programs')
            ->leftJoin('agencies', 'agencies.id', 'programs.implementing_agency')
            ->leftJoin('users', 'users.email', 'programs.added_by')
            ->select('programs.*', 'agencies.agency_name', 'users.name as user_name')
            ->orderBy('id', 'desc')
            ->get();
    }

    public function get_programs_filter_researcher($researcher)
    {

        $data = DB::table('programs')
            ->leftJoin('agencies', 'agencies.id', 'programs.implementing_agency')
            ->leftJoin('researchers', 'researchers.email', 'programs.added_by')
            ->select('programs.*', 'agencies.agency_name', 'researchers.name as user_name')
            ->where('programs.added_by', $researcher)
            ->orderBy('programs.id', 'desc')
            ->get();


        return $data;
    }

    public function get_programs()
    {
        $get_data = DB::table('programs')
            ->select('*',)
            ->where('status', 1);

        if ($_GET['filterImplementingAgency'] != '') {
            $get_data->whereJsonContains('implementing_agency', $_GET['filterImplementingAgency']);
        }
        if ($_GET['filterRemarks'] != '') {
            $get_data->where('remarks', $_GET['filterRemarks']);
        }

        $get_data = $get_data->orderBy('program_name', 'asc')->paginate(10);

        return $get_data;
    }

    public function get_programs_by_id($id)
    {
        $data = [
            'status' => true
        ];

        $program = Programs::find($id);

        if ($program) {
            $program->select('*')->where('id', $id)->first();
            $data = $program;
        } else {
            $data['status'] = false;
        }

        return Response::json($data);
    }

    public function display_program_content($slug)
    {
        $data = [
            'status' => false
        ];

        $program = Programs::select('*')
            ->where('program_slug',  $slug)
            ->first();

        if ($program) {
            $data['status'] = true;
            $data = $program;
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
            'message' => 'There was an error'
        ];


        $programs = Programs::select('*')->where('program_name', '=', $request->program_name)->first();

        if ($programs) {
            $response['status'] = false;
            $response['message'] = '❌ This program is already exist!';
        } else {
            try {

                $user_role = $request->user_role;
                $user_name = $request->user_name;

                $data = [
                    'program_name' => $request->program_name,
                    'program_content' => $request->program_content,
                    'program_slug' => $request->program_slug,
                    'start_date' => $request->start_date,
                    'end_date' => $request->end_date,
                    'implementing_agency' => $request->implementing_agency,
                    'collaborating_agency' => $request->collaborating_agency,
                    'program_leader' => $request->program_leader,
                    'program_members'  => $request->program_members,
                    'remarks'  => $request->remarks,
                    'remarks_description'  => $request->remarks_description,
                    'added_by'  => $request->added_by,
                    'status' => $request->status
                ];

                if ($request->hasFile('featured_image')) {
                    $image = $request->file('featured_image');
                    $imageName = md5(uniqid() . date('u')) . '.' . pathinfo($image->getClientOriginalName(), PATHINFO_EXTENSION);

                    $uploadImage = $image->storeAs("/public/programs/", $imageName);
                    if ($uploadImage) {
                        $data['featured_image'] = "/storage/programs/" . $imageName;
                    } else {
                        $data['featured_image'] = "/storage/programs/no-image.png";
                    }
                }

                $create_program = Programs::create($data);

                if ($create_program) {

                    if ($user_role == 1) {
                        $create_admin_notification = AdminsNotification::create([
                            'request_type' => 2,
                            'notification_title' => $user_name,
                            'notification_text' => 'Request program approval',
                            'url' => '/admin/programs/view',
                            'read_type' => 0,
                            'status' => 1
                        ]);

                        if ($create_admin_notification) {

                            event(new AdminNotificationsEvent($create_admin_notification));

                            $response['payload'] = $create_admin_notification;
                        }
                    }

                    $response['status'] = true;
                    $response['message'] = "✔️ Succesfully Added.";
                    $response['payload'] = $create_program;
                } else {
                    $response['message'] = "❌ Unauthorized";
                }
            } catch (Exception $e) {
                $response['message'] = $e->getMessage();
            }
        }

        return $response;
    }

    public function update_program_approval(Request $request)
    {
        $response = [
            'status' => true,
            'message' => "There was an error"
        ];

        $researcher_email = $request->researcher_email;
        $program_id = $request->program_id;

        $data = [
            'status' => $request->status,
            'approved_by' => $request->approved_by
        ];

        $update_program = Programs::where('id', $program_id)->update($data);
        if ($update_program) {
            $create_researcher_notification = ResearchersNotification::create([
                'researcher_email' => $researcher_email,
                'request_type' => 1,
                'notification_title' => 'Program request approved',
                'notification_text' => 'Your program has been approved. You can now view your program.',
                'url' => '/admin/programs/my-programs',
                'read_type' => 0,
                'status' => 1
            ]);

            if ($create_researcher_notification) {

                event(new ResearcherNotificationsEvent($create_researcher_notification));

                $response['payload'] = $create_researcher_notification;
            }

            $response['status'] = true;
            $response['message'] = "✔️ Successfully Update.";
            $response['payload'] =  DB::table('programs')
                ->leftJoin('agencies', 'agencies.id', 'programs.implementing_agency')
                ->leftJoin('users', 'users.email', 'programs.added_by')
                ->select('programs.*', 'agencies.agency_name', 'users.name as user_name')
                ->where('programs.id', $program_id)
                ->first();
        } else {
            $response['message'] = "❌ Unauthorized";
        }


        return $response;
    }


    public function update_remarks(Request $request)
    {
        $response = [
            'status' => true,
            'message' => 'There was an error'
        ];

        $program_id = $request->program_id;

        $data = [
            'remarks' => $request->remarks,
            'remarks_description' => $request->remarks_description,
        ];

        $update_program = Programs::where('id', $program_id)->update($data);
        if ($update_program) {
            $response['status'] = true;
            $response['message'] = "✔️ Successfully Update.";
            $response['payload'] = DB::table('programs')
                ->leftJoin('agencies', 'agencies.id', 'programs.implementing_agency')
                ->select('programs.*', 'agencies.agency_name')
                ->where('programs.id', $program_id)
                ->first();
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
    }

    public function update_program(Request $request)
    {
        $response = [
            'status' => true,
            'message' => 'There was an error'
        ];

        $program_id = $request->program_id;

        $data = [
            'program_name' => $request->program_name,
            'program_content' => $request->program_content,
            'program_slug' => $request->program_slug,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'implementing_agency' => $request->implementing_agency,
            'collaborating_agency' => $request->collaborating_agency,
            'program_leader' => $request->program_leader,
            'program_members'  => $request->program_members,
            'remarks'  => $request->remarks,
            'remarks_description'  => $request->remarks_description,
            'added_by'  => $request->added_by,
            'status' => $request->status
        ];

        if ($request->hasFile('featured_image')) {
            $image = $request->file('featured_image');
            $imageName = md5(uniqid() . date('u')) . '.' . pathinfo($image->getClientOriginalName(), PATHINFO_EXTENSION);

            $uploadImage = $image->storeAs("/public/programs/", $imageName);
            if ($uploadImage) {
                $data['featured_image'] = "/storage/programs/" . $imageName;
            } else {
                $data['featured_image'] = "/storage/programs/no-image.png";
            }
        }

        $update_program = Programs::where('id',  $program_id)->update($data);

        if ($update_program) {
            $response['status'] = true;
            $response['message'] = "✔️ Successfully Update.";
            $response['payload'] =   Programs::select('*')->where('id', $program_id)->first();
        } else {
            $response['message'] = "❌ Unauthorized";
        }


        return $response;
    }

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
            'message' => 'There was an error'
        ];

        $programs = Programs::find($id);

        $data = [
            'program_id' => '0'
        ];

        if ($programs) {
            Project::where('program_id', $id)->update($data);
            $programs->delete();
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
