/**
 * Health check — sempre retorna 200 se o servidor estiver rodando.
 * Campo "ready" indica se o WhatsApp esta pronto para enviar.
 */

import { Router } from "express";

export const healthRouter = Router();

healthRouter.get("/", (req, res) => {
  const whatsapp = req.app.locals.whatsapp;
  const ready = whatsapp?.isReady();
  res.status(200).json({
    ok: true,
    ready,
    status: whatsapp?.getStatus().state || "offline",
    message: whatsapp?.getStatus().message || "Servidor não inicializou.",
    uptimeSeconds: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});
