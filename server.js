// Import required modules

const express = require("express");

// Initialize Express app
const app = express();

// Define the port
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON (if needed in future)
app.use(express.json());

// Helper function to validate numeric inputs
const validateNumbers = (a, b) => {
  const numA = parseFloat(a);
  const numB = parseFloat(b);


  if (isNaN(numA) || isNaN(numB)) {

    return { valid: false, error: "Both parameters must be valid numbers" };
  }


  // Check for Infinity values
  if (!isFinite(numA) || !isFinite(numB)) {
    return { valid: false, error: "Infinity values are not allowed" };
  }

  return { valid: true, numA, numB };
};

// Root endpoint

app.get("/", (req, res) => {
  res.json({

    message: "Welcome to Arithmetic Operations API",
    endpoints: {





      addition: "GET /add?a=number&b=number",
      subtraction: "GET /subtract?a=number&b=number",
      multiplication: "GET /multiply?a=number&b=number",
      division: "GET /divide?a=number&b=number",
    },
  });
});

// Addition endpoint

app.get("/add", (req, res) => {
  const { a, b } = req.query;


  if (!a || !b) {
    return res.status(400).json({

      error:
        'Missing required parameters. Please provide both "a" and "b" query parameters.',
    });
  }


  const validation = validateNumbers(a, b);
  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }


  const result = validation.numA + validation.numB;


  res.json({

    operation: "addition",
    a: validation.numA,
    b: validation.numB,

    result,
  });
});

// Subtraction endpoint

app.get("/subtract", (req, res) => {
  const { a, b } = req.query;


  if (!a || !b) {
    return res.status(400).json({

      error:
        'Missing required parameters. Please provide both "a" and "b" query parameters.',
    });
  }


  const validation = validateNumbers(a, b);
  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }


  const result = validation.numA - validation.numB;


  res.json({

    operation: "subtraction",
    a: validation.numA,
    b: validation.numB,

    result,
  });
});

// Multiplication endpoint

app.get("/multiply", (req, res) => {
  const { a, b } = req.query;


  if (!a || !b) {
    return res.status(400).json({

      error:
        'Missing required parameters. Please provide both "a" and "b" query parameters.',
    });
  }


  const validation = validateNumbers(a, b);
  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }


  const result = validation.numA * validation.numB;


  res.json({

    operation: "multiplication",
    a: validation.numA,
    b: validation.numB,

    result,
  });
});

// Division endpoint

app.get("/divide", (req, res) => {
  const { a, b } = req.query;


  if (!a || !b) {
    return res.status(400).json({

      error:
        'Missing required parameters. Please provide both "a" and "b" query parameters.',
    });
  }


  const validation = validateNumbers(a, b);
  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }


  // Check for division by zero
  if (validation.numB === 0) {
    return res.status(400).json({

      error: "Division by zero is not allowed",
    });
  }


  const result = validation.numA / validation.numB;


  res.json({

    operation: "division",
    a: validation.numA,
    b: validation.numB,

    result,
  });
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({

    error: "Endpoint not found",
    availableEndpoints: {






      root: "GET /",
      addition: "GET /add?a=number&b=number",
      subtraction: "GET /subtract?a=number&b=number",
      multiplication: "GET /multiply?a=number&b=number",
      division: "GET /divide?a=number&b=number",
    },
  });
});

// Global error handler
app.use((err, req, res, next) => {

  console.error("Error:", err.stack);
  res.status(500).json({

    error: "Internal server error",
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);






  console.log("Available endpoints:");
  console.log("  - GET / (API information)");
  console.log("  - GET /add?a=number&b=number");
  console.log("  - GET /subtract?a=number&b=number");
  console.log("  - GET /multiply?a=number&b=number");
  console.log("  - GET /divide?a=number&b=number");
});

module.exports = app;
