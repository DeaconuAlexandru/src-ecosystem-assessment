import { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import Stepper from '../components/Stepper';
import StateCard from '../components/StateCard';
import { defaultOnboardingForm, networkOptions, onboardingSteps } from '../data/mockData';
import { sleep } from '../utils/formatters';
import { validateOnboardingStep } from '../utils/validation';

const initialTouched = {
  companyName: false,
  country: false,
  registrationNumber: false,
  website: false,
  kycDocument: false,
  contactEmail: false,
  walletAddress: false,
  network: false,
};

export default function OnboardingTask() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(defaultOnboardingForm);
  const [touched, setTouched] = useState(initialTouched);
  const [errors, setErrors] = useState({});
  const [submitState, setSubmitState] = useState('idle');
  const [submitMessage, setSubmitMessage] = useState('');


  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const goNext = () => {
    const nextErrors = validateOnboardingStep(step, form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setTouched((prev) => ({
        ...prev,
        companyName: true,
        country: true,
        registrationNumber: true,
        kycDocument: true,
        contactEmail: true,
        walletAddress: true,
        network: true,
      }));
      return;
    }

    setStep((value) => Math.min(value + 1, onboardingSteps.length - 1));
  };

  const goBack = () => setStep((value) => Math.max(value - 1, 0));

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    updateField('kycDocument', file ? file.name : '');
  };

  const connectWallet = () => {
    updateField('walletAddress', '0xA12B34C56D78E90F1234567890ABCDEFFEDCBA98');
  };

  const submit = async () => {
    const finalErrors = validateOnboardingStep(step, form);
    setErrors(finalErrors);
    if (Object.keys(finalErrors).length > 0) return;

    setSubmitState('loading');
    setSubmitMessage('Submitting onboarding package...');
    await sleep(1400);

    const shouldFail = form.companyName.trim().toLowerCase().includes('fail') || Math.random() < 0.2;

    if (shouldFail) {
      setSubmitState('error');
      setSubmitMessage('Submission failed. Please verify the documents and try again.');
      return;
    }

    setSubmitState('success');
    setSubmitMessage('Onboarding submitted successfully. The team can now review the exporter profile.');
  };

  const renderFieldError = (field) =>
    touched[field] && errors[field] ? <span className="field-error">{errors[field]}</span> : null;

  return (
    <div className="task-grid onboarding-task">
      <section className="panel onboarding-panel">
        <SectionTitle
          eyebrow="Task 2"
          title="Multi-step Workflow UX"
          description="A guided onboarding flow with validation, progress indicator, and clear success or error states."
        />

        <Stepper steps={onboardingSteps} currentStep={step} />

        <div className="form-panel">
          {step === 0 && (
            <div className="form-grid">
              <label className="field">
                <span>Company Information</span>
                <input
                  value={form.companyName}
                  onChange={(e) => updateField('companyName', e.target.value)}
                  onBlur={() => setTouched((prev) => ({ ...prev, companyName: true }))}
                  placeholder="SRC Exporters Ltd."
                />
                {renderFieldError('companyName')}
              </label>

              <label className="field">
                <span>Country</span>
                <input
                  value={form.country}
                  onChange={(e) => updateField('country', e.target.value)}
                  onBlur={() => setTouched((prev) => ({ ...prev, country: true }))}
                  placeholder="Romania"
                />
                {renderFieldError('country')}
              </label>

              <label className="field">
                <span>Registration Number</span>
                <input
                  value={form.registrationNumber}
                  onChange={(e) => updateField('registrationNumber', e.target.value)}
                  onBlur={() => setTouched((prev) => ({ ...prev, registrationNumber: true }))}
                  placeholder="J12/1234/2024"
                />
                {renderFieldError('registrationNumber')}
              </label>

              <label className="field">
                <span>Website (optional)</span>
                <input
                  value={form.website}
                  onChange={(e) => updateField('website', e.target.value)}
                  placeholder="https://company.example"
                />
              </label>
            </div>
          )}

          {step === 1 && (
            <div className="form-grid">
              <label className="field full">
                <span>KYC / KYB File Upload</span>
                <input
                  type="file"
                  onChange={handleFileChange}
                  onBlur={() => setTouched((prev) => ({ ...prev, kycDocument: true }))}
                />
                <small>{form.kycDocument ? `Selected: ${form.kycDocument}` : 'Upload a PDF, image, or scan.'}</small>
                {renderFieldError('kycDocument')}
              </label>

              <label className="field">
                <span>Contact Email</span>
                <input
                  value={form.contactEmail}
                  onChange={(e) => updateField('contactEmail', e.target.value)}
                  placeholder="ops@company.com"
                />
                {renderFieldError('contactEmail')}
              </label>

              <div className="info-box">
                <strong>Loading / error / success states</strong>
                <p>
                  This step is designed to surface clear feedback when the upload is missing or the
                  backend review is delayed.
                </p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="form-grid">
              <label className="field full">
                <span>Wallet Connection</span>
                <div className="inline-actions">
                  <input
                    value={form.walletAddress}
                    onChange={(e) => updateField('walletAddress', e.target.value)}
                    onBlur={() => setTouched((prev) => ({ ...prev, walletAddress: true }))}
                    placeholder="0x..."
                  />
                  <button type="button" className="ghost-button" onClick={connectWallet}>
                    Connect
                  </button>
                </div>
                {renderFieldError('walletAddress')}
              </label>

              <label className="field">
                <span>Network</span>
                <select
                  value={form.network}
                  onChange={(e) => updateField('network', e.target.value)}
                  onBlur={() => setTouched((prev) => ({ ...prev, network: true }))}
                >
                  {networkOptions.map((network) => (
                    <option key={network} value={network}>{network}</option>
                  ))}
                </select>
                {renderFieldError('network')}
              </label>

              <StateCard
                type="info"
                title="Trust-building UX"
                message="Non-crypto users should see the network and wallet context before they submit."
                icon="🔐"
              />
            </div>
          )}

          {step === 3 && (
            <div className="review-layout">
              <div className="review-card">
                <h4>Review & Submit</h4>
                <ul>
                  <li><span>Company</span><strong>{form.companyName || '—'}</strong></li>
                  <li><span>Country</span><strong>{form.country || '—'}</strong></li>
                  <li><span>KYC/KYB</span><strong>{form.kycDocument || '—'}</strong></li>
                  <li><span>Wallet</span><strong>{form.walletAddress || '—'}</strong></li>
                </ul>
              </div>

              <StateCard
                type={submitState === 'error' ? 'danger' : submitState === 'success' ? 'success' : 'info'}
                title={
                  submitState === 'loading'
                    ? 'Submitting...'
                    : submitState === 'error'
                      ? 'Submission blocked'
                      : submitState === 'success'
                        ? 'Submitted'
                        : 'Ready to submit'
                }
                message={submitMessage || 'Check the details and submit when everything is correct.'}
                icon={submitState === 'success' ? '✅' : submitState === 'error' ? '⚠️' : '📦'}
                actions={submitState === 'error' ? (
                  <button type="button" className="ghost-button" onClick={submit} disabled={submitState === 'loading'}>
                    Retry
                  </button>
                ) : null}
              />
            </div>
          )}
        </div>

        <div className="form-actions">
          <button type="button" className="ghost-button" onClick={goBack} disabled={step === 0 || submitState === 'loading'}>
            Back
          </button>

          {step < onboardingSteps.length - 1 ? (
            <button type="button" className="primary-button" onClick={goNext}>
              Next step
            </button>
          ) : (
            <button type="button" className="primary-button" onClick={submit} disabled={submitState === 'loading'}>
              {submitState === 'loading' ? 'Submitting…' : 'Submit onboarding'}
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
