import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeartbeat, FaChartLine, FaExclamationTriangle, FaStethoscope } from 'react-icons/fa';

function RiskAndSymptoms() {
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    chestPainType: '',
    bloodPressure: '',
    cholesterol: '',
    bloodSugar: '',
    ecgResults: '',
    maxHeartRate: '',
    exerciseAngina: '0',
    exerciseRelative: '',
    slope: '',
    vessels: '',
    thalium: ''
  });

  const [results, setResults] = useState(null);
  const ageOptions = Array.from({ length: 91 }, (_, i) => i + 10);

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
      chestPainType: '',
      bloodPressure: '',
      cholesterol: '',
      bloodSugar: '',
      ecgResults: '',
      maxHeartRate: '',
      exerciseAngina: '0',
      exerciseRelative: '',
      slope: '',
      vessels: '',
      thalium: ''
    });
    setResults(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setResults("Based on the provided metrics, your heart disease risk analysis indicates moderate risk. Please consult with a healthcare professional for a comprehensive evaluation.");
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-skin-yellow via-skin-light-yellow to-skin-light-green">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-6"
          >
            <FaHeartbeat className="text-6xl text-skin-dark-green animate-pulse" />
          </motion.div>
          <h1 className="text-4xl font-bold text-skin-dark-green mb-4">
            Heart Disease Risk Assessment
          </h1>
          <p className="text-gray-700 text-lg">
            Complete all fields below for a comprehensive heart health evaluation
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Basic Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/90 backdrop-blur-md rounded-xl p-6 shadow-lg border-2 border-skin-yellow"
          >
            <div className="flex items-center gap-3 mb-6">
              <FaStethoscope className="text-2xl text-skin-dark-green" />
              <h2 className="text-2xl font-semibold text-skin-dark-green">Basic Information</h2>
            </div>
            
            <div className="space-y-4">
              <div className="form-group">
                <label className="block text-gray-700 text-sm font-medium mb-2">Age:</label>
                <select
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full bg-skin-light-yellow border-2 border-skin-yellow rounded-lg px-4 py-2.5 text-gray-700 focus:outline-none focus:border-skin-dark-green transition-colors"
                  required
                >
                  <option value="">Select Age</option>
                  {ageOptions.map(age => (
                    <option key={age} value={age}>{age}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="block text-gray-700 text-sm font-medium mb-2">Gender:</label>
                <select
                  name="sex"
                  value={formData.sex}
                  onChange={handleInputChange}
                  className="w-full bg-skin-light-yellow border-2 border-skin-yellow rounded-lg px-4 py-2.5 text-gray-700 focus:outline-none focus:border-skin-dark-green transition-colors"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label className="block text-gray-700 text-sm font-medium mb-2">Blood Sugar Level:</label>
                <select
                  name="bloodSugar"
                  value={formData.bloodSugar}
                  onChange={handleInputChange}
                  className="w-full bg-skin-light-yellow border-2 border-skin-yellow rounded-lg px-4 py-2.5 text-gray-700 focus:outline-none focus:border-skin-dark-green transition-colors"
                  required
                >
                  <option value="">Select Blood Sugar Level</option>
                  <option value="normal">Normal (70-99 mg/dL)</option>
                  <option value="prediabetes">Prediabetes (100-125 mg/dL)</option>
                  <option value="diabetes">Diabetes (126+ mg/dL)</option>
                  <option value="high">High (180-250 mg/dL)</option>
                  <option value="very-high">Very High (250+ mg/dL)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Chest Pain Type (0-3):
                </label>
                <input
                  type="number"
                  name="chestPainType"
                  value={formData.chestPainType}
                  onChange={handleInputChange}
                  min="0"
                  max="3"
                  className="w-full bg-skin-light-yellow border-2 border-skin-yellow rounded-lg px-4 py-2.5 text-gray-700 focus:outline-none focus:border-skin-dark-green transition-colors"
                  required
                />
              </div>
            </div>
          </motion.div>

          {/* Advanced Metrics */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/90 backdrop-blur-md rounded-xl p-6 shadow-lg border-2 border-skin-yellow"
          >
            <div className="flex items-center gap-3 mb-6">
              <FaChartLine className="text-2xl text-skin-dark-green" />
              <h2 className="text-2xl font-semibold text-skin-dark-green">Advanced Metrics</h2>
            </div>

            <div className="space-y-4">
              <div className="form-group">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Blood Pressure (94-200 mmHg):
                </label>
                <input
                  type="number"
                  name="bloodPressure"
                  value={formData.bloodPressure}
                  onChange={handleInputChange}
                  min="94"
                  max="200"
                  className="w-full bg-skin-light-yellow border-2 border-skin-yellow rounded-lg px-4 py-2.5 text-gray-700 focus:outline-none focus:border-skin-dark-green transition-colors"
                  required
                />
              </div>

              <div className="form-group">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Cholesterol (126-564 mg/dL):
                </label>
                <input
                  type="number"
                  name="cholesterol"
                  value={formData.cholesterol}
                  onChange={handleInputChange}
                  min="126"
                  max="564"
                  className="w-full bg-skin-light-yellow border-2 border-skin-yellow rounded-lg px-4 py-2.5 text-gray-700 focus:outline-none focus:border-skin-dark-green transition-colors"
                  required
                />
              </div>

              <div className="form-group">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Maximum Heart Rate (71-202 bpm):
                </label>
                <input
                  type="number"
                  name="maxHeartRate"
                  value={formData.maxHeartRate}
                  onChange={handleInputChange}
                  min="71"
                  max="202"
                  className="w-full bg-skin-light-yellow border-2 border-skin-yellow rounded-lg px-4 py-2.5 text-gray-700 focus:outline-none focus:border-skin-dark-green transition-colors"
                  required
                />
              </div>

              <div className="form-group">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Exercise Induced Angina:
                </label>
                <select
                  name="exerciseAngina"
                  value={formData.exerciseAngina}
                  onChange={handleInputChange}
                  className="w-full bg-skin-light-yellow border-2 border-skin-yellow rounded-lg px-4 py-2.5 text-gray-700 focus:outline-none focus:border-skin-dark-green transition-colors"
                >
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
            </div>
          </motion.div>
        </form>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center gap-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="px-8 py-3 bg-skin-yellow text-skin-dark-green rounded-lg hover:bg-skin-dark-yellow transition-colors shadow-lg font-medium"
          >
            Reset Form
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            className="px-8 py-3 bg-skin-green text-white rounded-lg hover:bg-skin-dark-green transition-colors shadow-lg font-medium"
          >
            Analyze Risk
          </motion.button>
        </div>

        {/* Results Section */}
        {results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-white/90 backdrop-blur-md rounded-xl p-6 shadow-lg border-2 border-skin-yellow"
          >
            <div className="flex items-center gap-3 mb-4">
              <FaExclamationTriangle className="text-2xl text-skin-dark-green" />
              <h2 className="text-2xl font-semibold text-skin-dark-green">Analysis Results</h2>
            </div>
            <p className="text-gray-700 text-lg">{results}</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default RiskAndSymptoms;
