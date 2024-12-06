import React, { useState } from "react";
import Sidebar from "./Sidebar";
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
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ContactUs() {
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
    <div className="flex w-full">
      <div className="flex-none md:w-20 w-14">
        <Sidebar />
      </div>

      <div className="flex-auto m-4 space-y-6 w-full">
        {/* Header */}
        <div className="sticky top-0 bg-main-bg z-[5] py-4">
          <h2 className="text-4xl font-semibold text-theme-600">Contact Us</h2>
          <p className="text-lg text-gray-400">Get in touch with our team</p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column - Contact Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border-gray-200 dark:border-gray-700 p-2.5 text-sm focus:ring-2 focus:ring-theme-500 border-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border-gray-200 dark:border-gray-700 p-2.5 text-sm focus:ring-2 focus:ring-theme-500 border-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border-gray-200 dark:border-gray-700 p-2.5 text-sm focus:ring-2 focus:ring-theme-500 border-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 ">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full rounded-lg border-gray-200 dark:border-gray-700 p-2.5 text-sm focus:ring-2 focus:ring-theme-500 border-2"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-theme-600 text-white py-2.5 rounded-lg hover:bg-theme-700 transition-colors font-medium"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Right Column - Map */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
              <iframe
                title="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.516063161418!2d72.84461787471932!3d21.211375081482384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04fcef815cfdd%3A0x989b790402acb15a!2sKhodal%20Gems!5e0!3m2!1sen!2sin!4v1733311795998!5m2!1sen!2sin"
                width="700"
                height="500"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Contact Information and Social Links */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Contact Methods */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Contact Details
            </h3>
            <div className="space-y-3">
              <a
                href="tel:+919409658456"
                className="flex items-center text-gray-600 dark:text-gray-300 hover:text-theme-600"
              >
                <Phone className="h-5 w-5 mr-2" />
                +91 94096 58456
              </a>
              <a
                href="mailto:contact@example.com"
                className="flex items-center text-gray-600 dark:text-gray-300 hover:text-theme-600"
              >
                <Mail className="h-5 w-5 mr-2" />
                sales@khodalgems.com
              </a>
            </div>
          </div>

          {/* Messaging Apps */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Message Us</h3>
            <div className="grid grid-cols-2 gap-3">
              <a
                href="https://wa.me/+919409658456"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-600 dark:text-gray-300 hover:text-green-600"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                WhatsApp
              </a>
              <a
                href="skype:vadsak_vin?chat"
                className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600"
              >
                <Video className="h-5 w-5 mr-2" />
                Skype
              </a>
              <a
                href="https://t.me/khodalgems"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-500"
              >
                <Send className="h-5 w-5 mr-2" />
                Telegram
              </a>
              <a
                href="weixin://dl/chat?khodalgems"
                className="flex items-center text-gray-600 dark:text-gray-300 hover:text-green-500"
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                WeChat
              </a>
              <a
                href="https://line.me/ti/p/n9QS7xxuin"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-600 dark:text-gray-300 hover:text-green-500"
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                Line
              </a>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Follow Us</h3>
            <div className="grid grid-cols-2 gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=61550287686175"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600"
              >
                <Facebook className="h-5 w-5 mr-2" />
                Facebook
              </a>
              <a
                href="https://www.instagram.com/khodal_gems_mumbai/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-600 dark:text-gray-300 hover:text-pink-600"
              >
                <Instagram className="h-5 w-5 mr-2" />
                Instagram
              </a>
              <a
                href="https://www.youtube.com/channel/UCp6bkMkNaQ90k-OT9KbKIXQ"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-600 dark:text-gray-300 hover:text-red-600"
              >
                <Youtube className="h-5 w-5 mr-2" />
                YouTube
              </a>
              <a
                href="https://x.com/khodalgems"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900"
              >
                <svg
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Twitter
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
