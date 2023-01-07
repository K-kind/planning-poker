import { useEffect } from "react";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import {
  Routes,
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes,
} from "react-router-dom";

const SENTRY_DSN =
  "https://40e75c620aed47bea5b185028dd28cb8@o483139.ingest.sentry.io/4504462149419008";

export const initSentry = () => {
  Sentry.init({
    dsn: SENTRY_DSN,
    environment: process.env.NODE_ENV,
    release: process.env.REACT_APP_VERCEL_GIT_COMMIT_SHA,
    integrations: [
      new BrowserTracing({
        routingInstrumentation: Sentry.reactRouterV6Instrumentation(
          useEffect,
          useLocation,
          useNavigationType,
          createRoutesFromChildren,
          matchRoutes
        ),
      }),
    ],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
};

export const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes);

export const captureException = (e: unknown) => {
  Sentry.captureException(e);
};
