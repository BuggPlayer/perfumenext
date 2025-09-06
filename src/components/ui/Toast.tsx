'use client';

import { useNotifications } from './Notification';
import { Toast as ToastAPI } from './Notification';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastOptions {
  title?: string;
  duration?: number;
}

export const useToast = () => {
  const ctx = useNotifications();

  return {
    show: ctx.show,
    dismiss: ctx.dismiss,
    success: (message: string, options?: ToastOptions) =>
      ToastAPI.success(ctx, message, options?.title, options?.duration ?? 3000),
    error: (message: string, options?: ToastOptions) =>
      ToastAPI.error(ctx, message, options?.title, options?.duration ?? 4000),
    warning: (message: string, options?: ToastOptions) =>
      ToastAPI.warning(ctx, message, options?.title, options?.duration ?? 4000),
    info: (message: string, options?: ToastOptions) =>
      ToastAPI.info(ctx, message, options?.title, options?.duration ?? 3000),
  };
};


