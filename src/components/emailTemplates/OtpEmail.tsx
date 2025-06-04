// components/EmailTemplates/OtpEmail.tsx
export const OtpEmail = ({ otp }: { otp: string }) => (
    <div>
      <h2>Your OTP Code</h2>
      <p>Use the following OTP to complete your login/signup:</p>
      <h3 style={{ color: '#333' }}>{otp}</h3>
      <p>This code is valid for 5 minutes.</p>
    </div>
  );
  