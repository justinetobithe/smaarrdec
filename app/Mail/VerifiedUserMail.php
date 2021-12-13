<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class VerifiedUserMail extends Mailable
{
    use Queueable, SerializesModels;
    public $userData;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($userData)
    {
        $this->userData = $userData;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from('smaarrdec@gmail.com', 'SMAARRDEC Account Verification')
            ->subject('Account Verification')
            ->markdown('verified.user.mail')
            ->with('userData', $this->userData);
    }
}
