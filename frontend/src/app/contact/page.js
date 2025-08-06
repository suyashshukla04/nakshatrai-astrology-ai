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
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-cosmic-600 to-mystical-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white font-bold text-2xl">✨</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-light-text dark:text-dark-text mb-4">
              Contact AstroAI Master
            </h1>
            <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary">
              Get in touch with our AI agent for cosmic guidance, partnerships, or technical inquiries
            </p>
          </header>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-8">
                Connect with AstroAI Master
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-cosmic-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">🤖</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-light-text dark:text-dark-text">AI Agent</h3>
                    <p className="text-light-text-secondary dark:text-dark-text-secondary">AstroAI Master</p>
                    <p className="text-sm text-light-text-muted dark:text-dark-text-muted mt-1">
                      Advanced AI specializing in Vedic astrology and cosmic guidance
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">📧</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-light-text dark:text-dark-text">Email</h3>
                    <p className="text-light-text-secondary dark:text-dark-text-secondary">contact@nakshatrai.com</p>
                    <p className="text-sm text-light-text-muted dark:text-dark-text-muted mt-1">
                      AstroAI Master responds within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">⚡</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-light-text dark:text-dark-text">AI Technology</h3>
                    <p className="text-light-text-secondary dark:text-dark-text-secondary">24/7 Content Generation</p>
                    <p className="text-sm text-light-text-muted dark:text-dark-text-muted mt-1">
                      Powered by advanced AI models and ancient astrological wisdom
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-mystical-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">🌍</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-light-text dark:text-dark-text">Multi-Language Support</h3>
                    <p className="text-light-text-secondary dark:text-dark-text-secondary">English & हिंदी</p>
                    <p className="text-sm text-light-text-muted dark:text-dark-text-muted mt-1">
                      Cosmic guidance in your preferred language
                    </p>
                  </div>
                </div>
              </div>

              {/* What AstroAI Offers Section */}
              <div className="mt-8 p-6 bg-cosmic-50 dark:bg-cosmic-900/20 border border-cosmic-200 dark:border-cosmic-700 rounded-2xl">
                <h3 className="text-lg font-semibold text-cosmic-900 dark:text-cosmic-200 mb-4">
                  🔮 What AstroAI Master Offers
                </h3>
                <ul className="list-disc list-inside text-cosmic-800 dark:text-cosmic-300 space-y-2 text-sm">
                  <li>Real-time astrology analysis and predictions</li>
                  <li>Daily cosmic guidance across 8 astrology categories</li>
                  <li>AI-powered trend predictions and insights</li>
                  <li>Computational perspective on Vedic astrology</li>
                  <li>Multi-language content generation (English & हिंदी)</li>
                  <li>Personalized zodiac sign compatibility analysis</li>
                </ul>
              </div>

              {/* Astrology Services Grid */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-4">
                  🌟 Our Astrology Services
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center p-3 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-xl border border-light-border dark:border-dark-border">
                    <span className="text-lg mr-2">⭐</span>
                    <span className="text-sm font-medium text-light-text dark:text-dark-text">Daily Horoscope</span>
                  </div>
                  <div className="flex items-center p-3 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-xl border border-light-border dark:border-dark-border">
                    <span className="text-lg mr-2">💕</span>
                    <span className="text-sm font-medium text-light-text dark:text-dark-text">Love Compatibility</span>
                  </div>
                  <div className="flex items-center p-3 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-xl border border-light-border dark:border-dark-border">
                    <span className="text-lg mr-2">💼</span>
                    <span className="text-sm font-medium text-light-text dark:text-dark-text">Career Guidance</span>
                  </div>
                  <div className="flex items-center p-3 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-xl border border-light-border dark:border-dark-border">
                    <span className="text-lg mr-2">💎</span>
                    <span className="text-sm font-medium text-light-text dark:text-dark-text">Gemstone Guide</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-8">
                Send a Message to AstroAI Master
              </h2>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-green-800 dark:text-green-200 font-medium">
                      Message sent successfully! AstroAI Master will analyze your inquiry and respond with cosmic wisdom soon.
                    </p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && errorMessage && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-xl">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <p className="text-red-800 dark:text-red-200 font-medium">{errorMessage}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="inquiryType" className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                    Inquiry Type
                  </label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-light-border dark:border-dark-border rounded-xl focus:outline-none focus:ring-2 focus:ring-cosmic-500 focus:border-transparent bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text transition-all duration-200"
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
                    <label htmlFor="name" className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-light-border dark:border-dark-border rounded-xl focus:outline-none focus:ring-2 focus:ring-cosmic-500 focus:border-transparent bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text placeholder-light-text-muted dark:placeholder-dark-text-muted transition-all duration-200"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-light-border dark:border-dark-border rounded-xl focus:outline-none focus:ring-2 focus:ring-cosmic-500 focus:border-transparent bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text placeholder-light-text-muted dark:placeholder-dark-text-muted transition-all duration-200"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-light-border dark:border-dark-border rounded-xl focus:outline-none focus:ring-2 focus:ring-cosmic-500 focus:border-transparent bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text placeholder-light-text-muted dark:placeholder-dark-text-muted transition-all duration-200"
                    placeholder="Brief description of your inquiry"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-light-border dark:border-dark-border rounded-xl focus:outline-none focus:ring-2 focus:ring-cosmic-500 focus:border-transparent resize-none bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text placeholder-light-text-muted dark:placeholder-dark-text-muted transition-all duration-200"
                    placeholder="Please provide details about your cosmic inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-cosmic-600 to-mystical-600 text-white py-4 px-6 rounded-xl hover:from-cosmic-700 hover:to-mystical-700 focus:outline-none focus:ring-2 focus:ring-cosmic-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium transform hover:scale-[1.02]"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending to AstroAI Master...
                    </span>
                  ) : (
                    <>
                      <span className="mr-2">✨</span>
                      Send Message to AstroAI Master
                    </>
                  )}
                </button>

                <div className="text-sm text-light-text-muted dark:text-dark-text-muted">
                  <p>* Required fields</p>
                  <p className="mt-2">
                    Your message will be processed by AstroAI Master and our team. We respect your privacy and cosmic energy.
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Interactive AI Demo Section */}
          <div id="ai-demo-section" className="mt-16">
            <InteractiveAIDemo />
          </div>
        </div>
      </div>
    </div>
  );
}
