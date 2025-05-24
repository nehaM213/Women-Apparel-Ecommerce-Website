import redis from "@/lib/redis";

export function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
  }
  
  export async function saveOtp(identifier, otp) {
    // Save with TTL of 5 minutes (300 seconds)
    await redis.set(`otp:${identifier}`, otp, { ex: 300 });
  }
  
  export async function verifyOtp(identifier, otp) {
    const stored = await redis.get(`otp:${identifier}`);
    console.log("stored-",typeof stored, "otp", typeof otp);
    return stored === Number(otp);
  }
  
  export async function deleteOtp(identifier) {
    await redis.del(`otp:${identifier}`);
  }
