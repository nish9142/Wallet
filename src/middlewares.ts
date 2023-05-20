import { Request, Response, NextFunction } from "express";

export const allRequiredKeysPresent = (requiredKeys: string[]) => (req: Request, res: Response, next: NextFunction) => {
  const payload = req.body || {};
  const payloadKeys = Object.keys(payload)
  for (let key of requiredKeys) {
    if (!payloadKeys.includes(key)) {
      res.status(403).send({ error: "Required key(s) missing" });
      throw new Error("Required key(s) missing");
    }
  }
  next();
};
