import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaMicroscope, FaRobot, FaChartLine, FaShieldAlt, FaChevronDown, FaChevronUp, FaLeaf, FaInfoCircle } from 'react-icons/fa';
import { useState } from 'react';
import heroImage from '../assets/h.png';
import logo from '../assets/logoss.png';
import SignInPrompt from '../components/auth/SignInPrompt';

function Home() {
  const [expandedDisease, setExpandedDisease] = useState(null);
  const [showSignInPrompt, setShowSignInPrompt] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleAnalysisClick = () => {
    if (user) {
      navigate('/learning');
    } else {
      setShowSignInPrompt(true);
    }
  };

  const skinDiseases = [
    {
      name: "Acne",
      description: "Acne is a frequent skin condition where the hair follicles present under the skin become clogged with oil, dead skin cells, or bacteria. It is an inflammatory disorder of the skin, where the sebaceous or oil glands that connect to the hair follicle cause pimples and whiteheads. It primarily affects the face but can also affect the chest and shoulders.",
      symptoms: [
        "Blackheads and whiteheads",
        "Inflammatory papules",
        "Pustules (pimples)",
        "Cystic lesions",
        "Skin inflammation"
      ]
    },
    {
      name: "Psoriasis",
      description: "Psoriasis is a skin disorder associated with chronic inflammation and cell proliferation. Erythematous plaques covered in silvery scales are characteristic of this condition. They are most prominent on the extensor surfaces (skin surface present outside of a joint), scalp, and lumbosacral area. Based on the occurrence of psoriasis before and after the age of 40 years, it is classified into type 1 (<40 years) and type 2(>40 years). The cause for this condition is unknown, but it is considered to be a T-lymphocyte-mediated autoimmune disease.",
      symptoms: [
        "Red patches with silvery scales",
        "Dry, cracked skin",
        "Itching and burning",
        "Thickened nails",
        "Joint pain"
      ]
    },
    {
      name: "Scars",
      description: "As the body repairs the wound, it often leaves behind a scar. The body generates new tissue to patch up injured skin and fill missing areas. Scars can be any size or shape. They can develop as a response to trauma, surgery, acne, or disease. Most scars disappear after a while. Scars might fade with treatment over time.",
      symptoms: [
        "Raised or sunken areas of skin",
        "Discoloration",
        "Texture changes",
        "Tightness or restriction",
        "Pain or itching"
      ]
    },
    {
      name: "Warts",
      description: "Warts are small growths on the skin caused by a viral infection. They are typically harmless and often go away on their own, though they can be contagious and spread to other parts of the body or to other people.",
      symptoms: [
        "Rough, bumpy growths",
        "Skin-colored, brown, or gray appearance",
        "Black dots in the growth",
        "Can be painful when pressed",
        "May appear in clusters"
      ]
    },
    {
      name: "Atopic Dermatitis (Eczema)",
      description: "A chronic inflammatory skin condition that causes dry, itchy, and inflamed skin. It commonly begins in childhood and can persist into adulthood. The condition tends to flare periodically and may be accompanied by asthma or hay fever.",
      symptoms: [
        "Dry, scaly skin",
        "Intense itching",
        "Red to brownish-gray patches",
        "Small, raised bumps",
        "Raw, sensitive skin from scratching"
      ]
    },
    {
      name: "Ringworm",
      description: "A common fungal infection that affects the skin. Despite its name, it's not caused by a worm but rather by various types of fungi. It creates a ring-shaped rash on the skin's surface.",
      symptoms: [
        "Ring-shaped rash",
        "Red, scaly borders",
        "Clear or scaly center",
        "Itching",
        "Spreading rings"
      ]
    },
    {
      name: "Alopecia Areata",
      description: "An autoimmune condition that causes hair loss in patches. The immune system attacks hair follicles, leading to hair loss on the scalp and other parts of the body.",
      symptoms: [
        "Circular bald patches",
        "Sudden hair loss",
        "Nail changes",
        "Scalp sensitivity",
        "Unpredictable hair regrowth"
      ]
    },
    {
      name: "Contact Dermatitis",
      description: "A skin inflammation caused by direct contact with an irritant or allergen. Can develop after exposure to various substances including soaps, cosmetics, jewelry, or plants.",
      symptoms: [
        "Red rash",
        "Itching",
        "Burning sensation",
        "Blisters",
        "Dry, cracked skin"
      ]
    },
    {
      name: "Vitiligo",
      description: "A condition where patches of skin lose their pigment. It occurs when melanocytes, the cells responsible for skin color, are destroyed by the immune system.",
      symptoms: [
        "White patches on skin",
        "Premature whitening of hair",
        "Loss of color in the retina",
        "Patches that grow over time",
        "Symmetrical patterns"
      ]
    },
    {
      name: "Skin Cancer",
      description: "Abnormal growth of skin cells, most often developing on skin exposed to the sun. The three main types are basal cell carcinoma, squamous cell carcinoma, and melanoma.",
      symptoms: [
        "New, unusual growths",
        "Changes in existing moles",
        "Sores that don't heal",
        "Asymmetrical spots",
        "Irregular borders"
      ]
    }
  ];

  const features = [
    {
      icon: FaMicroscope,
      title: "Image Analysis ->",
      description: "Cutting-edge skin analysis using advance technologies.",
      color: "from-yellow-400 to-yellow-600"
    },
    {
      icon: FaRobot,
      title: "Risk Assessment ->",
      description: "Smart diagnosis powered by machine learning algorithms",
      color: "from-green-400 to-green-600"
    },
    {
      icon: FaChartLine,
      title: "AccurateResults ->",
      description: "High precision detection and classification of skin conditions",
      color: "from-blue-400 to-blue-600"
    },
    {
      icon: FaShieldAlt,
      title: "Early Detection ->",
      description: "Identify skin issues before they become serious problems",
      color: "from-purple-400 to-purple-600"
    }
  ];

  const skinLayers = [
    {
      name: "Epidermis",
      description: "The outermost layer of skin, providing protection against environmental factors and regulating moisture.",
      color: "bg-[#90C165]",
      textColor: "text-white"
    },
    {
      name: "Dermis",
      description: "Contains blood vessels, hair follicles, and nerve endings, providing nutrients and sensory information.",
      color: "bg-[#FFD700]",
      textColor: "text-[#556B2F]"
    }
  ];

  return (
    <div className="relative">
      <div className="min-h-screen bg-gradient-to-br from-skin-yellow via-skin-light-yellow to-skin-light-green relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white/10 rounded-full"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 py-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <motion.img
              src={logo}
              alt="Skin Scan Logo"
              className="w-32 h-32 mx-auto mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-6xl font-bold mb-6 text-skin-dark-green bg-clip-text text-transparent bg-gradient-to-r from-skin-dark-green to-skin-green">
                Skin Disease Detection
              </h1>
              <p className="text-xl mb-8 max-w-3xl mx-auto text-skin-dark-green/80">
                Scan your skin, catch the signs, predict, and protect what's within—understanding skin conditions is key for early detection and proper treatment.
              </p>
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="relative"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-skin-yellow to-skin-green rounded-full blur-3xl opacity-20"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.img
                src={heroImage}
                alt="Skin Analysis Visualization"
                className="relative rounded-2xl shadow-2xl"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
              
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center"
                  style={{
                    left: `${Math.random() * 80 + 10}%`,
                    top: `${Math.random() * 80 + 10}%`,
                  }}
                  animate={{
                    y: [0, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <span className="w-4 h-4 rounded-full bg-gradient-to-r from-skin-yellow to-skin-green" />
                </motion.div>
              ))}
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="bg-white/90 backdrop-blur-lg rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                    <feature.icon className="text-white text-2xl" />
                  </div>
                  <h3 className="text-lg font-semibold text-skin-dark-green mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="text-center mt-16"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAnalysisClick}
              className="bg-gradient-to-r from-skin-yellow to-skin-green text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              Start Your Skin Analysis
            </motion.button>
          </motion.div>
        </div>
      </div>

      <div className="py-16 bg-gradient-to-br from-skin-light-yellow via-white to-skin-light-green">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-block p-2 bg-skin-light-yellow rounded-full mb-4">
              <FaLeaf className="text-4xl text-skin-dark-green" />
            </div>
            <h2 className="text-4xl font-bold text-skin-dark-green mb-4">
              Common Skin Conditions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Know Your Skin: Recognize Common Conditions for Early Care and Protection.
            </p>
          </motion.div>

          <div className="grid gap-4">
            {skinDiseases.map((disease, index) => (
              <motion.div
                key={disease.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-skin-yellow hover:shadow-xl transition-shadow"
              >
                <button
                  onClick={() => setExpandedDisease(expandedDisease === disease.name ? null : disease.name)}
                  className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-skin-yellow to-skin-light-green text-skin-dark-green hover:from-skin-light-yellow hover:to-skin-green transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FaInfoCircle className="text-xl" />
                    <span className="text-xl font-semibold">{disease.name}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedDisease === disease.name ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {expandedDisease === disease.name ? <FaChevronUp /> : <FaChevronDown />}
                  </motion.div>
                </button>

                {expandedDisease === disease.name && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-6 bg-white"
                  >
                    <p className="text-gray-700 mb-6 leading-relaxed">{disease.description}</p>
                    
                    <div className="bg-skin-light-yellow rounded-lg p-4">
                      <h4 className="font-semibold text-skin-dark-green mb-3">Common Symptoms:</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {disease.symptoms.map((symptom, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm"
                          >
                            <div className="w-2 h-2 bg-skin-green rounded-full flex-shrink-0" />
                            <span className="text-gray-700">{symptom}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 bg-white rounded-2xl shadow-lg mb-16">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-16 text-[#556B2F]"
        >
          Understanding Skin Layers
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="flex flex-col gap-0">
              {skinLayers.map((layer, index) => (
                <motion.div
                  key={layer.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className={`${layer.color} p-16 rounded-3xl ${index === 0 ? 'rounded-b-none' : 'rounded-t-none'} relative`}
                >
                  <h3 className={`text-3xl font-bold ${layer.textColor} text-center`}>
                    {layer.name}
                  </h3>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="space-y-8">
            {skinLayers.map((layer, index) => (
              <motion.div
                key={layer.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="space-y-2"
              >
                <h3 className="text-2xl font-bold text-[#556B2F]">
                  {layer.name}
                </h3>
                <p className="text-gray-700 text-lg">
                  {layer.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-4 py-16 mb-16"
      >
        <div className="bg-gradient-to-br from-skin-light-yellow via-skin-light-green to-skin-yellow rounded-2xl p-12 shadow-2xl relative overflow-hidden">
          {/* Decorative Elements */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'radial-gradient(circle at 20% 20%, rgba(147, 197, 114, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 80%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 20%, rgba(147, 197, 114, 0.1) 0%, transparent 50%)'
              ]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />

          {/* Floating Leaves Animation */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ 
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                rotate: 0,
                scale: 1
              }}
              animate={{
                top: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                left: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 15 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <svg
                className="w-8 h-8 text-skin-green opacity-20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2L8 6H4L2 8V12L6 16V20L8 22H12L16 18H20L22 16V12L18 8V4L16 2H12Z" />
              </svg>
            </motion.div>
          ))}

          {/* Main Content */}
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-skin-dark-green mb-8"
            >
              Empowering Early Detection
            </motion.h2>

            {/* Animated Quote */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-12"
            >
              <blockquote className="text-2xl font-serif italic text-skin-dark-green leading-relaxed">
                "In the realm of skin health,
                <br />
                Knowledge is our greatest shield,
                <br />
                Early detection, our guiding light,
                <br />
                For a future that's revealed."
              </blockquote>
            </motion.div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  title: "Prevention",
                  description: "Early detection saves lives through timely intervention",
                  icon: "🛡️"
                },
                {
                  title: "Education",
                  description: "Empowering through knowledge and awareness",
                  icon: "📚"
                },
                {
                  title: "Support",
                  description: "Comprehensive care and continuous guidance",
                  icon: "🤝"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-skin-yellow"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-skin-dark-green mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="inline-block"
            >
              <button className="bg-gradient-to-r from-skin-yellow to-skin-green text-skin-dark-g px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
           OUR SKIN IS NOT JUST A SURFACE; IT REFLECTS OUR INNER ESSENCE
              </button>
            </motion.div>
          </div>

          {/* Decorative Bottom Border */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-skin-yellow via-skin-green to-skin-yellow"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </div>
      </motion.section>

      <SignInPrompt 
        isOpen={showSignInPrompt} 
        onClose={() => setShowSignInPrompt(false)} 
      />
    </div>
  );
}

export default Home;
