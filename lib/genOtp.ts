import speakeasy from 'speakeasy';

export default async function OtpGenerator(): Promise<{otp: string, secret: string}> {
    const secret = speakeasy.generateSecret().base32;

    const genOtp = speakeasy.totp({
        secret,
        digits: 6,
        step: 30, // OTP changes in 60 seconds
        time: 7200 // OTP expires in 2 hours

    });

    return {otp: genOtp, secret: secret};
}