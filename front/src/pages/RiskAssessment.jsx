// The existing implementation already has most of the requested changes:

// 1. Age select input (10-100)
const ageOptions = Array.from({ length: 91 }, (_, i) => i + 10);

// Used in the form:
<select
  name="age"
  value={formData.age}
  onChange={handleInputChange}
  className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
  required
>
  <option value="">Select Age</option>
  {ageOptions.map(age => (
    <option key={age} value={age}>{age}</option>
  ))}
</select>

// 2. Gender selection
<select
  name="sex"
  value={formData.sex}
  onChange={handleInputChange}
  className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
  required
>
  <option value="">Select Gender</option>
  <option value="male">Male</option>
  <option value="female">Female</option>
  <option value="other">Other</option>
</select>

// 3. Blood sugar levels
<select
  name="bloodSugar"
  value={formData.bloodSugar}
  onChange={handleInputChange}
  className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
  required
>
  <option value="">Select Blood Sugar Level</option>
  <option value="normal">Normal (70-99 mg/dL)</option>
  <option value="prediabetes">Prediabetes (100-125 mg/dL)</option>
  <option value="diabetes">Diabetes (126+ mg/dL)</option>
  <option value="high">High (180-250 mg/dL)</option>
  <option value="very-high">Very High (250+ mg/dL)</option>
</select>
