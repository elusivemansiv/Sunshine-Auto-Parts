import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Package, MapPin, Settings, LogOut, ChevronRight } from 'lucide-react';

function ProfileContent() {
  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900 mb-6">Personal Information</h2>
      <form className="space-y-6 max-w-xl">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">First Name</label>
            <input type="text" defaultValue="John" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-shadow" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Last Name</label>
            <input type="text" defaultValue="Doe" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-shadow" />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700">Email Address</label>
          <input type="email" defaultValue="john.doe@example.com" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-shadow" />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700">Phone Number</label>
          <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-shadow" />
        </div>
        <button type="button" className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-colors">
          Save Changes
        </button>
      </form>
    </div>
  );
}

function OrdersContent() {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const orders = [
    { 
      id: '#ORD-9482', date: 'Oct 24, 2023', status: 'Delivered', total: '$1,299.00', items: 2,
      trackingNumber: 'TRK948273651',
      shippingAddress: '123 Performance Way, Suite 100, Los Angeles, CA 90001',
      paymentMethod: 'Visa ending in 4242',
      image: '/brembo_brake.png',
      products: [
        { name: 'Brembo GT Series Brake Kit', qty: 1, price: '$1,299.00' },
        { name: 'Motul RBF 600 Brake Fluid', qty: 2, price: '$0.00 (Included)' }
      ]
    },
    { 
      id: '#ORD-8321', date: 'Sep 12, 2023', status: 'Processing', total: '$450.00', items: 1,
      trackingNumber: 'Pending',
      shippingAddress: '123 Performance Way, Suite 100, Los Angeles, CA 90001',
      paymentMethod: 'MasterCard ending in 8899',
      image: '/vortech_supercharger.png',
      products: [
        { name: 'K&N Cold Air Intake', qty: 1, price: '$450.00' }
      ]
    },
    { 
      id: '#ORD-7104', date: 'Aug 05, 2023', status: 'Delivered', total: '$89.99', items: 3,
      trackingNumber: 'TRK710488299',
      shippingAddress: '123 Performance Way, Suite 100, Los Angeles, CA 90001',
      paymentMethod: 'PayPal',
      image: '/apr_ecu_tune.png',
      products: [
        { name: 'NGK Iridium Spark Plugs', qty: 3, price: '$89.99' }
      ]
    },
  ];

  if (selectedOrder) {
    const order = orders.find(o => o.id === selectedOrder);
    if (!order) return null;

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <button 
          onClick={() => setSelectedOrder(null)}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 mb-6 transition-colors"
        >
          <ChevronRight className="w-4 h-4 rotate-180" /> Back to Orders
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Order {order.id}</h2>
            <p className="text-slate-500 mt-1">Placed on {order.date}</p>
          </div>
          <span className={`px-3 py-1.5 rounded-full text-sm font-medium w-fit ${
            order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
          }`}>
            {order.status}
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
            <h3 className="font-semibold text-slate-900 mb-4">Shipping Information</h3>
            <p className="text-slate-600 text-sm mb-2 leading-relaxed">
              John Doe<br/>
              {order.shippingAddress.split(', ').map((line, i) => <span key={i}>{line}<br/></span>)}
            </p>
            <p className="text-slate-600 text-sm font-medium mt-4">Tracking Number:</p>
            <p className="text-slate-900 text-sm font-mono">{order.trackingNumber}</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
            <h3 className="font-semibold text-slate-900 mb-4">Payment Information</h3>
            <p className="text-slate-600 text-sm mb-2">{order.paymentMethod}</p>
          </div>
        </div>

        <h3 className="font-bold text-slate-900 mb-4 text-lg">Order Items</h3>
        <div className="border border-slate-200 rounded-xl overflow-x-auto mb-6">
          <table className="w-full text-left text-sm whitespace-nowrap min-w-[400px]">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
              <tr>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Qty</th>
                <th className="px-6 py-4 font-medium text-right">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {order.products.map((p, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 text-slate-900 font-medium truncate max-w-[200px]">{p.name}</td>
                  <td className="px-6 py-4 text-slate-500">{p.qty}</td>
                  <td className="px-6 py-4 text-slate-900 text-right">{p.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end">
          <div className="w-full sm:w-64 space-y-3">
            <div className="flex justify-between text-slate-600 text-sm">
              <span>Subtotal</span>
              <span>{order.total}</span>
            </div>
            <div className="flex justify-between text-slate-600 text-sm">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-slate-600 text-sm">
              <span>Tax</span>
              <span>$0.00</span>
            </div>
            <div className="pt-3 border-t border-slate-200 flex justify-between font-bold text-slate-900">
              <span>Total</span>
              <span>{order.total}</span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900 mb-6">Order History</h2>
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="border border-slate-200 rounded-xl p-4 sm:p-6 hover:border-slate-300 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-slate-900">{order.id}</span>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <div className="text-sm text-slate-500 mt-1 mb-4">
                  Placed on {order.date} • {order.items} items
                </div>
                <span className="font-bold text-slate-900">{order.total}</span>
              </div>
              <div className="flex flex-col items-end gap-3 shrink-0">
                <div className="w-20 h-16 rounded-xl overflow-hidden bg-slate-50 border border-slate-100">
                  <img src={order.image} alt={`Order ${order.id}`} className="w-full h-full object-cover" />
                </div>
                <button 
                  onClick={() => setSelectedOrder(order.id)}
                  className="text-sm font-medium text-red-600 hover:text-red-500"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AddressesContent() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-900">Saved Addresses</h2>
        <button className="text-sm font-medium text-red-600 hover:text-red-500 bg-red-50 px-4 py-2 rounded-lg transition-colors">
          + Add New
        </button>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="border border-red-500 bg-red-50/30 rounded-xl p-6 relative">
          <span className="absolute top-4 right-4 bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-md">Default</span>
          <h3 className="font-bold text-slate-900 mb-1">Home</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            John Doe<br/>
            123 Performance Way<br/>
            Suite 100<br/>
            Los Angeles, CA 90001
          </p>
          <div className="mt-4 flex gap-3 text-sm font-medium text-slate-500">
            <button className="hover:text-slate-900">Edit</button>
            <button className="hover:text-red-600">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'orders', label: 'Order History', icon: Package },
    { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
    { id: 'settings', label: 'Account Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileContent />;
      case 'orders':
        return <OrdersContent />;
      case 'addresses':
        return <AddressesContent />;
      default:
        return <div>Settings component coming soon.</div>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading text-slate-900">My Account</h1>
        <p className="text-slate-500 mt-2">Manage your orders, profile, and settings.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden sticky top-24">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold text-xl">
                  JD
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">John Doe</h3>
                  <p className="text-sm text-slate-500">Member since '23</p>
                </div>
              </div>
            </div>
            <nav className="p-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${
                      isActive 
                        ? 'bg-red-50 text-red-600 font-medium' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      {tab.label}
                    </div>
                    {isActive && <ChevronRight className="w-4 h-4" />}
                  </button>
                );
              })}
              <div className="h-px bg-slate-100 my-2 mx-4" />
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-red-600 transition-colors">
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8"
          >
            {renderContent()}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
