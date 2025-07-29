import { Request, Response } from 'express';

export class HealthController {
  /**
   * Health check endpoint
   */
  static async healthCheck(req: Request, res: Response) {
    res.json({ status: 'ok' });
  }
} 