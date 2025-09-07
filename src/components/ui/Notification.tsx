'use client';

import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  title?: string;
  message: string;
  duration?: number; // ms; undefined = persistent
  actionLabel?: string;
  onAction?: () => void;
}

type Position = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

interface NotificationContextType {
  show: (n: Omit<Notification, 'id'>) => string;
  dismiss: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export const useNotifications = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotifications must be used within NotificationProvider');
  return ctx;
};

const typeStyles: Record<NotificationType, string> = {
  success: 'bg-green-50 text-green-800 border-green-200',
  error: 'bg-red-50 text-red-800 border-red-200',
  warning: 'bg-primary-50 text-primary-900 border-primary-200',
  info: 'bg-blue-50 text-blue-800 border-blue-200',
};

interface ContainerProps {
  position?: Position;
}

export const NotificationProvider: React.FC<React.PropsWithChildren<ContainerProps>> = ({ children, position = 'top-right' }) => {
  const [items, setItems] = useState<Notification[]>([]);
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  const show = useCallback((n: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).slice(2);
    const item: Notification = { id, ...n };
    setItems(prev => [item, ...prev]);
    if (n.duration && n.duration > 0) {
      timers.current[id] = setTimeout(() => {
        setItems(prev => prev.filter(i => i.id !== id));
        delete timers.current[id];
      }, n.duration);
    }
    return id;
  }, []);

  const dismiss = useCallback((id: string) => {
    if (timers.current[id]) {
      clearTimeout(timers.current[id]);
      delete timers.current[id];
    }
    setItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const value = useMemo(() => ({ show, dismiss }), [show, dismiss]);

  const positionClasses: Record<Position, string> = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <div className={cn('fixed z-[1000] pointer-events-none flex flex-col gap-3', positionClasses[position])}>
        {items.map(item => (
          <div
            key={item.id}
            className={cn('pointer-events-auto border rounded-lg shadow-md p-4 w-80 backdrop-blur-sm', typeStyles[item.type])}
          >
            <div className="flex items-start gap-3">
              <div className="flex-1">
                {item.title && <div className="font-semibold mb-1">{item.title}</div>}
                <div className="text-sm">{item.message}</div>
                {item.onAction && item.actionLabel && (
                  <button
                    className="mt-3 inline-flex text-sm font-medium underline"
                    onClick={() => item.onAction?.()}
                  >
                    {item.actionLabel}
                  </button>
                )}
              </div>
              <button aria-label="Dismiss" className="p-1 rounded hover:bg-black/5" onClick={() => dismiss(item.id)}>
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

// Simple Toast helper API
export const Toast = {
  success: (ctx: NotificationContextType, message: string, title?: string, duration = 3000) =>
    ctx.show({ type: 'success', message, title, duration }),
  error: (ctx: NotificationContextType, message: string, title?: string, duration = 4000) =>
    ctx.show({ type: 'error', message, title, duration }),
  warning: (ctx: NotificationContextType, message: string, title?: string, duration = 4000) =>
    ctx.show({ type: 'warning', message, title, duration }),
  info: (ctx: NotificationContextType, message: string, title?: string, duration = 3000) =>
    ctx.show({ type: 'info', message, title, duration }),
};


