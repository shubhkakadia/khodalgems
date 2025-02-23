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
  User,
  MapPin,
} from "lucide-react";
import { toast } from "react-toastify";
import emailjs from '@emailjs/browser';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const offices = [
    {
      city: "Surat",
      type: "(Manufacturing)",
      address:
        "A-101, Kamla Estate Savani Road, Mini Bazar, Varachha, Kodiyar Nagar, Surat, Gujarat 395006, India",
      contactPerson: "Vinod vadsak",
      contactNumber: "+91 94096 58456",
      complete: true,
    },
    {
      city: "Mumbai",
      type: "",
      address: "AE-3071/72 Bharat Diamond Bourse, BKC, Bandra (E), Mumbai, Maharastra, 400051, India",
      contactPerson: "Rajesh Kakadia",
      contactNumber: "+91 99201 78885",
      complete: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Show loading toast
    const toastId = toast.loading("Sending message...");
    
    // EmailJS send email
    emailjs.send(
      process.env.REACT_APP_EMAILJS_SERVICE_ID, // Replace with your EmailJS service ID
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID, // Replace with your template ID
      {
        from_name: formData.name,
        reply_to: formData.email,
        phone: formData.phone,
        message: formData.message,
      },
      process.env.REACT_APP_EMAILJS_PUBLIC_KEY // Replace with your public key
    )
      .then(() => {
        // Update loading toast to success
        toast.update(toastId, {
          render: "Message sent successfully! ",
          type: "success",
          isLoading: false,
          autoClose: 3000
        });
        
        // Clear form
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      })
      .catch((error) => {
        // Update loading toast to error
        toast.update(toastId, {
          render: "Failed to send message. Please try again.",
          type: "error",
          isLoading: false,
          autoClose: 3000
        });
        console.error("EmailJS Error:", error);
      });
  };

  const openInGoogleMaps = (address) => {
    if (!address) return;
    const encodedAddress = encodeURIComponent(address);
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
      "_blank"
    );
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
          <div className="w-full h-[300px] md:h-auto">
            <div className="w-full h-full bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-4 p-4">
                {offices.map((office, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() =>
                      office.complete && openInGoogleMaps(office.address)
                    }
                  >
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-5 h-5 text-theme-500 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-lg">
                          {office.city}
                          {office.type && (
                            <span className="text-sm text-gray-600 ml-1">
                              {office.type}
                            </span>
                          )}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {office.country}
                        </p>
                      </div>
                    </div>

                    {office.complete ? (
                      <div className="mt-3 space-y-2">
                        <p className="text-sm text-gray-700">
                          {office.address}
                        </p>

                        {office.contactPerson && (
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4 text-gray-500" />
                            <p className="text-sm text-gray-600">
                              {office.contactPerson}
                            </p>
                          </div>
                        )}

                        {office.contactNumber && (
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-gray-500" />
                            <p className="text-sm text-gray-600">
                              {office.contactNumber}
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="mt-3 text-sm text-gray-500 italic">
                        Address details coming soon
                      </p>
                    )}
                  </div>
                ))}
              </div>
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
