<?php

namespace App\Http\Controllers;

use App\Events\ResearcherNotificationsEvent;
use App\Models\Researcher;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Throwable;

use Illuminate\Support\Facades\Mail;
use App\Mail\VerifiedUserMail;
use App\Models\AdminsNotification;
use App\Models\ResearchersNotification;
use Symfony\Component\HttpFoundation\Response;


class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return User::orderBy('id', 'desc')->get();
    }

    public function update_role(Request $request)
    {
        $response = [
            'status' => true,
            'message' => 'There was an error'
        ];

        try {

            $data = [
                'id' => $request->id,
                'role' => $request->role
            ];

            $user = User::where('id', $data['id'])->update(['role' => $data['role']]);

            if ($user) {
                $users = User::select('name', 'email')->where('id', $data['id'])->first();

                $create_researcher = Researcher::create([
                    'name' => $users->name,
                    'email' => $users->email,
                    'image' => "/storage/researcher/img_avatar.png",
                    'status' => 0
                ]);

                if ($create_researcher) {
                    $response['payload'] = json_encode([
                        'researchers' => [
                            'name' => $create_researcher->name,
                            'email' => $create_researcher->email,
                            'image' => $create_researcher->image,
                            'status' => $create_researcher->status
                        ]
                    ]);
                }

                $userData = [
                    'name' => $users['name'],
                    'message' => 'Your account has successfully verified! You can login to our site now.',
                ];


                Mail::to($users['email'])->send(new VerifiedUserMail($userData));

                $create_researcher_notification = ResearchersNotification::create([
                    'email' => $users['email'],
                    'request_type' => 1,
                    'notification_title' => 'You have succesfully approved by the admin',
                    'notification_text' => 'You need to update and fill your profile before proceeding to others.',
                    'url' => '/admin/researcher/my-profile',
                    'read_type' => 0,
                    'status' => 1
                ]);

                if ($create_researcher_notification) {

                    event(new ResearcherNotificationsEvent($create_researcher_notification));

                    $response['payload'] = $create_researcher_notification;
                }


                // Set Response
                $response['status'] = true;
                $response['message'] = "✔️ Successfully Updated";
                $response['payload'] = User::where('id', $data['id'])->first();
            }
        } catch (Throwable $e) {
            $response['message'] = $e->getMessage();
        }

        return $response;
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
        $response = [
            'status' => false,
            'message' => 'There was an error'
        ];

        try {
            // $data = [
            //     'name' => $request->name,
            //     'email' => $request->email,
            // ];

            if ($request->currentPassword !== null && $request->newPassword !== null) {
                if (Hash::check($request->currentPassword, Auth::user()->password)) {
                    // Change Password
                    $data['password'] = Hash::make($request->newPassword);

                    // Set response
                    $response['password_changed'] = true;
                }
            }

            // Update User
            $user = User::where('id', $id)->update($data);

            if ($user) {
                // Set Response
                $response['status'] = true;
                $response['message'] = "✔️ Successfully Updated";
            }
        } catch (Throwable $e) {
            $response['message'] = $e->getMessage();
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
