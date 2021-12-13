<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }
    // public function render($request, Exception $e)
    // {
    //     if ($this->isHttpException($e)) {
    //         switch ($e->getStatusCode()) {
    //                 // not found
    //             case 404:
    //                 return redirect()->guest('home');
    //                 break;

    //                 // internal error
    //             case '500':
    //                 return redirect()->guest('home');
    //                 break;

    //             default:
    //                 return $this->renderHttpException($e);
    //                 break;
    //         }
    //     } else {
    //         return parent::render($request, $e);
    //     }
    // }
}
