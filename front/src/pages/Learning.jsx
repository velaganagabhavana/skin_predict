import { useState } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { FaUpload, FaSpinner, FaCheck, FaTimes, FaMicroscope, FaInfoCircle } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';

function Learning() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [hasUploadedImage, setHasUploadedImage] = useState(false);
  const [result, setResult] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setUploadStatus('success');
      setHasUploadedImage(true);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
    multiple: false
  });

  const handleReset = () => {
    setSelectedImage(null);
    setUploadStatus(null);
    setIsProcessing(false);
    setHasUploadedImage(false);
    setResult(null);
  };

  const handleStartAnalysis = async () => {
    setIsProcessing(true);
    setResult(null);
    const formData = new FormData();
    const fileInput = document.querySelector('input[type="file"]');
    const file = fileInput.files[0];

    if (file) {
      formData.append('file', file);
      try {
        const response = await axios.post('http://localhost:5000/predict', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setIsProcessing(false);
        setUploadStatus('complete');
        if (response.data.is_skin) {
          toast.error("Input only skin");
        }
        toast.success("Prediction Successful!");
        console.log("Data:", response.data);
        setResult(response.data);
      } catch (error) {
        console.log("Error:", error);
        toast.error("Something went wrong!");
        setIsProcessing(false);
        setUploadStatus('error');
      }
    }
  };

  const remedies = {
    "akiec": [
      "Cryotherapy (freezing with liquid nitrogen).",
      "Topical treatments (5-Fluorouracil, Imiquimod).",
      "Photodynamic therapy (PDT).",
      "Laser therapy or surgical removal if necessary."
    ],
    "bcc": [
      "Surgical excision (removal of affected tissue).",
      "Mohs micrographic surgery (for high-risk areas).",
      "Radiation therapy (for inoperable cases).",
      "Topical treatments (Imiquimod, 5-Fluorouracil).",
      "Photodynamic therapy (PDT)."
    ],
    "bkl": [
      "No treatment required if asymptomatic.",
      "Cryotherapy for cosmetic removal.",
      "Laser therapy or electrosurgery for stubborn lesions.",
      "Topical keratolytics (salicylic acid) to soften lesions."
    ],
    "df": [
      "No treatment required unless symptomatic.",
      "Surgical excision if painful or for cosmetic reasons.",
      "Cryotherapy to reduce size.",
      "Steroid injections to flatten the lesion if necessary."
    ],
    "mel": [
      "Surgical excision with wide margins (primary treatment).",
      "Sentinel lymph node biopsy (if suspected spread).",
      "Immunotherapy (checkpoint inhibitors like Pembrolizumab).",
      "Targeted therapy for gene mutations (BRAF inhibitors).",
      "Chemotherapy or radiation for advanced cases."
    ],
    "nv": [
      "No treatment needed for normal moles.",
      "Monitoring for changes (irregular borders, color changes).",
      "Surgical excision if suspicious for melanoma.",
      "Laser removal for cosmetic reasons (if safe)."
    ],
    "vasc": [
      "Laser therapy for cosmetic improvement (e.g., port-wine stains).",
      "Electrocautery for small vascular lesions.",
      "Sclerotherapy for spider veins or larger growths.",
      "No treatment needed if asymptomatic."
    ]
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-skin-yellow via-skin-light-yellow to-skin-light-green">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
        <div className="bg-white/90 rounded-2xl p-8 shadow-2xl border border-skin-yellow mb-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <FaMicroscope className="text-4xl text-skin-dark-green" />
            <h1 className="text-4xl font-bold text-skin-dark-green">Skin Disease Analysis</h1>
          </div>
          <div {...getRootProps()} className={`w-full aspect-[16/9] rounded-lg border-4 border-dashed relative ${isDragActive ? 'border-skin-dark-green bg-skin-light-yellow' : 'border-skin-yellow hover:border-skin-dark-green'}`}>
            <input {...getInputProps()} />
            {selectedImage && <img src={selectedImage} alt="Uploaded" className="w-full h-full object-contain" />}
          </div>
          <div className="flex gap-4 mt-6">
            <button onClick={handleReset} className="px-6 py-3 bg-skin-yellow text-skin-dark-green rounded-lg hover:bg-skin-dark-yellow flex items-center gap-2 text-lg" disabled={isProcessing}><FaTimes /> Reset</button>
            <button onClick={handleStartAnalysis} className={`px-6 py-3 rounded-lg flex items-center gap-2 text-lg ${hasUploadedImage ? 'bg-skin-green text-white hover:bg-skin-dark-green' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`} disabled={!hasUploadedImage || isProcessing}>
              {isProcessing ? <><FaSpinner className="animate-spin" /> Processing...</> : <><FaMicroscope /> Start Analysis</>}
            </button>
          </div>
        </div>
        
        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white/90 rounded-2xl p-8 shadow-2xl border border-skin-yellow">
            <h2 className="text-2xl font-bold text-skin-dark-green mb-6">Analysis Results</h2>
            <p className="text-lg text-gray-700">Predicted Disease: <span className="font-semibold text-skin-dark-green">{result.predicted_class}</span></p>
            <p className="text-lg text-gray-700">Confidence: <span className="font-semibold text-skin-dark-green">{result.confidence.toFixed(2)}%</span></p>

            
            {remedies[result.predicted_class] && (
              <div className="mt-6">
                <h3 className="text-xl font-bold text-skin-dark-green">Recommended Remedies:</h3>
                <ul className="list-disc pl-5 text-gray-700 mt-2">
                  {remedies[result.predicted_class].map((remedy, index) => (
                    <li key={index}>{remedy}</li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default Learning;
