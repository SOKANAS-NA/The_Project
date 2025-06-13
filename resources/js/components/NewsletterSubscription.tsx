import React, { useState } from 'react';
import axios from 'axios';

interface NewsletterFormData {
    email: string;
    preferences: string[];
}

const NewsletterSubscription: React.FC = () => {
    const [formData, setFormData] = useState<NewsletterFormData>({
        email: '',
        preferences: []
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('/newsletter/subscribe', formData);
            setMessage(response.data.message);
            setError('');
            setFormData({ email: '', preferences: [] });
        } catch (err: any) {
            setError(err.response?.data?.message || 'Une erreur est survenue');
            setMessage('');
        }
    };

    const handlePreferenceChange = (category: string) => {
        setFormData(prev => ({
            ...prev,
            preferences: prev.preferences.includes(category)
                ? prev.preferences.filter(p => p !== category)
                : [...prev.preferences, category]
        }));
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Inscription à la Newsletter</h2>
            
            {message && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    {message}
                </div>
            )}
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Préférences
                    </label>
                    <div className="space-y-2">
                        {['Football', 'Tennis', 'Basketball', 'Rugby'].map((category) => (
                            <label key={category} className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={formData.preferences.includes(category)}
                                    onChange={() => handlePreferenceChange(category)}
                                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                <span className="ml-2">{category}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    S'inscrire
                </button>
            </form>
        </div>
    );
};

export default NewsletterSubscription; 