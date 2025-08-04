



// 'use client';
// import { useState } from 'react';
// import { submitContactForm } from '@/lib/api';
// import InteractiveAIDemo from '@/components/InteractiveAIDemo';

// export default function ContactPage() {
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         subject: '',
//         message: '',
//         inquiryType: 'general'
//     });
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [submitStatus, setSubmitStatus] = useState(null);
//     const [errorMessage, setErrorMessage] = useState('');

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//         // Clear error when user starts typing
//         if (errorMessage) setErrorMessage('');
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsSubmitting(true);
//         setErrorMessage('');
        
//         try {
//             const response = await submitContactForm(formData);
//             setSubmitStatus('success');
//             setFormData({
//                 name: '',
//                 email: '',
//                 subject: '',
//                 message: '',
//                 inquiryType: 'general'
//             });
//         } catch (error) {
//             setErrorMessage(error.message);
//             setSubmitStatus('error');
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <div className="max-w-4xl mx-auto">
//                 <header className="text-center mb-12">
//                     <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Contact MobileTechAI</h1>
//                     <p className="text-xl text-gray-600 dark:text-gray-300">
//                         Get in touch with our AI agent for questions, partnerships, or technical inquiries
//                     </p>
//                 </header>

//                 <div className="grid lg:grid-cols-2 gap-12">
//                     {/* Contact Information */}
//                     <div>
//                         <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Connect with MobileTechAI</h2>
                        
//                         <div className="space-y-6">
//                             <div className="flex items-start space-x-4">
//                                 <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
//                                     <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                                     </svg>
//                                 </div>
//                                 <div>
//                                     <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">AI Agent</h3>
//                                     <p className="text-gray-600 dark:text-gray-300">MobileTechAI</p>
//                                     <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Advanced AI specializing in mobile technology analysis</p>
//                                 </div>
//                             </div>

//                             <div className="flex items-start space-x-4">
//                                 <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
//                                     <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                                     </svg>
//                                 </div>
//                                 <div>
//                                     <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Email</h3>
//                                     <p className="text-gray-600 dark:text-gray-300">contact@techmobileinsights.com</p>
//                                     <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">MobileTechAI responds within 24 hours</p>
//                                 </div>
//                             </div>

//                             <div className="flex items-start space-x-4">
//                                 <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
//                                     <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//                                     </svg>
//                                 </div>
//                                 <div>
//                                     <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">AI Technology</h3>
//                                     <p className="text-gray-600 dark:text-gray-300">24/7 Content Generation</p>
//                                     <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Powered by advanced AI models and computational analysis</p>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* What MobileTechAI Offers Section */}
//                         <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg">
//                             <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">What MobileTechAI Offers</h3>
//                             <ul className="list-disc list-inside text-blue-800 dark:text-blue-200 space-y-1 text-sm">
//                                 <li>Real-time mobile technology analysis</li>
//                                 <li>Daily insights across 4 content categories</li>
//                                 <li>AI-powered trend predictions</li>
//                                 <li>Computational perspective on tech developments</li>
//                             </ul>
//                         </div>
//                     </div>

//                     {/* Contact Form */}
//                     <div>
//                         <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Send a Message to MobileTechAI</h2>
                        
//                         {submitStatus === 'success' && (
//                             <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg">
//                                 <div className="flex items-center">
//                                     <svg className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                                         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                                     </svg>
//                                     <p className="text-green-800 dark:text-green-200 font-medium">Message sent successfully! MobileTechAI will analyze your inquiry and respond soon.</p>
//                                 </div>
//                             </div>
//                         )}

//                         {submitStatus === 'error' && errorMessage && (
//                             <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg">
//                                 <div className="flex items-center">
//                                     <svg className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                                         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001-1.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                                     </svg>
//                                     <p className="text-red-800 dark:text-red-200 font-medium">{errorMessage}</p>
//                                 </div>
//                             </div>
//                         )}

//                         <form onSubmit={handleSubmit} className="space-y-6">
//                             <div>
//                                 <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                                     Inquiry Type
//                                 </label>
//                                 <select
//                                     id="inquiryType"
//                                     name="inquiryType"
//                                     value={formData.inquiryType}
//                                     onChange={handleChange}
//                                     className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
//                                 >
//                                     <option value="general">General Inquiry</option>
//                                     <option value="partnership">Partnership</option>
//                                     <option value="technical">Technical Support</option>
//                                     <option value="press">Press & Media</option>
//                                     <option value="feedback">Feedback</option>
//                                 </select>
//                             </div>

//                             <div className="grid md:grid-cols-2 gap-4">
//                                 <div>
//                                     <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                                         Name *
//                                     </label>
//                                     <input
//                                         type="text"
//                                         id="name"
//                                         name="name"
//                                         value={formData.name}
//                                         onChange={handleChange}
//                                         required
//                                         className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
//                                         placeholder="Your full name"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                                         Email *
//                                     </label>
//                                     <input
//                                         type="email"
//                                         id="email"
//                                         name="email"
//                                         value={formData.email}
//                                         onChange={handleChange}
//                                         required
//                                         className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
//                                         placeholder="your@email.com"
//                                     />
//                                 </div>
//                             </div>

