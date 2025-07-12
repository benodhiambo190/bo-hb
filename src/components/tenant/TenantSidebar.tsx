import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard,
  Building2,
  Users,
  Settings,
  BarChart3,
  CreditCard,
  Database,
  Shield,
  Bell,
  Globe,
  Activity,
  FileText,
  ChevronDown,
  Home
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const menuItems = [
  {
    title: 'Overview',
    icon: LayoutDashboard,
    href: '/',
    badge: null
  },
  {
    title: 'Tenant Management',
    icon: Building2,
    children: [
      { title: 'All Tenants', href: '/tenants' },
      { title: 'Tenant Groups', href: '/tenant-groups' },
      { title: 'Tenant Types', href: '/tenant-types' },
      { title: 'Onboarding', href: '/onboarding' },
      { title: 'Configuration', href: '/tenant-configuration' }
    ]
  },
  {
    title: 'Identity & Access',
    icon: Users,
    children: [
      { title: 'Users', href: '/users' },
      { title: 'User Groups', href: '/user-groups' },
      { title: 'Roles', href: '/roles' },
      { title: 'Permissions', href: '/permissions' },
      { title: 'Timezones', href: '/timezones' }
    ]
  },
  {
    title: 'Billing & Subscriptions',
    icon: CreditCard,
    children: [
      { title: 'Billing Overview', href: '/billing' },
      { title: 'Invoices', href: '/invoices' },
      { title: 'Payments', href: '/payments' },
      { title: 'Subscriptions', href: '/subscriptions' }
    ]
  },
  {
    title: 'Analytics & Reports',
    icon: BarChart3,
    children: [
      { title: 'Analytics Dashboard', href: '/analytics' },
      { title: 'Reports', href: '/reports' },
      { title: 'Metrics', href: '/metrics' }
    ]
  },
  {
    title: 'Schema Management',
    icon: Database,
    children: [
      { title: 'Schemas', href: '/schemas' },
      { title: 'Migrations', href: '/migrations' },
      { title: 'Database Backup', href: '/backups' }
    ]
  },
  {
    title: 'Domain Management',
    icon: Globe,
    children: [
      { title: 'Domains', href: '/domains' },
      { title: 'Subdomains', href: '/subdomains' }
    ]
  },
  {
    title: 'Security',
    icon: Shield,
    children: [
      { title: 'Security Overview', href: '/security' },
      { title: 'Audit Logs', href: '/audit' },
      { title: 'Security Policies', href: '/security-policies' }
    ]
  },
  {
    title: 'Monitoring',
    icon: Activity,
    children: [
      { title: 'System Health', href: '/health' },
      { title: 'Performance', href: '/performance' },
      { title: 'Tenant Monitoring', href: '/tenant-monitoring' }
    ]
  },
  {
    title: 'Notifications',
    icon: Bell,
    badge: '3',
    children: [
      { title: 'All Notifications', href: '/notifications' },
      { title: 'Templates', href: '/notification-templates' }
    ]
  },
  {
    title: 'Resource Management',
    icon: FileText,
    children: [
      { title: 'Resource Usage', href: '/resource-usage' },
      { title: 'Quotas', href: '/quotas' },
      { title: 'Limits', href: '/limits' }
    ]
  },
  {
    title: 'Configuration',
    icon: Settings,
    children: [
      { title: 'System Config', href: '/config' },
      { title: 'Feature Toggles', href: '/features' }
    ]
  }
];

export const TenantSidebar: React.FC = () => {
  const location = useLocation();
  const [openItems, setOpenItems] = React.useState<string[]>(['Tenant Management']);
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const toggleItem = (title: string) => {
    setOpenItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const isActiveRoute = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  const hasActiveChild = (children?: { href: string }[]) => {
    return children?.some(child => isActiveRoute(child.href)) || false;
  };

  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-64'} bg-sidebar-background border-r border-sidebar-border min-h-screen transition-all duration-300 relative`}>
      {/* Header with Logo and Theme Toggle */}
      <div className="p-4 border-b border-sidebar-border">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} mb-4`}>
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Home className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-sidebar-foreground">Home Balance</h2>
                <p className="text-xs text-sidebar-foreground/70">Tenant Manager</p>
              </div>
            </div>
          )}
          {isCollapsed && (
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Home className="h-5 w-5 text-primary-foreground" />
            </div>
          )}
          {!isCollapsed && <ThemeToggle />}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full justify-center hover:bg-sidebar-accent"
        >
          <ChevronDown className={`h-4 w-4 transition-transform ${isCollapsed ? 'rotate-90' : '-rotate-90'}`} />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isOpen = openItems.includes(item.title);
          const isActive = item.href ? isActiveRoute(item.href) : hasActiveChild(item.children);

          if (!item.children) {
            return (
              <NavLink
                key={item.title}
                to={item.href!}
                className={({ isActive }) =>
                  `flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-3 py-2 rounded-lg transition-smooth ${
                    isActive
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-md'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  }`
                }
                title={isCollapsed ? item.title : undefined}
              >
                <div className={`flex items-center ${isCollapsed ? '' : 'space-x-3'}`}>
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {!isCollapsed && <span className="text-sm font-medium">{item.title}</span>}
                </div>
                {!isCollapsed && item.badge && (
                  <Badge variant="secondary" className="h-5 px-2 text-xs">
                    {item.badge}
                  </Badge>
                )}
              </NavLink>
            );
          }

          if (isCollapsed) {
            return (
              <div key={item.title} className="relative group">
                <Button
                  variant="ghost"
                  className={`w-full justify-center px-3 py-2 h-auto transition-smooth ${
                    isActive
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  }`}
                  title={item.title}
                >
                  <Icon className="h-4 w-4" />
                </Button>
                {/* Tooltip for collapsed state */}
                <div className="absolute left-full top-0 ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                  {item.title}
                </div>
              </div>
            );
          }

          return (
            <Collapsible key={item.title} open={isOpen} onOpenChange={() => toggleItem(item.title)}>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className={`w-full justify-between px-3 py-2 h-auto text-left transition-smooth ${
                    isActive
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm font-medium">{item.title}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {item.badge && (
                      <Badge variant="secondary" className="h-5 px-2 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                    <ChevronDown className={`h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </div>
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1">
                <div className="ml-7 mt-2 space-y-1">
                  {item.children?.map((child) => (
                    <NavLink
                      key={child.href}
                      to={child.href}
                      className={({ isActive }) =>
                        `block px-3 py-1.5 text-sm rounded-md transition-smooth ${
                          isActive
                            ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                            : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                        }`
                      }
                    >
                      {child.title}
                    </NavLink>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border">
        {!isCollapsed && (
          <div className="text-xs text-sidebar-foreground/50 text-center">
            v1.0.0 • Tenant Manager
          </div>
        )}
        {isCollapsed && <ThemeToggle />}
      </div>
    </div>
  );
};