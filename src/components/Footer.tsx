"use client";

import { Facebook, Linkedin, Twitter } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-stone-950 px-4 sm:px-6 md:px-12 py-12 sm:py-16 mt-auto border-t border-neutral-800">
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 sm:gap-10">
        {/* Home */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-4">Home</h3>
          <ul className="space-y-2 sm:space-y-3 text-gray-300 text-sm sm:text-base">
            <li>Categories</li>
            <li>Devices</li>
            <li>Pricing</li>
            <li>FAQ</li>
          </ul>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-4">Explore</h3>
          <ul className="space-y-2 sm:space-y-3 text-gray-300 text-sm sm:text-base">
            <li>Content Owners</li>
            <li>Investors & Partners</li>
            <li>Marketing Campaigns</li>
            <li>Improvements</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-4">Support</h3>
          <p className="text-neutral-400 text-sm sm:text-base">Contact Us</p>
        </div>

        {/* Subscription */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-4">
            Subscription
          </h3>
          <ul className="space-y-2 sm:space-y-3 text-neutral-400 text-sm sm:text-base">
            <li>Plans</li>
            <li>Features</li>
          </ul>
        </div>

        {/* Social */}
        <div className="col-span-2 sm:col-span-3 lg:col-span-1">
          <h3 className="text-lg sm:text-xl font-semibold mb-4">
            Connect With Us
          </h3>
          <div className="flex gap-3 sm:gap-4 flex-wrap">
            <div className="p-3 sm:p-4 rounded-lg bg-zinc-900 border border-neutral-800">
              <Facebook size={20} />
            </div>
            <div className="p-3 sm:p-4 rounded-lg bg-zinc-900 border border-neutral-800">
              <Twitter size={20} />
            </div>
            <div className="p-3 sm:p-4 rounded-lg bg-zinc-900 border border-neutral-800">
              <Linkedin size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto mt-10 sm:mt-12 border-t border-neutral-800 pt-6 flex flex-col sm:flex-row justify-between gap-4 text-neutral-400 text-xs sm:text-sm text-center sm:text-left">
        <span>@2025 Nabtt. All Rights Reserved</span>

        <div className="flex flex-wrap justify-center sm:justify-end gap-3 sm:gap-4">
          <span>Terms of Use</span>
          <span>Privacy Policy</span>
          <span>Cookie Policy</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
