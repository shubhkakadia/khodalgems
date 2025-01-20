import React, { useState } from "react";
import Navbar from "./Navbar";
import {
  Phone,
  Facebook,
  Instagram,
  Youtube,
  Send,
  MessageCircle,
  Video,
  Mail,
  MessageSquare,
} from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    toast.success("Message sent successfully!");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="w-full px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header - Improved spacing and responsive text */}
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-theme-600 md:text-4xl">
            Contact Us
          </h2>
          <p className="mt-2 text-base text-gray-400 md:text-lg">
            Get in touch with our team
          </p>
        </div>

        {/* Main Content - Improved grid layout */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Left Column - Contact Form */}
          <div className="p-4 bg-white rounded-lg shadow-sm md:p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 text-sm border-2 rounded-lg border-gray-200 focus:ring-2 focus:ring-theme-500"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 text-sm border-2 rounded-lg border-gray-200 focus:ring-2 focus:ring-theme-500"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 text-sm border-2 rounded-lg border-gray-200 focus:ring-2 focus:ring-theme-500"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full p-3 text-sm border-2 rounded-lg border-gray-200 focus:ring-2 focus:ring-theme-500"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 font-medium text-white transition-colors rounded-lg bg-theme-600 hover:bg-theme-700"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Right Column - Map with responsive iframe */}
          <div className="w-full h-[300px] md:h-auto">
            <div className="w-full h-full bg-white rounded-lg shadow-sm overflow-hidden">
              <iframe
                title="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.516063161418!2d72.84461787471932!3d21.211375081482384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04fcef815cfdd%3A0x989b790402acb15a!2sKhodal%20Gems!5e0!3m2!1sen!2sin!4v1733311795998!5m2!1sen!2sin"
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Contact Information and Social Links - Improved responsive grid */}
        <div className="grid gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Contact Details */}
          <div className="p-4 bg-white rounded-lg shadow-sm md:p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Contact Details
            </h3>
            <div className="space-y-3">
              <a
                href="tel:+919409658456"
                className="flex items-center text-gray-600 hover:text-theme-600"
              >
                <Phone className="w-5 h-5 mr-2" />
                <span className="text-sm md:text-base">+91 94096 58456</span>
              </a>
              <a
                href="mailto:sales@khodalgems.com"
                className="flex items-center text-gray-600 hover:text-theme-600"
              >
                <Mail className="w-5 h-5 mr-2" />
                <span className="text-sm md:text-base">sales@khodalgems.com</span>
              </a>
            </div>
          </div>

          {/* Messaging Apps */}
          <div className="p-4 bg-white rounded-lg shadow-sm md:p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Message Us
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <MessageCircle />, text: 'WhatsApp', href: 'https://wa.me/+919409658456', hoverColor: 'hover:text-green-600' },
                { icon: <Video />, text: 'Skype', href: 'skype:vadsak_vin?chat', hoverColor: 'hover:text-blue-600' },
                { icon: <Send />, text: 'Telegram', href: 'https://t.me/khodalgems', hoverColor: 'hover:text-blue-500' },
                { icon: <MessageSquare />, text: 'WeChat', href: 'weixin://dl/chat?khodalgems', hoverColor: 'hover:text-green-500' },
                { icon: <MessageSquare />, text: 'Line', href: 'https://line.me/ti/p/n9QS7xxuin', hoverColor: 'hover:text-green-500' }
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center text-gray-600 ${item.hoverColor}`}
                >
                  <span className="w-5 h-5 mr-2">{item.icon}</span>
                  <span className="text-sm md:text-base">{item.text}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Social Media */}
          <div className="p-4 bg-white rounded-lg shadow-sm md:p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Follow Us</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <Facebook />, text: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61550287686175', hoverColor: 'hover:text-blue-600' },
                { icon: <Instagram />, text: 'Instagram', href: 'https://www.instagram.com/khodal_gems_mumbai/', hoverColor: 'hover:text-pink-600' },
                { icon: <Youtube />, text: 'YouTube', href: 'https://www.youtube.com/channel/UCp6bkMkNaQ90k-OT9KbKIXQ', hoverColor: 'hover:text-red-600' },
                {
                  icon: (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ),
                  text: 'Twitter',
                  href: 'https://x.com/khodalgems',
                  hoverColor: 'hover:text-gray-900'
                }
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center text-gray-600 ${item.hoverColor}`}
                >
                  <span className="w-5 h-5 mr-2">{item.icon}</span>
                  <span className="text-sm md:text-base">{item.text}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}