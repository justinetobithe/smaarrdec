<?php

use App\Http\Controllers\AdminsNotificationsController;
use App\Http\Controllers\AgenciesController;

use App\Http\Controllers\SystemOptionsController;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommoditiesController;
use App\Http\Controllers\DegreeController;
use App\Http\Controllers\EventsController;
use App\Http\Controllers\GlobalController;
use App\Http\Controllers\PostCategoryController;
use App\Http\Controllers\PostsController;
use App\Http\Controllers\ProgramsController;
use App\Http\Controllers\ProjectAbstractController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\ProjectCategoriesController;
use App\Http\Controllers\ProjectReportsController;
use App\Http\Controllers\ProjectRequestController;
use App\Http\Controllers\ProjectsController;
use App\Http\Controllers\ResearcherAcademicDegreesController;
use App\Http\Controllers\ResearcherMembershipsController;
use App\Http\Controllers\ResearcherPublicationsController;
use App\Http\Controllers\ResearchersController;
use App\Http\Controllers\ResearchersNotificationsController;
use App\Http\Controllers\SlidersController;

use App\Models\AdminsNotification;
use App\Models\Events;
use App\Models\ResearcherAcademicDegree;
use Illuminate\Console\Scheduling\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::resource('agencies', AgenciesController::class);
Route::resource('users', UsersController::class);
Route::resource('post-categories', PostCategoryController::class);
Route::resource('staffs', StaffController::class);
Route::resource('programs', ProgramsController::class);
Route::resource('commodities', CommoditiesController::class);

Route::resource('posts', PostsController::class);
Route::resource('events', EventsController::class);
Route::resource('degrees', DegreeController::class);
Route::resource('projects', ProjectsController::class);
Route::resource('researchers', ResearchersController::class);
Route::resource('project-categories', ProjectCategoriesController::class);
Route::resource('slider', SlidersController::class);
Route::resource('admins-notification', AdminsNotificationsController::class);
Route::resource('researchers-notification', ResearchersNotificationsController::class);
Route::resource('project-abstract', ProjectAbstractController::class);
Route::resource('researcher-publications', ResearcherPublicationsController::class);
Route::resource('academic-degrees', ResearcherAcademicDegreesController::class);
Route::resource('researcher-membership', ResearcherMembershipsController::class);
Route::resource('project-request', ProjectRequestController::class);

Route::get('/staff/science-research-assistant', [StaffController::class, 'science_research_assistant']);

Route::get('/get-projects', [ProjectsController::class, 'get_projects']);
Route::get('/get-projects-for-report', [ProjectsController::class, 'get_projects_for_report']);
Route::get('/display-project-content/{slug}', [ProjectsController::class, 'display_project_content']);
Route::get('/researchers-projects/{researcher}', [ProjectsController::class, 'researchers_projects']);
Route::post('/projects/update-status', [ProjectsController::class, 'update_status']);
Route::get('/display-researcher-project-content/{id}', [ProjectsController::class, 'display_researcher_project_content']);
Route::get('/get-project-name', [ProjectsController::class, 'get_project_name']);
Route::get('/view-all-projects', [ProjectsController::class, 'view_all_projects']);
Route::get('/get-project-by-program/{id}', [ProjectsController::class, 'get_project_by_program']);
Route::get('/get-researcher-projects/{name}', [ProjectsController::class, 'get_researcher_projects']);
Route::get('/get-related-projects', [ProjectsController::class, 'get_related_projects']);

Route::get('/display-post-content/{slug}', [PostsController::class, 'display_post_content']);
Route::get('/get-post-content/{id}', [PostsController::class, 'get_post_content']);
Route::get('/get-other-posts/{title}', [PostsController::class, 'get_other_post']);

Route::get('/display-researcher-content/{slug}', [ResearchersController::class, 'display_researcher_content']);
Route::get('/display-researchers-by-name', [ResearchersController::class, 'display_researchers_by_name']);
Route::get('/display-researchers-except-name', [ResearchersController::class, 'display_researchers_except_name']);
Route::get('/get-researchers', [ResearchersController::class, 'get_researchers']);
Route::get('/researcher/{id}', [ResearchersController::class, 'show']);

Route::get('/get-programs', [ProgramsController::class, 'get_programs']);
Route::get('/display-program-content/{slug}', [ProgramsController::class, 'display_program_content']);
Route::get('/get-programs-filter-researcher/{researcher}', [ProgramsController::class, 'get_programs_filter_researcher']);
Route::get('/get-all-programs', [ProgramsController::class, 'get_all_programs']);
Route::get('/get-programs-ascending', [ProgramsController::class, 'get_programs_ascending']);


Route::get('/get-commodities', [CommoditiesController::class, 'get_commodities']);
Route::get('/priority-commodities', [CommoditiesController::class, 'priority_commodities']);
Route::get('/display-commodity-content/{slug}', [CommoditiesController::class, 'display_commodity_content']);
Route::get('/get-commodity-ascending', [CommoditiesController::class, 'get_commodity_ascending']);
Route::get('/get-commodity-content/{id}', [CommoditiesController::class, 'get_commodity_content']);
Route::get('/get-programs-by-id/{id}', [ProgramsController::class, 'get_programs_by_id']);

