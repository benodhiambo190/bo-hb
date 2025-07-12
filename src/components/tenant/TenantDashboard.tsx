import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Building2, 
  TrendingUp, 
  DollarSign, 
  Plus,
  MoreHorizontal,
  Activity,
  AlertCircle
} from 'lucide-react';

interface DashboardStats {
  totalTenants: number;
  activeTenants: number;
  monthlyRevenue: number;
  newTenantsThisMonth: number;
}

interface RecentTenant {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  plan: string;
}

export const TenantDashboard: React.FC = () => {
  const stats: DashboardStats = {
    totalTenants: 142,
    activeTenants: 128,
    monthlyRevenue: 24580,
    newTenantsThisMonth: 18
  };

  const recentTenants: RecentTenant[] = [
    { id: '1', name: 'Acme Corporation', status: 'active', createdAt: '2024-01-15', plan: 'Enterprise' },
    { id: '2', name: 'TechStart Inc.', status: 'pending', createdAt: '2024-01-14', plan: 'Professional' },
    { id: '3', name: 'Global Dynamics', status: 'active', createdAt: '2024-01-13', plan: 'Standard' },
    { id: '4', name: 'Innovation Labs', status: 'inactive', createdAt: '2024-01-12', plan: 'Professional' },
    { id: '5', name: 'Future Systems', status: 'active', createdAt: '2024-01-11', plan: 'Enterprise' },
  ];

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'pending': return 'secondary';
      case 'inactive': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tenant Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage and monitor all tenants in your system
          </p>
        </div>
        <Button className="bg-gradient-primary hover:bg-primary-hover transition-smooth shadow-primary">
          <Plus className="mr-2 h-4 w-4" />
          Add New Tenant
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="transition-smooth hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Tenants
            </CardTitle>
            <Building2 className="h-4 w-4 text-tenant-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.totalTenants}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+12</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="transition-smooth hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Tenants
            </CardTitle>
            <Activity className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.activeTenants}</div>
            <p className="text-xs text-muted-foreground">
              {((stats.activeTenants / stats.totalTenants) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>

        <Card className="transition-smooth hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Monthly Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-tenant-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              ${stats.monthlyRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+8.2%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="transition-smooth hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              New This Month
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.newTenantsThisMonth}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+22.5%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Tenants */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Recent Tenants</CardTitle>
                <CardDescription>Latest tenant registrations and updates</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTenants.map((tenant) => (
                <div 
                  key={tenant.id} 
                  className="flex items-center justify-between p-3 border border-tenant-border rounded-lg hover:bg-tenant-surface transition-smooth"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{tenant.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Created {new Date(tenant.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant={getStatusBadgeVariant(tenant.status)}>
                      {tenant.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{tenant.plan}</span>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Quick Actions</CardTitle>
            <CardDescription>Common tenant management tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              Bulk Import Tenants
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Activity className="mr-2 h-4 w-4" />
              System Health Check
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <DollarSign className="mr-2 h-4 w-4" />
              Generate Billing Report
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <AlertCircle className="mr-2 h-4 w-4" />
              Review Pending Issues
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};