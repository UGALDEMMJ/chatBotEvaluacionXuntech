export function apiKeyValidator(apiKeyFromEnv){
  return function(req, res, next) {
    if(!apiKeyFromEnv || req.header("Authorization") !== `Bearer ${apiKeyFromEnv}`) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = {
      _id: "68cde113f5c3294bf3ecc646", // ID fijo para testing
      name: "anon"
    };
    next();
  }
}