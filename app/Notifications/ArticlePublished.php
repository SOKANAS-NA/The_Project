<?php

namespace App\Notifications;

use App\Models\Article;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ArticlePublished extends Notification implements ShouldQueue
{
    use Queueable;

    protected $article;

    public function __construct(Article $article)
    {
        $this->article = $article;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Nouvel article publié : ' . $this->article->title)
            ->greeting('Bonjour ' . $notifiable->name)
            ->line('Un nouvel article a été publié sur notre site.')
            ->line('Titre : ' . $this->article->title)
            ->line('Catégorie : ' . $this->article->category->name)
            ->action('Lire l\'article', url('/articles/' . $this->article->slug))
            ->line('Merci de votre fidélité !');
    }
} 