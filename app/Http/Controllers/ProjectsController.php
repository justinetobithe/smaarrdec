<?php

namespace App\Http\Controllers;

use App\Events\AdminNotificationsEvent;
use App\Models\AssignProject;
use App\Models\Project;
use App\Models\ProjectAbstract;
use App\Models\Researcher;
use App\Models\ResearchersNotification;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Throwable;
use App\Events\ResearcherNotificationsEvent;
use App\Models\AdminsNotification;

class ProjectsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $get_data = DB::table('projects')
            ->leftJoin('programs', 'programs.id', '=', 'projects.program_id')
            ->leftJoin('project_categories', 'project_categories.id', '=', 'projects.project_category_id')
            ->select('projects.*', 'programs.program_name', 'programs.program_slug', 'project_categories.project_category_name as project_category_name',)
            ->where('projects.status', '1')
            ->orderBy('id', 'asc')
            ->get();

        return $get_data;
    }

    public function view_all_projects()
    {
        $get_data = DB::table('projects')
            ->leftJoin('programs', 'programs.id', '=', 'projects.program_id')
            ->leftJoin('project_categories', 'project_categories.id', '=', 'projects.project_category_id')
            ->select('projects.*', 'programs.program_name', 'programs.program_slug', 'project_categories.project_category_name as project_category_name',)
            ->orderBy('id', 'desc')
            ->get();

        return $get_data;
    }

    public function display_researcher_project_content($id)
    {
        $data = [
            'status' => false
        ];
        $project = Project::where('id', '=', $id)
            ->where('added_by', Auth::user()->email)
            ->first();

        if ($project) {
            $data['status'] = true;
            $data = (object) array_merge((array) $project->toArray(), $data, (array) ['email' => Auth::user()->email]);
        }
        return Response::json($data);
    }

    public function get_projects()
    {

        $get_data = DB::table('projects')
            ->leftJoin('programs', 'programs.id', 'projects.program_id')
            ->leftJoin('project_categories', 'project_categories.id', 'projects.project_category_id')
            ->select('projects.*', 'programs.program_name', 'programs.program_slug', 'project_categories.project_category_name as project_category_name',)
            ->where('projects.status', '1');


        if ($_GET['filterPrograms'] != '') {
            $get_data->where('projects.program_id', $_GET['filterPrograms']);
        }
        if ($_GET['filterCommodity'] != '') {
            $get_data->whereJsonContains('projects.commodities', $_GET['filterCommodity']);
        }
        if ($_GET['filterImplementingAgency'] != '') {
            $get_data->whereJsonContains('projects.implementing_agency', $_GET['filterImplementingAgency']);
        }

        if ($_GET['filterRemarks'] != '') {
            $get_data->where('projects.remarks', $_GET['filterRemarks']);
        }

        $get_data = $get_data->orderBy('id', 'asc')->paginate(10);

        return $get_data;
    }

    public function get_projects_for_report()
    {

        $get_data = DB::table('projects')
            ->leftJoin('programs', 'programs.id', 'projects.program_id')
            ->leftJoin('project_categories', 'project_categories.id', 'projects.project_category_id')
            ->select('projects.*', 'programs.program_name', 'programs.program_slug', 'project_categories.project_category_name as project_category_name',)
            ->where('projects.status', '1');


        if ($_GET['filterPrograms'] != '') {
            $get_data->where('projects.program_id', $_GET['filterPrograms']);
        }
        if ($_GET['filterCommodity'] != '') {
            $get_data->whereJsonContains('projects.commodities', $_GET['filterCommodity']);
        }
        if ($_GET['filterImplementingAgency'] != '') {
            $get_data->whereJsonContains('projects.implementing_agency', $_GET['filterImplementingAgency']);
        }
        if ($_GET['filterRemarks'] != '') {
            $get_data->where('projects.remarks', $_GET['filterRemarks']);
        }
        if ($_GET['filterStartDate'] != '') {
            $get_data->where('projects.start_date', '>=', $_GET['filterStartDate']);
        }
        if ($_GET['filterEndDate'] != '' && $_GET['filterEndDate'] != '') {
            $get_data->where('projects.end_date', '<=', $_GET['filterEndDate']);
        }
        if ($_GET['filterCategory'] != '') {
            $get_data->where('projects.project_category_id', $_GET['filterCategory']);
        }

        $get_data = $get_data->orderBy('id', 'asc')->get();

        return $get_data;
    }

    public function get_project_by_program($program_id)
    {
        $get_data = DB::table('projects')
            // ->leftJoin('researchers', 'researchers.email', '=', 'projects.researcher') 
            ->leftJoin('project_categories', 'project_categories.id', 'projects.project_category_id')
            // ->select('projects.*', 'programs.program_name', 'programs.program_slug', 'project_categories.project_category_name as project_category_name', 'researchers.name as researchers_name', 'researchers.slug as researchers_slug')
            ->select('projects.*', 'project_categories.project_category_name as project_category_name',)
            ->where('projects.status', '1')
            ->where('projects.program_id', $program_id)
            ->orderBy('id', 'asc')
            ->get();

        return $get_data;
    }

    public function get_project_name()
    {
        return Project::orderBy('project_title', 'asc')->get();
    }

    public function display_project_content($slug)
    {
        $data = [
            'status' => false
        ];

        $project =  DB::table('projects')
            ->leftJoin('programs', 'programs.id', 'projects.program_id')
            ->leftJoin('project_categories', 'project_categories.id', 'projects.project_category_id')
            ->select('projects.*', 'programs.program_name', 'programs.program_slug', 'project_categories.project_category_name as project_category_name',)
            ->where('projects.project_slug', $slug)
            ->first();

        if ($project) {
            $data['status'] = true;
            $data = $project;
        }
        return Response::json($data);
    }

    public function get_researcher_projects($name)
    {
        $data = [
            'status' => false
        ];

        $project =  DB::table('projects')
            ->leftJoin('programs', 'programs.id', 'projects.program_id')
            ->leftJoin('project_categories', 'project_categories.id', 'projects.project_category_id')
            ->select('projects.*', 'programs.program_name', 'programs.program_slug', 'project_categories.project_category_name as project_category_name',)
            ->whereJsonContains('projects.project_members', $name)
            ->where('projects.status', 1)
            ->get();

        if ($project) {
            $data['status'] = true;
            $data = $project;
        }
        return Response::json($data);
    }

    public function get_related_projects()
    {

        $commodities_arr = explode(',', $_GET['commodities']);

        $project =  DB::table('projects')
            ->leftJoin('programs', 'programs.id', 'projects.program_id')
            ->leftJoin('project_categories', 'project_categories.id', 'projects.project_category_id')
            ->select('projects.*', 'programs.program_name', 'programs.program_slug', 'project_categories.project_category_name as project_category_name',);


        foreach ($commodities_arr as $value) {
            $project->where('projects.commodities', 'like', '%' . $value . '%');
        }

        $project->where('projects.status', 1)
            ->get();

        return $project;
    }

    public function update_remarks(Request $request)
    {
        $response = [
            'status' => true,
            'message'  => "There was an error."
        ];

        $researcher_email = $request->researcher_email;
        $project_id = $request->project_id;

        try {

            $data = [
                'remarks' => $request->remarks,
                'remarks_description' => $request->remarks_description,
            ];

            $update_projects = Project::where('id', $project_id)->update($data);

            if ($update_projects) {
                // Set Response
                $response['status'] = true;
                $response['message'] = "✔️ Successfully Updated";
                // $response['payload'] = Project::where('id', $project_id)->first();
                $response['payload'] =  DB::table('projects')
                    ->leftJoin('programs', 'programs.id', 'projects.program_id')
                    ->leftJoin('project_categories', 'project_categories.id', 'projects.project_category_id')
                    ->select('projects.*', 'programs.program_name', 'project_categories.project_category_name as project_category_name')
                    ->where('projects.id', $project_id)
                    ->first();
            } else {
                $response['message'] = "Unauthorized";
            }
        } catch (Throwable $e) {
            $response['message'] = $e->getMessage();
        }

        return $response;
    }

    public function delegate_project(Request $request)
    {
        $response = [
            'status' => true,
            'message'  => "There was an error."
        ];


        $project_id = $request->project_id;

        $data = [
            'added_by' => $request->researcher_email
        ];

        $update_projects = Project::where('id', $project_id)->update($data);

        if ($update_projects) {

            $create_researcher_notification = ResearchersNotification::create([
                'email' => $data['added_by'],
                'request_type' => 2,
                'notification_title' => 'Project ownership request approved.',
                'notification_text' => 'You own the project now. Project management feature is available.',
                'url' => '/admin/project/my-projects',
                'read_type' => 0,
                'status' => 1
            ]);

            if ($create_researcher_notification) {

                event(new ResearcherNotificationsEvent($create_researcher_notification));

                $response['payload'] = $create_researcher_notification;
            }


            $response['status'] = true;
            $response['message'] = "✔️ Successfully Delegate";
            $response['payload'] = DB::table('projects')
                ->leftJoin('programs', 'programs.id', '=', 'projects.program_id')
                ->leftJoin('project_categories', 'project_categories.id', '=', 'projects.project_category_id')
                ->select('projects.*', 'programs.program_name', 'project_categories.project_category_name as project_category_name',)
                ->where('projects.id', $project_id)
                ->first();
        } else {
            $response['message'] = "Unauthorized";
        }

        return $response;
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
        $response = [
            'status' => false,
            'message'  => "There was an error."
        ];

        $project = Project::select('*')->where('project_title', $request->project_title)->first();


        try {

            if ($project) {
                $response['message'] = '❌ Your project is already exist!';
            } else {

                $user_role = $request->user_role;
                $user_name = $request->user_name;

                $data = [
                    'program_id' => $request->program_id,
                    'project_code' => $request->project_code,
                    'project_title' => $request->project_title,
                    'project_study_site' => $request->project_study_site,
                    'project_content' => $request->project_content,
                    'project_slug' => $request->project_slug,
                    'project_category_id' => $request->project_category_id,
                    'commodities' => $request->commodities,
                    'budget' => $request->budget,
                    'start_date' => $request->start_date,
                    'end_date' => $request->end_date,
                    'funding_agency' => $request->funding_agency,
                    'implementing_agency' => $request->implementing_agency,
                    'collaborating_agency' => $request->collaborating_agency,
                    'project_leader' => $request->project_leader,
                    'project_members' => $request->project_members,
                    'added_by' => $request->added_by,
                    'remarks' => $request->remarks,
                    'remarks_description' => $request->remarks_description,
                    'status' => $request->status,
                ];

                if ($request->hasFile('abstract')) {
                    $file = $request->file('abstract');
                    $fileName = md5(uniqid() . date('u')) . '.' . pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION);

                    $uploadFile = $file->storeAs("/public/projects/", $fileName);
                    if ($uploadFile) {
                        $data['abstract'] = "/storage/projects/" . $fileName;
                    }
                }

                if ($request->hasFile('featured_image')) {
                    $image = $request->file('featured_image');
                    $imageName = md5(uniqid() . date('u')) . '.' . pathinfo($image->getClientOriginalName(), PATHINFO_EXTENSION);

                    $uploadImage = $image->storeAs("/public/projects/", $imageName);
                    if ($uploadImage) {
                        $data['featured_image'] = "/storage/projects/" . $imageName;
                    } else {
                        $data['featured_image'] = "/storage/projects/no-image.png";
                    }
                }

                $create_project = Project::create($data);

                if ($create_project) {
                    if ($user_role == 1) {
                        $create_admin_notification = AdminsNotification::create([
                            'request_type' => 2,
                            'notification_title' => $user_name,
                            'notification_text' => 'Request project approval',
                            'url' => '/admin/project/view',
                            'read_type' => 0,
                            'status' => 1
                        ]);

                        if ($create_admin_notification) {

                            event(new AdminNotificationsEvent($create_admin_notification));

                            $response['payload'] = $create_admin_notification;
                        }
                    }

                    $response['status'] = true;
                    $response['message'] = "✔️ Successfully Added.";
                    $response['payload'] = [
                        'projects' => [
                            'program_id' => $create_project->program_id,
                            'project_code' => $create_project->project_code,
                            'project_title' => $create_project->project_title,
                            'abstract' => $create_project->abstract,
                            'project_study_site' => $create_project->project_study_site,
                            'project_content' => $create_project->project_content,
                            'project_slug' => $create_project->project_slug,
                            'project_category_id' => $create_project->project_category_id,
                            'commodities' => $create_project->commodities,
                            'budget' => $create_project->budget,
                            'start_date' => $create_project->start_date,
                            'end_date' => $create_project->end_date,
                            'funding_agency' => $create_project->funding_agency,
                            'implementing_agency' => $create_project->implementing_agency,
                            'collaborating_agency' => $create_project->collaborating_agency,
                            'project_leader' => $create_project->project_leader,
                            'project_members' => $create_project->project_members,
                            'added_by' => $create_project->added_by,
                            'remarks' => $create_project->remarks,
                            'remarks_description' => $create_project->remarks_description,
                            'status' => $create_project->status,
                        ]
                    ];
                } else {
                    $response['message'] = "❌ Unauthorized";
                }
            }
        } catch (Exception $e) {
            $response['message'] = $e->getMessage();
        }

        return $response;
    }

    public function update_project(Request $request)
    {
        $response = [
            'status' => true,
            'message'  => "There was an error."
        ];

        try {

            $project_id = $request->project_id;


            $data = [
                'program_id' => $request->program_id,
                'project_code' => $request->project_code,
                'project_title' => $request->project_title,
                'project_study_site' => $request->project_study_site,
                'project_content' => $request->project_content,
                'project_slug' => $request->project_slug,
                'project_category_id' => $request->project_category_id,
                'commodities' => $request->commodities,
                'budget' => $request->budget,
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
                'funding_agency' => $request->funding_agency,
                'implementing_agency' => $request->implementing_agency,
                'collaborating_agency' => $request->collaborating_agency,
                'project_leader' => $request->project_leader,
                'project_members' => $request->project_members,
                'added_by' => $request->added_by,
                'remarks' => $request->remarks,
                'remarks_description' => $request->remarks_description,
                'status' => $request->status,
            ];

            if ($request->hasFile('abstract')) {
                $file = $request->file('abstract');
                $fileName = md5(uniqid() . date('u')) . '.' . pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION);

                $uploadFile = $file->storeAs("/public/projects/", $fileName);
                if ($uploadFile) {
                    $data['abstract'] = "/storage/projects/" . $fileName;
                }
            }

            if ($request->hasFile('featured_image')) {
                $image = $request->file('featured_image');
                $imageName = md5(uniqid() . date('u')) . '.' . pathinfo($image->getClientOriginalName(), PATHINFO_EXTENSION);

                $uploadImage = $image->storeAs("/public/projects/", $imageName);
                if ($uploadImage) {
                    $data['featured_image'] = "/storage/projects/" . $imageName;
                } else {
                    $data['featured_image'] = "/storage/projects/no-image.png";
                }
            }

            $update_projects = Project::where('id', $project_id)->update($data);

            if ($update_projects) {
                $response['status'] = true;
                $response['message'] = "✔️ Successfully Update.";
                $response['payload'] =  Project::where('id', $project_id)->first();
            } else {
                $response['message'] = "❌ Unauthorized";
            }
        } catch (Throwable $e) {
            $response['message'] = $e->getMessage();
        }

        return $response;
    }


    public function researchers_projects($researcher)
    {

        $get_data = DB::table('projects')
            ->leftJoin('programs', 'programs.id', '=', 'projects.program_id')
            ->leftJoin('project_categories', 'project_categories.id', '=', 'projects.project_category_id')
            ->select('projects.*', 'programs.program_name', 'project_categories.project_category_name as project_category_name',)
            ->where('projects.added_by', $researcher)
            ->orderBy('id', 'desc')
            ->get();

        return $get_data;
    }

    public function update_status(Request $request)
    {
        $response = [
            'status' => true,
            'message' => 'There was an error'
        ];

        try {

            $researcher_email = $request->researcher_email;
            $project_id = $request->project_id;

            $data = [
                'status' => $request->status,
            ];

            $update_projects = Project::where('id', $project_id)->update($data);

            if ($update_projects) {

                $create_researcher_notification = ResearchersNotification::create([
                    'researcher_email' => $researcher_email,
                    'request_type' => 1,
                    'notification_title' => 'Project request approved',
                    'notification_text' => 'Your project has been approved. You can now view your project.',
                    'url' => '/admin/project/my-projects',
                    'read_type' => 0,
                    'status' => 1
                ]);

                if ($create_researcher_notification) {

                    event(new ResearcherNotificationsEvent($create_researcher_notification));

                    $response['payload'] = $create_researcher_notification;
                }

                $response['status'] = true;
                $response['message'] = "✔️ Successfully Updated";
                // $response['payload'] = Project::where('id', $data['id'])->first();
                $response['payload'] =   DB::table('projects')
                    ->leftJoin('programs', 'programs.id', '=', 'projects.program_id')
                    ->leftJoin('project_categories', 'project_categories.id', '=', 'projects.project_category_id')
                    ->select('projects.*', 'programs.program_name', 'programs.program_slug', 'project_categories.project_category_name as project_category_name',)
                    ->where('projects.id', $project_id)
                    ->first();
            } else {
                $response['message'] = "Unauthorized";
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

        $projectAbstract = ProjectAbstract::select('*')->where('project_id', $id);

        if ($projectAbstract) {
            $projectAbstract->delete();

            $project = Project::find($id);
            if ($project) {
                $project->delete();
                $response['status'] = true;
                $response['message'] = "✔️ Successfully Deleted";
                $response['payload'] = [
                    'id' => $id,
                    'method' => 'DELETE'
                ];
            } else {
                $response['message'] = "Unauthorized";
            }
        }

        return $response;
    }
}
