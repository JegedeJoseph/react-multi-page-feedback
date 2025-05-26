import React, { useState } from 'react';

// Main App component
const App = () => {
    // State to manage the current page view
    const [currentPage, setCurrentPage] = useState('home');
    // State to store user form data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: '',
        feedback: ''
    });
    // State for form validation errors
    const [errors, setErrors] = useState({});

    // Function to navigate between pages
    const navigateTo = (page) => {
        setCurrentPage(page);
        // Clear form data and errors when navigating away from the form
        if (page !== 'form') {
            setFormData({
                name: '',
                email: '',
                age: '',
                feedback: ''
            });
            setErrors({});
        }
    };

    // Handle input changes for the form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
        // Clear error for the field as user types
        if (errors[name]) {
            setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
        }
    };

    // Validate form inputs
    const validateForm = () => {
        let newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required.';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid.';
        }
        if (!formData.age.trim()) {
            newErrors.age = 'Age is required.';
        } else if (isNaN(formData.age) || parseInt(formData.age) < 1) {
            newErrors.age = 'Age must be a positive number.';
        }
        if (!formData.feedback.trim()) {
            newErrors.feedback = 'Feedback message is required.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Form submitted:', formData);
            navigateTo('confirmation');
        }
    };

    // Render the current page based on the currentPage state
    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return (
                    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
                        <div className="bg-white p-8 rounded-xl shadow-2xl text-center max-w-lg w-full">
                            <h1 className="text-4xl font-extrabold text-gray-900 mb-6 font-inter">Welcome to Oleander Catering Services!</h1>
                            <p className="text-lg text-gray-700 mb-8 font-inter">
                                This is a Bill of Quantity Application.
                            </p>
                            <button
                                onClick={() => navigateTo('form')}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 font-inter"
                            >
                                Get Started
                            </button>
                        </div>
                    </div>
                );
            case 'form':
                return (
                    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-400 to-blue-500 p-4">
                        <div className="bg-white p-8 rounded-xl shadow-2xl max-w-xl w-full">
                            <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center font-inter">Your Information</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 font-inter">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`mt-1 block w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm font-inter`}
                                        placeholder="John Doe"
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-red-600 font-inter">{errors.name}</p>}
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 font-inter">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`mt-1 block w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm font-inter`}
                                        placeholder="john.doe@example.com"
                                    />
                                    {errors.email && <p className="mt-1 text-sm text-red-600 font-inter">{errors.email}</p>}
                                </div>
                                <div>
                                    <label htmlFor="age" className="block text-sm font-medium text-gray-700 font-inter">Age</label>
                                    <input
                                        type="number"
                                        id="age"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleChange}
                                        className={`mt-1 block w-full px-4 py-2 border ${errors.age ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm font-inter`}
                                        placeholder="30"
                                    />
                                    {errors.age && <p className="mt-1 text-sm text-red-600 font-inter">{errors.age}</p>}
                                </div>
                                <div>
                                    <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 font-inter">Your Message</label>
                                    <textarea
                                        id="feedback"
                                        name="feedback"
                                        rows="4"
                                        value={formData.feedback}
                                        onChange={handleChange}
                                        className={`mt-1 block w-full px-4 py-2 border ${errors.feedback ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm font-inter`}
                                        placeholder="Tell us what you think..."
                                    ></textarea>
                                    {errors.feedback && <p className="mt-1 text-sm text-red-600 font-inter">{errors.feedback}</p>}
                                </div>
                                <div className="flex justify-between items-center">
                                    <button
                                        type="button"
                                        onClick={() => navigateTo('home')}
                                        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-full shadow-md transition duration-300 ease-in-out font-inter"
                                    >
                                        Back to Home
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 font-inter"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                );
            case 'confirmation':
                return (
                    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-teal-400 to-cyan-500 p-4">
                        <div className="bg-white p-8 rounded-xl shadow-2xl text-center max-w-lg w-full">
                            <h2 className="text-3xl font-extrabold text-gray-900 mb-6 font-inter">Thank You for Your Feedback!</h2>
                            <p className="text-lg text-gray-700 mb-4 font-inter">
                                We've received your information:
                            </p>
                            <div className="text-left bg-gray-50 p-4 rounded-lg mb-8 border border-gray-200">
                                <p className="text-gray-800 font-inter"><strong>Name:</strong> {formData.name}</p>
                                <p className="text-gray-800 font-inter"><strong>Email:</strong> {formData.email}</p>
                                <p className="text-gray-800 font-inter"><strong>Age:</strong> {formData.age}</p>
                                <p className="text-gray-800 font-inter"><strong>Message:</strong> {formData.feedback}</p>
                            </div>
                            <button
                                onClick={() => navigateTo('home')}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 font-inter"
                            >
                                Go Back to Home
                            </button>
                        </div>
                    </div>
                );
            case 'about':
                return (
                    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 p-4">
                        <div className="bg-white p-8 rounded-xl shadow-2xl text-center max-w-lg w-full">
                            <h2 className="text-3xl font-extrabold text-gray-900 mb-6 font-inter">About Us</h2>
                            <p className="text-lg text-gray-700 mb-4 font-inter">
                                We are a passionate team dedicated to creating amazing applications.
                                Our goal is to develop a functional and aesthetic bill of quantity web application  for Oleander Catering services.
                            </p>
                            <p className="text-lg text-gray-700 mb-8 font-inter">
                                Be on the Watchout for the first version of Oleander Catering Services Bill of Quantity Web Application.
                            </p>
                            <button
                                onClick={() => navigateTo('home')}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 font-inter"
                            >
                                Back to Home
                            </button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="font-inter">
            {/* Global styles and Tailwind CSS setup */}
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <script src="https://cdn.tailwindcss.com"></script>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet" />
                <style>
                    {`
                    body {
                        font-family: 'Inter', sans-serif;
                    }
                    `}
                </style>
            </head>
            {/* Navigation Bar */}
            <nav className="fixed top-0 left-0 right-0 bg-gray-800 p-4 shadow-lg z-50">
                <ul className="flex justify-center space-x-6">
                    <li>
                        <button
                            onClick={() => navigateTo('home')}
                            className="text-white hover:text-indigo-300 transition duration-200 font-inter"
                        >
                            Home
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => navigateTo('form')}
                            className="text-white hover:text-indigo-300 transition duration-200 font-inter"
                        >
                            Feedback Form
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => navigateTo('about')}
                            className="text-white hover:text-indigo-300 transition duration-200 font-inter"
                        >
                            About Us
                        </button>
                    </li>
                </ul>
            </nav>

            {/* Render the current page with padding to account for fixed nav */}
            <div className="pt-16"> {/* Add padding-top to prevent content from being hidden by the fixed nav */}
                {renderPage()}
            </div>
        </div>
    );
};

export default App;


