import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';

function AppBuilder({ onCreateApp }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'singing',
    color1: '#ec4899',
    color2: '#3b82f6',
    icon: '🎤',
  });

  const categories = [
    { id: 'singing', label: 'Singing', icon: '🎤' },
    { id: 'dance', label: 'Dance', icon: '💃' },
    { id: 'rap', label: 'Rap', icon: '🎙️' },
    { id: 'korean', label: 'Korean', icon: '🇰🇷' },
    { id: 'sport', label: 'Sport', icon: '⚽' },
    { id: 'nutrition', label: 'Nutrition', icon: '🥗' },
  ];

  const colorPresets = [
    { color1: '#ec4899', color2: '#3b82f6', name: 'Pink-Blue' },
    { color1: '#f97316', color2: '#eab308', name: 'Orange-Yellow' },
    { color1: '#06b6d4', color2: '#10b981', name: 'Cyan-Green' },
    { color1: '#8b5cf6', color2: '#ec4899', name: 'Purple-Pink' },
    { color1: '#ef4444', color2: '#f97316', name: 'Red-Orange' },
    { color1: '#6366f1', color2: '#3b82f6', name: 'Indigo-Blue' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategorySelect = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    setFormData(prev => ({ ...prev, category: categoryId, icon: category.icon }));
  };

  const handleColorSelect = (color1, color2) => {
    setFormData(prev => ({ ...prev, color1, color2 }));
  };

  const handleSubmit = () => {
    if (formData.name.trim() && formData.description.trim()) {
      onCreateApp(formData);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-2xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-slate-600">Step {step} of 3</span>
            <div className="flex items-center space-x-2">
              {[1, 2, 3].map(s => (
                <div key={s} className={`h-2 w-8 rounded-full transition-all ${s <= step ? 'bg-pink-500' : 'bg-slate-200'}`} />
              ))}
            </div>
          </div>
        </div>

        <div className="glass-effect rounded-3xl p-8 md:p-12">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">Basic Information</h2>
                  <p className="text-slate-600">Tell us about your app</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">App Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="e.g., Vocal Mastery" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Description</label>
                    <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Describe what your app does..." rows="4" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all resize-none" />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">Customize Your App</h2>
                  <p className="text-slate-600">Choose category and colors</p>
                </div>

                <div className="space-y-8">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-4">Category</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {categories.map(cat => (
                        <motion.button key={cat.id} onClick={() => handleCategorySelect(cat.id)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={`p-4 rounded-lg border-2 transition-all text-center ${formData.category === cat.id ? 'border-pink-500 bg-pink-50' : 'border-slate-200 hover:border-slate-300'}`}>
                          <div className="text-2xl mb-2">{cat.icon}</div>
                          <div className="text-sm font-medium text-slate-900">{cat.label}</div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-4">Color Scheme</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {colorPresets.map((preset, idx) => (
                        <motion.button key={idx} onClick={() => handleColorSelect(preset.color1, preset.color2)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={`p-4 rounded-lg border-2 transition-all ${formData.color1 === preset.color1 && formData.color2 === preset.color2 ? 'border-slate-900' : 'border-slate-200 hover:border-slate-300'}`}>
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 rounded" style={{ background: `linear-gradient(135deg, ${preset.color1}, ${preset.color2})` }} />
                            <div className="text-sm font-medium text-slate-900">{preset.name}</div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">Review Your App</h2>
                  <p className="text-slate-600">Everything looks good?</p>
                </div>

                <div className="space-y-6">
                  <div className="rounded-2xl p-8 text-white h-64 flex flex-col justify-between" style={{ background: `linear-gradient(135deg, ${formData.color1}, ${formData.color2})` }}>
                    <div>
                      <div className="text-5xl mb-4">{formData.icon}</div>
                      <h3 className="text-3xl font-bold mb-2">{formData.name}</h3>
                      <p className="text-white/90">{formData.description}</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-900">Your app will be saved and accessible from your dashboard.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-between mt-12 pt-8 border-t border-slate-200">
            <button onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1} className="px-6 py-2 text-slate-600 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium">
              Back
            </button>
            <button onClick={() => { if (step === 3) { handleSubmit(); } else { setStep(step + 1); } }} disabled={!formData.name.trim() || !formData.description.trim()} className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity font-medium">
              <span>{step === 3 ? 'Create App' : 'Next'}</span>
              {step < 3 && <ChevronRight size={18} />}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default AppBuilder;