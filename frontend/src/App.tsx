import React, { useState } from 'react';
import { Activity, Droplets, HeartPulse, Scale, Layers, Syringe, UserCircle, Calculator, Sparkles, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';

interface FormData {
  pregnancies: number;
  glucose: number;
  bloodpressure: number;
  skinthickness: number;
  insulin: number;
  bmi: number;
  dpf: number;
  age: number;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    pregnancies: 0,
    glucose: 120,
    bloodpressure: 70,
    skinthickness: 20,
    insulin: 79,
    bmi: 25,
    dpf: 0.5,
    age: 33
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: parseFloat(e.target.value) || 0
    });
    if (result !== null) setResult(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch prediction');
      }

      const data = await response.json();
      setResult(data.prediction === 1);
    } catch (err) {
      setError('Error connecting to the API. Please ensure the Flask backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      {/* Left side hero content */}
      <div className="hero-section">
        <div className="hero-badge">
          <Sparkles size={16} />
          <span>AI-Powered Diagnostics</span>
        </div>
        <h1 className="hero-title">Diabetes Prediction Model</h1>
        <p className="hero-subtitle">
          Enter physiological parameters to instantly predict diabetes likelihood using an advanced Random Forest Classifier. Fast, secure, and accurate analysis at your fingertips.
        </p>
      </div>

      {/* Right side form */}
      <div className="glass-panel">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            
            <div className="input-group">
              <label className="input-label">Pregnancies</label>
              <div className="input-wrapper">
                <UserCircle className="input-icon" size={18} />
                <input
                  type="number"
                  name="pregnancies"
                  value={formData.pregnancies}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="0"
                  min="0"
                  step="1"
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Glucose Level</label>
              <div className="input-wrapper">
                <Droplets className="input-icon" size={18} />
                <input
                  type="number"
                  name="glucose"
                  value={formData.glucose}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="120"
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Blood Pressure</label>
              <div className="input-wrapper">
                <HeartPulse className="input-icon" size={18} />
                <input
                  type="number"
                  name="bloodpressure"
                  value={formData.bloodpressure}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="70"
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Skin Thickness</label>
              <div className="input-wrapper">
                <Layers className="input-icon" size={18} />
                <input
                  type="number"
                  name="skinthickness"
                  value={formData.skinthickness}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="20"
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Insulin Level</label>
              <div className="input-wrapper">
                <Syringe className="input-icon" size={18} />
                <input
                  type="number"
                  name="insulin"
                  value={formData.insulin}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="79"
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">BMI</label>
              <div className="input-wrapper">
                <Scale className="input-icon" size={18} />
                <input
                  type="number"
                  name="bmi"
                  value={formData.bmi}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="25.0"
                  step="0.1"
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">DPF (Pedigree)</label>
              <div className="input-wrapper">
                <Calculator className="input-icon" size={18} />
                <input
                  type="number"
                  name="dpf"
                  value={formData.dpf}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="0.5"
                  step="0.001"
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Age</label>
              <div className="input-wrapper">
                <Calendar className="input-icon" size={18} />
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="30"
                  min="1"
                  required
                />
              </div>
            </div>

          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? <div className="spinner"></div> : (
              <>
                <Activity size={20} />
                <span>Analyze Patient Profile</span>
              </>
            )}
          </button>
        </form>

        {error && (
          <div style={{ color: '#ef4444', marginTop: '1rem', fontSize: '0.875rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        {result !== null && (
          <div className={`result-card ${result ? 'positive' : 'negative'}`}>
            <div className="result-icon-box">
              {result ? <AlertCircle size={28} /> : <CheckCircle2 size={28} />}
            </div>
            <div className="result-content">
              <h3>{result ? 'Diabetic Detected' : 'No Diabetes Detected'}</h3>
              <p>
                {result 
                  ? 'The model predicts this patient is likely to have diabetes based on the provided metrics. Please consult a healthcare professional.' 
                  : 'The model predicts this patient is unlikely to have diabetes. Keep maintaining a healthy lifestyle!'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
