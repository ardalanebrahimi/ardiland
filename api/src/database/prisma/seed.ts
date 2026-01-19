import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clear existing data
  await prisma.session.deleteMany();
  await prisma.adminUser.deleteMany();
  await prisma.product.deleteMany();
  await prisma.essay.deleteMany();

  // Create default admin user (password: admin123)
  const passwordHash = await bcrypt.hash('admin123', 10);
  await prisma.adminUser.create({
    data: {
      username: 'admin',
      passwordHash,
    },
  });
  console.log('Created admin user (username: admin, password: admin123)');

  // Seed Products with v4 fields
  const products = [
    {
      slug: 'luma',
      name: 'Luma',
      description: 'An AI learning companion with organic, conversation-driven learning paths.',
      status: 'beta',
      why: 'Learning should feel like discovery, not a checklist. Luma creates adaptive paths that respond to curiosity.',
      problem: 'Traditional learning platforms are rigid. They assume everyone learns the same way, at the same pace.',
      currentState: 'Functional prototype with core conversation engine and path generation. Testing with early users.',
      next: 'Expanding domain coverage, refining the progression model, building persistence.',
      ctaLabel: 'Try Luma',
      ctaUrl: '#',
      githubUrl: 'https://github.com/ardiland/luma',
      featured: true,
      sortOrder: 1,
      iconInitials: 'LU',
      iconColor: 'bg-blue-500',
      techStack: JSON.stringify(['Angular', 'Node.js', 'OpenAI', 'PostgreSQL']),
    },
    {
      slug: '4-33',
      name: '4:33',
      description: 'An audio-only social platform inspired by the space between sounds.',
      status: 'experiment',
      why: "Social platforms are noisy. What if connection came through voice, presence, and intentional silence?",
      problem: "Visual social media optimizes for engagement, not connection. Audio creates intimacy.",
      currentState: 'Concept validated. Core audio infrastructure prototyped.',
      next: "Exploring the right format — ephemeral rooms, async voice, or something else entirely.",
      ctaLabel: 'Follow progress',
      ctaUrl: '#',
      githubUrl: 'https://github.com/ardiland/4-33',
      featured: true,
      sortOrder: 2,
      iconInitials: '4:',
      iconColor: 'bg-purple-500',
      techStack: JSON.stringify(['WebRTC', 'Node.js', 'Redis']),
    },
    {
      slug: 'agentic-commerce',
      name: 'Agentic Commerce',
      description: 'Voice-first AI interfaces that replace traditional e-commerce UI patterns.',
      status: 'in-progress',
      why: 'What happens when shopping becomes a conversation? This explores that future.',
      problem: 'E-commerce is still built around catalogs and carts. AI enables a different paradigm.',
      currentState: 'Prototyping conversational product discovery and checkout flows.',
      next: 'Testing with real product data, measuring conversion against traditional flows.',
      ctaLabel: 'Learn more',
      ctaUrl: '#',
      githubUrl: 'https://github.com/ardiland/agentic-commerce',
      demoUrl: 'https://demo.ardiland.com/agentic-commerce',
      featured: true,
      sortOrder: 3,
      iconInitials: 'AG',
      iconColor: 'bg-emerald-500',
      techStack: JSON.stringify(['Angular', 'Claude API', 'Stripe']),
    },
    {
      slug: 'multi-agent-orchestrator',
      name: 'Multi-Agent Orchestrator',
      description: 'Parallel execution system for specialized AI agents in development workflows.',
      status: 'live',
      why: 'Complex development tasks benefit from specialized agents working in parallel, not one agent doing everything.',
      problem: 'Single-agent systems hit limits on complex tasks. Orchestration enables scale.',
      currentState: 'Running in production for internal development. Handles architecture, frontend, backend, and QA agents.',
      next: 'Documenting patterns for external use. Considering open-source release.',
      ctaLabel: 'View documentation',
      ctaUrl: '#',
      githubUrl: 'https://github.com/ardiland/multi-agent-orchestrator',
      featured: true,
      sortOrder: 4,
      iconInitials: 'MU',
      iconColor: 'bg-amber-500',
      techStack: JSON.stringify(['TypeScript', 'Claude API', 'Node.js']),
    },
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log(`Created ${products.length} products`);

  // Seed Essays with HTML content
  const essays = [
    {
      slug: 'autonomous-vs-pair-programming-agents',
      title: 'Autonomous agents vs pair-programming agents',
      summary: 'Two models for AI-assisted development. One replaces you, one amplifies you. The difference matters.',
      content: `<p>The conversation around AI in development often collapses two very different models into one.</p>
<p>There are <strong>autonomous agents</strong> — systems designed to complete tasks independently — and <strong>pair-programming agents</strong> — systems designed to think alongside you.</p>
<p>The autonomous model optimizes for output. Give it a task, get a result. The pair-programming model optimizes for understanding. Work through a problem together, arrive at something neither would have reached alone.</p>
<p>Both have their place. But conflating them leads to mismatched expectations and poorly designed tools. The inner loop of development — the tight cycle of thinking, trying, adjusting — benefits from partnership. The outer loop — repetitive tasks, boilerplate, well-defined transformations — benefits from autonomy.</p>
<p>The best systems will know which mode to operate in. Or better yet, let you choose.</p>`,
      featured: true,
      sortOrder: 1,
    },
    {
      slug: 'inner-loop-agentic-development',
      title: 'The inner loop of agentic development',
      summary: "Where the real work happens in AI-assisted coding. Understanding the loop is key to designing better tools.",
      content: `<p>When you work with an AI coding assistant, there's a rhythm that emerges. You describe intent. The agent proposes. You evaluate. You adjust. You describe again. This is the inner loop.</p>
<p>Most tools focus on the proposal step — making the AI's output better. But the quality of the loop depends on every step. How clearly can you express intent? How quickly can you evaluate a proposal? How efficiently can you course-correct?</p>
<p>The best agentic development experiences minimize friction across the entire loop, not just the generation step. This means better context management, clearer feedback mechanisms, and interfaces that support rapid iteration.</p>
<p>Tools that understand the loop outperform tools that just generate better code.</p>`,
      featured: true,
      sortOrder: 2,
    },
    {
      slug: 'clean-code-age-of-llms',
      title: 'Clean code in the age of LLMs',
      summary: "Does clean code still matter when AI can read anything? More than ever, but for different reasons.",
      content: `<p>A common argument: if AI can understand messy code, why bother keeping it clean? The machine doesn't care about formatting or naming conventions.</p>
<p>This misses the point. Clean code was never just about readability. It's about expressing intent, managing complexity, and enabling change. Those needs don't disappear because AI can parse spaghetti.</p>
<p>In fact, clean code becomes more important in AI-assisted workflows. Clear structure gives the AI better context. Consistent patterns reduce hallucination. Well-named functions communicate intent that comments can't.</p>
<p>The rules of clean code are evolving — some conventions matter less, others matter more — but the underlying principle remains: code should express what it means, clearly and consistently.</p>`,
      featured: true,
      sortOrder: 3,
    },
    {
      slug: 'design-patterns-after-ai',
      title: 'Design patterns after AI',
      summary: 'Which patterns survive the shift to AI-assisted development? Which need to evolve?',
      content: `<p>Design patterns emerged to solve recurring problems in ways that could be communicated and reused. The Gang of Four patterns, architectural patterns, domain patterns — all were responses to the constraints of their era.</p>
<p>AI changes some constraints. Boilerplate is cheap. Transformation is trivial. But complexity management, system boundaries, and team coordination remain hard. The patterns that address those problems remain relevant.</p>
<p>What's shifting is how patterns are applied. AI can instantiate patterns, but choosing the right pattern for a context still requires judgment. The skill moves from implementation to selection and adaptation.</p>
<p>New patterns are emerging too — patterns for prompt design, for agent orchestration, for human-AI collaboration. The field is young, but the need for shared vocabulary is already clear.</p>`,
      featured: false,
      sortOrder: 4,
    },
    {
      slug: 'systems-that-enable-teams',
      title: 'Building systems that enable teams',
      summary: 'Technical architecture is team architecture. The systems you build shape how people work.',
      content: `<p>Every architectural decision is also an organizational decision. A monolith centralizes knowledge. Microservices distribute it. Event-driven systems enable independence. Shared databases create coupling.</p>
<p>The best architects understand this. They design systems that match how teams need to work, not just how data needs to flow. They create boundaries that enable autonomy and interfaces that enable collaboration.</p>
<p>This is especially true in growing organizations. The system you build today determines what's easy and what's hard tomorrow. Conway's Law isn't just an observation — it's a tool. Design your architecture to shape your organization, or your organization will shape your architecture.</p>
<p>Enabling systems aren't just well-designed. They're intentionally designed to make teams effective.</p>`,
      featured: false,
      sortOrder: 5,
    },
  ];

  for (const essay of essays) {
    await prisma.essay.create({ data: essay });
  }

  console.log(`Created ${essays.length} essays`);

  console.log('Seeding complete!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
