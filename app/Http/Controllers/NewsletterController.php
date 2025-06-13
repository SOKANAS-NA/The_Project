<?php

namespace App\Http\Controllers;

use App\Models\Newsletter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\NewsletterMail;

class NewsletterController extends Controller
{
    public function subscribe(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:newsletters,email',
            'preferences' => 'nullable|array'
        ]);

        Newsletter::create([
            'email' => $request->email,
            'preferences' => $request->preferences
        ]);

        return response()->json(['message' => 'Inscription à la newsletter réussie !']);
    }

    public function unsubscribe($email)
    {
        $newsletter = Newsletter::where('email', $email)->first();
        
        if ($newsletter) {
            $newsletter->update(['is_active' => false]);
            return response()->json(['message' => 'Désinscription réussie !']);
        }

        return response()->json(['message' => 'Email non trouvé'], 404);
    }

    public function sendNewsletter(Request $request)
    {
        $request->validate([
            'subject' => 'required|string',
            'content' => 'required|string',
            'category' => 'nullable|string'
        ]);

        $subscribers = Newsletter::where('is_active', true)
            ->when($request->category, function ($query) use ($request) {
                return $query->whereJsonContains('preferences->categories', $request->category);
            })
            ->get();

        foreach ($subscribers as $subscriber) {
            Mail::to($subscriber->email)->queue(new NewsletterMail(
                $request->subject,
                $request->content
            ));
        }

        return response()->json(['message' => 'Newsletter envoyée avec succès !']);
    }
} 