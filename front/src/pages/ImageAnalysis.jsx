import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCamera, FaSpinner, FaCheck, FaTimes, FaMicroscope } from 'react-icons/fa';

function ImageAnalysis() {
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    skinType: '',
    duration: '',
    redness: '0',
    discoloration: '0',
    pigmentation: '0',
    roughness: '0',
    scaling: '0',
    cracking: '0',
    lesionType: '0',
    blisters: '0',
    rashes: '0',
    borderType: '0',
    lesionSize: '0',
    lesionShape: '0',
    itching: '0',
    pain: '0',
    inflammation: '0',
    swelling: '0',
    crusting: '0',
    skinThickness: '0',
    hairLoss: '0'
  });

  const [results, setResults] = useState(null);

  const symptomLevels = [
    { value: '0', label: 'None' },
    { value: '1', label: 'Mild' },
    { value: '2', label: 'Moderate' },
    { value: '3', label: 'Severe' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReset = () => {
    setFormData({
      age: '',
      sex: '',
      skinType: '',
      duration: '',
      redness: '0',
      discoloration: '0',
      pigmentation: '0',
      roughness: '0',
      scaling: '0',
      cracking: '0',
      lesionType: '0',
      blisters: '0',
      rashes: '0',
      borderType: '0',
      lesionSize: '0',
      lesionShape: '0',
      itching: '0',
      pain: '0',
      inflammation: '0',
      swelling: '0',
      crusting: '0',
      skinThickness: '0',
      hairLoss: '0'
    });
    setResults(null);
  };

  const analyzeSkinCondition = (data) => {
    const symptomValues = Object.values(data).filter(val => !isNaN(val)).map(Number);
    const totalSeverity = symptomValues.reduce((acc, val) => acc + val, 0);
    const maxPossibleSeverity = symptomValues.length * 3;
    const severityPercentage = (totalSeverity / maxPossibleSeverity) * 100;

    if (severityPercentage > 60) {
      return {
        level: "High Risk",
        riskPercentage: "75-90%",
        checkupFrequency: "Immediate",
        urgency: "Emergency",
        description: "Your symptoms indicate a potentially serious skin condition requiring immediate medical attention.",
        recommendations: [
          "Seek emergency dermatological care",
          "Document affected areas with photos",
          "Avoid any irritants or triggers",
          "Keep the affected area clean and protected",
          "Prepare a detailed symptom history",
          "Consider telemedicine consultation if in-person visit is delayed"
        ]
      };
    } else if (severityPercentage > 30) {
      return {
        level: "Moderate Risk",
        riskPercentage: "40-60%",
        checkupFrequency: "Within 48 hours",
        urgency: "Urgent",
        description: "Your symptoms suggest a moderate skin condition that requires prompt medical evaluation.",
        recommendations: [
          "Schedule urgent dermatologist appointment",
          "Use gentle, fragrance-free products",
          "Monitor symptoms closely",
          "Avoid scratching or touching affected areas",
          "Keep a symptom diary",
          "Consider over-the-counter antihistamines for itching"
        ]
      };
    } else {
      return {
        level: "Low Risk",
        riskPercentage: "10-30%",
        checkupFrequency: "Within 1 week",
        urgency: "Routine",
        description: "Your symptoms indicate a mild skin condition that should be monitored.",
        recommendations: [
          "Schedule routine dermatologist check-up",
          "Maintain good skin hygiene",
          "Use moisturizer regularly",
          "Monitor for any changes",
          "Avoid potential irritants",
          "Consider lifestyle modifications"
        ]
      };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const analysis = analyzeSkinCondition(formData);
    setResults(analysis);
  };

  return (
    <div className="min-h-screen py-12 px-4 relative bg-gradient-to-br from-skin-yellow via-skin-light-yellow to-skin-light-green">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto relative z-10"
      >
        <div className="text-center mb-12">
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-bold text-skin-dark-green mb-4 drop-shadow-lg"
          >
            Skin Disease Risk Assessment
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-skin-dark-green drop-shadow-md"
          >
            Complete comprehensive symptom evaluation for accurate skin condition analysis
          </motion.p>
        </div>

        <motion.form
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-skin-yellow"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-skin-dark-green mb-6">Basic Information</h2>
              
              <div>
                <label className="block text-skin-dark-green text-sm mb-2">Age:</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-skin-yellow rounded-lg px-4 py-3 text-skin-dark-green focus:outline-none focus:ring-2 focus:ring-skin-yellow"
                  required
                />
              </div>

              <div>
                <label className="block text-skin-dark-green text-sm mb-2">Gender:</label>
                <select
                  name="sex"
                  value={formData.sex}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-skin-yellow rounded-lg px-4 py-3 text-skin-dark-green focus:outline-none focus:ring-2 focus:ring-skin-yellow"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-skin-dark-green text-sm mb-2">Skin Type:</label>
                <select
                  name="skinType"
                  value={formData.skinType}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-skin-yellow rounded-lg px-4 py-3 text-skin-dark-green focus:outline-none focus:ring-2 focus:ring-skin-yellow"
                  required
                >
                  <option value="">Select Skin Type</option>
                  <option value="type1">Type I (Very Fair)</option>
                  <option value="type2">Type II (Fair)</option>
                  <option value="type3">Type III (Medium)</option>
                  <option value="type4">Type IV (Olive)</option>
                  <option value="type5">Type V (Brown)</option>
                  <option value="type6">Type VI (Dark)</option>
                </select>
              </div>
            </div>

            {/* Color Changes */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-skin-dark-green mb-6">Color Changes</h2>
              
              {['redness', 'discoloration', 'pigmentation'].map((symptom) => (
                <div key={symptom}>
                  <label className="block text-skin-dark-green text-sm mb-2">
                    {symptom.charAt(0).toUpperCase() + symptom.slice(1)} Level:
                  </label>
                  <select
                    name={symptom}
                    value={formData[symptom]}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-skin-yellow rounded-lg px-4 py-3 text-skin-dark-green focus:outline-none focus:ring-2 focus:ring-skin-yellow"
                  >
                    {symptomLevels.map((level) => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Texture */}
          <div className="mt-8 grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-skin-dark-green mb-6">Texture</h2>
              
              {['roughness', 'scaling', 'cracking'].map((symptom) => (
                <div key={symptom}>
                  <label className="block text-skin-dark-green text-sm mb-2">
                    {symptom.charAt(0).toUpperCase() + symptom.slice(1)} Level:
                  </label>
                  <select
                    name={symptom}
                    value={formData[symptom]}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-skin-yellow rounded-lg px-4 py-3 text-skin-dark-green focus:outline-none focus:ring-2 focus:ring-skin-yellow"
                  >
                    {symptomLevels.map((level) => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {/* Lesions and Spots */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-skin-dark-green mb-6">Lesions and Spots</h2>
              
              {['lesionType', 'blisters', 'rashes'].map((symptom) => (
                <div key={symptom}>
                  <label className="block text-skin-dark-green text-sm mb-2">
                    {symptom === 'lesionType' ? 'Lesion Type' : symptom.charAt(0).toUpperCase() + symptom.slice(1)} Severity:
                  </label>
                  <select
                    name={symptom}
                    value={formData[symptom]}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-skin-yellow rounded-lg px-4 py-3 text-skin-dark-green focus:outline-none focus:ring-2 focus:ring-skin-yellow"
                  >
                    {symptomLevels.map((level) => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Symptoms */}
          <div className="mt-8 grid md:grid-cols-3 gap-8">
            {/* Physical Symptoms */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-skin-dark-green mb-6">Physical Symptoms</h2>
              
              {['itching', 'pain', 'swelling'].map((symptom) => (
                <div key={symptom}>
                  <label className="block text-skin-dark-green text-sm mb-2">
                    {symptom.charAt(0).toUpperCase() + symptom.slice(1)} Level:
                  </label>
                  <select
                    name={symptom}
                    value={formData[symptom]}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-skin-yellow rounded-lg px-4 py-3 text-skin-dark-green focus:outline-none focus:ring-2 focus:ring-skin-yellow"
                  >
                    {symptomLevels.map((level) => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {/* Skin Changes */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-skin-dark-green mb-6">Skin Changes</h2>
              
              {['crusting', 'skinThickness', 'hairLoss'].map((symptom) => (
                <div key={symptom}>
                  <label className="block text-skin-dark-green text-sm mb-2">
                    {symptom === 'skinThickness' ? 'Skin Thickness Changes' : symptom.charAt(0).toUpperCase() + symptom.slice(1)} Level:
                  </label>
                  <select
                    name={symptom}
                    value={formData[symptom]}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-skin-yellow rounded-lg px-4 py-3 text-skin-dark-green focus:outline-none focus:ring-2 focus:ring-skin-yellow"
                  >
                    {symptomLevels.map((level) => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {/* Lesion Characteristics */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-skin-dark-green mb-6">Lesion Characteristics</h2>
              
              {['borderType', 'lesionSize', 'lesionShape'].map((symptom) => (
                <div key={symptom}>
                  <label className="block text-skin-dark-green text-sm mb-2">
                    {symptom === 'borderType' ? 'Border Definition' : 
                     symptom === 'lesionSize' ? 'Lesion Size' : 
                     'Lesion Shape'} Level:
                  </label>
                  <select
                    name={symptom}
                    value={formData[symptom]}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-skin-yellow rounded-lg px-4 py-3 text-skin-dark-green focus:outline-none focus:ring-2 focus:ring-skin-yellow"
                  >
                    {symptomLevels.map((level) => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 flex justify-center gap-6">
            <button
              type="button"
              onClick={handleReset}
              className="px-8 py-3 bg-skin-light-yellow text-skin-dark-green rounded-lg hover:bg-skin-yellow transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Reset Form
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-skin-yellow to-skin-light-green text-skin-dark-green rounded-lg hover:from-skin-light-yellow hover:to-skin-yellow transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Analyze Risk
            </button>
          </div>
        </motion.form>

        {results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-skin-yellow"
          >
            <div className="flex items-center gap-4 mb-6">
              <FaMicroscope className="text-4xl text-skin-yellow" />
              <div>
                <h2 className="text-3xl font-bold text-skin-dark-green">Analysis Results</h2>
                <p className="text-skin-dark-green/80">Based on your provided symptoms</p>
              </div>
            </div>

            <div className={`p-6 rounded-xl mb-6 bg-gradient-to-r ${
              results.level === "High Risk" 
                ? "from-red-500/20 to-red-600/20 border-red-400"
                : results.level === "Moderate Risk"
                ? "from-yellow-500/20 to-yellow-600/20 border-yellow-400"
                : "from-green-500/20 to-green-600/20 border-green-400"
            } backdrop-blur-md border`}>
              <div className="grid md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-skin-dark-green mb-1">Risk Level</h3>
                  <p className="text-2xl font-bold text-skin-dark-green">{results.level}</p>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-skin-dark-green mb-1">Risk Range</h3>
                  <p className="text-2xl font-bold text-skin-dark-green">{results.riskPercentage}</p>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-skin-dark-green mb-1">Check-up</h3>
                  <p className="text-2xl font-bold text-skin-dark-green">{results.checkupFrequency}</p>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-skin-dark-green mb-1">Urgency</h3>
                  <p className="text-2xl font-bold text-skin-dark-green">{results.urgency}</p>
                </div>
              </div>
              <p className="text-lg text-skin-dark-green/90">{results.description}</p>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-skin-dark-green mb-4">Recommendations:</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {results.recommendations.map((rec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-skin-yellow"
                  >
                    <span className="w-8 h-8 bg-skin-yellow/30 rounded-full flex items-center justify-center text-skin-dark-green font-bold">
                      {index + 1}
                    </span>
                    <p className="text-skin-dark-green/90">{rec}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default ImageAnalysis;
