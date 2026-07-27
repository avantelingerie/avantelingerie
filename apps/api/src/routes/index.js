import { Router } from 'express';
import healthCheck from './health-check.js';
import blingRouter from './bling.js';
import integracoesRouter from './integracoes.js';
import configuracoesRouter from './configuracoes.js';
import webhooksRouter from './webhooks.js';
import dashboardRouter from './dashboard.js';
import notificacoesRouter from './notificacoes.js';
import comingSoonRouter from './coming-soon.js';
import shippingRouter from './shipping.js';
import paymentRouter from './payment.js';
import setupRouter from './setup.js';
import liaRouter from './lia.js';
import whatsappRouter from './whatsapp.js';

const router = Router();

export default () => {
    router.get('/health', healthCheck);
    router.use('/bling', blingRouter);
    router.use('/integracoes', integracoesRouter);
    router.use('/configuracoes', configuracoesRouter);
    router.use('/webhooks', webhooksRouter);
    router.use('/dashboard', dashboardRouter);
    router.use('/notificacoes', notificacoesRouter);
    router.use('/coming-soon', comingSoonRouter);
    router.use('/shipping', shippingRouter);
    router.use('/payment', paymentRouter);
    router.use('/setup', setupRouter);
    router.use('/lia', liaRouter);
    router.use('/whatsapp', whatsappRouter);

    return router;
};
