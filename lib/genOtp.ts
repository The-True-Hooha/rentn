import speakeasy from 'speakeasy';
export default async function OtpGenerator(): Promise<string> {

    const genOtp = speakeasy.totp({
        secret: speakeasy.generateSecret().base32,
        digits: 6,
        step: 60, // OTP changes in 60 seconds
        time: 7200 // OTP expires in 2 hours

    });

    return genOtp;
}