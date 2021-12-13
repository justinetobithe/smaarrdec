@component('mail::message')
# Greetings, {{ $userData['name']}}

Your account has successfully verified! You can login to our site now.


@component('mail::button', ['url' => 'https://smaarrdec.slims.usep.edu.ph/smaarrdec/admin/login'])
Login to our site now
@endcomponent

Best,<br>
{{ config('app.name') }} Admin 
@endcomponent