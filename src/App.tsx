/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  FileText, 
  Box, 
  Settings, 
  Users, 
  Layers, 
  BarChart3, 
  Menu, 
  X,
  Plus,
  Search,
  ChevronRight,
  Database,
  Truck,
  Calculator,
  Code2,
  Terminal,
  Cpu,
  TrendingUp,
  Package,
  AlertTriangle,
  History,
  ShieldCheck,
  Bell,
  HardDrive,
  Printer,
  CheckCircle2,
  Eye,
  Archive
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { GlassUnitType, GlassItem, Invoice } from './types.ts';
import { formatValue, generateGlassCode, FORMAT_CODES } from './utils/formatters.ts';

// Modules list
type ModuleId = 'dashboard' | 'quotations' | 'inventory' | 'production' | 'customers' | 'settings' | 'syscodes';

interface Module {
  id: ModuleId;
  label: string;
  icon: React.ElementType;
}

const MODULES: Module[] = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'quotations', label: 'Quotations & Invoicing', icon: FileText },
  { id: 'syscodes', label: 'WPF Format Codes', icon: Code2 },
  { id: 'production', label: 'Production Tracking', icon: Layers },
  { id: 'inventory', label: 'Inventory Management', icon: Box },
  { id: 'customers', label: 'Customers / CRM', icon: Users },
  { id: 'settings', label: 'System Settings', icon: Settings },
];

