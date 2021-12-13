<?php

namespace App\Http\Controllers;

use App\Models\SystemOptions;
use Exception;
use Illuminate\Http\Request;
use Throwable;

use function GuzzleHttp\Promise\all;

class SystemOptionsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return SystemOptions::all();
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
        return SystemOptions::where('id' . $id)->first();
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


    public function update_about_us(Request $request)
    {
        $response = [
            'status' => false,
            'message' => "There was an error."
        ];

        $update_about_us = SystemOptions::where('option_name', 'about_us')->update(['option_value' => $request->about_us]);

        if ($update_about_us) {
            $response['status'] = true;
            $response['message'] = "✔️ Successfully Update.";
            $response['payload'] = SystemOptions::where('option_name', 'about_us')->first();
        } else {
            $response['message'] = "❌ Unauthorized";
        }

        return $response;
    }


    public function update_vision_mission_goal(Request $request)
    {
        $response = [
            'status' => false,
            'message' => "There was an error."
        ];

        $update_vision_mission_goal = SystemOptions::where('option_name', 'vision_mission_goal')->update(['option_value' => $request->vmg]);

        if ($update_vision_mission_goal) {
            $response['status'] = true;
            $response['message'] = "✔️ Successfully Update.";
            $response['payload'] = SystemOptions::where('option_name', 'vision_mission_goal')->first();
        } else {
            $response['message'] = "❌ Unauthorized";
        }

        return $response;
    }

    public function update_organizational_structure(Request $request)
    {

        $response = [
            'status' => false,
            'message' => "There was an error."
        ];

        $image_url  = '';

        if ($request->hasFile('organizational_structure')) {
            $image = $request->file('organizational_structure');

            $imagename = md5(uniqid() . date('u')) . '.' . pathinfo($image->getClientOriginalName(), PATHINFO_EXTENSION);

            $upload = $image->storeAs("/public/system-options/", $imagename);
            if ($upload) {
                $image_url = "/storage/system-options/" . $imagename;
            }

            $update_organizational_structure = SystemOptions::where('option_name', 'organizational_structure')->update(['option_value' => $image_url]);

            if ($update_organizational_structure) {
                $response['status'] = true;
                $response['message'] = "✔️ Successfully Update.";
                $response['payload'] = SystemOptions::where('option_name', 'organizational_structure')->first();
            } else {
                $response['message'] = "❌ Unauthorized";
            }
        }

        return $response;
    }

    public function update(Request $request)
    {

        $response = [
            'status' => true,
            'message' => "There was an error."
        ];

        $image_url = '';


        $data = [];


        if ($request->hasFile('logo')) {
            $file = $request->file('logo');

            // GENERATE FILENAME
            $filename = md5(uniqid() . date('u')) . '.' . pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION);
            // UPLOAD
            $upload = $file->storeAs("/public/system-options/", $filename);
            if ($upload) {
                $image_url = "/storage/system-options/" . $filename;
            }

            SystemOptions::where('option_name', 'website_logo')->update(['option_value' => $image_url]);
            SystemOptions::where('option_name', 'website_footer_copyright_text')->update(['option_value' => $request->website_footer_copyright_text]);
            SystemOptions::where('option_name', 'website_name')->update(['option_value' => $request->website_name]);
            SystemOptions::where('option_name', 'company_email')->update(['option_value' => $request->company_email]);
            SystemOptions::where('option_name', 'company_email_name')->update(['option_value' => $request->company_email_name]);
            SystemOptions::where('option_name', 'company_name')->update(['option_value' => $request->company_name]);
            SystemOptions::where('option_name', 'company_address')->update(['option_value' => $request->company_address]);
            SystemOptions::where('option_name', 'company_contact_number')->update(['option_value' => $request->company_contact_number]);
            SystemOptions::where('option_name', 'company_fax_number')->update(['option_value' => $request->company_fax_number]);

            $website_name = SystemOptions::select('option_value')->where('option_name', 'website_name')->first();
            $website_logo = SystemOptions::select('option_value')->where('option_name', 'website_logo')->first();
            $website_footer_copyright_text = SystemOptions::select('option_value')->where('option_name', 'website_footer_copyright_text')->first();
            $company_name = SystemOptions::select('option_value')->where('option_name', 'company_name')->first();
            $company_address = SystemOptions::select('option_value')->where('option_name', 'company_address')->first();
            $company_email = SystemOptions::select('option_value')->where('option_name', 'company_email')->first();
            $company_email_name = SystemOptions::select('option_value')->where('option_name', 'company_email_name')->first();
            $company_contact_number = SystemOptions::select('option_value')->where('option_name', 'company_contact_number')->first();
            $google_maps = SystemOptions::select('option_value')->where('option_name', 'google_maps')->first();
            $company_fax_number = SystemOptions::select('option_value')->where('option_name', 'company_fax_number')->first();

            $data = [
                'website_name' => $website_name->option_value,
                'website_logo' => $website_logo->option_value,
                'website_footer_copyright_text' => $website_footer_copyright_text->option_value,
                'company_name' => $company_name->option_value,
                'company_address' => $company_address->option_value,
                'company_email' => $company_email->option_value,
                'company_email_name' => $company_email_name->option_value,
                'company_contact_number' => $company_contact_number->option_value,
                'google_maps' => $google_maps->option_value,
                'company_fax_number' => $company_fax_number->option_value,
            ];
            $response['status'] = true;
            $response['message'] = "✔️ Successfully Update.";
            $response['payload'] = $data;
        } else {
            SystemOptions::where('option_name', 'website_footer_copyright_text')->update(['option_value' => $request->website_footer_copyright_text]);
            SystemOptions::where('option_name', 'website_name')->update(['option_value' => $request->website_name]);
            SystemOptions::where('option_name', 'company_email')->update(['option_value' => $request->company_email]);
            SystemOptions::where('option_name', 'company_email_name')->update(['option_value' => $request->company_email_name]);
            SystemOptions::where('option_name', 'company_name')->update(['option_value' => $request->company_name]);
            SystemOptions::where('option_name', 'company_address')->update(['option_value' => $request->company_address]);
            SystemOptions::where('option_name', 'company_contact_number')->update(['option_value' => $request->company_contact_number]);
            SystemOptions::where('option_name', 'company_fax_number')->update(['option_value' => $request->company_fax_number]);

            $website_name = SystemOptions::select('option_value')->where('option_name', 'website_name')->first();
            $website_logo = SystemOptions::select('option_value')->where('option_name', 'website_logo')->first();
            $website_footer_copyright_text = SystemOptions::select('option_value')->where('option_name', 'website_footer_copyright_text')->first();
            $company_name = SystemOptions::select('option_value')->where('option_name', 'company_name')->first();
            $company_address = SystemOptions::select('option_value')->where('option_name', 'company_address')->first();
            $company_email = SystemOptions::select('option_value')->where('option_name', 'company_email')->first();
            $company_email_name = SystemOptions::select('option_value')->where('option_name', 'company_email_name')->first();
            $company_contact_number = SystemOptions::select('option_value')->where('option_name', 'company_contact_number')->first();
            $google_maps = SystemOptions::select('option_value')->where('option_name', 'google_maps')->first();
            $company_fax_number = SystemOptions::select('option_value')->where('option_name', 'company_fax_number')->first();

            $data = [
                'website_name' => $website_name->option_value,
                'website_logo' => $website_logo->option_value,
                'website_footer_copyright_text' => $website_footer_copyright_text->option_value,
                'company_name' => $company_name->option_value,
                'company_address' => $company_address->option_value,
                'company_email' => $company_email->option_value,
                'company_email_name' => $company_email_name->option_value,
                'company_contact_number' => $company_contact_number->option_value,
                'google_maps' => $google_maps->option_value,
                'company_fax_number' => $company_fax_number->option_value,
            ];

            $response['status'] = true;
            $response['message'] = "✔️ Successfully Update.";
            $response['payload'] = $data;
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

    public function get_essential_data()
    {

        $data = [];

        $website_name = SystemOptions::select('option_value')->where('option_name', 'website_name')->first();
        $website_logo = SystemOptions::select('option_value')->where('option_name', 'website_logo')->first();
        $website_footer_copyright_text = SystemOptions::select('option_value')->where('option_name', 'website_footer_copyright_text')->first();
        $company_name = SystemOptions::select('option_value')->where('option_name', 'company_name')->first();
        $company_address = SystemOptions::select('option_value')->where('option_name', 'company_address')->first();
        $company_email = SystemOptions::select('option_value')->where('option_name', 'company_email')->first();
        $company_email_name = SystemOptions::select('option_value')->where('option_name', 'company_email_name')->first();
        $company_contact_number = SystemOptions::select('option_value')->where('option_name', 'company_contact_number')->first();
        $google_maps = SystemOptions::select('option_value')->where('option_name', 'google_maps')->first();
        $company_fax_number = SystemOptions::select('option_value')->where('option_name', 'company_fax_number')->first();
        $about_us = SystemOptions::select('option_value')->where('option_name', 'about_us')->first();
        $vision_mission_goal = SystemOptions::select('option_value')->where('option_name', 'vision_mission_goal')->first();
        $organizational_structure = SystemOptions::select('option_value')->where('option_name', 'organizational_structure')->first();

        $data = [
            'website_name' => $website_name->option_value,
            'website_logo' => $website_logo->option_value,
            'website_footer_copyright_text' => $website_footer_copyright_text->option_value,
            'company_name' => $company_name->option_value,
            'company_address' => $company_address->option_value,
            'company_email' => $company_email->option_value,
            'company_email_name' => $company_email_name->option_value,
            'company_contact_number' => $company_contact_number->option_value,
            'google_maps' => $google_maps->option_value,
            'company_fax_number' => $company_fax_number->option_value,
            'about_us' => $about_us->option_value,
            'vision_mission_goal' => $vision_mission_goal->option_value,
            'organizational_structure' => $organizational_structure->option_value,
        ];

        return $data;
    }
}
