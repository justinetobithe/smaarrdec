<?php

use App\Events\AdminNotificationsEvent;
use App\Http\Controllers\AgenciesController;
use App\Http\Controllers;
use App\Http\Controllers\SystemOptionsController;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommoditiesController;
use App\Http\Controllers\EventsController;
use App\Http\Controllers\PostCategoryController;
use App\Http\Controllers\PostsController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\ProgramsController;
use App\Http\Controllers\ProjectAbstractController;
use App\Http\Controllers\ProjectCategoriesController;
use App\Http\Controllers\ProjectReportsController;
use App\Http\Controllers\ProjectRequestController;
use App\Http\Controllers\ProjectsController;
use App\Http\Controllers\ResearcherAcademicDegreesController;
use App\Http\Controllers\ResearcherMembershipsController;
use App\Http\Controllers\ResearcherPublicationsController;
use App\Http\Controllers\ResearchersController;
use App\Http\Controllers\SlidersController;
use App\Http\Controllers\StaffController;
use Illuminate\Http\RedirectResponse;


// RESET CACHE & CONFIG

// Route::get(
//     '/config-clear',
//     function () {
//         Artisan::call('config:cache');
//         Artisan::call('route:cache');

//         return "Success!";
//     }
// );

Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'logout']);

Route::post('/register', [AuthController::class, 'register']);

// Route::get('/register', function () {
//     event(new AdminNotificationsEvent("Test message"));
// });

Route::post('/insert-post-categories', [PostCategoryController::class, 'store']);
Route::post('/insert-programs', [ProgramsController::class, 'store']);
Route::post('/insert-commodities', [CommoditiesController::class, 'store']);
Route::post('/insert-posts', [PostsController::class, 'store']);
Route::post('/insert-projects', [ProjectsController::class, 'store']);
Route::post('/insert-events', [EventsController::class, 'store']);
Route::post('/insert-project-categories', [ProjectCategoriesController::class, 'store']);
Route::post('/insert-researchers', [ResearchersController::class, 'store']);
Route::post('/insert-agencies', [AgenciesController::class, 'store']);
Route::post('/insert-slider', [SlidersController::class, 'store']);
Route::post('/insert-staff', [StaffController::class, 'store']);
Route::post('/insert-project-abstract', [ProjectAbstractController::class, 'store']);
Route::post('/insert-publication', [ResearcherPublicationsController::class, 'store']);
Route::post('/insert-academic-degrees', [ResearcherAcademicDegreesController::class, 'store']);
Route::post('/insert-membership', [ResearcherMembershipsController::class, 'store']);
Route::post('/insert-project-request', [ProjectRequestController::class, 'store']);


Route::get('/', function () {
    return view('index');
});



Route::get('/commodities', function () {
    return view('index');
});
Route::get('/events', function () {
    return view('index');
});


Route::get('/programs', function () {
    return view('index');
});
Route::get('/projects', function () {
    return view('index');
});
Route::get('/researchers', function () {
    return view('index');
});
Route::get('/contact', function () {
    return view('index');
});


Route::get('/event/{slug}', function () {
    return view('index');
});
Route::get('/post/{slug}', function () {
    return view('index');
});
Route::get('/researcher/{slug}', function () {
    return view('index');
});
Route::get('/project/{slug}', function () {
    return view('index');
});
Route::get('/commodity/{slug}', function () {
    return view('index');
});
Route::get('/program/{slug}', function () {
    return view('index');
});

Route::get('/about-us/history', function () {
    return view('index');
});
Route::get('/about-us/vision-mision-and-goal', function () {
    return view('index');
});
Route::get('/about-us/organizational-structure', function () {
    return view('index');
});
Route::get('/about-us/consortium-members-agencies', function () {
    return view('index');
});
Route::get('/about-us/list-of-staff-members', function () {
    return view('index');
});



Route::get('/admin/{any}', function () {
    $user = [];
    $auth = Auth::user();
    if ($auth) {
        $user = $auth->only(['id', 'name', 'email', 'role']);
    }
    return view('admin/index')->with(["user" => collect($user)]);
})->where('any', '.*');
