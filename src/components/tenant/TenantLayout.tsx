import React from 'react';
import { TenantSidebar } from './TenantSidebar';

interface TenantLayoutProps {
  children: React.ReactNode;
}

export const TenantLayout: React.FC<TenantLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-background">
      <TenantSidebar />
      <main className="flex-1 overflow-x-hidden min-w-0">
        <div className="p-4 md:p-6 max-w-full">
          {children}
        </div>
      </main>
    </div>
  );
};