Route::get('/display-event-content/{slug}', [EventsController::class, 'display_event_content']);
Route::get('/get-event-content/{id}', [EventsController::class, 'get_event_content']);
Route::get('/get-upcoming-events/{title}', [EventsController::class, 'get_upcoming_events']);


Route::get('/get-agencies', [AgenciesController::class, 'get_agencies']);
Route::get('/get-agencies-by-name', [AgenciesController::class, 'get_agencies_by_name']);
Route::get('/agencies/{id}', [AgenciesController::class, 'show']);
Route::get('/get-agencies-ascending', [AgenciesController::class, 'get_agencies_ascending']);

Route::get('/staff/get-max-id', [StaffController::class, 'get_max_id']);

Route::get('/global-dashboard-data', [GlobalController::class, 'index']);

Route::get('/display-slider', [SlidersController::class, 'display_slider']);

Route::get('/get-project-abstract', [ProjectAbstractController::class, 'index']);
Route::get('/get-all-project-abstract', [ProjectAbstractController::class, 'get_all_project_abstract']);
Route::get('/project-abstract/{id}', [ProjectAbstractController::class, 'show']);

Route::get('/system-options/get-essential-data', [SystemOptionsController::class, 'get_essential_data']);

Route::get('/get-publications/{id}', [ResearcherPublicationsController::class, 'get_publications']);
Route::get('/fetch-publications/{id}', [ResearcherPublicationsController::class, 'fetch_publications']);

Route::get('/get-academic-degrees/{id}', [ResearcherAcademicDegreesController::class, 'get_academic_degrees']);
Route::get('/fetch-academic-degrees/{id}', [ResearcherAcademicDegreesController::class, 'fetch_academic_degrees']);

Route::get('/get-membership/{id}', [ResearcherMembershipsController::class, 'get_membership']);
Route::get('/fetch-membership/{id}', [ResearcherMembershipsController::class, 'fetch_membership']);

Route::get('/project-requests', [ProjectRequestController::class, 'index']);
Route::get('/get_project_requests/{email}', [ProjectRequestController::class, 'get_project_request']);

Route::get('/get-researchers-notification/{email}', [ResearchersNotificationsController::class, 'get_researchers_notifications']);

Route::apiResource('/system-options', SystemOptionsController::class);

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::post('user/update-role', [UsersController::class, 'update_role']);
    Route::post('project/update-remarks', [ProjectsController::class, 'update_remarks']);
    Route::post('researcher/update-researcher', [ResearchersController::class, 'update_researcher']);
    Route::post('commodity/update-details', [CommoditiesController::class, 'update_details']);
    Route::post('agency/update-agency-status', [AgenciesController::class, 'update_agency_status']);
    Route::post('agency/update-agency', [AgenciesController::class, 'update_agency']);
    Route::post('slider/update-slider', [SlidersController::class, 'update_slider']);
    Route::post('program/update-program-approval', [ProgramsController::class, 'update_program_approval']);
    Route::post('program/update-program', [ProgramsController::class, 'update_program']);
    Route::post('project/update-project', [ProjectsController::class, 'update_project']);
    Route::post('event/update-event', [EventsController::class, 'update_event']);
    Route::post('program/update-remarks', [ProgramsController::class, 'update_remarks']);
    Route::post('commodity/update-commodity', [CommoditiesController::class, 'update_commodity']);
    Route::post('system-options/update-options', [SystemOptionsController::class, 'update']);
    Route::post('staff/update-staff', [StaffController::class, 'update_staff']);
    Route::post('researcher/update-status', [ResearchersController::class, 'update_status']);
    Route::post('post/update-post', [PostsController::class, 'update_post']);
    Route::post('post/update-status', [PostsController::class, 'update_status']);
    Route::post('project/category/update-status', [ProjectCategoriesController::class, 'update_status']);
    Route::post('post/category/update-status', [PostCategoryController::class, 'update_status']);
    Route::post('project/abstract/update-status', [ProjectAbstractController::class, 'update_abstract']);
    Route::post('event/update-status', [EventsController::class, 'update_status']);
    Route::post('project/delegate-project', [ProjectsController::class, 'delegate_project']);
    Route::post('researcher-publications/update-publications', [ResearcherPublicationsController::class, 'update_publication']);
    Route::post('researcher-academic-degrees/update-academic-degrees', [ResearcherAcademicDegreesController::class, 'update_academic_degrees']);
    Route::post('researcher-membership/update-membership', [ResearcherMembershipsController::class, 'update_membership']);
    Route::post('system-options/update-organizational-chart', [SystemOptionsController::class, 'update_organizational_structure']);
    Route::post('system-options/update-about-us', [SystemOptionsController::class, 'update_about_us']);
    Route::post('system-options/update-vision-mission-goal', [SystemOptionsController::class, 'update_vision_mission_goal']);
    Route::apiResources([
        'users' => UsersController::class,
    ]);
});
