// Reusable form validation helpers
export const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
export const isValidPhone = (v: string) => {
  const cleaned = v.replace(/\s+/g, '');
  return /^\+?\d{7,15}$/.test(cleaned);
};

export const validateField = (trekMaxParticipants: number | undefined) => (name: string, value: any) => {
  switch (name) {
    case 'firstName':
      if (!value || String(value).trim().length < 2) return 'Please enter your first name (at least 2 characters).';
      return '';
    case 'email':
      if (!value) return 'Email is required.';
      if (!isValidEmail(String(value))) return 'Please enter a valid email address.';
      return '';
    case 'phone':
      if (!value) return 'Phone number is required.';
      if (!isValidPhone(String(value))) return 'Enter a valid phone number (digits only, include country code if applicable).';
      return '';
    case 'trekChoice':
      if (!value) return 'Please select a trek.';
      return '';
    case 'participants':
      if (!value || Number(value) < 1) return 'Please select the number of participants.';
      if (trekMaxParticipants && Number(value) > trekMaxParticipants) return `Max participants allowed is ${trekMaxParticipants}.`;
      return '';
    case 'message':
      if (value && String(value).length > 1000) return 'Message is too long (max 1000 characters).';
      return '';
    default:
      return '';
  }
};

export const validateForm = (formData: Record<string, any>, trekMaxParticipants?: number) => {
  const vf = validateField(trekMaxParticipants);
  const errors: Record<string, string> = {};
  Object.entries(formData).forEach(([k, v]) => {
    const err = vf(k, v);
    if (err) errors[k] = err;
  });
  return errors;
};
