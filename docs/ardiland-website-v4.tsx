import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Github, ExternalLink, Mail, Calendar, Menu, X, Moon, Sun, Play, Edit, Trash2, Plus, LogOut, ChevronLeft, ChevronRight, Save, Package, FileText, MessageSquare, Upload, Image, Bold, Italic, List, ListOrdered, Heading1, Heading2, Quote, Link, Code } from 'lucide-react';

const sampleImage = 'https://media.istockphoto.com/id/1973365581/vector/sample-ink-rubber-stamp.jpg?s=612x612&w=0&k=20&c=_m6hNbFtLdulg3LK5LRjJiH6boCb_gcxPvRLytIz0Ws=';

const useDarkMode = () => {
  const [dark, setDark] = useState(false);
  return [dark, setDark];
};

// Rich Text Editor
const RichTextEditor = ({ value, onChange, dark }) => {
  const editorRef = useRef(null);
  
  const execCommand = (command, val = null) => {
    document.execCommand(command, false, val);
    editorRef.current?.focus();
    if (editorRef.current) onChange(editorRef.current.innerHTML);
  };

  const tools = [
    { icon: Bold, cmd: 'bold', title: 'Bold' },
    { icon: Italic, cmd: 'italic', title: 'Italic' },
    { icon: Heading1, cmd: 'formatBlock', val: 'h2', title: 'Heading' },
    { icon: Heading2, cmd: 'formatBlock', val: 'h3', title: 'Subheading' },
    { icon: List, cmd: 'insertUnorderedList', title: 'Bullet List' },
    { icon: ListOrdered, cmd: 'insertOrderedList', title: 'Numbered List' },
    { icon: Quote, cmd: 'formatBlock', val: 'blockquote', title: 'Quote' },
    { icon: Code, cmd: 'formatBlock', val: 'pre', title: 'Code Block' },
  ];

  return (
    <div className={`rounded-lg border ${dark ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-white'}`}>
      <div className={`flex flex-wrap gap-1 p-2 border-b ${dark ? 'border-gray-700' : 'border-gray-200'}`}>
        {tools.map((t, i) => (
          <button key={i} type="button" title={t.title}
            onClick={() => execCommand(t.cmd, t.val)}
            className={`p-2 rounded hover:${dark ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <t.icon size={16} className={dark ? 'text-gray-400' : 'text-gray-600'} />
          </button>
        ))}
      </div>
      <div
        ref={editorRef}
        contentEditable
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
        dangerouslySetInnerHTML={{ __html: value }}
        className={`min-h-64 p-4 focus:outline-none prose prose-sm max-w-none ${dark ? 'text-white prose-invert' : 'text-gray-900'}`}
        style={{ minHeight: '300px' }}
      />
    </div>
  );
};

// Image Upload Component
const ImageUpload = ({ label, value, onChange, dark, aspectRatio = 'aspect-video' }) => {
  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => onChange(ev.target?.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <label className={`block text-sm font-medium mb-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>{label}</label>
      <div className={`relative ${aspectRatio} rounded-lg border-2 border-dashed overflow-hidden ${dark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-300 bg-gray-50'}`}>
        {value ? (
          <>
            <img src={value} alt="Upload" className="w-full h-full object-cover" />
            <button onClick={() => onChange('')}
              className="absolute top-2 right-2 p-1.5 rounded-full bg-red-500 text-white hover:bg-red-600">
              <X size={14} />
            </button>
          </>
        ) : (
          <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100/50">
            <Upload size={24} className={dark ? 'text-gray-500' : 'text-gray-400'} />
            <span className={`mt-2 text-sm ${dark ? 'text-gray-500' : 'text-gray-500'}`}>Click to upload</span>
            <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
          </label>
        )}
      </div>
    </div>
  );
};

// Icon Selector
const IconSelector = ({ value, onChange, dark }) => {
  const colors = [
    { name: 'Blue', value: 'bg-blue-500' },
    { name: 'Purple', value: 'bg-purple-500' },
    { name: 'Green', value: 'bg-emerald-500' },
    { name: 'Amber', value: 'bg-amber-500' },
    { name: 'Rose', value: 'bg-rose-500' },
    { name: 'Cyan', value: 'bg-cyan-500' },
  ];
  
  const [initials, setInitials] = useState(value?.initials || '');
  const [color, setColor] = useState(value?.color || 'bg-blue-500');

  useEffect(() => {
    onChange({ initials, color });
  }, [initials, color]);

  return (
    <div>
      <label className={`block text-sm font-medium mb-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Product Icon</label>
      <div className={`p-4 rounded-lg border ${dark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-14 h-14 ${color} rounded-xl flex items-center justify-center text-white font-semibold text-lg`}>
            {initials || '??'}
          </div>
          <div className="flex-1">
            <label className={`block text-xs mb-1 ${dark ? 'text-gray-500' : 'text-gray-500'}`}>Initials (2 chars)</label>
            <input
              value={initials}
              onChange={(e) => setInitials(e.target.value.toUpperCase().slice(0, 2))}
              maxLength={2}
              placeholder="LU"
              className={`w-20 px-3 py-2 rounded-lg border text-center uppercase ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
            />
          </div>
        </div>
        <div>
          <label className={`block text-xs mb-2 ${dark ? 'text-gray-500' : 'text-gray-500'}`}>Color</label>
          <div className="flex gap-2">
            {colors.map((c) => (
              <button key={c.value} type="button"
                onClick={() => setColor(c.value)}
                className={`w-8 h-8 rounded-lg ${c.value} ${color === c.value ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Navigation
const Nav = ({ currentPage, setPage, dark, setDark, isAdmin }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Products' },
    { id: 'essays', label: 'Essays' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: "Let's talk" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b ${dark ? 'bg-gray-900/95 border-gray-800' : 'bg-white/95 border-gray-100'} backdrop-blur-sm`}>
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <button onClick={() => setPage('home')} className={`text-lg font-medium tracking-tight ${dark ? 'text-white' : 'text-gray-900'}`}>
          Ardiland
        </button>
        
        <div className="hidden md:flex items-center gap-6">
          {links.map(link => (
            <button key={link.id} onClick={() => setPage(link.id)}
              className={`text-sm transition-colors ${currentPage === link.id ? (dark ? 'text-white' : 'text-gray-900') : (dark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900')}`}>
              {link.label}
            </button>
          ))}
          <button onClick={() => setDark(!dark)} className={`p-2 rounded-full ${dark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
            {dark ? <Sun size={18} className="text-gray-400" /> : <Moon size={18} className="text-gray-500" />}
          </button>
          {isAdmin && (
            <button onClick={() => setPage('admin')} className={`text-xs px-3 py-1 rounded-full ${dark ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>Admin</button>
          )}
        </div>

        <div className="flex md:hidden items-center gap-2">
          <button onClick={() => setDark(!dark)} className="p-2">
            {dark ? <Sun size={18} className="text-gray-400" /> : <Moon size={18} className="text-gray-500" />}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={20} className={dark ? 'text-white' : ''} /> : <Menu size={20} className={dark ? 'text-white' : ''} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className={`md:hidden border-b px-6 py-4 ${dark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
          {links.map(link => (
            <button key={link.id} onClick={() => { setPage(link.id); setMobileOpen(false); }}
              className={`block w-full text-left py-2 ${dark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

// Status Badge
const StatusBadge = ({ status, dark }) => {
  const styles = {
    live: dark ? 'bg-emerald-900/50 text-emerald-400' : 'bg-emerald-50 text-emerald-700',
    beta: dark ? 'bg-amber-900/50 text-amber-400' : 'bg-amber-50 text-amber-700',
    'in-progress': dark ? 'bg-blue-900/50 text-blue-400' : 'bg-blue-50 text-blue-700',
    experiment: dark ? 'bg-purple-900/50 text-purple-400' : 'bg-purple-50 text-purple-700',
  };
  const labels = { live: 'Live', beta: 'Beta', 'in-progress': 'In Progress', experiment: 'Experiment' };
  return <span className={`text-xs px-2 py-1 rounded-full font-medium ${styles[status]}`}>{labels[status]}</span>;
};

// Product Icon Display
const ProductIcon = ({ icon, name, dark }) => {
  const color = icon?.color || 'bg-blue-500';
  const initials = icon?.initials || name?.substring(0, 2).toUpperCase() || '??';
  return (
    <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center text-white font-medium text-sm`}>
      {initials}
    </div>
  );
};

// Product Card
const ProductCard = ({ product, onClick, dark }) => (
  <button onClick={onClick}
    className={`text-left p-6 border rounded-xl transition-all group ${dark ? 'border-gray-800 hover:border-gray-700 hover:bg-gray-800/50' : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'}`}>
    <div className={`h-32 rounded-lg mb-4 overflow-hidden ${dark ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <img src={product.image || sampleImage} alt={product.name} className="w-full h-full object-cover" />
    </div>
    <div className="flex items-start justify-between mb-3">
      <h3 className={`font-medium ${dark ? 'text-white' : 'text-gray-900'}`}>{product.name}</h3>
      <StatusBadge status={product.status} dark={dark} />
    </div>
    <p className={`text-sm mb-4 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>{product.description}</p>
    <span className={`text-sm flex items-center gap-1 ${dark ? 'text-gray-500 group-hover:text-gray-300' : 'text-gray-500 group-hover:text-gray-700'}`}>
      Learn more <ArrowRight size={14} />
    </span>
  </button>
);

// Essay Card
const EssayCard = ({ essay, onClick, dark }) => (
  <button onClick={onClick}
    className={`text-left py-6 border-b -mx-4 px-4 transition-colors group w-full ${dark ? 'border-gray-800 hover:bg-gray-800/50' : 'border-gray-100 hover:bg-gray-50'}`}>
    <h3 className={`font-medium mb-2 ${dark ? 'text-white group-hover:text-gray-300' : 'text-gray-900 group-hover:text-gray-700'}`}>{essay.title}</h3>
    <p className={`text-sm ${dark ? 'text-gray-500' : 'text-gray-500'}`}>{essay.summary}</p>
  </button>
);

// Image Slider
const ImageSlider = ({ images, dark }) => {
  const [current, setCurrent] = useState(0);
  const imgs = images && images.length > 0 ? images : [sampleImage];
  
  return (
    <div className="relative">
      <div className={`rounded-xl overflow-hidden border ${dark ? 'border-gray-800' : 'border-gray-200'}`}>
        <img src={imgs[current]} alt={`Screenshot ${current + 1}`} className="w-full aspect-video object-cover" />
      </div>
      {imgs.length > 1 && (
        <>
          <button onClick={() => setCurrent((current - 1 + imgs.length) % imgs.length)}
            className={`absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full ${dark ? 'bg-gray-900/80 hover:bg-gray-900' : 'bg-white/80 hover:bg-white'} shadow`}>
            <ChevronLeft size={20} className={dark ? 'text-white' : 'text-gray-700'} />
          </button>
          <button onClick={() => setCurrent((current + 1) % imgs.length)}
            className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full ${dark ? 'bg-gray-900/80 hover:bg-gray-900' : 'bg-white/80 hover:bg-white'} shadow`}>
            <ChevronRight size={20} className={dark ? 'text-white' : 'text-gray-700'} />
          </button>
          <div className="flex justify-center gap-2 mt-4">
            {imgs.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-colors ${i === current ? (dark ? 'bg-white' : 'bg-gray-900') : (dark ? 'bg-gray-700' : 'bg-gray-300')}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Home Page
const HomePage = ({ setPage, setSelectedProduct, setSelectedEssay, products, essays, dark }) => (
  <div className="pt-24 pb-16">
    <section className="max-w-5xl mx-auto px-6 py-20">
      <h1 className={`text-4xl md:text-5xl font-medium leading-tight mb-6 max-w-3xl ${dark ? 'text-white' : 'text-gray-900'}`}>
        Building systems and products — and the practices that enable others to build.
      </h1>
      <p className={`text-lg max-w-2xl mb-8 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
        Ardiland is an engineering studio that ships real products, designs serious systems, and shares what we learn along the way.
      </p>
      <div className="flex flex-wrap gap-4">
        <button onClick={() => setPage('contact')}
          className={`px-6 py-3 rounded-full flex items-center gap-2 transition-colors ${dark ? 'bg-white text-gray-900 hover:bg-gray-200' : 'bg-gray-900 text-white hover:bg-gray-800'}`}>
          Let's talk <ArrowRight size={16} />
        </button>
        <button onClick={() => setPage('products')}
          className={`border px-6 py-3 rounded-full transition-colors ${dark ? 'border-gray-700 text-gray-300 hover:border-gray-600' : 'border-gray-300 text-gray-700 hover:border-gray-400'}`}>
          See what we're building
        </button>
      </div>
    </section>

    <section className="max-w-5xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className={`text-2xl font-medium ${dark ? 'text-white' : 'text-gray-900'}`}>What we build</h2>
        <button onClick={() => setPage('products')} className={`text-sm flex items-center gap-1 ${dark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}>
          All products <ArrowRight size={14} />
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {products.slice(0, 4).map(p => (
          <ProductCard key={p.id} product={p} onClick={() => { setSelectedProduct(p); setPage('product-detail'); }} dark={dark} />
        ))}
      </div>
    </section>

    <section className="max-w-5xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className={`text-2xl font-medium ${dark ? 'text-white' : 'text-gray-900'}`}>How we think</h2>
        <button onClick={() => setPage('essays')} className={`text-sm flex items-center gap-1 ${dark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}>
          All essays <ArrowRight size={14} />
        </button>
      </div>
      <div className="max-w-2xl">
        {essays.slice(0, 3).map(e => (
          <EssayCard key={e.id} essay={e} onClick={() => { setSelectedEssay(e); setPage('essay-detail'); }} dark={dark} />
        ))}
      </div>
    </section>

    <section className="max-w-5xl mx-auto px-6 py-16">
      <div className={`rounded-2xl p-8 md:p-12 ${dark ? 'bg-gray-800/50 border border-gray-800' : 'bg-gray-50'}`}>
        <p className={`mb-4 text-sm uppercase tracking-wide ${dark ? 'text-gray-500' : 'text-gray-500'}`}>Behind Ardiland</p>
        <p className={`text-lg max-w-2xl mb-6 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
          Currently founder-led by Ardalan Ebrahimi, who spends his days as Head of Engineering at KMS Mobility Solutions — and builds Ardiland products in the space between.
        </p>
        <button onClick={() => setPage('about')} className={`flex items-center gap-1 text-sm ${dark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
          More about the founder <ArrowRight size={14} />
        </button>
      </div>
    </section>
  </div>
);

// Products Page
const ProductsPage = ({ setPage, setSelectedProduct, products, dark }) => (
  <div className="pt-24 pb-16">
    <section className="max-w-5xl mx-auto px-6 py-16">
      <h1 className={`text-3xl font-medium mb-4 ${dark ? 'text-white' : 'text-gray-900'}`}>Products</h1>
      <p className={`max-w-2xl mb-12 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
        Real products at different stages. Some are live, some in testing, some still taking shape. All are built with intent.
      </p>
      <div className="grid md:grid-cols-2 gap-4">
        {products.map(p => (
          <ProductCard key={p.id} product={p} onClick={() => { setSelectedProduct(p); setPage('product-detail'); }} dark={dark} />
        ))}
      </div>
    </section>
  </div>
);

// Product Detail Page
const ProductDetailPage = ({ product, setPage, dark }) => (
  <div className="pt-24 pb-16">
    <section className="max-w-4xl mx-auto px-6 py-16">
      <button onClick={() => setPage('products')} className={`text-sm mb-8 flex items-center gap-1 ${dark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}>
        ← Back to products
      </button>

      <div className="flex items-center gap-4 mb-6">
        <ProductIcon icon={product.icon} name={product.name} dark={dark} />
        <div>
          <div className="flex items-center gap-3">
            <h1 className={`text-3xl font-medium ${dark ? 'text-white' : 'text-gray-900'}`}>{product.name}</h1>
            <StatusBadge status={product.status} dark={dark} />
          </div>
          <p className={`mt-1 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>{product.description}</p>
        </div>
      </div>

      <div className="mb-12">
        <h2 className={`text-sm uppercase tracking-wide mb-4 ${dark ? 'text-gray-500' : 'text-gray-500'}`}>Screenshots</h2>
        <ImageSlider images={product.screenshots} dark={dark} />
      </div>

      {product.demoUrl && (
        <div className="mb-12">
          <h2 className={`text-sm uppercase tracking-wide mb-4 ${dark ? 'text-gray-500' : 'text-gray-500'}`}>Live Demo</h2>
          <div className={`rounded-xl overflow-hidden border ${dark ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-gray-50'}`}>
            <div className={`flex items-center gap-2 px-4 py-3 border-b ${dark ? 'border-gray-800' : 'border-gray-200'}`}>
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className={`text-xs ml-2 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>{product.demoUrl}</span>
            </div>
            <div className="aspect-video flex items-center justify-center">
              <div className={`text-center ${dark ? 'text-gray-600' : 'text-gray-400'}`}>
                <Play size={48} className="mx-auto mb-2" />
                <p className="text-sm">Demo preview</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4 mb-12">
        <div className={`p-6 rounded-xl ${dark ? 'bg-gray-800/50 border border-gray-800' : 'bg-gray-50'}`}>
          <h2 className={`text-sm uppercase tracking-wide mb-3 ${dark ? 'text-gray-500' : 'text-gray-500'}`}>Why it exists</h2>
          <p className={dark ? 'text-gray-300' : 'text-gray-700'}>{product.why}</p>
        </div>
        <div className={`p-6 rounded-xl ${dark ? 'bg-gray-800/50 border border-gray-800' : 'bg-gray-50'}`}>
          <h2 className={`text-sm uppercase tracking-wide mb-3 ${dark ? 'text-gray-500' : 'text-gray-500'}`}>The problem</h2>
          <p className={dark ? 'text-gray-300' : 'text-gray-700'}>{product.problem}</p>
        </div>
        <div className={`p-6 rounded-xl ${dark ? 'bg-gray-800/50 border border-gray-800' : 'bg-gray-50'}`}>
          <h2 className={`text-sm uppercase tracking-wide mb-3 ${dark ? 'text-gray-500' : 'text-gray-500'}`}>Current state</h2>
          <p className={dark ? 'text-gray-300' : 'text-gray-700'}>{product.currentState}</p>
        </div>
        <div className={`p-6 rounded-xl ${dark ? 'bg-gray-800/50 border border-gray-800' : 'bg-gray-50'}`}>
          <h2 className={`text-sm uppercase tracking-wide mb-3 ${dark ? 'text-gray-500' : 'text-gray-500'}`}>What's next</h2>
          <p className={dark ? 'text-gray-300' : 'text-gray-700'}>{product.next}</p>
        </div>
      </div>

      {product.techStack && (
        <div className="mb-12">
          <h2 className={`text-sm uppercase tracking-wide mb-4 ${dark ? 'text-gray-500' : 'text-gray-500'}`}>Built with</h2>
          <div className="flex flex-wrap gap-2">
            {product.techStack.map((tech, i) => (
              <span key={i} className={`px-3 py-1 rounded-full text-sm ${dark ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>{tech}</span>
            ))}
          </div>
        </div>
      )}

      <div className={`flex flex-wrap gap-4 pt-8 border-t ${dark ? 'border-gray-800' : 'border-gray-100'}`}>
        {product.cta && (
          <button className={`px-6 py-3 rounded-full flex items-center gap-2 ${dark ? 'bg-white text-gray-900 hover:bg-gray-200' : 'bg-gray-900 text-white hover:bg-gray-800'}`}>
            {product.cta} <ExternalLink size={16} />
          </button>
        )}
        {product.github && (
          <a href="#" className={`border px-6 py-3 rounded-full flex items-center gap-2 ${dark ? 'border-gray-700 text-gray-300 hover:border-gray-600' : 'border-gray-300 text-gray-700 hover:border-gray-400'}`}>
            <Github size={16} /> View source
          </a>
        )}
      </div>
    </section>
  </div>
);

// Essays Page
const EssaysPage = ({ setPage, setSelectedEssay, essays, dark }) => (
  <div className="pt-24 pb-16">
    <section className="max-w-3xl mx-auto px-6 py-16">
      <h1 className={`text-3xl font-medium mb-4 ${dark ? 'text-white' : 'text-gray-900'}`}>Essays</h1>
      <p className={`max-w-2xl mb-12 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
        Positions on software engineering, not tutorials. Concepts that hold up over time, distilled from years of building.
      </p>
      <div>
        {essays.map(e => <EssayCard key={e.id} essay={e} onClick={() => { setSelectedEssay(e); setPage('essay-detail'); }} dark={dark} />)}
      </div>
    </section>
  </div>
);

// Essay Detail
const EssayDetailPage = ({ essay, setPage, dark }) => (
  <div className="pt-24 pb-16">
    <article className="max-w-3xl mx-auto px-6 py-16">
      <button onClick={() => setPage('essays')} className={`text-sm mb-8 flex items-center gap-1 ${dark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}>
        ← Back to essays
      </button>
      <h1 className={`text-3xl font-medium mb-6 ${dark ? 'text-white' : 'text-gray-900'}`}>{essay.title}</h1>
      <p className={`text-lg mb-8 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>{essay.summary}</p>
      <div className={`prose prose-lg max-w-none ${dark ? 'prose-invert' : ''}`} dangerouslySetInnerHTML={{ __html: essay.content }} />
    </article>
  </div>
);

// About Page
const AboutPage = ({ setPage, dark }) => (
  <div className="pt-24 pb-16">
    <section className="max-w-3xl mx-auto px-6 py-16">
      <h1 className={`text-3xl font-medium mb-8 ${dark ? 'text-white' : 'text-gray-900'}`}>About</h1>
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className={`w-32 h-32 rounded-full flex-shrink-0 overflow-hidden ${dark ? 'bg-gray-800' : 'bg-gray-200'}`}>
          <img src={sampleImage} alt="Ardalan Ebrahimi" className="w-full h-full object-cover" />
        </div>
        <div>
          <h2 className={`text-xl font-medium mb-2 ${dark ? 'text-white' : 'text-gray-900'}`}>Ardalan Ebrahimi</h2>
          <p className={`mb-4 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>Founder, Ardiland</p>
          <p className={`text-sm ${dark ? 'text-gray-500' : 'text-gray-500'}`}>Currently Head of Engineering at KMS Mobility Solutions GmbH</p>
        </div>
      </div>
      <div className={`space-y-6 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
        <p>I build systems — the kind that power real businesses and the kind that help teams work better. At KMS, I lead engineering for vehicle and fleet management technology. At Ardiland, I build products and share what I've learned.</p>
        <p>My work sits at the intersection of architecture, product thinking, and enabling teams. I care about clean systems, clear thinking, and building things that last longer than the next hype cycle.</p>
        <p>Beyond building, I'm passionate about giving back to the community. I create educational content on software engineering — covering architecture patterns, development practices, and lessons from production systems. This is part of a broader commitment to coaching and enablement, helping other engineers and teams grow their capabilities and ship better software.</p>
        <p>Ardiland is where the building happens outside of day-job hours. Some of it ships. Some of it teaches. All of it is real work, done in the open.</p>
      </div>
      <div className={`mt-12 pt-8 border-t ${dark ? 'border-gray-800' : 'border-gray-100'}`}>
        <button onClick={() => setPage('contact')} className={`flex items-center gap-1 ${dark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
          Want to work together? Let's talk <ArrowRight size={16} />
        </button>
      </div>
    </section>
  </div>
);

// Contact Page
const ContactPage = ({ dark }) => (
  <div className="pt-24 pb-16">
    <section className="max-w-3xl mx-auto px-6 py-16">
      <h1 className={`text-3xl font-medium mb-4 ${dark ? 'text-white' : 'text-gray-900'}`}>Let's talk</h1>
      <p className={`max-w-xl mb-12 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
        Whether it's about a product, a potential collaboration, or just an interesting engineering problem — I'm happy to have a conversation.
      </p>
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <a href="#" className={`p-6 border rounded-xl transition-all group ${dark ? 'border-gray-800 hover:border-gray-700' : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'}`}>
          <Calendar className={`mb-4 ${dark ? 'text-gray-600' : 'text-gray-400'}`} size={24} />
          <h3 className={`font-medium mb-2 ${dark ? 'text-white' : 'text-gray-900'}`}>Book a call</h3>
          <p className={`text-sm ${dark ? 'text-gray-500' : 'text-gray-500'}`}>30 minutes to explore what's possible</p>
        </a>
        <a href="#" className={`p-6 border rounded-xl transition-all group ${dark ? 'border-gray-800 hover:border-gray-700' : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'}`}>
          <Mail className={`mb-4 ${dark ? 'text-gray-600' : 'text-gray-400'}`} size={24} />
          <h3 className={`font-medium mb-2 ${dark ? 'text-white' : 'text-gray-900'}`}>Send an email</h3>
          <p className={`text-sm ${dark ? 'text-gray-500' : 'text-gray-500'}`}>hello@ardiland.com</p>
        </a>
      </div>
      <p className={`text-sm ${dark ? 'text-gray-600' : 'text-gray-500'}`}>No sales pitches. No service packages. Just a conversation to see if there's something worth building together.</p>
    </section>
  </div>
);

// Product Edit Dialog
const ProductDialog = ({ product, onSave, onClose, dark }) => {
  const [form, setForm] = useState(product || {
    name: '', description: '', status: 'in-progress', why: '', problem: '', currentState: '', next: '', cta: '', techStack: [], image: '', screenshots: [], icon: { initials: '', color: 'bg-blue-500' }
  });

  const addScreenshot = (url) => {
    if (url) setForm({ ...form, screenshots: [...(form.screenshots || []), url] });
  };

  const removeScreenshot = (index) => {
    setForm({ ...form, screenshots: form.screenshots.filter((_, i) => i !== index) });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
      <div className={`w-full max-w-4xl my-8 rounded-2xl ${dark ? 'bg-gray-900' : 'bg-white'} shadow-2xl`}>
        <div className={`flex items-center justify-between p-6 border-b ${dark ? 'border-gray-800' : 'border-gray-200'}`}>
          <h2 className={`text-xl font-medium ${dark ? 'text-white' : 'text-gray-900'}`}>
            {product?.id ? 'Edit Product' : 'Add Product'}
          </h2>
          <button onClick={onClose} className={`p-2 rounded-lg ${dark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
            <X size={20} className={dark ? 'text-gray-400' : 'text-gray-500'} />
          </button>
        </div>
        
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-5">
              <div>
                <label className={`block text-sm font-medium mb-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Product Name</label>
                <input value={form.name || ''} onChange={e => setForm({...form, name: e.target.value})}
                  placeholder="e.g., Luma"
                  className={`w-full px-4 py-3 rounded-lg border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`} />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Short Description</label>
                <input value={form.description || ''} onChange={e => setForm({...form, description: e.target.value})}
                  placeholder="One line description"
                  className={`w-full px-4 py-3 rounded-lg border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`} />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Status</label>
                <select value={form.status || 'in-progress'} onChange={e => setForm({...form, status: e.target.value})}
                  className={`w-full px-4 py-3 rounded-lg border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}>
                  <option value="live">Live</option>
                  <option value="beta">Beta</option>
                  <option value="in-progress">In Progress</option>
                  <option value="experiment">Experiment</option>
                </select>
              </div>

              <IconSelector value={form.icon} onChange={(icon) => setForm({...form, icon})} dark={dark} />
              
              <ImageUpload label="Cover Image" value={form.image} onChange={(img) => setForm({...form, image: img})} dark={dark} />
            </div>

            {/* Right Column */}
            <div className="space-y-5">
              <div>
                <label className={`block text-sm font-medium mb-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Why it exists</label>
                <textarea value={form.why || ''} onChange={e => setForm({...form, why: e.target.value})} rows={2}
                  className={`w-full px-4 py-3 rounded-lg border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`} />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>The problem</label>
                <textarea value={form.problem || ''} onChange={e => setForm({...form, problem: e.target.value})} rows={2}
                  className={`w-full px-4 py-3 rounded-lg border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`} />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Current state</label>
                <textarea value={form.currentState || ''} onChange={e => setForm({...form, currentState: e.target.value})} rows={2}
                  className={`w-full px-4 py-3 rounded-lg border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`} />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>What's next</label>
                <textarea value={form.next || ''} onChange={e => setForm({...form, next: e.target.value})} rows={2}
                  className={`w-full px-4 py-3 rounded-lg border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>CTA Label</label>
                  <input value={form.cta || ''} onChange={e => setForm({...form, cta: e.target.value})} placeholder="Try it"
                    className={`w-full px-4 py-3 rounded-lg border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`} />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Tech Stack</label>
                  <input value={(form.techStack || []).join(', ')} onChange={e => setForm({...form, techStack: e.target.value.split(',').map(s => s.trim()).filter(Boolean)})}
                    placeholder="Angular, Node.js"
                    className={`w-full px-4 py-3 rounded-lg border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`} />
                </div>
              </div>
            </div>
          </div>

          {/* Screenshots Section */}
          <div className="mt-6">
            <label className={`block text-sm font-medium mb-3 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Screenshots</label>
            <div className="grid grid-cols-3 gap-4">
              {(form.screenshots || []).map((img, i) => (
                <div key={i} className="relative aspect-video rounded-lg overflow-hidden">
                  <img src={img} className="w-full h-full object-cover" />
                  <button onClick={() => removeScreenshot(i)}
                    className="absolute top-1 right-1 p-1 rounded-full bg-red-500 text-white hover:bg-red-600">
                    <X size={12} />
                  </button>
                </div>
              ))}
              <label className={`aspect-video rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer ${dark ? 'border-gray-700 hover:border-gray-600' : 'border-gray-300 hover:border-gray-400'}`}>
                <Plus size={20} className={dark ? 'text-gray-500' : 'text-gray-400'} />
                <span className={`text-xs mt-1 ${dark ? 'text-gray-500' : 'text-gray-500'}`}>Add</span>
                <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (ev) => addScreenshot(ev.target?.result);
                    reader.readAsDataURL(file);
                  }
                }} />
              </label>
            </div>
          </div>
        </div>

        <div className={`flex justify-end gap-3 p-6 border-t ${dark ? 'border-gray-800' : 'border-gray-200'}`}>
          <button onClick={onClose} className={`px-5 py-2.5 rounded-lg ${dark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
            Cancel
          </button>
          <button onClick={() => onSave(form)}
            className={`px-5 py-2.5 rounded-lg flex items-center gap-2 ${dark ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'}`}>
            <Save size={16} /> Save Product
          </button>
        </div>
      </div>
    </div>
  );
};

// Essay Edit Dialog
const EssayDialog = ({ essay, onSave, onClose, dark }) => {
  const [form, setForm] = useState(essay || { title: '', summary: '', content: '' });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className={`w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl ${dark ? 'bg-gray-900' : 'bg-white'} shadow-2xl`}>
        <div className={`flex items-center justify-between p-6 border-b ${dark ? 'border-gray-800' : 'border-gray-200'}`}>
          <h2 className={`text-xl font-medium ${dark ? 'text-white' : 'text-gray-900'}`}>
            {essay?.id ? 'Edit Essay' : 'Add Essay'}
          </h2>
          <button onClick={onClose} className={`p-2 rounded-lg ${dark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
            <X size={20} className={dark ? 'text-gray-400' : 'text-gray-500'} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          <div>
            <label className={`block text-sm font-medium mb-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Title</label>
            <input value={form.title || ''} onChange={e => setForm({...form, title: e.target.value})}
              placeholder="Essay title"
              className={`w-full px-4 py-3 rounded-lg border text-lg ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`} />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Summary</label>
            <input value={form.summary || ''} onChange={e => setForm({...form, summary: e.target.value})}
              placeholder="Brief summary for listings"
              className={`w-full px-4 py-3 rounded-lg border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`} />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Content</label>
            <RichTextEditor value={form.content || ''} onChange={(content) => setForm({...form, content})} dark={dark} />
          </div>
        </div>

        <div className={`flex justify-end gap-3 p-6 border-t ${dark ? 'border-gray-800' : 'border-gray-200'}`}>
          <button onClick={onClose} className={`px-5 py-2.5 rounded-lg ${dark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
            Cancel
          </button>
          <button onClick={() => onSave(form)}
            className={`px-5 py-2.5 rounded-lg flex items-center gap-2 ${dark ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'}`}>
            <Save size={16} /> Save Essay
          </button>
        </div>
      </div>
    </div>
  );
};

// Admin Panel
const AdminPanel = ({ dark, products, setProducts, essays, setEssays }) => {
  const [tab, setTab] = useState('products');
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingEssay, setEditingEssay] = useState(null);

  const saveProduct = (form) => {
    if (form.id) {
      setProducts(products.map(p => p.id === form.id ? form : p));
    } else {
      setProducts([...products, { ...form, id: Date.now(), github: true }]);
    }
    setEditingProduct(null);
  };

  const saveEssay = (form) => {
    if (form.id) {
      setEssays(essays.map(e => e.id === form.id ? form : e));
    } else {
      setEssays([...essays, { ...form, id: Date.now() }]);
    }
    setEditingEssay(null);
  };

  const tabs = [
    { id: 'products', label: 'Products', icon: Package, count: products.length },
    { id: 'essays', label: 'Essays', icon: FileText, count: essays.length },
    { id: 'messages', label: 'Messages', icon: MessageSquare, count: 0 },
  ];

  return (
    <div className="pt-24 pb-16">
      <section className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className={`text-2xl font-medium ${dark ? 'text-white' : 'text-gray-900'}`}>Admin</h1>
          <button className={`flex items-center gap-2 text-sm ${dark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}>
            <LogOut size={16} /> Sign out
          </button>
        </div>

        <div className={`flex gap-1 p-1 rounded-lg mb-8 ${dark ? 'bg-gray-800' : 'bg-gray-100'}`}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm transition-colors ${tab === t.id 
                ? (dark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900 shadow-sm') 
                : (dark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900')}`}>
              <t.icon size={16} />
              {t.label}
              <span className={`text-xs px-1.5 py-0.5 rounded ${dark ? 'bg-gray-600' : 'bg-gray-200'}`}>{t.count}</span>
            </button>
          ))}
        </div>

        {editingProduct !== null && (
          <ProductDialog product={editingProduct || undefined} onSave={saveProduct} onClose={() => setEditingProduct(null)} dark={dark} />
        )}

        {editingEssay !== null && (
          <EssayDialog essay={editingEssay || undefined} onSave={saveEssay} onClose={() => setEditingEssay(null)} dark={dark} />
        )}

        {tab === 'products' && (
          <div>
            <div className="flex justify-end mb-6">
              <button onClick={() => setEditingProduct({})}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${dark ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'}`}>
                <Plus size={16} /> Add product
              </button>
            </div>
            <div className={`border rounded-xl overflow-hidden ${dark ? 'border-gray-800' : 'border-gray-200'}`}>
              {products.map((p, i) => (
                <div key={p.id} className={`flex items-center justify-between p-4 ${i !== products.length - 1 ? `border-b ${dark ? 'border-gray-800' : 'border-gray-200'}` : ''}`}>
                  <div className="flex items-center gap-4">
                    <ProductIcon icon={p.icon} name={p.name} dark={dark} />
                    <div>
                      <p className={`font-medium ${dark ? 'text-white' : 'text-gray-900'}`}>{p.name}</p>
                      <p className={`text-sm ${dark ? 'text-gray-500' : 'text-gray-500'}`}>{p.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={p.status} dark={dark} />
                    <button onClick={() => setEditingProduct(p)} className={`p-2 rounded ${dark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                      <Edit size={16} className={dark ? 'text-gray-500' : 'text-gray-400'} />
                    </button>
                    <button onClick={() => setProducts(products.filter(x => x.id !== p.id))} className={`p-2 rounded ${dark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                      <Trash2 size={16} className={dark ? 'text-gray-500' : 'text-gray-400'} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'essays' && (
          <div>
            <div className="flex justify-end mb-6">
              <button onClick={() => setEditingEssay({})}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${dark ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'}`}>
                <Plus size={16} /> Add essay
              </button>
            </div>
            <div className={`border rounded-xl overflow-hidden ${dark ? 'border-gray-800' : 'border-gray-200'}`}>
              {essays.map((e, i) => (
                <div key={e.id} className={`flex items-center justify-between p-4 ${i !== essays.length - 1 ? `border-b ${dark ? 'border-gray-800' : 'border-gray-200'}` : ''}`}>
                  <div>
                    <p className={`font-medium ${dark ? 'text-white' : 'text-gray-900'}`}>{e.title}</p>
                    <p className={`text-sm ${dark ? 'text-gray-500' : 'text-gray-500'}`}>{e.summary?.substring(0, 60)}...</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setEditingEssay(e)} className={`p-2 rounded ${dark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                      <Edit size={16} className={dark ? 'text-gray-500' : 'text-gray-400'} />
                    </button>
                    <button onClick={() => setEssays(essays.filter(x => x.id !== e.id))} className={`p-2 rounded ${dark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                      <Trash2 size={16} className={dark ? 'text-gray-500' : 'text-gray-400'} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'messages' && (
          <div className={`text-center py-12 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
            <Mail size={48} className="mx-auto mb-4 opacity-50" />
            <p>No messages yet</p>
            <p className="text-sm">Contact form submissions will appear here</p>
          </div>
        )}
      </section>
    </div>
  );
};

// Main App
export default function App() {
  const [dark, setDark] = useDarkMode();
  const [page, setPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedEssay, setSelectedEssay] = useState(null);
  const isAdmin = true;

  const [products, setProducts] = useState([
    { id: 1, name: 'Luma', description: 'An AI learning companion with organic, conversation-driven learning paths.', status: 'beta', why: 'Learning should feel like discovery, not a checklist.', problem: 'Traditional learning platforms are rigid.', currentState: 'Functional prototype with core conversation engine.', next: 'Expanding domain coverage.', cta: 'Try Luma', github: true, screenshots: [sampleImage, sampleImage, sampleImage], techStack: ['Angular', 'Node.js', 'OpenAI', 'PostgreSQL'], image: sampleImage, icon: { initials: 'LU', color: 'bg-blue-500' } },
    { id: 2, name: '4:33', description: 'An audio-only social platform inspired by the space between sounds.', status: 'experiment', why: 'Social platforms are noisy.', problem: 'Visual social media optimizes for engagement, not connection.', currentState: 'Concept validated.', next: 'Exploring the right format.', cta: 'Follow', github: true, screenshots: [sampleImage], techStack: ['WebRTC', 'Node.js', 'Redis'], image: sampleImage, icon: { initials: '4:', color: 'bg-purple-500' } },
    { id: 3, name: 'Agentic Commerce', description: 'Voice-first AI interfaces for e-commerce.', status: 'in-progress', why: 'What happens when shopping becomes a conversation?', problem: 'E-commerce is still built around catalogs and carts.', currentState: 'Prototyping conversational flows.', next: 'Testing with real product data.', cta: 'Learn more', github: true, demoUrl: 'https://demo.ardiland.com', screenshots: [sampleImage, sampleImage], techStack: ['Angular', 'Claude API', 'Stripe'], image: sampleImage, icon: { initials: 'AG', color: 'bg-emerald-500' } },
    { id: 4, name: 'Multi-Agent Orchestrator', description: 'Parallel execution for specialized AI agents.', status: 'live', why: 'Complex tasks benefit from specialized agents.', problem: 'Single-agent systems hit limits.', currentState: 'Running in production.', next: 'Documenting patterns.', cta: 'View docs', github: true, screenshots: [sampleImage, sampleImage, sampleImage], techStack: ['TypeScript', 'Claude API', 'Node.js'], image: sampleImage, icon: { initials: 'MU', color: 'bg-amber-500' } },
  ]);

  const [essays, setEssays] = useState([
    { id: 1, title: 'Autonomous agents vs pair-programming agents', summary: 'Two models for AI-assisted development.', content: '<p>The conversation around AI in development often collapses two very different models into one.</p><p>There are <strong>autonomous agents</strong> — systems designed to complete tasks independently — and <strong>pair-programming agents</strong> — systems designed to think alongside you.</p><p>The autonomous model optimizes for output. Give it a task, get a result. The pair-programming model optimizes for understanding.</p>' },
    { id: 2, title: 'The inner loop of agentic development', summary: 'Where the real work happens in AI-assisted coding.', content: '<p>When you work with an AI coding assistant, there\'s a rhythm that emerges. You describe intent. The agent proposes. You evaluate. You adjust. This is the inner loop.</p><p>Most tools focus on the proposal step — making the AI\'s output better. But the quality of the loop depends on every step.</p>' },
    { id: 3, title: 'Clean code in the age of LLMs', summary: 'Does clean code still matter when AI can read anything?', content: '<p>A common argument: if AI can understand messy code, why bother keeping it clean?</p><p>This misses the point. Clean code was never just about readability. It\'s about expressing intent, managing complexity, and enabling change.</p>' },
    { id: 4, title: 'Design patterns after AI', summary: 'Which patterns survive the shift to AI-assisted development?', content: '<p>Design patterns emerged to solve recurring problems in ways that could be communicated and reused.</p><p>AI changes some constraints. Boilerplate is cheap. Transformation is trivial. But complexity management remains hard.</p>' },
    { id: 5, title: 'Building systems that enable teams', summary: 'Technical architecture is team architecture.', content: '<p>Every architectural decision is also an organizational decision.</p><p>A monolith centralizes knowledge. Microservices distribute it. Event-driven systems enable independence.</p>' },
  ]);

  const renderPage = () => {
    switch (page) {
      case 'home': return <HomePage setPage={setPage} setSelectedProduct={setSelectedProduct} setSelectedEssay={setSelectedEssay} products={products} essays={essays} dark={dark} />;
      case 'products': return <ProductsPage setPage={setPage} setSelectedProduct={setSelectedProduct} products={products} dark={dark} />;
      case 'product-detail': return selectedProduct ? <ProductDetailPage product={products.find(p => p.id === selectedProduct.id) || selectedProduct} setPage={setPage} dark={dark} /> : null;
      case 'essays': return <EssaysPage setPage={setPage} setSelectedEssay={setSelectedEssay} essays={essays} dark={dark} />;
      case 'essay-detail': return selectedEssay ? <EssayDetailPage essay={essays.find(e => e.id === selectedEssay.id) || selectedEssay} setPage={setPage} dark={dark} /> : null;
      case 'about': return <AboutPage setPage={setPage} dark={dark} />;
      case 'contact': return <ContactPage dark={dark} />;
      case 'admin': return <AdminPanel dark={dark} products={products} setProducts={setProducts} essays={essays} setEssays={setEssays} />;
      default: return <HomePage setPage={setPage} setSelectedProduct={setSelectedProduct} setSelectedEssay={setSelectedEssay} products={products} essays={essays} dark={dark} />;
    }
  };

  return (
    <div className={`min-h-screen antialiased ${dark ? 'bg-gray-950 text-gray-100' : 'bg-white text-gray-900'}`}>
      <Nav currentPage={page} setPage={setPage} dark={dark} setDark={setDark} isAdmin={isAdmin} />
      {renderPage()}
      <footer className={`border-t py-8 ${dark ? 'border-gray-800' : 'border-gray-100'}`}>
        <div className={`max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm ${dark ? 'text-gray-500' : 'text-gray-500'}`}>
          <p>© 2025 Ardiland. Building in the open.</p>
          <div className="flex gap-6">
            <a href="#" className={dark ? 'hover:text-gray-300' : 'hover:text-gray-700'}>GitHub</a>
            <a href="#" className={dark ? 'hover:text-gray-300' : 'hover:text-gray-700'}>YouTube</a>
            <a href="#" className={dark ? 'hover:text-gray-300' : 'hover:text-gray-700'}>LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
