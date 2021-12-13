<?php

namespace App\Http\Controllers;

use App\Models\PostCategory;
use Illuminate\Http\Request;

class PostCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return PostCategory::orderBy('id', 'desc')->get();
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
            'status' => false,
            'message' => "There was an error"
        ];

        $create_post_category = PostCategory::create([
            'post_category_name' => $request->post_category_name,
            'post_category_description' => $request->post_category_description,
            'post_category_slug' => $request->post_category_slug,
        ]);

        if ($create_post_category) {
            $response['status'] = true;
            $response['message'] = '✔️ Succesfully Added.';
            $response['payload'] = json_encode([
                'post_categories' => [
                    'post_category_name' => $create_post_category->post_category_name,
                    'post_category_description' => $create_post_category->post_category_description,
                    'post_category_slug' => $create_post_category->post_category_slug,
                ]
            ]);
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
    public function update(Request $request, $id)
    {
        //
    }

    public function update_status(Request $request)
    {
        $response = [
            'status' => false,
            'message' => "There was an error."
        ];

        $data =  [
            'post_category_description' => $request->description,
            'status' => $request->status
        ];

        $update_post_category = PostCategory::where('id', $request->id)->update($data);

        if ($update_post_category) {
            $response['status'] = true;
            $response['message'] = "✔️ Successfully Update.";
            $response['payload'] =  PostCategory::where('id', $request->id)->first();
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
    }
}
