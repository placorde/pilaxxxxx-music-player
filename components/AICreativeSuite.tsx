import React, { useState, useCallback, useMemo } from 'react';
import { GoogleGenAI } from '@google/genai';
import { LoadingSpinnerIcon } from './icons';

// Lazily initialize the AI instance only when the key is available
const useGenAI = () => {
  return useMemo(() => {
    if (!process.env.API_KEY) {
      console.error("API_KEY is not set in your environment. AI features will be disabled.");
      return null;
    }
    try {
        return new GoogleGenAI({ apiKey: process.env.API_KEY });
    } catch(e) {
        console.error("Failed to initialize GoogleGenAI. Check your API Key.", e);
        return null;
    }
  }, []);
};


// A wrapper to show a message if AI is not configured.
const AIFeatureWrapper: React.FC<{ children: React.ReactNode, ai: GoogleGenAI | null, featureName: string }> = ({ children, ai, featureName }) => {
    if (!ai) {
        return (
            <div className="text-center text-zinc-500 p-4">
                <p>The {featureName} is not available.</p>
                <p className="text-sm">Please ensure the API_KEY is configured correctly.</p>
            </div>
        );
    }
    return <>{children}</>;
};


// --- Storyteller Component ---
const Storyteller: React.FC = () => {
    const ai = useGenAI();
    const [prompt, setPrompt] = useState('');
    const [story, setStory] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const generateStory = async () => {
        if (!prompt || isLoading || !ai) {
            if (!ai) setError('AI Service not configured. Missing API Key.');
            return;
        }
        setIsLoading(true);
        setError('');
        setStory('');
        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `Create a short, atmospheric story based on this musical theme: "${prompt}". Make it vivid and engaging.`,
                config: {
                    systemInstruction: "You are a creative writer who specializes in translating musical vibes into compelling narratives.",
                }
            });
            setStory(response.text);
        } catch (err) {
            console.error(err);
            setError('Failed to generate story. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
       <AIFeatureWrapper ai={ai} featureName="AI Storyteller">
            <div className="space-y-4 animate-fade-in-down">
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="E.g., A deep house set at sunrise on a beach"
                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition"
                    disabled={isLoading}
                />
                <button
                    onClick={generateStory}
                    className="w-full flex items-center justify-center bg-cyan-400 text-black font-bold py-3 px-4 rounded-lg transition-all duration-300 hover:bg-cyan-300 disabled:bg-zinc-600 disabled:cursor-not-allowed"
                    disabled={isLoading || !prompt}
                >
                    {isLoading ? <LoadingSpinnerIcon className="w-5 h-5" /> : 'Generate Story'}
                </button>
                {error && <p className="text-red-400 text-center">{error}</p>}
                {story && (
                    <div className="bg-zinc-800/30 p-4 rounded-lg border border-zinc-700/50 mt-4 whitespace-pre-wrap">
                        <p className="text-zinc-300">{story}</p>
                    </div>
                )}
            </div>
        </AIFeatureWrapper>
    );
};

// --- Image Generator Component ---
const ImageGenerator: React.FC = () => {
    const ai = useGenAI();
    const [prompt, setPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const generateImage = async () => {
        if (!prompt || isLoading || !ai) {
             if (!ai) setError('AI Service not configured. Missing API Key.');
            return;
        }
        setIsLoading(true);
        setError('');
        setImageUrl('');
        try {
            const response = await ai.models.generateImages({
                model: 'imagen-3.0-generate-002',
                prompt: `Album art cover, vibrant, high-detail, for a music track with the theme: "${prompt}"`,
                config: {
                    numberOfImages: 1,
                    outputMimeType: 'image/jpeg',
                    aspectRatio: '1:1',
                },
            });
            const base64ImageBytes = response.generatedImages[0].image.imageBytes;
            setImageUrl(`data:image/jpeg;base64,${base64ImageBytes}`);
        } catch (err) {
            console.error(err);
            setError('Failed to generate image. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AIFeatureWrapper ai={ai} featureName="Image Generator">
            <div className="space-y-4 animate-fade-in-down">
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="E.g., An astronaut DJ in a colorful nebula"
                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition"
                    disabled={isLoading}
                />
                <button
                    onClick={generateImage}
                    className="w-full flex items-center justify-center bg-cyan-400 text-black font-bold py-3 px-4 rounded-lg transition-all duration-300 hover:bg-cyan-300 disabled:bg-zinc-600 disabled:cursor-not-allowed"
                    disabled={isLoading || !prompt}
                >
                    {isLoading ? <LoadingSpinnerIcon className="w-5 h-5" /> : 'Generate Album Art'}
                </button>
                {error && <p className="text-red-400 text-center">{error}</p>}
                <div className="w-full aspect-square bg-zinc-800/30 border border-zinc-700/50 rounded-lg flex items-center justify-center mt-4">
                    {isLoading ? (
                         <LoadingSpinnerIcon className="w-12 h-12 text-cyan-400" />
                    ) : imageUrl ? (
                         <img src={imageUrl} alt="Generated album art" className="w-full h-full object-cover rounded-lg" />
                    ) : (
                        <p className="text-zinc-500">Your generated image will appear here</p>
                    )}
                </div>
            </div>
        </AIFeatureWrapper>
    );
};


// --- Main AI Creative Suite Component ---
type ActiveTab = 'storyteller' | 'imageGenerator';

const AICreativeSuite: React.FC = () => {
    const [activeTab, setActiveTab] = useState<ActiveTab>('storyteller');
    
    const TabButton: React.FC<{tabName: ActiveTab; label: string}> = ({tabName, label}) => (
        <button
            onClick={() => setActiveTab(tabName)}
            className={`px-4 py-2 font-orbitron font-bold text-lg rounded-t-lg transition-colors ${
                activeTab === tabName 
                ? 'bg-zinc-800/50 border-b-2 border-cyan-400 text-white'
                : 'text-zinc-400 hover:text-white'
            }`}
        >
            {label}
        </button>
    )

    return (
        <section>
            <div className="text-center mb-8">
                <h2 className="font-orbitron text-4xl sm:text-5xl font-bold tracking-wider text-white">AI Creative Suite</h2>
                <p className="text-zinc-400 mt-2">Generate stories and art from musical ideas.</p>
            </div>
            
            <div className="max-w-2xl mx-auto">
                <div className="border-b border-zinc-700 mb-6 flex space-x-2">
                    <TabButton tabName="storyteller" label="Storyteller"/>
                    <TabButton tabName="imageGenerator" label="Album Art"/>
                </div>

                <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-xl p-6">
                    {activeTab === 'storyteller' && <Storyteller />}
                    {activeTab === 'imageGenerator' && <ImageGenerator />}
                </div>
            </div>

        </section>
    );
};

export default AICreativeSuite;