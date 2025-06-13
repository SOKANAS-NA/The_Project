<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class WelcomeNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Bienvenue sur notre site de news sportives !')
            ->greeting('Bonjour ' . $notifiable->name)
            ->line('Nous sommes ravis de vous accueillir sur notre plateforme.')
            ->line('Vous pouvez dès maintenant :')
            ->line('- Lire les derniers articles')
            ->line('- Commenter les articles')
            ->line('- Partager vos articles préférés')
            ->action('Commencer à explorer', url('/'))
            ->line('Merci de votre inscription !');
    }
} 