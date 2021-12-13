<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GlobalController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = [];

        $total_posts_count = DB::table('posts')->where('status', '=', '1')->count();

        $total_agency_count = DB::table('agencies')->where('status', '=', '1')->count();

        $total_programs_count = DB::table('programs')->where('status', '=', '1')->count();

        $total_project_count = DB::table('projects')->count();

        $total_commodity_count = DB::table('commodities')->where('status', '=', '1')->count();

        $total_event_count = DB::table('events')->where('status', '=', '1')->count();

        $admin_notification = DB::table('admins_notifications')->where('read_type', '=', 0, 'and', 'status', '=', '1')->count();


        $data = [
            'posts' => $total_posts_count,
            'agencies' =>  $total_agency_count,
            'programs' => $total_programs_count,
            'projects' => $total_project_count,
            'commodities' => $total_commodity_count,
            'events' => $total_event_count,
            'admins_notifications' => $admin_notification
        ];

        return $data;
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
        //
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
        //
    }
}
