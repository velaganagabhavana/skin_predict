import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInfoCircle, FaBrain, FaChartLine, FaExclamationTriangle, FaEye, FaSearch, FaArrowsAlt, FaPlus, FaMinus, FaSync } from 'react-icons/fa';

function PatientStories() {
  const [selectedBodyPart, setSelectedBodyPart] = useState(null);
  const [confidenceScore, setConfidenceScore] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [hoveredPart, setHoveredPart] = useState(null);
  const [currentView, setCurrentView] = useState('front');

  const bodyParts = {
    front: [
      { id: 'face', label: 'Face', x: '50%', y: '10%', confidence: 92, color: 'skin-yellow' },
      { id: 'chest', label: 'Chest', x: '50%', y: '25%', confidence: 88, color: 'skin-green' },
      { id: 'leftArm', label: 'Left Arm', x: '25%', y: '30%', confidence: 85, color: 'skin-light-green' },
      { id: 'rightArm', label: 'Right Arm', x: '75%', y: '30%', confidence: 87, color: 'skin-light-green' },
      { id: 'abdomen', label: 'Abdomen', x: '50%', y: '40%', confidence: 19, color: 'skin-green' },
      { id: 'leftLeg', label: 'Left Leg', x: '40%', y: '70%', confidence: 86, color: 'skin-yellow' },
      { id: 'rightLeg', label: 'Right Leg', x: '60%', y: '70%', confidence: 89, color: 'skin-yellow' }
    ],
    side: [
      { id: 'sideHead', label: 'Head', x: '60%', y: '10%', confidence: 90, color: 'skin-yellow' },
      { id: 'sideChest', label: 'Chest', x: '55%', y: '25%', confidence: 87, color: 'skin-green' },
      { id: 'sideArm', label: 'Arm', x: '75%', y: '30%', confidence: 86, color: 'skin-light-green' },
      { id: 'sideTorso', label: 'Torso', x: '50%', y: '40%', confidence: 85, color: 'skin-green' },
      { id: 'sideLeg', label: 'Leg', x: '45%', y: '70%', confidence: 88, color: 'skin-yellow' }
    ],
    back: [
      { id: 'backHead', label: 'Head', x: '50%', y: '10%', confidence: 91, color: 'skin-yellow' },
      { id: 'upperBack', label: 'Upper Back', x: '50%', y: '25%', confidence: 89, color: 'skin-green' },
      { id: 'leftBackArm', label: 'Left Arm', x: '25%', y: '30%', confidence: 84, color: 'skin-light-green' },
      { id: 'rightBackArm', label: 'Right Arm', x: '75%', y: '30%', confidence: 86, color: 'skin-light-green' },
      { id: 'lowerBack', label: 'Lower Back', x: '50%', y: '40%', confidence: 88, color: 'skin-green' },
      { id: 'leftBackLeg', label: 'Left Leg', x: '40%', y: '70%', confidence: 85, color: 'skin-yellow' },
      { id: 'rightBackLeg', label: 'Right Leg', x: '60%', y: '70%', confidence: 87, color: 'skin-yellow' }
    ]
  };

  const handleBodyPartSelect = (partId) => {
    setSelectedBodyPart(partId);
    setConfidenceScore(bodyParts[currentView].find(part => part.id === partId)?.confidence);
  };

  const handleRotate = (direction) => {
    setRotation(prev => prev + (direction === 'left' ? -90 : 90));
  };

  const handleZoom = (direction) => {
    setZoom(prev => Math.max(0.5, Math.min(2, prev + (direction === 'in' ? 0.1 : -0.1))));
  };

  const handleViewChange = () => {
    const views = ['front', 'side', 'back'];
    const currentIndex = views.indexOf(currentView);
    const nextIndex = (currentIndex + 1) % views.length;
    setCurrentView(views[nextIndex]);
    setSelectedBodyPart(null);
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-skin-light-yellow via-skin-light-green to-skin-yellow">
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-skin-dark-green mb-6 drop-shadow-lg">
            Interactive Body Map
          </h1>
          <p className="text-xl text-skin-dark-green/80 max-w-3xl mx-auto">
            Explore and understand skin conditions across different body regions
          </p>
        </motion.div>

        {/* Controls Bar */}
        <div className="flex justify-center gap-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleRotate('left')}
            className="p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-skin-yellow hover:bg-skin-light-yellow transition-colors"
          >
            <FaArrowsAlt className="text-skin-dark-green" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleZoom('in')}
            className="p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-skin-yellow hover:bg-skin-light-yellow transition-colors"
          >
            <FaPlus className="text-skin-dark-green" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleZoom('out')}
            className="p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-skin-yellow hover:bg-skin-light-yellow transition-colors"
          >
            <FaMinus className="text-skin-dark-green" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleViewChange}
            className="p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-skin-yellow hover:bg-skin-light-yellow transition-colors"
          >
            <FaSync className="text-skin-dark-green" />
          </motion.button>
        </div>

        {/* View Indicator */}
        <div className="text-center mb-8">
          <span className="text-lg font-semibold text-skin-dark-green bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-skin-yellow">
            Current View: {currentView.charAt(0).toUpperCase() + currentView.slice(1)}
          </span>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Interactive Body Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-xl border-2 border-skin-yellow min-h-[600px]"
          >
            {/* SVG Body Map */}
            <div className="relative w-full h-[500px]">
              <motion.div
                style={{
                  transform: `rotate(${rotation}deg) scale(${zoom})`,
                  transition: 'transform 0.3s ease'
                }}
              >
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full stroke-skin-dark-green"
                  style={{ fill: 'none', strokeWidth: '0.5' }}
                >
                  {/* Dynamic SVG Paths based on current view */}
                  {getSVGPath(currentView)}

                  {/* Dynamic Highlight Effect */}
                  {hoveredPart && (
                    <motion.circle
                      cx={bodyParts[currentView].find(p => p.id === hoveredPart)?.x}
                      cy={bodyParts[currentView].find(p => p.id === hoveredPart)?.y}
                      r="8"
                      className="stroke-skin-green"
                      strokeWidth="0.5"
                      fill="none"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                    />
                  )}
                </svg>

                {/* Interactive Points */}
                {bodyParts[currentView].map((part) => (
                  <motion.button
                    key={part.id}
                    className={`absolute w-6 h-6 -ml-3 -mt-3 rounded-full transition-all duration-300 ${
                      selectedBodyPart === part.id
                        ? `bg-${part.color} shadow-lg shadow-${part.color}/50`
                        : `bg-${part.color}/80 hover:bg-${part.color}`
                    } border border-white/50`}
                    style={{ left: part.x, top: part.y }}
                    onClick={() => handleBodyPartSelect(part.id)}
                    onMouseEnter={() => setHoveredPart(part.id)}
                    onMouseLeave={() => setHoveredPart(null)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="absolute top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-skin-dark-green text-sm font-medium bg-white/90 px-2 py-1 rounded-full border border-skin-yellow">
                      {part.label}
                    </span>
                    {selectedBodyPart === part.id && (
                      <>
                        {/* Enhanced Pulse Effect */}
                        <motion.div
                          className={`absolute inset-0 rounded-full border-4 border-${part.color}`}
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 0.2, 0.5],
                            borderWidth: ["4px", "2px", "4px"]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                        {/* Enhanced Glow Effect */}
                        <motion.div
                          className={`absolute inset-0 rounded-full bg-${part.color}`}
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: [0.2, 0.4, 0.2],
                            scale: [1, 1.2, 1]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          style={{
                            filter: 'blur(8px)',
                            transform: 'translate3d(0, 0, 0)'
                          }}
                        />
                      </>
                    )}
                  </motion.button>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Analysis Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-xl border-2 border-skin-yellow"
          >
            {selectedBodyPart ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedBodyPart}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {/* Header with Glowing Effect */}
                  <div className="flex items-center justify-between">
                    <motion.h2 
                      className="text-2xl font-bold text-skin-dark-green"
                      animate={{ textShadow: ['0 0 0px rgba(147, 197, 114, 0)', '0 0 10px rgba(147, 197, 114, 0.5)', '0 0 0px rgba(147, 197, 114, 0)'] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {bodyParts[currentView].find(p => p.id === selectedBodyPart)?.label} Analysis
                    </motion.h2>
                    <motion.div
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-skin-light-yellow text-skin-dark-green border border-skin-yellow"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <FaBrain className="text-lg" />
                      <span className="font-semibold">AI Confidence: {confidenceScore}%</span>
                    </motion.div>
                  </div>

                  {/* Animated Confidence Bar */}
                  <motion.div
                    className="relative h-2 bg-gray-200 rounded-full overflow-hidden"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                  >
                    <motion.div
                      className="absolute top-0 left-0 h-full bg-skin-green"
                      initial={{ width: 0 }}
                      animate={{ width: `${confidenceScore}%` }}
                      transition={{ delay: 0.5, duration: 1 }}
                    />
                    {/* Glowing Effect */}
                    <motion.div
                      className="absolute top-0 left-0 h-full bg-skin-light-green"
                      initial={{ width: 0 }}
                      animate={{ 
                        width: `${confidenceScore}%`,
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{ 
                        delay: 0.5, 
                        duration: 2,
                        repeat: Infinity
                      }}
                      style={{ filter: 'blur(4px)' }}
                    />
                  </motion.div>

                  {/* Analysis Results */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Primary Conditions */}
                    <motion.div
                      className="p-4 rounded-lg bg-skin-light-yellow border border-skin-yellow hover:shadow-lg transition-shadow duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <h3 className="text-lg font-semibold mb-3 text-skin-dark-green">
                        Primary Conditions
                      </h3>
                      <ul className="space-y-2">
                        <motion.li
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center gap-2 text-skin-dark-green/80"
                        >
                          <FaInfoCircle className="text-skin-green" />
                          <span>Sample Condition</span>
                        </motion.li>
                      </ul>
                    </motion.div>

                    {/* Risk Assessment */}
                    <motion.div
                      className="p-4 rounded-lg bg-skin-light-green border border-skin-green hover:shadow-lg transition-shadow duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <h3 className="text-lg font-semibold mb-3 text-skin-dark-green">
                        Risk Assessment
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <FaExclamationTriangle className="text-skin-yellow" />
                          <span className="text-skin-dark-green/80">
                            Severity: Moderate
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaChartLine className="text-skin-yellow" />
                          <span className="text-skin-dark-green/80">
                            Risk Level: Medium
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center bg-skin-light-yellow border-2 border-skin-yellow"
                >
                  <FaBrain className="text-4xl text-skin-dark-green" />
                </motion.div>
                <p className="text-xl text-skin-dark-green">
                  Select a body part on the map to view AI analysis and recommendations
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Helper function to get SVG paths based on view
function getSVGPath(view) {
  switch(view) {
    case 'side':
      return (
        <>
          {/* Side View Body */}
          <motion.path
            d="M60 15 C60 15 58 20 58 25 C58 30 60 35 60 45 L50 45 C50 35 48 30 48 25 C48 20 50 15 50 15 Z"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1 }}
          />
          {/* Side View Head */}
          <motion.path
            d="M55 10 C58 10 60 12 60 15 C60 18 58 20 55 20 C52 20 50 18 50 15 C50 12 52 10 55 10"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5 }}
          />
          {/* Side View Arm */}
          <motion.path
            d="M60 25 C65 27 70 30 80 40 C81 41 79 43 78 42 L60 30"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          {/* Side View Leg */}
          <motion.path
            d="M50 45 C48 55 46 65 45 85 L50 85 L55 50 L60 85 L65 85 C64 65 62 55 60 45"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 1 }}
          />
        </>
      );
    case 'back':
      return (
        <>
          {/* Back View Body */}
          <motion.path
            d="M45 15 C45 15 43 20 43 25 C43 30 45 35 45 45 L55 45 C55 35 57 30 57 25 C57 20 55 15 55 15 Z"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1 }}
          />
          {/* Back View Head */}
          <motion.circle
            cx="50"
            cy="10"
            r="5"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          {/* Back View Arms */}
          <motion.path
            d="M45 20 C40 22 35 25 25 35 C24 36 26 38 27 37 L45 25"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <motion.path
            d="M55 20 C60 22 65 25 75 35 C76 36 74 38 73 37 L55 25"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          {/* Back View Legs */}
          <motion.path
            d="M45 45 C43 55 41 65 40 85 L45 85 L50 50 L55 85 L60 85 C59 65 57 55 55 45"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 1 }}
          />
        </>
      );
    default: // front view
      return (
        <>
          {/* Front View Body */}
          <motion.path
            d="M45 15 C45 15 43 20 43 25 C43 30 45 35 45 45 L55 45 C55 35 57 30 57 25 C57 20 55 15 55 15 Z"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1 }}
          />
          {/* Front View Head with Details */}
          <motion.g
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <circle cx="50" cy="10" r="5" />
            <motion.path
              d="M48 8 Q50 6 52 8"
              strokeWidth="0.3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            />
            {/* Eyes */}
            <motion.circle
              cx="48.5"
              cy="9"
              r="0.5"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7 }}
            />
            <motion.circle
              cx="51.5"
              cy="9"
              r="0.5"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7 }}
            />
          </motion.g>
          {/* Front View Arms */}
          <motion.g>
            <motion.path
              d="M45 20 C40 22 35 25 25 35 C24 36 26 38 27 37 L45 25"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <motion.path
              d="M55 20 C60 22 65 25 75 35 C76 36 74 38 73 37 L55 25"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            {/* Joints */}
            <motion.circle
              cx="35"
              cy="28"
              r="0.5"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1 }}
            />
            <motion.circle
              cx="65"
              cy="28"
              r="0.5"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1 }}
            />
          </motion.g>
          {/* Front View Legs */}
          <motion.path
            d="M45 45 C43 55 41 65 40 85 L45 85 L50 50 L55 85 L60 85 C59 65 57 55 55 45"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 1 }}
          />
        </>
      );
  }
}

export default PatientStories;
