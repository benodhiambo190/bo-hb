import { TenantLayout } from '@/components/tenant/TenantLayout';
import { TenantDashboard } from '@/components/tenant/TenantDashboard';

const Index = () => {
  return (
    <TenantLayout>
      <TenantDashboard />
    </TenantLayout>
  );
};

export default Index;
