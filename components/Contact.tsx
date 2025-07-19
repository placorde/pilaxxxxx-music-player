
import React from 'react';
import { SoundcloudIcon, InstagramIcon } from './icons';

const Contact: React.FC = () => {
  return (
    <footer className="bg-zinc-900/50 border-t border-zinc-800 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-zinc-400">
        <h3 className="font-orbitron text-2xl font-bold text-white mb-4">Get In Touch</h3>
        <p className="mb-6">For bookings, collaborations, or just to say hi:</p>
        <a href="mailto:contact@pilaxxxxx.com" className="text-cyan-400 hover:text-cyan-300 transition-colors text-lg">
          contact@pilaxxxxx.com
        </a>
        <div className="flex justify-center gap-6 mt-8">
          <a href="#" aria-label="SoundCloud" className="text-zinc-400 hover:text-white transition-colors">
            <SoundcloudIcon />
          </a>
          <a href="#" aria-label="Instagram" className="text-zinc-400 hover:text-white transition-colors">
            <InstagramIcon />
          </a>
        </div>
        <p className="mt-10 text-sm text-zinc-500">
          &copy; {new Date().getFullYear()} Pilaxxxxx. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Contact;
