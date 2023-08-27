const jwt = require("jsonwebtoken");
const unAuthorizedResponse = {
  status: 401,
  message: "unauthorized.",
};

const tokenExpiredResponse = {
  status: 401,
  message: "Token expired.",
};

const invalidTokenResponse = {
  status: 401,
  message: "Invalid token.",
};

const sessionExpiredResponse = {
  status: 401,
  message: "Session expired.",
};
module.exports = {
  validateToken: async (req, res, next) => {
    try {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      if (!token) {
        next(invalidTokenResponse);
      }

      jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) {
          // update session inactive or DELETE by accessToken
          if (err.name == "TokenExpiredError") {
            // userService.updateSessionDELETED(token);
            next(tokenExpiredResponse);
          } else if (
            err.name == "JsonWebTokenError" &&
            err.message == "jwt must be provided"
          ) {
            next(invalidTokenResponse);
          } else {
            next(unAuthorizedResponse);
          }
        }
        req.user = user;

        next();
      });
    } catch (err) {
      console.log("error msgs", err.message);
      next(unAuthorizedResponse);
    }
  },
  verifyToken: async (req, res, next) => {
    try {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      if (!token) {
        return res.status(200).send({ isValid: false });
      }

      jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) {
          return res.status(200).send({ isValid: false });
        }
        req.user = user;
        if (user?.skipSession) {
          return res.status(200).send({ isValid: false });
        }

        if (!user?.sessionId) {
          return res.status(200).send({ isValid: false });
        }

        const getSessionData = await userService.getSessionData(
          user?.sessionId
        );

        if (!getSessionData) {
          return res.status(200).send({ isValid: false });
        }
        return res.status(200).send({ isValid: true });
      });
    } catch (err) {
      next({
        status: 500,
        message: "Internal server error",
      });
    }
  },
  validateTokenResetToken: async (req, res, next) => {
    try {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      if (!token) {
        next(unAuthorizedResponse);
      }

      jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) {
          next(unAuthorizedResponse);
        }
        if (!user?.skipSession) {
          next(unAuthorizedResponse);
        }
        req.user = user;
        next();
        // }
      });
    } catch (err) {
      console.log("error msgs", err.message);
      next(unAuthorizedResponse);
    }
  },
};
