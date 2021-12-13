<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ApprovedUserNotification extends Notification
{
    use Queueable;
    private $userData;
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($userData)
    {
        $this->userData = $userData;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->greeting('Greetings ' + $this->userData['name'] + '!')
            ->line('Your account has successfully verified! You can login to our site now.')
            ->action('Login Now', url('/'))
            ->line('Thank you for signing up as a Researcher!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            'user_id' => $this->userData['user_id']
        ];
    }
}
