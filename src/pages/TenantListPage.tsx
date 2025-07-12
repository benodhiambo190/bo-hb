import { TenantLayout } from '@/components/tenant/TenantLayout';
import { TenantList } from '@/components/tenant/TenantList';

const TenantListPage = () => {
  return (
    <TenantLayout>
      <TenantList />
    </TenantLayout>
  );
};

export default TenantListPage;