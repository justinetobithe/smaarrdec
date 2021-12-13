<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Auth;
use Throwable;

class PostsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $get_data = DB::table('posts')
            ->join('users', 'users.id', '=', 'posts.user_id')
            ->join('post_categories', 'post_categories.id', '=', 'posts.post_category_id')
            ->select('posts.*', 'users.name as author_name', 'post_categories.post_category_name')
            ->orderBy('id', 'desc')
            ->get();

        return $get_data;
    }

    public function display_post_content($slug)
    {

        $data = [
            'status' => false
        ];

        $post =  DB::table('posts')
            ->leftJoin('users', 'users.id', 'posts.user_id')
            ->leftJoin('post_categories', 'post_categories.id', 'posts.post_category_id')
            ->select('posts.*', 'users.name as author_name', 'post_categories.post_category_name')
            ->where('posts.post_slug', $slug)
            ->first();

        if ($post) {
            $data['status'] = true;
            $data = $post;
        }
        return Response::json($data);
    }

    public function get_post_content($id)
    {
        $data = [
            'status' => true,
        ];

        $post = Post::find($id);

        if ($post) {
            $data['status'] = true;
            $post->select('*')
                ->where('id', $id)
                ->first();
            $data = $post;
        } else {
            $data['status'] = false;
        }

        return Response::json($data);
    }

    public function get_other_post($title)
    {

        $data = [
            'status' => false
        ];

        $post =  DB::table('posts')
            ->leftJoin('post_categories', 'post_categories.id', 'posts.post_category_id')
            ->select('posts.*', 'post_categories.post_category_name')
            ->where('posts.post_title', '!=', $title)
            ->orderBy('posts.id', 'desc')
            ->get();

        if ($post) {
            $data['status'] = true;
            $data = $post;
        }
        return Response::json($data);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $response = [
            "status" => false,
            "message" => "There was an error"
        ];

        $data = [
            'date_published' => $request->date_published,
            'post_title' => $request->post_title,
            'post_content' => $request->post_content,
            'post_slug' => $request->post_slug,
            'post_category_id' => $request->post_category_id,
            'user_id' => $request->user_id,
            'status' => $request->status
        ];

        if ($request->hasFile('featured_image')) {
            $file = $request->file('featured_image');

            $filename = md5(uniqid()) . date('u') . '.' . pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION);

            $upload = $file->storeAs("/public/posts/", $filename);

            if ($upload) {
                $data['featured_image'] = "/storage/posts/" . $filename;
            }
        }

        $create_post = Post::create($data);

        if ($create_post) {
            $response['status'] = true;
            $response['message'] = "✔️ Succesfully Added.";
            $response['payload'] = json_encode([
                'posts' => [
                    'date_published' => $create_post->date_published,
                    'post_tile' => $create_post->post_title,
                    'post_content' => $create_post->post_content,
                    'post_category_id' => $create_post->post_category_id,
                    'post_slug' => $create_post->post_slug,
                    'featured_image' =>  $create_post->featured_image,
                    'user_id' => $create_post->user_id,
                    'status' => $create_post->status
                ]
            ]);
        } else {
            $response['message'] = "❌ Unauthorized";
        }
        return $response;
    }

    public function update_post(Request $request)
    {
        $response = [
            "status" => false,
            "message" => "There was an error"
        ];

        $id = $request->id;

        $data = [
            'date_published' => $request->date_published,
            'post_title' => $request->post_title,
            'post_content' => $request->post_content,
            'post_slug' => $request->post_slug,
            'post_category_id' => $request->post_category_id,
        ];

        if ($request->hasFile('featured_image')) {
            $file = $request->file('featured_image');

            $filename = md5(uniqid()) . date('u') . '.' . pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION);

            $upload = $file->storeAs("/public/posts/", $filename);
            if ($upload) {
                $data['featured_image'] = "/storage/posts/" . $filename;
            }
        }
        $update_post = Post::where('id', $id)->update($data);

        if ($update_post) {
            $response['status'] = true;
            $response['message'] = "✔️ Successfully Update.";
            $response['payload'] = Post::where('id', $id)->first();
        } else {
            $response['message'] = "❌ Unauthorized";
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


    public function update_status(Request $request)
    {
        $response = [
            'status' => false,
            'message'  => "There was an error."
        ];

        try {

            $data = [
                'status' => $request->status,
            ];

            $update_projects = Post::where('id', $request->id)->update($data);

            if ($update_projects) {
                // Set Response
                $response['status'] = true;
                $response['message'] = "✔️ Successfully Updated";
                $response['payload'] = Post::where('id', $request->id)->first();
            } else {
                $response['message'] = "Unauthorized";
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
        $response = [
            'status' => true,
            'message' => "There was an error."
        ];

        $post = Post::find($id);

        if ($post) {
            $post->delete();
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
}
