import React, { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus("");

    try {
      // Using EmailJS to send emails
      // You'll need to set up a free account at emailjs.com and get your service ID, template ID, and public key
      
      // For now, using Formspree as an alternative (replace with your Formspree endpoint)
      const response = await fetch("https://formspree.io/f/mqagwlyr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ name: "", email: "", message: "" });
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center px-4 py-16 bg-linear-to-br from-slate-50 to-blue-50"
    >
      <div className="max-w-6xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Information */}
          <div className="space-y-6">
            <div>
              <h2 className="text-5xl font-bold text-slate-800 mb-4">
                Get in Touch
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Have questions about Friendship Blueprint or want to share your feedback? 
                We'd love to hear from you! Drop us a message and we'll get back to you as soon as possible.
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-4 bg-white rounded-lg p-5 shadow-sm border border-slate-200">
                <div className="text-3xl">📧</div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1">Email Us</h3>
                  <p className="text-slate-600">We typically respond within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white rounded-lg p-5 shadow-sm border border-slate-200">
                <div className="text-3xl">💡</div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1">Feedback & Ideas</h3>
                  <p className="text-slate-600">Share your thoughts to help us improve</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white rounded-lg p-5 shadow-sm border border-slate-200">
                <div className="text-3xl">🤝</div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1">Collaboration</h3>
                  <p className="text-slate-600">Interested in partnering with us?</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell us what's on your mind..."
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full font-semibold py-4 rounded-lg transition-all duration-200 shadow-md ${
                  isLoading
                    ? "bg-slate-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5"
                } text-white`}
              >
                {isLoading ? "Sending..." : "Send Message"}
              </button>
            </form>

            {/* Status Messages */}
            {status === "success" && (
              <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="font-semibold text-green-800">Message sent successfully!</p>
                  <p className="text-sm text-green-700">We'll get back to you soon.</p>
                </div>
              </div>
            )}

            {status === "error" && (
              <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
                <span className="text-2xl">❌</span>
                <div>
                  <p className="font-semibold text-red-800">Something went wrong</p>
                  <p className="text-sm text-red-700">Please try again later.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;