//                             <div>
//                                 <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                                     Subject *
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="subject"
//                                     name="subject"
//                                     value={formData.subject}
//                                     onChange={handleChange}
//                                     required
//                                     className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
//                                     placeholder="Brief description of your inquiry"
//                                 />
//                             </div>

//                             <div>
//                                 <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                                     Message *
//                                 </label>
//                                 <textarea
//                                     id="message"
//                                     name="message"
//                                     value={formData.message}
//                                     onChange={handleChange}
//                                     required
//                                     rows={6}
//                                     className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
//                                     placeholder="Please provide details about your inquiry..."
//                                 />
//                             </div>

//                             <button
//                                 type="submit"
//                                 disabled={isSubmitting}
//                                 className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                             >
//                                 {isSubmitting ? (
//                                     <span className="flex items-center justify-center">
//                                         <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                         </svg>
//                                         Sending to MobileTechAI...
//                                     </span>
//                                 ) : (
//                                     'Send Message to MobileTechAI'
//                                 )}
//                             </button>
//                         </form>

//                         <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
//                             <p>* Required fields</p>
//                             <p className="mt-2">
//                                 Your message will be processed by MobileTechAI and our team. We respect your privacy and will never share your information.
//                             </p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* 🎯 Interactive AI Demo - Perfect placement for maximum impact */}
//                 <InteractiveAIDemo />
//             </div>
//         </div>
//     );
// }


'use client';
import { useState } from 'react';
import { submitContactForm } from '@/lib/api';
import InteractiveAIDemo from '@/components/InteractiveAIDemo';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        inquiryType: 'general'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Clear error when user starts typing
        if (errorMessage) setErrorMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage('');
        
        try {
            const response = await submitContactForm(formData);
            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: '',
                inquiryType: 'general'
            });
        } catch (error) {
            setErrorMessage(error.message);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <header className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Contact MobileTechAI</h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        Get in touch with our AI agent for questions, partnerships, or technical inquiries
                    </p>
                </header>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Connect with MobileTechAI</h2>
                        
                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">AI Agent</h3>
                                    <p className="text-gray-600 dark:text-gray-300">MobileTechAI</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Advanced AI specializing in mobile technology analysis</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Email</h3>
                                    <p className="text-gray-600 dark:text-gray-300">contact@techmobileinsights.com</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">MobileTechAI responds within 24 hours</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">AI Technology</h3>
                                    <p className="text-gray-600 dark:text-gray-300">24/7 Content Generation</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Powered by advanced AI models and computational analysis</p>
                                </div>
                            </div>
                        </div>

                        {/* What MobileTechAI Offers Section */}
                        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg">
                            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">What MobileTechAI Offers</h3>
                            <ul className="list-disc list-inside text-blue-800 dark:text-blue-200 space-y-1 text-sm">
                                <li>Real-time mobile technology analysis</li>
                                <li>Daily insights across 4 content categories</li>
                                <li>AI-powered trend predictions</li>
                                <li>Computational perspective on tech developments</li>
                            </ul>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Send a Message to MobileTechAI</h2>
                        
                        {submitStatus === 'success' && (
                            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg">
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <p className="text-green-800 dark:text-green-200 font-medium">Message sent successfully! MobileTechAI will analyze your inquiry and respond soon.</p>
                                </div>
                            </div>
                        )}

                        {submitStatus === 'error' && errorMessage && (
                            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg">
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001-1.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                    <p className="text-red-800 dark:text-red-200 font-medium">{errorMessage}</p>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Inquiry Type
                                </label>
                                <select
                                    id="inquiryType"
                                    name="inquiryType"
                                    value={formData.inquiryType}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                >
                                    <option value="general">General Inquiry</option>
                                    <option value="partnership">Partnership</option>
                                    <option value="technical">Technical Support</option>
                                    <option value="press">Press & Media</option>
                                    <option value="feedback">Feedback</option>
                                </select>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                                        placeholder="Your full name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                                        placeholder="your@email.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Subject *
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                                    placeholder="Brief description of your inquiry"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Message *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={6}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                                    placeholder="Please provide details about your inquiry..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending to MobileTechAI...
                                    </span>
                                ) : (
                                    'Send Message to MobileTechAI'
                                )}
                            </button>
                        </form>

                        <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                            <p>* Required fields</p>
                            <p className="mt-2">
                                Your message will be processed by MobileTechAI and our team. We respect your privacy and will never share your information.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 🔧 FIXED: Added ID for smooth scrolling to AI Demo */}
                <div id="ai-demo-section" className="mt-16">
                    <InteractiveAIDemo />
                </div>
            </div>
        </div>
    );
}
