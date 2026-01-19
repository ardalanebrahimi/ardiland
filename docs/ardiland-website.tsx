import { useState } from 'react';
import { ArrowRight, Github, ExternalLink, Mail, Calendar, Menu, X } from 'lucide-react';

// Navigation Component
const Nav = ({ currentPage, setPage }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Products' },
    { id: 'essays', label: 'Thinking' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: "Let's talk" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-b border-gray-100 z-50">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <button onClick={() => setPage('home')} className="text-lg font-medium tracking-tight text-gray-900">
          Ardiland
        </button>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <button
              key={link.id}
              onClick={() => setPage(link.id)}
              className={`text-sm transition-colors ${
                currentPage === link.id 
                  ? 'text-gray-900' 
                  : 'text-gray-500 hover:text-gray-900'
              } ${link.id === 'contact' ? 'bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-800' : ''}`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-6 py-4">
          {links.map(link => (
            <button
              key={link.id}
              onClick={() => { setPage(link.id); setMobileOpen(false); }}
              className="block w-full text-left py-2 text-gray-600 hover:text-gray-900"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

// Status Badge
const StatusBadge = ({ status }) => {
  const styles = {
    live: 'bg-emerald-50 text-emerald-700',
    beta: 'bg-amber-50 text-amber-700',
    'in-progress': 'bg-blue-50 text-blue-700',
    experiment: 'bg-purple-50 text-purple-700',
  };
  const labels = {
    live: 'Live',
    beta: 'Beta',
    'in-progress': 'In Progress',
    experiment: 'Experiment',
  };
  return (
    <span className={`text-xs px-2 py-1 rounded-full font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  );
};

// Product Card
const ProductCard = ({ product, onClick }) => (
  <button
    onClick={onClick}
    className="text-left p-6 border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all group"
  >
    <div className="flex items-start justify-between mb-3">
      <h3 className="font-medium text-gray-900 group-hover:text-gray-700">{product.name}</h3>
      <StatusBadge status={product.status} />
    </div>
    <p className="text-sm text-gray-600 mb-4">{product.description}</p>
    <span className="text-sm text-gray-500 group-hover:text-gray-700 flex items-center gap-1">
      Learn more <ArrowRight size={14} />
    </span>
  </button>
);

// Essay Card
const EssayCard = ({ essay, onClick }) => (
  <button
    onClick={onClick}
    className="text-left py-6 border-b border-gray-100 hover:bg-gray-50 -mx-4 px-4 transition-colors group"
  >
    <h3 className="font-medium text-gray-900 mb-2 group-hover:text-gray-700">{essay.title}</h3>
    <p className="text-sm text-gray-500">{essay.summary}</p>
  </button>
);

// Pages
const HomePage = ({ setPage, setSelectedProduct, setSelectedEssay, products, essays }) => (
  <div className="pt-24 pb-16">
    {/* Hero */}
    <section className="max-w-5xl mx-auto px-6 py-20">
      <h1 className="text-4xl md:text-5xl font-medium text-gray-900 leading-tight mb-6 max-w-3xl">
        Building systems and products — and the practices that enable others to build.
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mb-8">
        Ardiland is an engineering studio that ships real products, designs serious systems, and shares what we learn along the way.
      </p>
      <div className="flex flex-wrap gap-4">
        <button 
          onClick={() => setPage('contact')}
          className="bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors flex items-center gap-2"
        >
          Let's talk <ArrowRight size={16} />
        </button>
        <button 
          onClick={() => setPage('products')}
          className="border border-gray-300 px-6 py-3 rounded-full hover:border-gray-400 transition-colors text-gray-700"
        >
          See what we're building
        </button>
      </div>
    </section>

    {/* Products Preview */}
    <section className="max-w-5xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-medium text-gray-900">What we build</h2>
        <button onClick={() => setPage('products')} className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
          All products <ArrowRight size={14} />
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {products.slice(0, 4).map(p => (
          <ProductCard key={p.id} product={p} onClick={() => { setSelectedProduct(p); setPage('product-detail'); }} />
        ))}
      </div>
    </section>

    {/* Essays Preview */}
    <section className="max-w-5xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-medium text-gray-900">How we think</h2>
        <button onClick={() => setPage('essays')} className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
          All essays <ArrowRight size={14} />
        </button>
      </div>
      <div className="max-w-2xl">
        {essays.slice(0, 3).map(e => (
          <EssayCard key={e.id} essay={e} onClick={() => { setSelectedEssay(e); setPage('essay-detail'); }} />
        ))}
      </div>
    </section>

    {/* Founder Context */}
    <section className="max-w-5xl mx-auto px-6 py-16">
      <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
        <p className="text-gray-600 mb-4 text-sm uppercase tracking-wide">Behind Ardiland</p>
        <p className="text-lg text-gray-700 max-w-2xl mb-6">
          Currently founder-led by Ardalan Ebrahimi, who spends his days as Head of Engineering at KMS Mobility Solutions — and builds Ardiland products in the space between.
        </p>
        <button onClick={() => setPage('about')} className="text-gray-600 hover:text-gray-900 flex items-center gap-1 text-sm">
          More about the founder <ArrowRight size={14} />
        </button>
      </div>
    </section>
  </div>
);

const ProductsPage = ({ setPage, setSelectedProduct, products }) => (
  <div className="pt-24 pb-16">
    <section className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-medium text-gray-900 mb-4">Products</h1>
      <p className="text-gray-600 max-w-2xl mb-12">
        Real products at different stages. Some are live, some in testing, some still taking shape. All are built with intent.
      </p>
      <div className="grid md:grid-cols-2 gap-4">
        {products.map(p => (
          <ProductCard key={p.id} product={p} onClick={() => { setSelectedProduct(p); setPage('product-detail'); }} />
        ))}
      </div>
    </section>
  </div>
);

const ProductDetailPage = ({ product, setPage }) => (
  <div className="pt-24 pb-16">
    <section className="max-w-3xl mx-auto px-6 py-16">
      <button onClick={() => setPage('products')} className="text-sm text-gray-500 hover:text-gray-700 mb-8 flex items-center gap-1">
        ← Back to products
      </button>
      <div className="flex items-start gap-4 mb-6">
        <h1 className="text-3xl font-medium text-gray-900">{product.name}</h1>
        <StatusBadge status={product.status} />
      </div>
      <p className="text-lg text-gray-600 mb-8">{product.description}</p>
      
      <div className="space-y-8">
        <div>
          <h2 className="text-sm uppercase tracking-wide text-gray-500 mb-2">Why it exists</h2>
          <p className="text-gray-700">{product.why}</p>
        </div>
        <div>
          <h2 className="text-sm uppercase tracking-wide text-gray-500 mb-2">The problem</h2>
          <p className="text-gray-700">{product.problem}</p>
        </div>
        <div>
          <h2 className="text-sm uppercase tracking-wide text-gray-500 mb-2">Current state</h2>
          <p className="text-gray-700">{product.currentState}</p>
        </div>
        <div>
          <h2 className="text-sm uppercase tracking-wide text-gray-500 mb-2">What's next</h2>
          <p className="text-gray-700">{product.next}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mt-12 pt-8 border-t border-gray-100">
        {product.cta && (
          <button className="bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors flex items-center gap-2">
            {product.cta} <ExternalLink size={16} />
          </button>
        )}
        {product.github && (
          <a href="#" className="border border-gray-300 px-6 py-3 rounded-full hover:border-gray-400 transition-colors text-gray-700 flex items-center gap-2">
            <Github size={16} /> View source
          </a>
        )}
      </div>
    </section>
  </div>
);

const EssaysPage = ({ setPage, setSelectedEssay, essays }) => (
  <div className="pt-24 pb-16">
    <section className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-medium text-gray-900 mb-4">Thinking</h1>
      <p className="text-gray-600 max-w-2xl mb-12">
        Positions on software engineering, not tutorials. Concepts that hold up over time, distilled from years of building.
      </p>
      <div>
        {essays.map(e => (
          <EssayCard key={e.id} essay={e} onClick={() => { setSelectedEssay(e); setPage('essay-detail'); }} />
        ))}
      </div>
    </section>
  </div>
);

const EssayDetailPage = ({ essay, setPage }) => (
  <div className="pt-24 pb-16">
    <article className="max-w-3xl mx-auto px-6 py-16">
      <button onClick={() => setPage('essays')} className="text-sm text-gray-500 hover:text-gray-700 mb-8 flex items-center gap-1">
        ← Back to essays
      </button>
      <h1 className="text-3xl font-medium text-gray-900 mb-6">{essay.title}</h1>
      <div className="prose prose-gray max-w-none">
        <p className="text-lg text-gray-600 mb-8">{essay.summary}</p>
        <div className="text-gray-700 space-y-4">
          {essay.content.split('\n\n').map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </article>
  </div>
);

const AboutPage = ({ setPage }) => (
  <div className="pt-24 pb-16">
    <section className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-medium text-gray-900 mb-8">About</h1>
      
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="w-32 h-32 bg-gray-200 rounded-full flex-shrink-0" />
        <div>
          <h2 className="text-xl font-medium text-gray-900 mb-2">Ardalan Ebrahimi</h2>
          <p className="text-gray-600 mb-4">Founder, Ardiland</p>
          <p className="text-gray-500 text-sm">Currently Head of Engineering at KMS Mobility Solutions GmbH</p>
        </div>
      </div>

      <div className="space-y-6 text-gray-700">
        <p>
          I build systems — the kind that power real businesses and the kind that help teams work better. At KMS, I lead engineering for vehicle and fleet management technology. At Ardiland, I build products and share what I've learned.
        </p>
        <p>
          My work sits at the intersection of architecture, product thinking, and enabling teams. I care about clean systems, clear thinking, and building things that last longer than the next hype cycle.
        </p>
        <p>
          Ardiland is where the building happens outside of day-job hours. Some of it ships. Some of it teaches. All of it is real work, done in the open.
        </p>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-100">
        <button 
          onClick={() => setPage('contact')}
          className="text-gray-600 hover:text-gray-900 flex items-center gap-1"
        >
          Want to work together? Let's talk <ArrowRight size={16} />
        </button>
      </div>
    </section>
  </div>
);

const ContactPage = () => (
  <div className="pt-24 pb-16">
    <section className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-medium text-gray-900 mb-4">Let's talk</h1>
      <p className="text-gray-600 max-w-xl mb-12">
        Whether it's about a product, a potential collaboration, or just an interesting engineering problem — I'm happy to have a conversation.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <a href="#" className="p-6 border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all group">
          <Calendar className="text-gray-400 mb-4" size={24} />
          <h3 className="font-medium text-gray-900 mb-2">Book a call</h3>
          <p className="text-sm text-gray-500">30 minutes to explore what's possible</p>
        </a>
        <a href="#" className="p-6 border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all group">
          <Mail className="text-gray-400 mb-4" size={24} />
          <h3 className="font-medium text-gray-900 mb-2">Send an email</h3>
          <p className="text-sm text-gray-500">hello@ardiland.com</p>
        </a>
      </div>

      <p className="text-sm text-gray-500">
        No sales pitches. No service packages. Just a conversation to see if there's something worth building together.
      </p>
    </section>
  </div>
);

// Main App
export default function App() {
  const [page, setPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedEssay, setSelectedEssay] = useState(null);

  const products = [
    {
      id: 1,
      name: 'Luma',
      description: 'An AI learning companion with organic, conversation-driven learning paths.',
      status: 'beta',
      why: 'Learning should feel like discovery, not a checklist. Luma creates adaptive paths that respond to curiosity.',
      problem: 'Traditional learning platforms are rigid. They assume everyone learns the same way, at the same pace.',
      currentState: 'Functional prototype with core conversation engine and path generation. Testing with early users.',
      next: 'Expanding domain coverage, refining the progression model, building persistence.',
      cta: 'Try Luma',
      github: true,
    },
    {
      id: 2,
      name: '4:33',
      description: 'An audio-only social platform inspired by the space between sounds.',
      status: 'experiment',
      why: 'Social platforms are noisy. What if connection came through voice, presence, and intentional silence?',
      problem: 'Visual social media optimizes for engagement, not connection. Audio creates intimacy.',
      currentState: 'Concept validated. Core audio infrastructure prototyped.',
      next: 'Exploring the right format — ephemeral rooms, async voice, or something else entirely.',
      cta: 'Follow progress',
      github: true,
    },
    {
      id: 3,
      name: 'Agentic Commerce',
      description: 'Voice-first AI interfaces that replace traditional e-commerce UI patterns.',
      status: 'in-progress',
      why: 'What happens when shopping becomes a conversation? This explores that future.',
      problem: 'E-commerce is still built around catalogs and carts. AI enables a different paradigm.',
      currentState: 'Prototyping conversational product discovery and checkout flows.',
      next: 'Testing with real product data, measuring conversion against traditional flows.',
      cta: 'Learn more',
      github: true,
    },
    {
      id: 4,
      name: 'Multi-Agent Orchestrator',
      description: 'Parallel execution system for specialized AI agents in development workflows.',
      status: 'live',
      why: 'Complex development tasks benefit from specialized agents working in parallel, not one agent doing everything.',
      problem: 'Single-agent systems hit limits on complex tasks. Orchestration enables scale.',
      currentState: 'Running in production for internal development. Handles architecture, frontend, backend, and QA agents.',
      next: 'Documenting patterns for external use. Considering open-source release.',
      cta: 'View documentation',
      github: true,
    },
  ];

  const essays = [
    {
      id: 1,
      title: 'Autonomous agents vs pair-programming agents',
      summary: 'Two models for AI-assisted development. One replaces you, one amplifies you. The difference matters.',
      content: `The conversation around AI in development often collapses two very different models into one. There are autonomous agents — systems designed to complete tasks independently — and pair-programming agents — systems designed to think alongside you.\n\nThe autonomous model optimizes for output. Give it a task, get a result. The pair-programming model optimizes for understanding. Work through a problem together, arrive at something neither would have reached alone.\n\nBoth have their place. But conflating them leads to mismatched expectations and poorly designed tools. The inner loop of development — the tight cycle of thinking, trying, adjusting — benefits from partnership. The outer loop — repetitive tasks, boilerplate, well-defined transformations — benefits from autonomy.\n\nThe best systems will know which mode to operate in. Or better yet, let you choose.`,
    },
    {
      id: 2,
      title: 'The inner loop of agentic development',
      summary: 'Where the real work happens in AI-assisted coding. Understanding the loop is key to designing better tools.',
      content: `When you work with an AI coding assistant, there's a rhythm that emerges. You describe intent. The agent proposes. You evaluate. You adjust. You describe again. This is the inner loop.\n\nMost tools focus on the proposal step — making the AI's output better. But the quality of the loop depends on every step. How clearly can you express intent? How quickly can you evaluate a proposal? How efficiently can you course-correct?\n\nThe best agentic development experiences minimize friction across the entire loop, not just the generation step. This means better context management, clearer feedback mechanisms, and interfaces that support rapid iteration.\n\nTools that understand the loop outperform tools that just generate better code.`,
    },
    {
      id: 3,
      title: 'Clean code in the age of LLMs',
      summary: 'Does clean code still matter when AI can read anything? More than ever, but for different reasons.',
      content: `A common argument: if AI can understand messy code, why bother keeping it clean? The machine doesn't care about formatting or naming conventions.\n\nThis misses the point. Clean code was never just about readability. It's about expressing intent, managing complexity, and enabling change. Those needs don't disappear because AI can parse spaghetti.\n\nIn fact, clean code becomes more important in AI-assisted workflows. Clear structure gives the AI better context. Consistent patterns reduce hallucination. Well-named functions communicate intent that comments can't.\n\nThe rules of clean code are evolving — some conventions matter less, others matter more — but the underlying principle remains: code should express what it means, clearly and consistently.`,
    },
    {
      id: 4,
      title: 'Design patterns after AI',
      summary: 'Which patterns survive the shift to AI-assisted development? Which need to evolve?',
      content: `Design patterns emerged to solve recurring problems in ways that could be communicated and reused. The Gang of Four patterns, architectural patterns, domain patterns — all were responses to the constraints of their era.\n\nAI changes some constraints. Boilerplate is cheap. Transformation is trivial. But complexity management, system boundaries, and team coordination remain hard. The patterns that address those problems remain relevant.\n\nWhat's shifting is how patterns are applied. AI can instantiate patterns, but choosing the right pattern for a context still requires judgment. The skill moves from implementation to selection and adaptation.\n\nNew patterns are emerging too — patterns for prompt design, for agent orchestration, for human-AI collaboration. The field is young, but the need for shared vocabulary is already clear.`,
    },
    {
      id: 5,
      title: 'Building systems that enable teams',
      summary: 'Technical architecture is team architecture. The systems you build shape how people work.',
      content: `Every architectural decision is also an organizational decision. A monolith centralizes knowledge. Microservices distribute it. Event-driven systems enable independence. Shared databases create coupling.\n\nThe best architects understand this. They design systems that match how teams need to work, not just how data needs to flow. They create boundaries that enable autonomy and interfaces that enable collaboration.\n\nThis is especially true in growing organizations. The system you build today determines what's easy and what's hard tomorrow. Conway's Law isn't just an observation — it's a tool. Design your architecture to shape your organization, or your organization will shape your architecture.\n\nEnabling systems aren't just well-designed. They're intentionally designed to make teams effective.`,
    },
  ];

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <HomePage setPage={setPage} setSelectedProduct={setSelectedProduct} setSelectedEssay={setSelectedEssay} products={products} essays={essays} />;
      case 'products':
        return <ProductsPage setPage={setPage} setSelectedProduct={setSelectedProduct} products={products} />;
      case 'product-detail':
        return selectedProduct ? <ProductDetailPage product={selectedProduct} setPage={setPage} /> : null;
      case 'essays':
        return <EssaysPage setPage={setPage} setSelectedEssay={setSelectedEssay} essays={essays} />;
      case 'essay-detail':
        return selectedEssay ? <EssayDetailPage essay={selectedEssay} setPage={setPage} /> : null;
      case 'about':
        return <AboutPage setPage={setPage} />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage setPage={setPage} setSelectedProduct={setSelectedProduct} setSelectedEssay={setSelectedEssay} products={products} essays={essays} />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased">
      <Nav currentPage={page} setPage={setPage} />
      {renderPage()}
      
      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2025 Ardiland. Building in the open.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-700">GitHub</a>
            <a href="#" className="hover:text-gray-700">YouTube</a>
            <a href="#" className="hover:text-gray-700">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