export default function App() {
  const [activeModule, setActiveModule] = useState<ModuleId>('quotations');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Shared State
  const [quotations, setQuotations] = useState([
    { code: 'D-6-12-6LE', client: 'Lumina Towers LLC', specs: 'DGU 6mm Clear / 12Ar / 6mm Low-E', qty: 24, value: 8450.00, status: 'In Production', id: 'GP-29384' },
    { code: 'L-4.4-PVB', client: 'Skyline Glazing', specs: 'LAM 4+4mm PVB 0.38 Opal', qty: 12, value: 2120.00, status: 'Quoted', id: 'GP-29385' },
    { code: 'S-10-CLR', client: 'Urban Facades Inc', specs: 'SINGLE 10mm Toughened Clear', qty: 154, value: 14800.00, status: 'Awaiting Payment', id: 'GP-29386' },
    { code: 'DL-6-16-4.4', client: 'Lumina Towers LLC', specs: 'DGU+LAM 6mm / 16Ar / 4+4mm Lami', qty: 8, value: 5200.00, status: 'In Production', id: 'GP-29387' },
    { code: 'S-12-LI', client: 'Vertex Archi', specs: 'SINGLE 12mm Low-Iron Starphire', qty: 5, value: 1890.00, status: 'Pending Review', id: 'GP-29388' },
  ]);

  const [productionOrders, setProductionOrders] = useState([
    { id: 'J-101', client: 'Lumina', spec: 'DGU 6/12/6', qty: '12 pcs', stage: 'cutting', progress: 80, quoteId: 'GP-29384', cuttingType: 'Polish' },
    { id: 'J-102', client: 'Skyline', spec: 'LAM 4+4', qty: '5 pcs', stage: 'release', progress: 0, quoteId: 'GP-29385', cuttingType: 'Normal' },
    { id: 'J-103', client: 'Urban', spec: '10mm Toughened', qty: '42 pcs', stage: 'tempering', progress: 50, quoteId: 'GP-29386', cuttingType: 'Polish' },
    { id: 'J-105', client: 'Lumina', spec: 'DGU+LAM 6/16/8', qty: '8 pcs', stage: 'assembly', progress: 95, quoteId: 'GP-29387', cuttingType: 'Normal' },
    { id: 'J-106', client: 'Vertex', spec: '12mm Clear', qty: '2 pcs', stage: 'rework', progress: 20, quoteId: 'GP-29388', cuttingType: 'Polish', reworkReason: 'Edge crack' },
  ]);

  const handleCreateOrderFromQuote = (quote: any, options: { cuttingType?: 'Polish' | 'Normal' } = {}) => {
    const newOrder = {
      id: `J-${Math.floor(Math.random() * 900) + 100}`,
      client: quote.client.split(' ')[0],
      spec: quote.code,
      qty: `${quote.qty} pcs`,
      stage: 'release',
      progress: 0,
      quoteId: quote.id,
      cuttingType: options.cuttingType || 'Normal'
    };
    setProductionOrders([...productionOrders, newOrder]);
    
    // Update quote status
    setQuotations(prev => prev.map(q => q.id === quote.id ? { ...q, status: 'In Production' } : q));
    
    setActiveModule('production');
  };

  const handleAddQuotation = (newItem: any) => {
    setQuotations([newItem, ...quotations]);
  };

  return (
    <div className="flex h-screen bg-slate-100 text-slate-800 font-sans selection:bg-blue-600 selection:text-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[50%] bg-blue-200 rounded-full blur-[120px] opacity-40 animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[60%] bg-cyan-200 rounded-full blur-[120px] opacity-40 animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Sidebar - Frosted Glass Style */}
      <aside 
        className={`${
          sidebarOpen ? 'w-64' : 'w-16'
        } bg-white/40 backdrop-blur-xl transition-all duration-300 flex flex-col border-r border-white/60 z-30 relative`}
        id="erp-sidebar"
      >
        <div className="p-4 flex flex-col items-center border-b border-white/40">
          <div className="flex items-center justify-between w-full mb-4">
            {sidebarOpen && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 font-black text-xl tracking-tighter"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <Box className="w-5 h-5 text-white" />
                </div>
                <span className="flex flex-col">
                  <span className="leading-none text-slate-800 italic uppercase">GlassPro</span>
                  <span className="text-[9px] text-blue-600 font-mono tracking-widest mt-1">ERP_SYSTEM</span>
                </span>
              </motion.div>
            )}
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 hover:bg-white/50 rounded transition-colors ml-auto text-slate-500"
              id="sidebar-toggle"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
          {sidebarOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full flex items-center gap-3 p-3 bg-white/50 backdrop-blur-md rounded-xl border border-white/60 shadow-sm"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-black text-white shadow-md">
                GP
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-800 uppercase tracking-widest">Main Office</span>
                <span className="text-[8px] text-slate-500 font-mono italic whitespace-nowrap">PREMIUM_ACCOUNT</span>
              </div>
            </motion.div>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          {MODULES.map((module) => (
            <button
              key={module.id}
              onClick={() => setActiveModule(module.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group ${
                activeModule === module.id 
                  ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20' 
                  : 'hover:bg-white/40 text-slate-500 hover:text-slate-800'
              }`}
              id={`nav-${module.id}`}
            >
              <module.icon className={`w-5 h-5 flex-shrink-0 ${activeModule === module.id ? 'text-white' : 'text-slate-400 group-hover:text-blue-500'}`} />
              {sidebarOpen && (
                <span className="font-medium text-sm truncate">{module.label}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/40">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 border border-white text-blue-600 flex items-center justify-center font-bold text-xs shadow-sm">
              AD
            </div>
            {sidebarOpen && (
              <div className="flex flex-col text-slate-700">
                <span className="text-xs font-bold leading-none">Admin User</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-tighter mt-1 font-medium">Manufacturing</span>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        <header className="h-16 bg-white/40 backdrop-blur-md border-b border-white/60 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-slate-800 tracking-tight transition-all">
              {MODULES.find(m => m.id === activeModule)?.label}
            </h1>
            <div className="h-6 w-px bg-white/60" />
            <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <Database size={14} className="text-blue-500" />
              <span>MainDB_V2.5</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-9 pr-4 py-1.5 bg-white/50 border border-white/60 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 w-64 transition-all"
              />
            </div>
            <button className="px-5 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-900 transition-all shadow-lg active:scale-95 flex items-center gap-2">
              <Plus size={14} /> New Record
            </button>
          </div>
        </header>

        {/* Module Viewport */}
        <div className="flex-1 overflow-auto p-6 scroll-smooth">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, scale: 0.98, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.02, y: -5 }}
              transition={{ duration: 0.15 }}
              className="h-full"
            >
              <ModuleRenderer 
                module={activeModule} 
                quotations={quotations}
                productionOrders={productionOrders}
                onCreateOrder={handleCreateOrderFromQuote}
                onAddQuotation={handleAddQuotation}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

// Module Components
function ProductionModule({ orders, quotations, onCreateOrder }: { orders: any[], quotations: any[], onCreateOrder: (quote: any, options?: any) => void }) {
  const [isOrderSelectorOpen, setIsOrderSelectorOpen] = useState(false);
  const [selectedCuttingType, setSelectedCuttingType] = useState<'Polish' | 'Normal'>('Normal');
  
  // Filter States
  const [filterClient, setFilterClient] = useState('');
  const [filterOrderId, setFilterOrderId] = useState('');
  const [filterStage, setFilterStage] = useState('all');

  const stages = [
    { id: 'release', label: 'Job Order Release', color: 'indigo' },
    { id: 'cutting', label: 'Stage 1: Cutting', color: 'blue' },
    { id: 'tempering', label: 'Stage 2: tempering', color: 'amber' },
    { id: 'assembly', label: 'Stage 3: Lami / DGU', color: 'emerald' },
    { id: 'rework', label: 'Broken / Rework', color: 'rose' },
    { id: 'shipping', label: 'Dispatch', color: 'gray' },
  ];

  const pendingQuotations = quotations.filter(q => q.status !== 'In Production');

  const filteredOrders = orders.filter(order => {
    const matchClient = order.client.toLowerCase().includes(filterClient.toLowerCase());
    const matchId = order.id.toLowerCase().includes(filterOrderId.toLowerCase());
    const matchStage = filterStage === 'all' || order.stage === filterStage;
    return matchClient && matchId && matchStage;
  });

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="bg-white/40 backdrop-blur-md p-4 rounded-[2rem] border border-white/60 shadow-lg flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search clients..." 
              value={filterClient}
              onChange={(e) => setFilterClient(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white/50 border border-white/60 rounded-2xl text-xs focus:ring-2 focus:ring-blue-500/20 outline-none w-48 transition-all"
            />
          </div>
          <div className="relative">
            <Terminal className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
            <input 
              type="text" 
              placeholder="Order ID..." 
              value={filterOrderId}
              onChange={(e) => setFilterOrderId(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white/50 border border-white/60 rounded-2xl text-xs focus:ring-2 focus:ring-blue-500/20 outline-none w-32 transition-all"
            />
          </div>
          <select 
            value={filterStage}
            onChange={(e) => setFilterStage(e.target.value)}
            className="px-4 py-2 bg-white/50 border border-white/60 rounded-2xl text-xs focus:ring-2 focus:ring-blue-500 outline-none min-w-[140px] font-bold text-slate-600 outline-none cursor-pointer"
          >
            <option value="all">All Stages</option>
            {stages.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
          {(filterClient || filterOrderId || filterStage !== 'all') && (
            <button 
              onClick={() => { setFilterClient(''); setFilterOrderId(''); setFilterStage('all'); }}
              className="text-[10px] text-rose-500 font-black hover:underline uppercase tracking-widest"
            >
              Clear Filters
            </button>
          )}
        </div>
        
        <button 
          onClick={() => setIsOrderSelectorOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-[1.25rem] text-xs font-black flex items-center gap-2 shadow-xl shadow-blue-500/20 active:scale-95 transition-all"
        >
          <Plus size={14} /> Job Order Release
        </button>
      </div>

      <AnimatePresence>
        {isOrderSelectorOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-lg z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white/80 backdrop-blur-2xl rounded-[3rem] shadow-2xl w-full max-w-2xl overflow-hidden max-h-[80vh] flex flex-col border border-white/60"
            >
              <div className="p-8 border-b border-white/40 flex justify-between items-center bg-white/40">
                <div>
                  <h3 className="font-black text-slate-800 text-xl tracking-tight leading-none mb-1">Production Entry</h3>
                  <p className="text-[10px] text-slate-400 font-mono font-bold tracking-widest uppercase">Stage 0: Job Validations</p>
                </div>
                <button 
                  onClick={() => setIsOrderSelectorOpen(false)}
                  className="p-2 hover:bg-white/60 rounded-full transition-colors"
                >
                  <X size={20} className="text-slate-400" />
                </button>
              </div>
              
              <div className="p-6 bg-blue-50/50 border-b border-blue-100 flex items-center justify-between">
                <span className="text-[10px] font-black text-blue-700 uppercase tracking-widest italic">Cutting Prep Type:</span>
                <div className="flex bg-white/60 backdrop-blur-md rounded-2xl p-1.5 border border-white">
                  <button 
                    onClick={() => setSelectedCuttingType('Normal')}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all ${selectedCuttingType === 'Normal' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:bg-white/40'}`}
                  >
                    NORMAL
                  </button>
                  <button 
                    onClick={() => setSelectedCuttingType('Polish')}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all ${selectedCuttingType === 'Polish' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:bg-white/40'}`}
                  >
                    POLISH
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-auto p-6 space-y-4">
                {pendingQuotations.length === 0 ? (
                  <div className="text-center py-20 text-slate-300 italic font-black uppercase tracking-widest text-[10px]">No pending units detected</div>
                ) : (
                  pendingQuotations.map(quote => (
                    <div 
                      key={quote.id} 
                      className="p-5 rounded-3xl border border-white/60 bg-white/40 backdrop-blur-md flex items-center justify-between group hover:border-blue-400 hover:bg-white/60 transition-all cursor-pointer shadow-sm hover:shadow-xl"
                      onClick={() => {
                        onCreateOrder(quote, { cuttingType: selectedCuttingType });
                        setIsOrderSelectorOpen(false);
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-white font-black text-xs shadow-lg">
                          GP
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-lg font-black font-mono tracking-tighter">#{quote.id}</span>
                            <span className="text-sm font-black text-slate-800 tracking-tight">{quote.client}</span>
                          </div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{quote.specs}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1 italic">Units</p>
                          <p className="text-xl font-black text-slate-800 leading-none">{quote.qty}</p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-4 transition-all">
                          <ChevronRight size={18} />
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="flex-1 flex gap-6 overflow-x-auto pb-6 scroll-smooth">
        {stages.map((stage) => (
          <div key={stage.id} className="min-w-[320px] w-[320px] flex flex-col gap-4">
             <div className="flex items-center justify-between px-4 bg-white/40 backdrop-blur-md py-2 rounded-2xl border border-white/60 shadow-sm">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full bg-${stage.color}-500 shadow-[0_0_12px] shadow-${stage.color}-500/50`} />
                  {stage.label}
                </h3>
                <span className="text-[10px] font-black bg-slate-800 text-white px-2.5 py-0.5 rounded-full">
                  {filteredOrders.filter(j => j.stage === stage.id).length}
                </span>
             </div>
             
             <div className="flex-1 bg-white/20 backdrop-blur-sm rounded-[2.5rem] p-3 flex flex-col gap-4 border border-white/30 shadow-inner">
                {filteredOrders.filter(j => j.stage === stage.id).map(job => (
                  <motion.div 
                    layoutId={job.id}
                    key={job.id} 
                    className={`bg-white/60 backdrop-blur-md p-5 rounded-3xl shadow-lg border-2 group hover:border-blue-400 transition-all cursor-pointer relative overflow-hidden ${stage.id === 'rework' ? 'border-rose-200 shadow-rose-100' : 'border-white/60 shadow-slate-200/50'}`}
                  >
                    {job.cuttingType && (
                      <div className={`absolute top-0 right-0 px-3 py-1 text-[8px] font-black uppercase tracking-widest ${job.cuttingType === 'Polish' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                        {job.cuttingType}
                      </div>
                    )}
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-blue-600 font-mono tracking-tighter uppercase">ID_#{job.id}</span>
                        <span className="text-[8px] text-slate-400 font-black uppercase tracking-widest leading-none mt-1 text-ellipsis overflow-hidden max-w-[120px]">REF: {job.quoteId}</span>
                      </div>
                      <Settings size={14} className="text-slate-300 group-hover:text-slate-500 group-hover:rotate-45 transition-all" />
                    </div>
                    <p className="text-base font-black text-slate-800 tracking-tight leading-none mb-1 truncate">{job.client}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-4">{job.spec} • {job.qty} Units</p>
                    
                    {job.reworkReason && (
                      <div className="mb-4 p-3 bg-rose-500/10 rounded-2xl border border-rose-200/50">
                        <p className="text-[8px] font-black text-rose-600 uppercase tracking-widest mb-1 italic">Rework Required:</p>
                        <p className="text-[10px] text-rose-800 font-bold italic leading-tight">{job.reworkReason}</p>
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[10px] font-black text-slate-400 italic">
                        <span className="uppercase tracking-widest opacity-60">Status</span>
                        <span className="text-slate-800">{job.progress}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-200/50 rounded-full overflow-hidden p-0.5 shadow-inner">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${job.progress}%` }}
                          className={`h-full bg-${stage.color}-500 rounded-full shadow-[0_0_8px] shadow-${stage.color}-500/50`}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}

                {filteredOrders.filter(j => j.stage === stage.id).length === 0 && (
                  <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-white/40 rounded-[2rem] opacity-30 p-8 text-center">
                    <Layers className="text-white mb-2" size={32} />
                    <p className="text-[10px] font-black text-white uppercase tracking-[.3em]">Queue Ready</p>
                  </div>
                )}
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Module Components
function ModuleRenderer({ 
  module, 
  quotations, 
  productionOrders, 
  onCreateOrder,
  onAddQuotation
}: { 
  module: ModuleId, 
  quotations: any[], 
  productionOrders: any[],
  onCreateOrder: (quote: any) => void,
  onAddQuotation: (item: any) => void
}) {
  switch (module) {
    case 'dashboard': return <DashboardModule orders={productionOrders} quotations={quotations} />;
    case 'quotations': return <QuotationModule quotations={quotations} onCreateOrder={onCreateOrder} onAddQuotation={onAddQuotation} />;
    case 'syscodes': return <SysCodesModule />;
    case 'production': return <ProductionModule orders={productionOrders} quotations={quotations} onCreateOrder={onCreateOrder} />;
    case 'inventory': return <InventoryModule />;
    case 'customers': return <CustomersModule />;
    case 'settings': return <SettingsModule />;
    default: return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400 opacity-50">
        <Box size={64} className="mb-4 stroke-[1px]" />
        <p className="text-lg">Module "{module}" is under development</p>
      </div>
    );
  }
}

function SysCodesModule() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full font-sans">
      <div className="bg-white/40 backdrop-blur-2xl rounded-[3rem] shadow-2xl border border-white/60 p-8 flex flex-col gap-4 overflow-auto relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Terminal size={120} />
        </div>
        <div className="flex items-center gap-4 mb-4 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-500/20">
            <Terminal size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tighter leading-none">WPF XAML References</h2>
            <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase font-bold mt-1">Industrial data binding templates</p>
          </div>
        </div>
        
        <div className="space-y-4 relative z-10">
          {Object.entries(FORMAT_CODES).map(([key, value]) => (
            <div key={key} className="p-6 bg-white/40 backdrop-blur-md rounded-3xl border border-white/60 group hover:border-blue-400 transition-all shadow-sm hover:shadow-lg">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[11px] font-black font-mono text-slate-400 tracking-widest uppercase opacity-80">{key}</span>
                <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-[9px] font-black uppercase tracking-widest shadow-md translate-y-[-12px]">XAML SYNTAX</span>
              </div>
              <div className="text-xs font-mono text-blue-100 bg-slate-800 p-4 rounded-2xl overflow-x-auto whitespace-pre select-all shadow-inner border border-slate-700">
                {`StringFormat='${value}'`}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="bg-blue-600 rounded-[3rem] p-8 shadow-2xl shadow-blue-500/30 text-white relative overflow-hidden group">
          <div className="absolute top-[-20%] left-[-10%] w-[120%] h-[150%] bg-gradient-to-br from-blue-400/20 to-transparent blur-3xl pointer-events-none" />
          <div className="flex items-center gap-4 mb-8 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
              <Cpu size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white tracking-tighter leading-none uppercase">RT Technical Preview</h2>
              <p className="text-[10px] text-blue-200/60 font-mono tracking-widest uppercase font-bold mt-1 italic">Real-time binding simulations</p>
            </div>
          </div>
          
          <div className="space-y-4 font-mono relative z-10">
            <div className="p-5 bg-white/10 backdrop-blur-md text-white rounded-3xl border border-white/20 flex justify-between items-center shadow-inner hover:bg-white/20 transition-all cursor-crosshair">
              <span className="text-[10px] font-black opacity-60 uppercase tracking-widest">Dimensions</span>
              <span className="text-lg font-black tracking-tighter">{formatValue(FORMAT_CODES.DIMENSION, 2200, 1150)}</span>
            </div>
            <div className="p-5 bg-white/10 backdrop-blur-md text-white rounded-3xl border border-white/20 flex justify-between items-center shadow-inner hover:bg-white/20 transition-all cursor-crosshair">
              <span className="text-[10px] font-black opacity-60 uppercase tracking-widest">Calculated Area</span>
              <span className="text-lg font-black tracking-tighter">{formatValue(FORMAT_CODES.AREA, 2.53)}</span>
            </div>
            <div className="p-5 bg-white/10 backdrop-blur-md text-white rounded-3xl border border-white/20 flex justify-between items-center shadow-inner hover:bg-white/20 transition-all cursor-crosshair">
              <span className="text-[10px] font-black opacity-60 uppercase tracking-widest">Unit Weight</span>
              <span className="text-lg font-black tracking-tighter">{formatValue(FORMAT_CODES.WEIGHT, 63.2)}</span>
            </div>
            <div className="p-5 bg-white/10 backdrop-blur-md text-white rounded-3xl border border-white/20 flex justify-between items-center shadow-inner hover:bg-white/20 transition-all cursor-crosshair">
              <span className="text-[10px] font-black opacity-60 uppercase tracking-widest">Pricing</span>
              <span className="text-lg font-black tracking-tighter text-blue-200">{formatValue(FORMAT_CODES.CURRENCY, 1284.50)}</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-[3rem] shadow-2xl border border-white/10 p-8 text-white relative overflow-hidden flex-1 group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <Code2 size={160} />
          </div>
          <div className="relative z-10 h-full flex flex-col">
             <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.5)]" />
                <div className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.5)]" />
                <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]" />
                <span className="text-[10px] text-slate-500 font-mono ml-4 uppercase tracking-[0.3em] font-black">MFG_RESOURCES.xaml</span>
             </div>
             <div className="flex-1 overflow-auto bg-black/40 backdrop-blur-md p-6 rounded-[2rem] font-mono text-[11px] leading-relaxed border border-white/5 shadow-inner">
                <div className="space-y-2">
                  <p><span className="text-slate-600 italic">// GLASS_LABEL_TEMPLATE_V4</span></p>
                  <p><span className="text-purple-400">&lt;TextBlock</span> <span className="text-blue-400">FontWeight=</span><span className="text-amber-400">"ExtraBold"</span></p>
                  <p className="ml-6"><span className="text-blue-400">Text=</span><span className="text-amber-400">"&#123;Binding Path=SpecID, StringFormat='ID: #&#123;0&#125;'&#125;"</span> <span className="text-purple-400">/&gt;</span></p>
                  <br />
                  <p><span className="text-purple-400">&lt;TextBlock</span> <span className="text-blue-400">FontSize=</span><span className="text-amber-400">"24"</span> <span className="text-blue-400">Foreground=</span><span className="text-amber-400">"Cyan"</span></p>
                  <p className="ml-6"><span className="text-blue-400">Text=</span><span className="text-amber-400">"&#123;Binding Path=Area, StringFormat='&#123;0:N3&#125; sqm'&#125;"</span> <span className="text-purple-400">/&gt;</span></p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Glass Configuration Modal Component / Price Calculator
function PriceCalculator({ isOpen, onClose, onSave }: { isOpen: boolean, onClose: () => void, onSave: (item: any) => void }) {
  const [unitType, setUnitType] = useState<GlassUnitType>('DGU');
  const [width, setWidth] = useState(1000);
  const [height, setHeight] = useState(1000);
  const [quantity, setQuantity] = useState(1);
  
  // Specific configurations
  const [glass1, setGlass1] = useState({ thickness: 6, type: 'Clear Float' });
  const [glass2, setGlass2] = useState({ thickness: 6, type: 'Low-E' });
  const [glass3, setGlass3] = useState({ thickness: 6, type: 'Clear Float' });
  const [spacer, setSpacer] = useState({ width: 12, type: 'Aluminum' });
  const [lamiInterlayer, setLamiInterlayer] = useState({ thickness: 0.38, type: 'PVB Clear' });
  
  // Finishing Options
  const [hasOverlap, setHasOverlap] = useState(false);
  const [overlapLM, setOverlapLM] = useState(0);
  const [hasSiliconBed, setHasSiliconBed] = useState(false);
  const [siliconLM, setSiliconLM] = useState(0);

  const area = (width * height) / 1000000;
  const totalArea = area * quantity;
  
  // Refined calculation logic
  const calculatePrice = () => {
    let base = 48; // SGU base
    if (unitType === 'DGU') base += 92;
    if (unitType === 'LAMINATED') base += 145;
    if (unitType === 'DGU_LAMINATED') base += 235;
    
    let total = base * totalArea;
    if (hasOverlap) total += overlapLM * 15;
    if (hasSiliconBed) total += siliconLM * 12;
    
    return total;
  };

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const getTitle = () => {
    switch(unitType) {
      case 'SINGLE': return 'Sgu calculator';
      case 'DGU': return 'Dgu calculator';
      case 'LAMINATED': return 'Lamination calculator';
      case 'DGU_LAMINATED': return 'Dgu+lamination calculator';
      default: return 'PRICE CALCULATOR';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black shadow-lg">
              GP
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">{getTitle()}</h2>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">Precision Cost Engine v5.3</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-400">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 flex gap-8">
          {/* Left Side: Inputs */}
          <div className="flex-1 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 p-1.5 bg-gray-100 rounded-xl mb-6">
              {[
                { id: 'SINGLE', label: 'SGU' },
                { id: 'DGU', label: 'DGU' },
                { id: 'LAMINATED', label: 'Lami' },
                { id: 'DGU_LAMINATED', label: 'DGU+Lami' }
              ].map(type => (
                <button
                  key={type.id}
                  onClick={() => setUnitType(type.id as GlassUnitType)}
                  className={`py-2 rounded-lg text-xs font-black transition-all ${
                    unitType === type.id 
                      ? 'bg-blue-600 text-white shadow-xl translate-z-10' 
                      : 'text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-blue-50/30 p-4 rounded-xl border border-blue-100 mb-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Active Calculator Mode</label>
                <div className="font-bold text-blue-800 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  {unitType === 'SINGLE' && 'SGU Mode'}
                  {unitType === 'DGU' && 'DGU Mode'}
                  {unitType === 'LAMINATED' && 'Lamination Mode'}
                  {unitType === 'DGU_LAMINATED' && 'DGU + Lami Mode'}
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Total Units (Quantity)</label>
                <input 
                  type="number" 
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                  className="w-full p-2 bg-white border border-blue-200 rounded-lg font-bold text-blue-900 outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider italic">Width (mm)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold pr-10 outline-none"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 font-bold">MM</span>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Height (mm)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold pr-10 outline-none"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 font-bold">MM</span>
                </div>
              </div>
            </div>

            <div className="h-px bg-gray-100" />

            {/* Dynamic Glass Stack Config */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <Layers size={16} className="text-blue-600" />
                Stack Assembly
              </h3>

              <div className="space-y-4 bg-gray-50/50 p-4 rounded-xl border border-dashed border-gray-200">
                {/* Pane 1 */}
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">P1</div>
                  <div className="flex-1 grid grid-cols-2 gap-2">
                    <select className="text-xs p-2 rounded border border-gray-200 outline-none" value={glass1.type} onChange={e => setGlass1({...glass1, type: e.target.value})}>
                      <option>Clear Float</option>
                      <option>Low-Iron (Extra Clear)</option>
                      <option>Bronze Reflective</option>
                      <option>Grey Tinted</option>
                    </select>
                    <select className="text-xs p-2 rounded border border-gray-200 outline-none" value={glass1.thickness} onChange={e => setGlass1({...glass1, thickness: Number(e.target.value)})}>
                      <option value={4}>4mm</option>
                      <option value={6}>6mm</option>
                      <option value={8}>8mm</option>
                      <option value={10}>10mm</option>
                    </select>
                  </div>
                </div>

                {/* DGU Elements */}
                {(unitType === 'DGU' || unitType === 'DGU_LAMINATED') && (
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-xs italic">S</div>
                    <div className="flex-1 grid grid-cols-2 gap-2">
                      <select className="text-xs p-2 rounded border border-amber-200 bg-amber-50 outline-none">
                        <option>Aluminum Spacer</option>
                        <option>Warm Edge (Black)</option>
                        <option>Warm Edge (Grey)</option>
                      </select>
                      <select className="text-xs p-2 rounded border border-amber-200 bg-amber-50 outline-none">
                        <option value={6}>6mm Air</option>
                        <option value={9}>9mm Air</option>
                        <option value={12}>12mm Argon</option>
                        <option value={16}>16mm Argon</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Pane 2 / Lamination Interlayer */}
                {unitType === 'LAMINATED' && (
                  <div className="flex gap-4 border-l-2 border-blue-200 pl-4">
                    <div className="w-8 h-8 rounded bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs italic">Int</div>
                    <div className="flex-1 grid grid-cols-2 gap-2">
                      <select className="text-xs p-2 rounded border border-emerald-200 bg-emerald-50 outline-none">
                        <option>PVB Clear 0.38</option>
                        <option>PVB Clear 0.76</option>
                        <option>SentryGlas 1.52</option>
                        <option>Acoustic PVB</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Final Pane */}
                {unitType !== 'SINGLE' && (
                   <div className="flex gap-4">
                    <div className="w-8 h-8 rounded bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">P2</div>
                    <div className="flex-1 grid grid-cols-2 gap-2">
                      <select className="text-xs p-2 rounded border border-gray-200 outline-none">
                        <option>Low-E Coating</option>
                        <option>Clear Float</option>
                        <option>Reflective</option>
                        <option>Sandblasted</option>
                      </select>
                      <select className="text-xs p-2 rounded border border-gray-200 outline-none">
                        <option value={4}>4mm</option>
                        <option value={6}>6mm</option>
                        <option value={8}>8mm</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Finishing Options Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <Settings size={16} className="text-blue-600" />
                  Finishing & Add-ons
                </h3>
                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-10 h-5 rounded-full transition-all relative ${hasOverlap ? 'bg-blue-600' : 'bg-slate-300'}`}>
                        <input type="checkbox" className="hidden" checked={hasOverlap} onChange={() => setHasOverlap(!hasOverlap)} />
                        <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${hasOverlap ? 'left-6' : 'left-1'}`} />
                      </div>
                      <span className="text-[11px] font-black uppercase text-slate-600 group-hover:text-blue-600 transition-colors italic">Overlap Processing</span>
                    </label>
                    {hasOverlap && (
                      <div className="relative pl-13">
                        <input 
                          type="number" 
                          placeholder="Linear Mtr" 
                          value={overlapLM}
                          onChange={(e) => setOverlapLM(Number(e.target.value))}
                          className="w-full text-xs p-2 bg-white border border-blue-200 rounded-lg outline-none"
                        />
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] font-bold text-blue-400">LM</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-10 h-5 rounded-full transition-all relative ${hasSiliconBed ? 'bg-blue-600' : 'bg-slate-300'}`}>
                        <input type="checkbox" className="hidden" checked={hasSiliconBed} onChange={() => setHasSiliconBed(!hasSiliconBed)} />
                        <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${hasSiliconBed ? 'left-6' : 'left-1'}`} />
                      </div>
                      <span className="text-[11px] font-black uppercase text-slate-600 group-hover:text-blue-600 transition-colors italic">Silicon Bed Seal</span>
                    </label>
                    {hasSiliconBed && (
                      <div className="relative">
                        <input 
                          type="number" 
                          placeholder="Linear Mtr" 
                          value={siliconLM}
                          onChange={(e) => setSiliconLM(Number(e.target.value))}
                          className="w-full text-xs p-2 bg-white border border-blue-200 rounded-lg outline-none"
                        />
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] font-bold text-blue-400">LM</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Virtual Preview & Details */}
          <div className="w-80 flex flex-col gap-6">
            <div className="bg-gray-900 rounded-[2.5rem] p-6 aspect-[4/5] flex flex-col items-center justify-center relative overflow-hidden ring-1 ring-white/20 shadow-2xl">
               <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent" />
               {/* 3D Visualizer Mockup */}
               <div className="w-52 h-72 bg-blue-400/20 border border-white/40 relative transform skew-x-3 -rotate-3 transition-all duration-700 shadow-[20px_20px_60px_rgba(0,0,0,0.4)]">
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-white/20" />
                  {/* DGU Reflection */}
                  {(unitType === 'DGU' || unitType === 'DGU_LAMINATED') && (
                    <div className="absolute inset-0 translate-x-3 -translate-y-3 bg-blue-400/5 border border-white/10" />
                  )}
               </div>
               <div className="absolute bottom-6 left-6 text-white w-full pr-12">
                  <p className="text-[9px] font-black opacity-40 uppercase tracking-[0.3em] whitespace-nowrap mb-1">Optical Simulation</p>
                  <p className="text-[10px] font-black text-blue-400 italic">ID_CONFIG: {generateGlassCode({ unitType, pane1: glass1, pane2: glass2, spacerWidth: spacer.width, interlayer: lamiInterlayer })}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {hasOverlap && <div className="text-[8px] font-black bg-blue-600/40 text-blue-200 px-3 py-1 rounded-full border border-blue-500/30 uppercase tracking-widest italic">Overlap: {overlapLM} LM</div>}
                    {hasSiliconBed && <div className="text-[8px] font-black bg-amber-600/40 text-amber-200 px-3 py-1 rounded-full border border-amber-500/30 uppercase tracking-widest italic">Silicon: {siliconLM} LM</div>}
                  </div>
               </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-slate-50/50 p-4 rounded-3xl border border-slate-200 space-y-2 font-black italic">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] text-slate-400 uppercase tracking-widest leading-none">Net Surface</span>
                  <span className="text-sm text-slate-800 leading-none">{totalArea.toFixed(3)} SQM</span>
                </div>
                <div className="flex justify-between items-center text-blue-600">
                  <span className="text-[9px] text-blue-400 uppercase tracking-widest leading-none">Est. Value</span>
                  <span className="text-lg leading-none">AED {calculatePrice().toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <button 
                  onClick={() => setIsPreviewOpen(true)}
                  className="w-full py-4 bg-white border-2 border-slate-200 text-slate-800 rounded-3xl font-black text-[10px] tracking-widest uppercase hover:bg-slate-50 active:scale-95 transition-all flex items-center justify-center gap-2 group italic shadow-xl shadow-slate-200/40"
                >
                  <Eye size={16} className="text-blue-600 transition-transform group-hover:scale-125" />
                  Live Preview PI
                </button>
                
                <button 
                  onClick={() => onSave({
                    code: generateGlassCode({ unitType, pane1: glass1, pane2: glass2, spacerWidth: spacer.width, interlayer: lamiInterlayer }),
                    client: 'Ocean Glass Partner', 
                    specs: `${unitType} Assembly: ${width} x ${height} | ${glass1.thickness}mm / ${spacer.width} / ${glass2.thickness}mm`,
                    qty: quantity,
                    value: calculatePrice(),
                    id: `GP-${Math.floor(Math.random() * 90000) + 10000}`,
                    status: 'Draft',
                    finishing: { 
                      overlap: hasOverlap ? overlapLM : 0, 
                      silicon: hasSiliconBed ? siliconLM : 0 
                    }
                  })}
                  className="w-full py-5 bg-blue-600 text-white rounded-[2.5rem] font-black text-xs tracking-[0.2em] uppercase hover:bg-blue-700 active:scale-95 transition-all shadow-2xl shadow-blue-500/30 relative overflow-hidden group italic"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <Archive size={16} className="mr-2" />
                  Archive to Feed
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Nested Live Preview */}
      <ProformaInvoice 
        isOpen={isPreviewOpen} 
        onClose={() => setIsPreviewOpen(false)} 
        data={{
          id: 'PREVIEW-REALTIME',
          client: 'Client Business Simulation',
          code: generateGlassCode({ unitType, pane1: glass1, pane2: glass2, spacerWidth: spacer.width, interlayer: lamiInterlayer }),
          value: calculatePrice()
        }} 
      />
    </div>
  );
}

// Proforma Invoice View Component (Ocean Glass Style)
function ProformaInvoice({ isOpen, onClose, data }: { isOpen: boolean, onClose: () => void, data: any }) {
  if (!data) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-xl z-[100] flex items-center justify-center p-4 md:p-8">
           <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            className="w-full max-w-6xl h-full max-h-[90vh] flex flex-col md:flex-row gap-6 no-print"
          >
            {/* Side Controller - Dashboard Style */}
            <div className="w-full md:w-80 flex flex-col gap-6 order-2 md:order-1">
               <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-[2.5rem] shadow-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/40">
                      <FileText className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none">Document Type</p>
                      <h3 className="text-white font-black italic uppercase tracking-tighter">Proforma Invoice</h3>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                      <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-1">Status</p>
                      <div className="flex items-center gap-2 text-emerald-400 font-black text-xs italic">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px] shadow-emerald-500/50 animate-pulse" />
                        AWAITING APPROVAL
                      </div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                      <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-1">Quotation Ref</p>
                      <p className="text-white font-mono text-xs italic">{data.id}</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                      <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-1">Last Modified</p>
                      <p className="text-white font-black text-xs italic tracking-tighter uppercase">{new Date().toLocaleDateString()} @ {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  </div>

                  <div className="mt-8 space-y-3">
                    <button 
                      onClick={() => window.print()}
                      className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-[10px] tracking-[0.2em] uppercase shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group italic"
                    >
                      <Printer size={16} className="group-hover:rotate-12 transition-transform" /> 
                      Generate PDF / Print
                    </button>
                    <button 
                      onClick={onClose}
                      className="w-full py-4 bg-white/10 text-white border border-white/20 rounded-2xl font-black text-[10px] tracking-[0.2em] uppercase hover:bg-white/20 transition-all italic"
                    >
                      Close Preview
                    </button>
                  </div>
               </div>

               <div className="flex-1 bg-slate-800/40 backdrop-blur-md rounded-[2.5rem] border border-white/10 p-6 flex flex-col justify-center items-center text-center">
                  <ShieldCheck size={48} className="text-blue-400 mb-4 opacity-50" />
                  <p className="text-white/60 text-[10px] font-black uppercase tracking-widest italic">Encrypted Secure Document</p>
                  <p className="text-slate-500 text-[10px] mt-2 leading-relaxed">This proforma matches the manufacturing registry V2.1.0 guidelines for Ocean Glass industry LLC.</p>
               </div>
            </div>

            {/* Document Workspace */}
            <div className="flex-1 bg-white/5 backdrop-blur-md rounded-[3rem] p-1 overflow-hidden border border-white/10 flex flex-col order-1 md:order-2 shadow-inner">
               <div className="flex-1 overflow-y-auto rounded-[2.8rem] print:overflow-visible scroll-smooth">
                  <div className="bg-white min-h-full p-0 shadow-2xl relative">
                    <div className="p-0 text-slate-900 font-sans leading-tight">
                      {/* Header Banner */}
                      <div className="bg-[#0f172a] text-white p-8 flex items-center justify-between border-b-[6px] border-blue-600">
                        <div className="flex items-center gap-8">
                          <div className="w-24 h-24 bg-white flex items-center justify-center rounded-sm shadow-xl p-2">
                            <div className="flex flex-col items-center border border-slate-200 w-full h-full justify-center">
                              <Box className="w-12 h-12 text-slate-800" />
                              <span className="text-[12px] font-black text-slate-800 tracking-tighter mt-[-4px]">OGI</span>
                            </div>
                          </div>
                          <div>
                            <h1 className="text-5xl font-black tracking-tighter italic leading-none mb-2">Ocean Glass Industry LLC</h1>
                            <div className="flex flex-col gap-1 opacity-70">
                              <p className="text-[11px] font-bold tracking-widest uppercase italic">CHG3+GH8 - Al Jerf Industrial 3 - Ajman, United Arab Emirates</p>
                              <p className="text-[11px] font-bold tracking-widest uppercase italic">Ph: 067047207 • Web: www.oceanglass.ae • TRN: 100344552200003</p>
                            </div>
                          </div>
                        </div>
                        <div className="text-right hidden sm:block">
                           <p className="text-[10px] font-black py-2 px-6 border-2 border-blue-500 rounded-full inline-block uppercase tracking-widest italic">Confidential Document</p>
                        </div>
                      </div>

                      {/* Document Title Bar */}
                      <div className="bg-slate-50 border-b border-slate-300 py-3 text-center text-2xl font-black italic tracking-[0.4em] uppercase text-slate-800 flex items-center justify-center gap-4">
                        <div className="h-px bg-slate-300 flex-1 hidden md:block ml-8" />
                        Job Order / Proforma Invoice
                        <div className="h-px bg-slate-300 flex-1 hidden md:block mr-8" />
                      </div>

                      {/* Info Sections */}
                      <div className="grid grid-cols-2">
                        <table className="w-full border-collapse text-[11px]">
                          <tbody>
                            <tr>
                              <td className="border border-slate-300 p-3 font-black w-28 bg-slate-100 uppercase tracking-tighter italic text-[10px]">Client / Entity</td>
                              <td className="border border-slate-300 p-3 font-black uppercase text-base tracking-tight text-blue-900">{data.client}</td>
                            </tr>
                            <tr>
                              <td className="border border-slate-300 p-3 font-black w-28 bg-slate-100 uppercase tracking-tighter italic text-[10px]">Attention</td>
                              <td className="border border-slate-300 p-3 uppercase font-bold text-slate-700">Project Manager / Site Engineer</td>
                            </tr>
                            <tr>
                              <td className="border border-slate-300 p-3 font-black w-28 bg-slate-100 uppercase tracking-tighter italic text-[10px]">Contact Tel</td>
                              <td className="border border-slate-300 p-3 font-mono text-slate-600">+971 04 222 3344 / +971 50 112 3344</td>
                            </tr>
                            <tr>
                              <td className="border border-slate-300 p-3 font-black w-28 bg-slate-100 uppercase tracking-tighter italic text-[10px]">Tax Reg (TRN)</td>
                              <td className="border border-slate-300 p-3 font-mono italic text-slate-800">100344552200003</td>
                            </tr>
                            <tr>
                              <td colSpan={2} className="border border-slate-300 p-3 italic text-center uppercase font-black bg-slate-100 text-[10px] tracking-widest text-slate-500">Registered Office: Po Box; 182729 Dubai UAE</td>
                            </tr>
                            <tr>
                              <td colSpan={2} className="border border-slate-300 p-6 bg-white">
                                <div className="flex justify-center flex-col items-center">
                                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-2 italic">Official Project Reference</span>
                                  <span className="font-black text-slate-800 text-3xl uppercase italic leading-none tracking-tighter underline decoration-2 decoration-blue-200 underline-offset-8">{data.code}</span>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <table className="w-full border-collapse text-[11px]">
                          <tbody>
                            <tr>
                              <td className="border border-slate-300 p-3 font-black w-36 bg-slate-100 uppercase tracking-tighter italic text-[10px]">System Job #</td>
                              <td className="border border-slate-300 p-3 font-mono font-black italic text-base text-blue-600">{data.id?.replace('GP-', 'OGI-PRO-')}</td>
                            </tr>
                            <tr>
                              <td className="border border-slate-300 p-3 font-black w-36 bg-slate-100 uppercase tracking-tighter italic text-[10px]">Reporting Date</td>
                              <td className="border border-slate-300 p-3 font-bold italic text-slate-800">{new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' })}</td>
                            </tr>
                            <tr>
                              <td className="border border-slate-300 p-3 font-black w-36 bg-slate-100 uppercase tracking-tighter italic text-[10px]">Sales Executive</td>
                              <td className="border border-slate-300 p-3 uppercase italic font-black text-slate-700">Mr. Sooraj / GlassPro ERP Central</td>
                            </tr>
                            <tr>
                              <td className="border border-slate-300 p-3 font-black w-36 bg-slate-100 uppercase tracking-tighter italic text-[10px]">Validity Date</td>
                              <td className="border border-slate-300 p-3 italic font-bold text-slate-800">18-Apr-26 (EXTENDED)</td>
                            </tr>
                            <tr>
                              <td className="border border-slate-300 p-3 font-black w-36 bg-slate-100 uppercase tracking-tighter italic text-[10px]">Revision Track</td>
                              <td className="border border-slate-300 p-3 italic font-bold text-amber-600">REV-04_PRODUCTION_READY</td>
                            </tr>
                            <tr>
                              <td className="border border-slate-300 p-3 font-black w-36 bg-slate-100 uppercase tracking-tighter italic text-[10px]">Global SL NO</td>
                              <td className="border border-slate-300 p-3 italic font-mono text-slate-500">OGI-SVR-22341-DX</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Specification Table */}
                      <div className="p-4 bg-slate-50">
                        <table className="w-full border-collapse border-2 border-slate-800 text-[11px] text-center table-fixed shadow-lg bg-white">
                          <thead className="bg-[#0f172a] text-white">
                            <tr>
                              <th className="border-2 border-slate-800 p-2 w-12 italic uppercase text-[9px]">Item</th>
                              <th className="border-2 border-slate-800 p-2 italic grow-0 w-44 uppercase text-[9px]">Tag / CustomerRef</th>
                              <th className="border-2 border-slate-800 p-2 italic w-16 uppercase text-[9px]">Width</th>
                              <th className="border-2 border-slate-800 p-2 italic w-16 uppercase text-[9px]">Height</th>
                              <th className="border-2 border-slate-800 p-2 italic w-16 uppercase text-[9px]">W2</th>
                              <th className="border-2 border-slate-800 p-2 italic w-16 uppercase text-[9px]">H2</th>
                              <th className="border-2 border-slate-800 p-2 italic w-16 uppercase text-[9px]">Count</th>
                              <th className="border-2 border-slate-800 p-2 italic uppercase text-[9px]">Unit Area</th>
                              <th className="border-2 border-slate-800 p-2 italic uppercase text-[9px]">Total SQM</th>
                              <th className="border-2 border-slate-800 p-2 italic font-black uppercase text-[9px]">Rate (AED)</th>
                              <th className="border-2 border-slate-800 p-2 font-black italic uppercase text-[9px]">Value</th>
                            </tr>
                          </thead>
                          <tbody className="italic font-bold text-slate-800">
                            <tr className="bg-blue-600/5 text-blue-900 text-left">
                              <td colSpan={11} className="border-2 border-slate-800 p-2 font-black uppercase text-[11px] tracking-tight flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-blue-600" />
                                6mm Clear Low E FT Glass + 16mm Black Warm Edge ASP + 6mm Clear FT Glass
                              </td>
                            </tr>
                            {[1, 2, 3, 4, 5].map((i) => {
                              const w = 640 + (i * 80);
                              const h = 1825 + (i * 40);
                              const area = (w * h) / 1000000;
                              const qty = i % 2 === 0 ? 4 : 2;
                              return (
                                <tr key={i} className="hover:bg-blue-50/40 transition-colors">
                                  <td className="border border-slate-300 p-2 text-slate-400">{String(i).padStart(2, '0')}</td>
                                  <td className="border border-slate-300 p-2 uppercase text-slate-800">EXT-GL-{i}</td>
                                  <td className="border border-slate-300 p-2">{w}</td>
                                  <td className="border border-slate-300 p-2">{h}</td>
                                  <td className="border border-slate-300 p-2">-</td>
                                  <td className="border border-slate-300 p-2">-</td>
                                  <td className="border border-slate-300 p-2">{qty}</td>
                                  <td className="border border-slate-300 p-2 font-mono text-[10px]">{area.toFixed(3)}</td>
                                  <td className="border border-slate-300 p-2 font-mono text-[10px]">{(area * qty).toFixed(3)}</td>
                                  <td className="border border-slate-300 p-2">320.00</td>
                                  <td className="border border-slate-300 p-2 text-blue-700">{(area * qty * 320).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                </tr>
                              );
                            })}
                            <tr className="bg-slate-800 text-white font-black">
                              <td colSpan={6} className="border-2 border-slate-800 p-3 text-right text-[10px] uppercase tracking-widest italic opacity-60">Subtotal Production Group A</td>
                              <td className="border-2 border-slate-800 p-3 text-lg leading-none">14</td>
                              <td className="border-2 border-slate-800 p-3">-</td>
                              <td className="border-2 border-slate-800 p-3 text-lg leading-none">32.40</td>
                              <td className="border-2 border-slate-800 p-3">-</td>
                              <td className="border-2 border-slate-800 p-3 text-lg leading-none">10,368.00</td>
                            </tr>
                            
                            {/* Processing Fees */}
                            <tr className="bg-slate-200">
                              <td colSpan={11} className="border-2 border-slate-800 p-2 font-black text-left uppercase text-[10px] tracking-[0.2em] italic text-slate-600">Manufacturing Add-ons / Finishing</td>
                            </tr>
                            <tr>
                              <td className="border border-slate-300 p-2">06</td>
                              <td className="border border-slate-300 p-2 text-left uppercase text-slate-800">Edge Polishing & Buffing (LM)</td>
                              <td colSpan={4} className="border border-slate-300 p-2">-</td>
                              <td className="border border-slate-300 p-2">84.22</td>
                              <td colSpan={2} className="border border-slate-300 p-2">-</td>
                              <td className="border border-slate-300 p-2">12.50</td>
                              <td className="border border-slate-300 p-2 text-blue-700 italic font-black">1,052.75</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Totals & Signatures Block */}
                      <div className="flex border-t-[4px] border-slate-800 mx-4 mt-2">
                        <div className="flex-1 bg-slate-50/50 p-6 border-r-2 border-slate-200">
                          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4 italic">Commercial Provisions</h4>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center text-[11px] leading-none">
                              <span className="font-black text-slate-800 uppercase italic">Waste Allowance:</span>
                              <span className="font-black text-blue-600">15.00% (Calculated)</span>
                            </div>
                            <div className="flex justify-between items-center text-[11px] leading-none">
                              <span className="font-black text-slate-800 uppercase italic">Delivery Period:</span>
                              <span className="font-bold">14 WORKING DAYS A.R.P</span>
                            </div>
                            <div className="flex justify-between items-center text-[11px] leading-none">
                              <span className="font-black text-slate-800 uppercase italic">Credit Facility:</span>
                              <span className="font-bold">60 DAYS PDC / LC</span>
                            </div>
                          </div>
                        </div>
                        <div className="w-[400px]">
                          <div className="flex bg-slate-100 p-4 border-b border-white">
                            <div className="flex-1 text-right pr-4 text-[11px] font-black uppercase italic text-slate-400 self-center">Net Amount (AED)</div>
                            <div className="text-2xl font-black text-slate-800 italic tracking-tighter">11,420.75</div>
                          </div>
                          <div className="flex bg-slate-50 p-4 border-b border-white">
                            <div className="flex-1 text-right pr-4 text-[11px] font-black uppercase italic text-slate-400 self-center">Value Added Tax (5%)</div>
                            <div className="text-2xl font-black text-amber-600 italic tracking-tighter">571.04</div>
                          </div>
                          <div className="flex bg-blue-600 p-6 text-white shadow-[0_0_40px_rgba(37,99,235,0.2)]">
                            <div className="flex-1 text-right pr-6 text-[12px] font-black uppercase tracking-[0.3em] italic self-center">Total Payable (AED)</div>
                            <div className="text-4xl font-black italic tracking-tighter leading-none pulse-strong">11,991.79</div>
                          </div>
                        </div>
                      </div>

                      {/* Global Footer Signature Region */}
                      <div className="p-12 mt-4 grid grid-cols-3 gap-12 relative overflow-hidden backdrop-sepia-[0.02]">
                        {/* Background Stamp */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none rotate-[-8deg] scale-125">
                            <Box size={500} />
                        </div>
                        
                        <div className="flex flex-col items-center group">
                          <div className="h-24 w-full border-b-[3px] border-slate-900 relative transition-all group-hover:border-blue-600">
                             <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="font-mono text-[8px] text-slate-400 rotate-2 mb-2 italic">DIGITALLY SIGNED</span>
                                <div className="text-blue-500/20 font-black text-xs uppercase tracking-widest italic select-none">SYSTEM_USER_JUB_SAL</div>
                             </div>
                          </div>
                          <p className="mt-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Document Prepared By</p>
                          <p className="font-black text-slate-800 uppercase italic text-[11px]">Juber Saleem / AI ARCHITECT</p>
                        </div>

                        <div className="flex flex-col items-center">
                          <div className="h-24 w-full border-b-[3px] border-slate-900 relative">
                             <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-20">
                                <FileText size={32} className="text-slate-400" />
                             </div>
                          </div>
                          <p className="mt-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Quality Verification</p>
                          <p className="font-black text-slate-800 uppercase italic text-[11px]">Manufacturing Ops Lead</p>
                        </div>

                        <div className="flex flex-col items-center relative">
                          <div className="h-24 w-full border-b-[3px] border-slate-900"></div>
                          <p className="mt-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Client Acceptance Seal</p>
                          
                          {/* Official Rubber Stamp Implementation */}
                          <div className="absolute right-[-20%] top-[-20%] rotate-12 opacity-80 pointer-events-none">
                             <div className="border-[5px] border-rose-600/60 p-4 rounded-xl flex flex-col items-center">
                                <div className="text-rose-600/60 font-black text-4xl uppercase tracking-[0.2em] italic leading-none mb-1">ORIGINAL</div>
                                <div className="text-rose-600/60 font-black text-[9px] uppercase tracking-widest italic border-t border-rose-600/30 pt-1">Ocean Glass Industry LLC</div>
                             </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function QuotationModule({ quotations, onCreateOrder, onAddQuotation }: { quotations: any[], onCreateOrder: (quote: any) => void, onAddQuotation: (item: any) => void }) {
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const [selectedPI, setSelectedPI] = useState<any>(null);

  return (
    <div className="flex flex-col h-full gap-6">
      <PriceCalculator 
        isOpen={isCreatorOpen} 
        onClose={() => setIsCreatorOpen(false)} 
        onSave={(item) => {
          onAddQuotation({
            ...item,
            id: item.id || `GP-${Math.floor(Math.random() * 90000) + 10000}`,
            status: item.status || 'Draft',
          });
          setIsCreatorOpen(false);
        }} 
      />

      <ProformaInvoice 
        isOpen={!!selectedPI} 
        onClose={() => setSelectedPI(null)} 
        data={selectedPI} 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Pending Quotes', value: quotations.filter(q => q.status !== 'In Production').length.toString(), delta: '+5%', icon: FileText, color: 'blue' },
          { label: 'Avg Unit Price', value: '$184.00', delta: '-2%', icon: Calculator, color: 'emerald' },
          { label: 'Glass Area (m²)', value: '1,284', delta: '+12%', icon: Layers, color: 'amber' },
          { label: 'Orders Conversion', value: '68%', delta: '+1%', icon: BarChart3, color: 'indigo' },
        ].map((stat, i) => (
          <div key={i} className="bg-white/40 backdrop-blur-xl p-4 rounded-3xl border border-white/60 shadow-lg flex items-center gap-4">
            <div className={`p-3 rounded-2xl bg-${stat.color}-50/50 text-${stat.color}-600 shadow-sm border border-white/40`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{stat.label}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-slate-800 leading-none">{stat.value}</span>
                <span className={`text-[10px] font-black ${stat.delta.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {stat.delta}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1 bg-white/40 backdrop-blur-2xl rounded-[32px] shadow-2xl border border-white/60 flex flex-col overflow-hidden">
        <div className="px-8 py-6 border-b border-white/60 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="font-black text-slate-800 tracking-tight text-lg leading-none italic uppercase">Quotation Feed</h2>
            <div className="flex gap-2">
              <span className="px-3 py-1 rounded-full text-[9px] font-black bg-blue-100/50 text-blue-700 uppercase tracking-widest border border-blue-200/50">Proforma Active</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsCreatorOpen(true)}
              className="px-6 py-2.5 text-xs font-black bg-blue-600 text-white hover:bg-blue-700 rounded-2xl transition-all shadow-xl shadow-blue-500/20 flex items-center gap-2 active:scale-95 italic uppercase tracking-widest"
            >
              <Plus size={14} /> New Quote
            </button>
            <button className="px-4 py-2.5 text-xs font-black text-slate-600 bg-white/50 hover:bg-white rounded-2xl transition-all border border-white/60 shadow-sm active:scale-95 uppercase tracking-widest">Archive</button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead className="sticky top-0 z-10">
              <tr className="bg-slate-800/5 text-slate-400">
                <th className="px-6 py-4 rounded-l-2xl text-[10px] font-black uppercase tracking-[0.2em] italic">Spec Code</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] italic text-center">Qty</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] italic text-right">Value (USD)</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] italic text-center">Status</th>
                <th className="px-6 py-4 rounded-r-2xl text-[10px] font-black uppercase tracking-[0.2em] italic text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="font-mono text-sm">
              {quotations.map((row, i) => (
                <tr key={i} className="hover:bg-white/60 cursor-pointer group transition-all">
                  <td className="px-6 py-4 rounded-l-2xl border-y border-l border-white/20 bg-white/20 group-hover:bg-transparent">
                    <div className="flex flex-col">
                      <span className="text-slate-800 font-black tracking-tighter text-base leading-none mb-1 uppercase italic">{row.code}</span>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{row.client}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center font-black border-y border-white/20 bg-white/20 group-hover:bg-transparent tracking-tighter text-base">{row.qty}</td>
                  <td className="px-6 py-4 text-right font-black text-slate-800 border-y border-white/20 bg-white/20 group-hover:bg-transparent tracking-tighter text-base">
                    {formatValue(FORMAT_CODES.CURRENCY, row.value)}
                  </td>
                  <td className="px-6 py-4 border-y border-white/20 bg-white/20 group-hover:bg-transparent text-center">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black border shadow-sm ${
                      row.status === 'In Production' ? 'bg-blue-500 text-white border-blue-600' :
                      row.status === 'Quoted' ? 'bg-emerald-50/50 text-emerald-700 border-emerald-200/50' :
                      row.status === 'Awaiting Payment' ? 'bg-amber-50/50 text-amber-700 border-amber-200/50' :
                      'bg-slate-100 text-slate-600 border-slate-200'
                    } uppercase tracking-widest italic`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center rounded-r-2xl border-y border-r border-white/20 bg-white/20 group-hover:bg-transparent">
                    <div className="flex items-center justify-center gap-2">
                       <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPI(row);
                        }}
                        className="bg-white/80 text-slate-800 p-2.5 rounded-xl shadow-lg transition-all active:scale-90 border border-slate-200 hover:text-blue-600"
                        title="View Proforma"
                      >
                        <FileText size={16} />
                      </button>
                      {row.status !== 'In Production' ? (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onCreateOrder(row);
                          }}
                          className="bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-xl shadow-lg transition-all active:scale-90"
                          title="Release to Production"
                        >
                          <Layers size={16} />
                        </button>
                      ) : (
                        <div className="w-10 h-10 flex items-center justify-center text-emerald-500 bg-emerald-50 rounded-xl">
                          <CheckCircle2 size={18} />
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function DashboardModule({ orders, quotations }: { orders: any[], quotations: any[] }) {
  const salesData = [
    { day: 'Mon', sales: 4200, output: 240 },
    { day: 'Tue', sales: 3800, output: 210 },
    { day: 'Wed', sales: 5100, output: 300 },
    { day: 'Thu', sales: 4900, output: 280 },
    { day: 'Fri', sales: 6200, output: 340 },
    { day: 'Sat', sales: 2800, output: 150 },
    { day: 'Sun', sales: 2100, output: 110 },
  ];

  const glassTypeData = [
    { name: 'DGU', value: 45, color: '#3b82f6' },
    { name: 'LAM', value: 30, color: '#10b981' },
    { name: 'SINGLE', value: 25, color: '#f59e0b' },
  ];

  return (
    <div className="flex flex-col h-full gap-6 overflow-y-auto pr-2">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Cards */}
        <div className="lg:col-span-2 bg-white/40 backdrop-blur-xl p-6 rounded-3xl border border-white/60 shadow-xl flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-black text-slate-800 text-xl tracking-tight leading-none mb-1">Production & Revenue</h2>
              <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase font-bold">7-Day Technical Forecast</p>
            </div>
            <div className="flex gap-4">
               <div className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase">
                  <div className="w-2 h-2 rounded-full bg-blue-600" /> Revenue
               </div>
               <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase">
                  <div className="w-2 h-2 rounded-full bg-emerald-600" /> Output (m²)
               </div>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.2)" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '24px', 
                    border: '1px solid rgba(255,255,255,0.6)', 
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', 
                    fontSize: '12px',
                    backgroundColor: 'rgba(255,255,255,0.8)',
                    backdropFilter: 'blur(12px)'
                  }}
                />
                <Area type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorSales)" />
                <Area type="monotone" dataKey="output" stroke="#10b981" strokeWidth={3} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Breakdown Card */}
        <div className="bg-white/40 backdrop-blur-xl p-6 rounded-3xl border border-white/60 shadow-xl flex flex-col items-center justify-center gap-4">
           <h2 className="font-black text-slate-800 text-xl tracking-tight w-full">Order Mix</h2>
           <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={glassTypeData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="rgba(255,255,255,0.4)"
                  >
                    {glassTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
           </div>
           <div className="grid grid-cols-3 gap-2 w-full">
              {glassTypeData.map(item => (
                <div key={item.name} className="text-center p-2 bg-white/50 backdrop-blur-md rounded-2xl border border-white/60 font-mono">
                  <p className="text-[10px] font-black text-slate-400 uppercase">{item.name}</p>
                  <p className="text-xs font-black text-slate-800">{item.value}%</p>
                </div>
              ))}
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         {[
           { label: 'Active Jobs', value: orders.length, icon: Layers, color: 'blue', status: 'Running' },
           { label: 'Total Quotes', value: quotations.length, icon: FileText, color: 'emerald', status: 'Healthy' },
           { label: 'System Uptime', value: '99.98%', icon: Cpu, color: 'indigo', status: 'Online' },
           { label: 'Pending Dispatch', value: '18', icon: Truck, color: 'amber', status: 'High Load' },
         ].map((stat, i) => (
           <div key={i} className="bg-white/50 backdrop-blur-xl p-5 rounded-3xl border border-white/60 shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                <stat.icon size={48} className="text-slate-800" />
              </div>
              <div className="flex flex-col gap-1 relative z-10">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</span>
                <span className="text-3xl font-black text-slate-800">{stat.value}</span>
                <div className="flex items-center gap-1.5 mt-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${stat.status === 'Running' || stat.status === 'Healthy' || stat.status === 'Online' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{stat.status}</span>
                </div>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
}

function InventoryModule() {
  const [searchTerm, setSearchTerm] = useState('');
  const inventory = [
    { id: 'ST-001', name: 'Clear Float 6mm', size: '3300 × 2140', stock: '124 sheets', status: 'High', type: 'Glass Float' },
    { id: 'ST-002', name: 'Clear Float 10mm', size: '3300 × 2140', stock: '42 sheets', status: 'Warning', type: 'Glass Float' },
    { id: 'ST-003', name: 'Low-E 6mm Pro-T 1.0', size: '3210 × 2250', stock: '89 sheets', status: 'High', type: 'Coated' },
    { id: 'ST-004', name: 'Grey Tint 6mm', size: '3300 × 2140', stock: '12 sheets', status: 'Critical', type: 'Glass Tinted' },
    { id: 'ST-005', name: 'Mirror 4mm Clear', size: '2440 × 1830', stock: '65 sheets', status: 'Normal', type: 'Processing' },
    { id: 'ST-006', name: 'PVB Clear 0.38', size: '2140mm Reel', stock: '4 reels', status: 'Normal', type: 'Interlayer' },
  ];

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex justify-between items-center bg-white/40 backdrop-blur-md p-4 rounded-[2rem] border border-white/60 shadow-lg">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search raw materials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-6 py-2.5 bg-white/50 border border-white/60 rounded-2xl text-sm font-bold text-slate-700 w-80 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </div>
        <div className="flex gap-4">
           <button className="px-6 py-2.5 bg-white/50 border border-white/60 rounded-2xl text-[10px] font-black text-slate-600 hover:bg-white/80 uppercase tracking-widest flex items-center gap-2 transition-all shadow-sm active:scale-95">
              <Package size={14} className="text-blue-500" /> Receive Stock
           </button>
           <button className="px-6 py-2.5 bg-blue-600 text-white rounded-2xl text-[10px] font-black shadow-xl shadow-blue-500/20 uppercase tracking-widest hover:bg-blue-700 active:scale-95 transition-all">
              Inventory Audit
           </button>
        </div>
      </div>

      <div className="flex-1 bg-white/40 backdrop-blur-2xl rounded-[3rem] shadow-2xl border border-white/60 overflow-hidden flex flex-col">
          <table className="w-full text-left border-separate border-spacing-y-1.5 p-4">
            <thead>
              <tr className="bg-slate-800/5 text-slate-400">
                <th className="px-8 py-4 rounded-l-2xl text-[10px] font-black uppercase tracking-[0.2em] italic">Material Alias</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] italic">Jumbo Size</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] italic">Classification</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] italic">Quantity</th>
                <th className="px-8 py-4 rounded-r-2xl text-[10px] font-black uppercase tracking-[0.2em] italic">Alert Status</th>
              </tr>
            </thead>
            <tbody className="font-mono text-sm">
              {inventory.filter(i => i.name.toLowerCase().includes(searchTerm.toLowerCase())).map((item) => (
                <tr key={item.id} className="hover:bg-white/60 transition-all group cursor-pointer">
                  <td className="px-8 py-5 rounded-l-2xl bg-white/20 border-y border-l border-white/20 group-hover:bg-transparent">
                    <div className="flex flex-col">
                      <span className="font-black text-slate-800 text-sm tracking-tight leading-none mb-1">{item.name}</span>
                      <span className="text-[10px] text-blue-500 font-black tracking-widest">{item.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 bg-white/20 border-y border-white/20 group-hover:bg-transparent text-xs font-bold text-slate-500">{item.size}</td>
                  <td className="px-6 py-5 bg-white/20 border-y border-white/20 group-hover:bg-transparent">
                    <span className="bg-slate-100/50 backdrop-blur-sm px-3 py-1 rounded-full text-[9px] font-black text-slate-500 border border-slate-200/50 uppercase tracking-widest">{item.type}</span>
                  </td>
                  <td className="px-6 py-5 bg-white/20 border-y border-white/20 group-hover:bg-transparent text-base font-black text-slate-800 tracking-tighter">{item.stock}</td>
                  <td className="px-8 py-5 rounded-r-2xl bg-white/20 border-y border-r border-white/20 group-hover:bg-transparent">
                    <div className={`flex items-center gap-2 text-[10px] font-black ${
                      item.status === 'Critical' ? 'text-rose-500' : 
                      item.status === 'Warning' ? 'text-amber-500' : 'text-emerald-500'
                    } uppercase tracking-widest`}>
                      <div className={`w-2 h-2 rounded-full ${
                        item.status === 'Critical' ? 'bg-rose-500 animate-pulse shadow-[0_0_8px_rgba(244,63,94,1)]' : 
                        item.status === 'Warning' ? 'bg-amber-500' : 'bg-emerald-500'
                      }`} />
                      {item.status}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
    </div>
  );
}

function CustomersModule() {
  const clients = [
    { name: 'Lumina Towers LLC', contact: 'Mark Sterling', email: 'm.sterling@lumina.com', volume: '$184k', status: 'Key Account', icon: 'LT' },
    { name: 'Skyline Glazing Ltd', contact: 'Sarah Chen', email: 'billing@skyline.gl', volume: '$92k', status: 'Standard', icon: 'SG' },
    { name: 'Urban Facades Inc', contact: 'David Rossi', email: 'd.rossi@urban.it', volume: '$340k', status: 'VIP', icon: 'UF' },
    { name: 'Vertex Architecture', contact: 'Elena Vance', email: 'info@vertex-a.com', volume: '$12k', status: 'New', icon: 'VA' },
  ];

  return (
    <div className="flex flex-col h-full gap-8">
       <div className="flex justify-between items-center px-4 py-2 bg-white/40 backdrop-blur-md rounded-3xl border border-white/60 shadow-lg">
          <h2 className="text-xl font-black text-slate-800 tracking-tighter uppercase italic">Client Hub <span className="text-blue-600 font-mono font-black italic">CRM_v5.2</span></h2>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-2xl text-[10px] font-black transition-all shadow-xl shadow-blue-500/20 flex items-center gap-2 active:scale-95 uppercase tracking-widest">
            <Plus size={14} /> Register Partner
          </button>
       </div>
       
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {clients.map(client => (
            <div key={client.name} className="bg-white/40 backdrop-blur-2xl p-8 rounded-[3rem] border border-white/60 shadow-xl hover:shadow-2xl transition-all group flex flex-col items-center text-center relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-blue-400/20 transition-all" />
               
               <div className="w-20 h-20 rounded-[2.5rem] bg-slate-800 text-white flex items-center justify-center font-black text-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all cursor-pointer shadow-xl relative z-10">
                 {client.icon}
               </div>
               
               <div className="relative z-10 flex flex-col items-center">
                  <h3 className="font-black text-slate-800 text-lg tracking-tight leading-none mb-2">{client.name}</h3>
                  <p className="text-[10px] text-slate-400 font-mono font-bold italic tracking-tighter uppercase mb-6 px-4 bg-white/50 backdrop-blur-md rounded-full border border-white/40 py-1">{client.email}</p>
               </div>
               
               <div className="w-full h-px bg-white/40 mb-6 relative z-10" />
               
               <div className="grid grid-cols-2 gap-4 w-full mb-8 relative z-10">
                  <div className="flex flex-col items-start px-2">
                    <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-1 italic">Volume</span>
                    <span className="text-base font-black text-slate-800 tracking-tighter leading-none">{client.volume}</span>
                  </div>
                  <div className="flex flex-col items-end px-2">
                    <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-1 italic">Tier</span>
                    <span className={`text-[9px] font-black px-3 py-1 rounded-full border shadow-sm ${
                      client.status === 'VIP' ? 'bg-amber-100/50 text-amber-700 border-amber-200/50' : 
                      client.status === 'Key Account' ? 'bg-blue-100/50 text-blue-700 border-blue-200/50' : 'bg-slate-100/50 text-slate-500 border-slate-200/50'
                    }`}>{client.status.toUpperCase()}</span>
                  </div>
               </div>
               
               <button className="w-full py-3.5 bg-blue-600 text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95 relative z-10">
                  Open CRM PROFILE
               </button>
            </div>
          ))}
       </div>
    </div>
  );
}

function SettingsModule() {
  const sections = [
    { title: 'Manufacturing Rules', icon: Cpu, desc: 'Thickness tolerances, waste offsets, and tempering recipes', active: true },
    { title: 'User Authorization', icon: ShieldCheck, desc: 'RBAC controls, department permissions, and audit logs', active: true },
    { title: 'Global Connectivity', icon: Database, desc: 'External accounting bridges (SAP/Sage) and IoT integrations', active: false },
    { title: 'Notifications', icon: Bell, desc: 'SMS production alerts and client dispatch automated emails', active: true },
    { title: 'System Storage', icon: HardDrive, desc: 'Technical spec backups and XAML template versioning', active: true },
  ];

  return (
    <div className="flex flex-col h-full gap-6 overflow-auto pr-2 scroll-smooth">
       <div className="bg-slate-800 p-10 rounded-[3rem] text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Settings size={200} />
          </div>
          <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-3xl font-black tracking-tighter mb-2 italic uppercase">System Registry</h2>
            <p className="text-[10px] text-slate-400 font-mono tracking-[0.4em] uppercase mb-8 opacity-80 decoration-blue-500 underline underline-offset-8">Environment Core V2.1.5-Release</p>
            <div className="flex gap-4">
              <div className="px-5 py-2.5 bg-white/10 backdrop-blur-md text-white rounded-2xl text-[10px] font-black font-mono border border-white/20 shadow-lg tracking-widest">CLUSTER: STABLE_RT</div>
              <div className="px-5 py-2.5 bg-blue-600 text-white rounded-2xl text-[10px] font-black font-mono shadow-xl shadow-blue-500/20 tracking-widest">LIC: ENTERPRISE_PLUS</div>
            </div>
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
          {sections.map(section => (
            <div key={section.title} className={`bg-white/40 backdrop-blur-2xl p-6 rounded-[2.5rem] border border-white/60 shadow-xl transition-all flex flex-col group cursor-pointer hover:border-blue-400 ${!section.active ? 'opacity-40 grayscale pointer-events-none' : ''}`}>
               <div className="w-16 h-16 rounded-[1.75rem] bg-slate-800/5 shadow-inner flex items-center justify-center text-slate-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all mb-6">
                 <section.icon size={28} />
               </div>
               <div className="flex-1">
                 <div className="flex justify-between items-center mb-2">
                    <h3 className="font-black text-slate-800 text-base tracking-tight leading-none uppercase italic">{section.title}</h3>
                    {!section.active && <span className="text-[9px] font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">DEPLOYING</span>}
                 </div>
                 <p className="text-[11px] text-slate-400 font-bold leading-relaxed">{section.desc}</p>
               </div>
               <div className="mt-6 flex justify-end">
                  <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-500 transition-all" />
               </div>
            </div>
          ))}
       </div>
    </div>
  );
}

