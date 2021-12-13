<?php

namespace App\Http\Controllers;

use App\Models\AdminsNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Throwable;

use Event;
use App\EventMessage;
use App\Events\AdminNotificationsEvent;

class AuthController extends Controller
{
    //
    public function login(Request $request)
    {
        $response = [
            'status' => false,
            'message' => '❌ There was an error'
        ];

        $user = User::select('id', 'name', 'password', 'role', 'status')->where('email', $request->email)->first();

        if ($user) {
            if (isset($request->password) && !password_verify($request->password, $user->password)) {
                $response['message'] = "❌ Invalid Password";
            } else {
                $credentials = $request->only('email', 'password');
                if ($user->role == 0) {
                    $response['message'] = "❌ Your account is not yet verified";
                } else if ($user->status == 0) {
                    $response['message'] = "❌ Your account is disabled. Please contact the administrator to recover your account.";
                } else if (Auth::attempt($credentials)) {
                    $response['status'] = true;
                    $response['message'] = '✔️ Succesfully Login';
                    $response['user'] = Auth::user();
                }
            }
        } else {
            $response['message'] = "❌ Account does not exist";
        }


        return $response;
    }

    public function logout()
    {
        Auth::logout();
    }

    public function register(Request $request)
    {
        $response = [
            'status' => false,
            'message' => 'There was an error'
        ];

        $user = User::select('id', 'name', 'password', 'role', 'status')->where('email', $request->email)->first();


        if ($user) {
            $response['message'] = '❌ Your email is already exist!';
        } else {
            try {
                $create_user = User::create([
                    'name' => $request->name,
                    'email' => $request->email,
                    'password' => Hash::make($request->password),
                ]);

                if ($create_user) {
                    $create_admin_notafication = AdminsNotification::create([
                        'request_type' => 1,
                        'notification_title' => 'New User',
                        'notification_text' => 'There is 1 new user who needs an approval',
                        'url' => '/admin/user/view',
                        'read_type' => 0,
                        'status' => 1
                    ]);

                    if ($create_admin_notafication) {

                        // event(new AdminNotificationsEvent($create_admin_notafication));
                        event(new AdminNotificationsEvent($create_admin_notafication));

                        $response['payload'] = $create_admin_notafication;
                    }


                    $response['status'] = true;
                    $response['message'] = '✔️ Succesfully Registered!';
                    $response['payload'] = json_encode([
                        'users' => [
                            'name' => $create_user->name,
                            'email' => $create_user->email,
                            'password' => $create_user->password,
                        ]
                    ]);
                } else {
                    $response['message'] = '❌ Unauthorized';
                }
            } catch (Throwable $e) {
                $response['message'] = $e->getMessage();
            }
        }

        return $response;
    }
}
