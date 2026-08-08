import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Share2, Play } from 'lucide-react';

function AppDetails({ app, onBack }) {
  const [showShare, setShowShare] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen">
      <div className="relative h-96 text-white overflow-hidden" style={{ background: `linear-gradient(135deg, ${app.color1}, ${app.color2})` }}>
        <div className="relative z-10 h-full flex flex-col items-start justify-end p-8">
          <div className="flex items-start space-x-6 w-full">
            <div className="text-6xl">{app.icon}</div>
            <div className="flex-1">
              <h1 className="text-5xl font-bold mb-2">{app.name}</h1>
              <p className="text-white/90 text-lg">{app.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onBack} className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors mb-12">
          <ArrowLeft size={20} />
          <span>Back to Apps</span>
        </motion.button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="glass-effect rounded-xl p-6">
                <h3 className="text-sm font-semibold text-slate-600 mb-2">Category</h3>
                <p className="text-2xl font-bold text-slate-900 capitalize">{app.category}</p>
              </div>
              <div className="glass-effect rounded-xl p-6">
                <h3 className="text-sm font-semibold text-slate-600 mb-2">Created</h3>
                <p className="text-2xl font-bold text-slate-900">{new Date(app.createdAt).toLocaleDateString('fr-FR')}</p>
              </div>
            </div>

            <div className="glass-effect rounded-xl p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Features</h2>
              <div className="space-y-4">
                {['Real-time tracking', 'AI-powered feedback', 'Personalized coaching', 'Community challenges', 'Performance analytics', 'Mobile interface'].map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-pink-500" />
                    <span className="text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity">
              <Play size={20} />
              <span>Launch App</span>
            </motion.button>

            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowShare(!showShare)} className="w-full flex items-center justify-center space-x-2 px-6 py-3 border-2 border-slate-200 text-slate-900 rounded-lg font-semibold hover:bg-slate-50 transition-colors">
              <Share2 size={20} />
              <span>Share</span>
            </motion.button>

            {showShare && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass-effect rounded-lg p-4 space-y-3">
                <p className="text-sm font-medium text-slate-900">Share this app:</p>
                <div className="space-y-2">
                  <input type="text" readOnly value={`${window.location.origin}${window.location.pathname}#app-${app.id}`} className="w-full px-3 py-2 text-xs bg-slate-100 rounded border border-slate-200 focus:outline-none" />
                  <button onClick={() => { navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}#app-${app.id}`); alert('Link copied!'); }} className="w-full px-3 py-2 bg-blue-500 text-white text-sm rounded font-medium hover:bg-blue-600 transition-colors">
                    Copy Link
                  </button>
                </div>
              </motion.div>
            )}

            <div className="glass-effect rounded-xl p-6 space-y-4">
              <h3 className="font-semibold text-slate-900">App Stats</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Version</span>
                  <span className="font-medium text-slate-900">1.0</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Status</span>
                  <span className="font-medium text-green-600">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default AppDetails;