const generateOTP = async () => {
  try {
    // return (otp = `${Math.floor(1000 + Math.random() * 9000)}`);

    return (otp = `${Math.floor(100000 + Math.random() * 900000)}`);
  } catch (error) {
    throw error;
  }
};

module.exports = generateOTP;
