const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateOnboardingStep = (step, form) => {
  const errors = {};

  if (step === 0) {
    if (!form.companyName.trim()) errors.companyName = 'Company name is required.';
    if (!form.country.trim()) errors.country = 'Country is required.';
    if (!form.registrationNumber.trim()) {
      errors.registrationNumber = 'Registration number is required.';
    }
  }

  if (step === 1) {
    if (!form.kycDocument) errors.kycDocument = 'Please upload a KYC/KYB file.';
    if (form.contactEmail && !emailRegex.test(form.contactEmail)) {
      errors.contactEmail = 'Enter a valid email address.';
    }
  }

  if (step === 2) {
    if (!form.walletAddress.trim()) {
      errors.walletAddress = 'Wallet address is required.';
    } else if (!/^0x[a-fA-F0-9]{40}$/.test(form.walletAddress.trim())) {
      errors.walletAddress = 'Wallet address should look like 0x...';
    }

    if (!form.network.trim()) errors.network = 'Select a network.';
  }

  return errors;
};
