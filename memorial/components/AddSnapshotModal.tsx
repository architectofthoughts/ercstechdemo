
import React, { useState, useRef } from 'react';
import { X, Upload, Sparkles, Loader2 } from 'lucide-react';
import { analyzeCardImage } from '../services/geminiService';
import { Rarity, SnapshotEntry } from '../types';
import { THEME } from '../data';

interface AddSnapshotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (entry: SnapshotEntry) => void;
}

export const AddSnapshotModal: React.FC<AddSnapshotModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setFile(f);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(f);
      setAnalysisData(null); // Reset previous analysis
    }
  };

  const handleAnalyze = async () => {
    if (!preview) return;
    setLoading(true);
    try {
      // Extract base64 data (remove "data:image/jpeg;base64," prefix)
      const base64Data = preview.split(',')[1];
      const data = await analyzeCardImage(base64Data);
      setAnalysisData(data);
    } catch (err) {
      alert("Failed to analyze image with Gemini. Ensure API_KEY is set.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (!analysisData || !preview) return;

    const now = new Date();
    const newEntry: SnapshotEntry = {
      id: Date.now().toString(),
      characterName: analysisData.characterName || "Unknown",
      rarity: analysisData.rarity as Rarity || Rarity.COMMON,
      stats: {
        atk: analysisData.atk || 0,
        def: analysisData.def || 0
      },
      imageUrl: preview,
      acquiredDate: `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${now.getDate()}일`,
      acquiredTime: now.toTimeString().split(' ')[0],
      acquisitionMethod: analysisData.suggestedLog || "특별한 소환으로 획득",
      badges: [] // Default no badges, user can imagine logic for this
    };

    onAdd(newEntry);
    onClose();
    setFile(null);
    setPreview(null);
    setAnalysisData(null);
  };

  return (
    <div className={`fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm ${THEME.fonts.body}`}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <h3 className={`font-bold text-lg text-gray-800 ${THEME.fonts.heading}`}>Add New Snapshot</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Image Upload Area */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-lg h-48 flex flex-col items-center justify-center cursor-pointer transition-colors ${preview ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:bg-gray-50'}`}
          >
            {preview ? (
              <img src={preview} alt="Preview" className="h-full w-full object-contain p-2" />
            ) : (
              <>
                <Upload className="text-gray-400 mb-2" size={32} />
                <span className="text-sm text-gray-500">Click to upload card image</span>
              </>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange} 
            />
          </div>

          {/* Analyze Button */}
          {preview && !analysisData && (
            <button 
              onClick={handleAnalyze} 
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:shadow-lg transition-all"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
              Analyze with Gemini
            </button>
          )}

          {/* Analysis Result Preview */}
          {analysisData && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm">
              <p className="font-bold text-green-800 flex items-center gap-2">
                <Sparkles size={14} /> Analysis Complete
              </p>
              <div className="mt-2 space-y-1 text-green-700">
                <p><strong>Name:</strong> {analysisData.characterName}</p>
                <p><strong>Rarity:</strong> {analysisData.rarity}</p>
                <p><strong>Stats:</strong> ATK {analysisData.atk} / DEF {analysisData.def}</p>
                <p className="italic opacity-80">"{analysisData.suggestedLog}"</p>
              </div>
              <button 
                onClick={handleSubmit}
                className="w-full mt-3 py-2 bg-green-600 text-white rounded font-medium hover:bg-green-700 transition-colors"
              >
                Confirm & Add
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
