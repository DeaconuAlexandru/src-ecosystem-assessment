import { formatCurrency } from '../utils/formatters';

export const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard UI', description: 'Sidebar, nav bar, stats cards, and table' },
  { id: 'onboarding', label: 'Multi-step Workflow', description: 'Validation, progress, and status states' },
  { id: 'api', label: 'API Integration', description: 'Loading, error, empty, refresh' },
  { id: 'transaction', label: 'Transaction Modal', description: 'Confirm, reject, pending, success' },
];

export const dashboardStats = [
  { label: 'Active Users', value: 12480, delta: '+12.4%' },
  { label: 'Monthly Revenue', value: 48320, delta: '+8.1%' },
  { label: 'Orders Processed', value: 1245, delta: '+4.9%' },
];

export const recentTransactions = [
  { id: 'TX-0018', customer: 'A. Popescu', amount: 3200, status: 'Completed', method: 'Bank transfer', time: '10:45' },
  { id: 'TX-0019', customer: 'M. Ionescu', amount: 980, status: 'Pending', method: 'Card', time: '11:12' },
  { id: 'TX-0020', customer: 'S. Marin', amount: 1540, status: 'Processing', method: 'Wallet', time: '11:40' },
  { id: 'TX-0021', customer: 'D. Stan', amount: 760, status: 'Failed', method: 'Bank transfer', time: '12:03' },
];

export const onboardingSteps = ['Company Information', 'KYC/KYB Upload', 'Wallet Connection', 'Review & Submit'];

export const defaultOnboardingForm = {
  companyName: '',
  country: '',
  registrationNumber: '',
  website: '',
  kycDocument: '',
  contactEmail: '',
  walletAddress: '',
  network: 'Ethereum',
};

export const networkOptions = ['Ethereum', 'Base', 'Polygon', 'Arbitrum'];

export const transactionPreview = {
  amount: 2500,
  currency: 'USDT',
  walletAddress: '0xA12B34C56D78E90F1234567890ABCDEFFEDCBA98',
  networkFee: 0.4,
  network: 'Base Sepolia',
};

export const dashboardSummaryPills = [
  { label: 'Responsive', value: 'Desktop + mobile' },
  { label: 'Reusability', value: 'Component-based' },
  { label: 'States', value: 'Loading / error / success' },
];

export const formatDashboardAmount = (value) => formatCurrency(value, 'USD');
