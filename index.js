// const express = require("express");
// const axios = require("axios");
// require("dotenv").config();




// const app = express();
// app.use(express.json());

// // ✅ Your official email
// const EMAIL = "harshita0519.be23@chitkara.edu.in";

// /* ------------------- Utility Functions ------------------- */

// // Fibonacci series
// function fibonacci(n) {
//   let series = [0, 1];
//   for (let i = 2; i < n; i++) {
//     series.push(series[i - 1] + series[i - 2]);
//   }
//   return series.slice(0, n);
// }

// // Prime check
// function isPrime(num) {
//   if (num < 2) return false;
//   for (let i = 2; i <= Math.sqrt(num); i++) {
//     if (num % i === 0) return false;
//   }
//   return true;
// }

// // GCD (HCF)
// function gcd(a, b) {
//   return b === 0 ? a : gcd(b, a % b);
// }

// // LCM
// function lcm(a, b) {
//   return (a * b) / gcd(a, b);
// }

// /* ------------------- API 1: Health ------------------- */

// app.get("/health", (req, res) => {
//   res.json({
//     is_success: true,
//     official_email: EMAIL,
//   });
// });

// /* ------------------- API 2: BFHL ------------------- */

// app.post("/bfhl", async (req, res) => {
//   try {
//     const body = req.body;

//     // ✅ Fibonacci
//    if (body.fibonacci !== undefined) {
//   const n = Number(body.fibonacci);

//   if (isNaN(n) || n < 1) {
//     return res.status(400).json({
//       is_success: false,
//       official_email: EMAIL,
//       error: "Invalid fibonacci input"
//     });
//   }

//   return res.json({
//     is_success: true,
//     official_email: EMAIL,
//     data: fibonacci(n)
//   });
// }



//     // ✅ Prime
//     // ✅ Prime Numbers
// if (body.prime !== undefined) {

//   const arr = body.prime;

//   // Validation
//   if (!Array.isArray(arr)) {
//     return res.status(400).json({
//       is_success: false,
//       official_email: EMAIL,
//       error: "Prime input must be an array"
//     });
//   }

//   // Prime function
//   function isPrime(num) {
//     if (num < 2) return false;
//     for (let i = 2; i <= Math.sqrt(num); i++) {
//       if (num % i === 0) return false;
//     }
//     return true;
//   }

//   const primes = arr.filter(isPrime);

//   return res.json({
//     is_success: true,
//     official_email: EMAIL,
//     data: primes
//   });
// }



//     // ✅ LCM
//     if (body.lcm !== undefined) {
//       const arr = body.lcm;
//       let result = arr.reduce((acc, val) => lcm(acc, val));

//       return res.json({
//         is_success: true,
//         official_email: EMAIL,
//         data: result,
//       });
//     }

//     // ✅ HCF
//     if (body.hcf !== undefined) {
//       const arr = body.hcf;
//       let result = arr.reduce((acc, val) => gcd(acc, val));

//       return res.json({
//         is_success: true,
//         official_email: EMAIL,
//         data: result,
//       });
//     }

//     // ✅ AI Integration (Gemini)
//     // ✅ AI Integration
// // ✅ AI Integration
// // ✅ AI Integration (Gemini Working)
// if (body.AI !== undefined) {
//   return res.json({
//     is_success: true,
//     official_email: EMAIL,
//     data: "AI integration skipped because API billing is not enabled.",
//   });
// }

    

//     // ❌ Invalid input
//     return res.status(400).json({
//       is_success: false,
//       official_email: EMAIL,
//       error: "Invalid key provided",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       is_success: false,
//       official_email: EMAIL,
//       error: "Server error",
//     });
//   }
// });

// /* ------------------- Start Server ------------------- */

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log("Server running on port", PORT));







































require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/health", (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: process.env.OFFICIAL_EMAIL
  });
});

app.post("/bfhl", async (req, res) => {
  try {
    const body = req.body;
    const keys = Object.keys(body);

    
    if (keys.length !== 1) {
      return res.status(400).json({
        is_success: false,
        error: "Exactly one key is required"
      });
    }

    const key = keys[0];
    let data;

    switch (key) {
      case "fibonacci":
        data = fibonacci(body[key]);
        break;

      case "prime":
        data = filterPrimes(body[key]);
        break;

      case "lcm":
        data = findLCM(body[key]);
        break;

      case "hcf":
        data = findHCF(body[key]);
        break;

      case "AI":
        data = await getAIResponse(body[key]);
        break;

      default:
        return res.status(400).json({
          is_success: false,
          error: "Invalid key"
        });
    }

    res.status(200).json({
      is_success: true,
      official_email: process.env.OFFICIAL_EMAIL,
      data
    });

  } catch (err) {
    res.status(500).json({
      is_success: false,
      error: "Server error"
    });
  }
});

function fibonacci(n) {
  if (!Number.isInteger(n) || n < 0) throw Error();

  let a = 0, b = 1;
  const result = [];

  for (let i = 0; i < n; i++) {
    result.push(a);
    [a, b] = [b, a + b];
  }
  return result;
}

function filterPrimes(arr) {
  if (!Array.isArray(arr)) throw Error();

  const isPrime = num => {
    if (num < 2) return false;
    for (let i = 2; i * i <= num; i++) {
      if (num % i === 0) return false;
    }
    return true;
  };

  return arr.filter(isPrime);
}


function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function findHCF(arr) {
  if (!Array.isArray(arr)) throw Error();
  return arr.reduce((a, b) => gcd(a, b));
}


function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

function findLCM(arr) {
  if (!Array.isArray(arr)) throw Error();
  return arr.reduce((a, b) => lcm(a, b));
}

async function getAIResponse(question) {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
           parts: [{ text: question + " Answer briefly in 2-3 words only." }]

          }
        ]
      }
    );

    return response.data.candidates[0].content.parts[0].text.trim();

  } catch (err) {
    console.log("Gemini Error:", err.response?.data || err.message);
    return "AI service not available right now";
  }
}


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});