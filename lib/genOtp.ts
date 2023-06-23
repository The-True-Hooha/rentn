import speakeasy from 'speakeasy';

export default async function OtpGenerator(): Promise<{otp: string, secret: string}> {
    const secret = speakeasy.generateSecret({length: 24}).base32

    const genOtp = speakeasy.time({
        secret: secret,
        digits: 6,
        encoding: 'base32',
        algorithm: 'sha256',
        step: 600, // OTP changes in 60 seconds
        // time: 120, // OTP expires in 2 hours

    });
    return {otp: genOtp, secret: secret};
}
