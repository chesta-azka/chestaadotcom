import { SITE_IMAGES } from '../config/images';
import type { RawBlogPostInput } from './blog-posts';

export const BLOG_POSTS_21_22_EN_RAW: RawBlogPostInput[] = [
  // ==========================================================================
  // ARTICLE 21 (EN): A Complete Guide to How Agentic AI Works for Beginners
  // Author: Chesta Azka
  // Cluster: agentic-ai (Pillar)
  // ==========================================================================
  {
    slug: 'a-complete-guide-to-how-agentic-ai-works-for-beginners',
    alternateSlug: 'panduan-lengkap-cara-kerja-agentic-ai-untuk-pemula',
    locale: 'en',
    clusterId: 'agentic-ai',
    title: 'A Complete Guide to How Agentic AI Works for Beginners',
    seoTitle: 'How Agentic AI Works: Complete Beginner Guide | CHESTA',
    excerpt:
      'Learn how agentic AI works from core concepts to real deployment: differences from standard chatbots, the 4 architectural pillars, execution cycles, technical limits, and a BSD clinic scenario.',
    metaDescription:
      'Complete beginner guide to how agentic AI works: perception, planning, tool use, memory, observe-act cycles, token loop risks, and a BSD clinic case scenario.',
    category: 'AI & Workflow Automation',
    categorySlug: 'otomasi-ai',
    tags: [
      'Agentic AI',
      'AI Agent',
      'How AI Works',
      'Business Automation',
      'BSD Clinic',
      'Beginner Guide',
    ],
    author: 'chesta',
    date: '2026-11-03',
    updatedAt: '2026-11-03',
    featured: true,
    draft: false,
    coverImageKey: 'clusterAgenticAi',
    cover: SITE_IMAGES.clusterAgenticAi.src,
    coverAlt: SITE_IMAGES.clusterAgenticAi.altEn || SITE_IMAGES.clusterAgenticAi.alt,
    beforeIntroSnapshot:
      'Many business owners assume agentic AI is simply a WhatsApp chatbot with smoother phrasing. In reality, the fundamental difference lies in taking initiative: a standard chatbot only strings words together, whereas an agent reads context, calls external software, and completes multi-step tasks without human prompting at every second.',
    founderNote: {
      author: 'chesta',
      title: 'Architecture Note · Why Answering Questions Differs from Completing Tasks',
      text: 'A large language model works by predicting the next text token. When you grant it controlled access to databases and calendars through an agentic architecture, the model transforms from a passive text responder into a rule-bound operational actor.',
    },
    content: [
      {
        type: 'ul',
        title: 'Key takeaways',
        items: [
          'Agentic AI differs fundamentally from traditional chatbots because it possesses the autonomy to plan sequential steps, invoke external programs through tool use, and retain long-term context.',
          'The anatomy of an agent consists of four interconnected pillars: a perception module that parses incoming messages, a planning engine that sets priorities, an execution interface for real software, and a multi-tier memory system.',
          'Deploying an agent in a local business requires strict authority boundaries, hard limits on repeated token calls, input data validation, and immediate escalation to human staff whenever ambiguity arises.',
        ],
      },
      {
        type: 'paragraph',
        text: 'A WhatsApp message arrives at a business number at 11:15 PM: "Hello admin, my back molar cracked this afternoon and hurts badly. Which dentist can extract it tomorrow afternoon? I want to book right away." For a clinic using a rigid button-menu bot, that message gets a cold reply: "Press 1 for hours, Press 2 for doctors." A patient in pain usually closes the chat immediately and searches for another clinic.',
      },
      {
        type: 'paragraph',
        text: 'By contrast, when you integrate an agentic architecture into that communication channel, the system does far more than send a polite greeting. The program reads the patient intent, checks available oral surgery slots in the doctor calendar database, verifies there is no double booking, prepares a registration draft, and confirms the appointment time within seconds. All of these steps run autonomously without an admin opening a laptop at midnight.',
      },
      {
        type: 'paragraph',
        text: 'Understanding how this technology operates under the hood is essential for business owners and software engineers. In this pillar guide, we break down the internal architecture of agentic AI transparently, strip away misleading marketing buzzwords, and connect every core concept—from [tool use and function calling](/en/blog/tool-use-function-calling-ai-agents-business) and [agent memory retention](/en/blog/ai-agent-memory-retention-privacy-business) to [multi-agent vs single-agent architecture](/en/blog/multi-agent-vs-single-agent-business-architecture), [WhatsApp conversation design](/en/blog/designing-whatsapp-conversation-flows-ai-agents), [prompt injection security](/en/blog/ai-agent-security-prompt-injection), [Model Context Protocol (MCP)](/en/blog/mcp-model-context-protocol-business), [UU PDP privacy compliance](/en/blog/indonesia-pdp-law-whatsapp-ai-business), and [how AI agents work for small businesses](/en/blog/how-ai-agents-work-for-small-business).',
      },
      {
        type: 'h2',
        id: 'what-is-agentic-ai-and-how-it-differs-from-ordinary-chatbots',
        text: 'What is agentic AI and how it differs from ordinary chatbots',
      },
      {
        type: 'paragraph',
        text: 'Agentic AI is a large-language-model system engineered to act autonomously toward a defined goal by evaluating initial conditions, assembling an execution plan, running commands against external software applications, and verifying whether its actions achieved the intended result.',
      },
      {
        type: 'paragraph',
        text: 'To distinguish it from earlier tools, let us compare the three tiers of automated messaging systems commonly used in business. The first tier is the rule-based bot. It relies on rigid decision trees (if-then branches) and numbered keypad menus. If a customer types a phrase outside the exact script programmed by the developer, the bot fails to understand.',
      },
      {
        type: 'paragraph',
        text: 'The second tier is the generative conversational chatbot. This bot uses a language model to produce natural, fluent sentences, yet its capability stops at words. When a patient asks to book an appointment, a generative chatbot can only reply: "Our clinic is open tomorrow from 9:00 AM to 5:00 PM, please contact our receptionist in the morning." It lacks the authority or technical bridge to inspect or modify the clinic calendar.',
      },
      {
        type: 'paragraph',
        text: 'The third tier is agentic AI. The system does not stop at informative conversation. An agent is assigned a specific role, a measurable goal, strict operational guardrails, and a set of callable programming functions (tools). When a patient requests a slot, the agent formulates structured actions to update records on the clinic server.',
      },
      {
        type: 'table',
        caption: 'Fundamental comparison between rule-based chatbots, generative text chatbots, and systemic agentic AI',
        headers: ['System Characteristic', 'Rule-Based Chatbot', 'Generative Text Chatbot', 'Systemic Agentic AI'],
        rows: [
          [
            'User Input Format',
            'Fixed button choices or exact keywords',
            'Free-form natural language text',
            'Free-form text, voice audio, or documents',
          ],
          [
            'Decision Making',
            'Hardcoded branching tree written by a programmer',
            'Next-word prediction from model weights',
            'Goal-driven multi-step dynamic planning',
          ],
          [
            'Database & API Access',
            'Only static embedded text responses',
            'No direct execution connection',
            'Reads and writes data via official tool calling',
          ],
          [
            'Error Handling',
            'Displays a generic error message and stops',
            'Apologizes politely without solving the issue',
            'Evaluates outcomes (reflects) and tries an alternative path',
          ],
          [
            'Role of Human Staff',
            'Takes over when users get stuck in button menus',
            'Reads chat logs to copy-paste data manually',
            'Supervises operations and handles escalated edge cases',
          ],
        ],
      },
      {
        type: 'paragraph',
        text: 'Examining the matrix above clarifies why agentic AI is not a cosmetic chat widget. It is a computational reasoning layer that bridges natural human language with strict business software logic.',
      },
      {
        type: 'h2',
        id: 'anatomy-of-an-agent-perception-planning-tool-use-and-memory',
        text: 'Anatomy of an agent: perception, planning, tool use, and memory',
      },
      {
        type: 'paragraph',
        text: 'Modern agentic AI architecture is supported by four core modules working in sync: perception to interpret incoming signals, planning to break complex goals into ordered tasks, tool use to interact with external APIs, and memory to preserve operational context across turns.',
      },
      {
        type: 'paragraph',
        text: 'Let us examine the exact role of each internal module so you can see how a text message on a phone screen turns into an accurate database transaction:',
      },
      {
        type: 'ol',
        title: 'Four foundational pillars of agentic AI architecture',
        items: [
          'Perception Layer: Receives raw text from WhatsApp or a web form. Its job is to extract key entities such as full name, phone number, requested date, symptom description, and urgency level (intent classification).',
          'Planning & Reasoning Engine: Evaluates the current state against the target outcome. The model outlines a step sequence: whether to check existing patient records first, query available doctor schedules, or ask a clarifying question before saving a booking.',
          'Tool Use (Action Interface): Serves as the technical bridge that converts model intent into standard software calls (such as an HTTP POST request or SQL query). The model outputs structured JSON parameters executed by a secure backend server.',
          'Memory Module (Short-term & Long-term): Short-term memory holds the active conversation turns of the current session. Long-term memory connects to a relational or vector database to recall past visit history and customer preferences.',
        ],
      },
      {
        type: 'paragraph',
        text: 'All four pillars are governed by a primary system prompt that acts as a digital standard operating procedure (SOP). This SOP dictates tone of voice, ethical boundaries, and the authority hierarchy the agent must never violate.',
      },
      {
        type: 'callout',
        variant: 'info',
        title: 'Context Isolation in Software Architecture',
        text: 'The planning module must never hold raw master database credentials. Every function call must pass through an internal API proxy layer that validates authorization and schema parameters before touching production records.',
      },
      {
        type: 'h2',
        id: 'the-agent-work-cycle-observe-think-act-reflect',
        text: 'The agent work cycle: observe, think, act, reflect',
      },
      {
        type: 'paragraph',
        text: 'An agentic AI execution cycle runs through a four-phase logical loop known as Observe, Think, Act, and Reflect, where each phase validates state data before advancing to ensure every action taken is accurate and safe.',
      },
      {
        type: 'paragraph',
        text: 'In the first phase, Observe, the agent gathers all available context. This includes the latest customer message, prior session turns, and environmental variables such as current operating hours. The agent checks that no required parameter is ambiguous before reasoning.',
      },
      {
        type: 'paragraph',
        text: 'The second phase is Think. Here, the language model digests the observation and selects the next logical step. If the data is complete, the model formulates a decision: "I need to invoke `check_doctor_schedule` with `date=2026-11-04` and `specialty=dental`." If information is missing, the model decides to ask the patient a polite follow-up question.',
      },
      {
        type: 'paragraph',
        text: 'The third phase is Act. The backend runtime executes the function requested during the thinking phase. The server queries the clinic database and receives a raw data payload, such as a list of open time slots: `[16:00, 17:30, 19:00]`. During this phase, the agent communicates machine-to-machine rather than speaking to the user.',
      },
      {
        type: 'paragraph',
        text: 'The fourth phase that distinguishes mature agents is Reflect. Upon receiving the system response, the agent verifies: "Do the returned slots match the afternoon window requested by the patient? Does any slot overlap with a break?" If valid, the agent composes the final reply to the patient. If a conflict appears, the agent repeats the loop to find an alternative before replying.',
      },
      {
        type: 'callout',
        variant: 'warning',
        title: 'The Danger of Skipping the Reflection Step',
        text: 'Systems built without a reflection verification step risk sending false confirmations to customers. Never allow an agent to promise a confirmed booking before the backend database returns a verified write status.',
      },
      {
        type: 'h2',
        id: 'example-scenario-clinic-registration-agent-in-bsd',
        text: 'Example scenario: clinic registration agent in BSD',
      },
      {
        type: 'paragraph',
        text: 'As a concrete local business scenario, a dental and aesthetic clinic in BSD, South Tangerang deployed agentic AI on its business WhatsApp line to automate new patient bookings without adding an overnight receptionist shift.',
      },
      {
        type: 'paragraph',
        text: 'Before deployment, the clinic frequently lost prospective patients who messaged after 9:00 PM WIB. Receptionists only replied at 8:30 AM the next morning. During that eleven-hour gap, most patients had already contacted competing clinics around Serpong or Bintaro that responded faster.',
      },
      {
        type: 'paragraph',
        text: 'The clinic implemented an integrated agentic workflow following these six steps:',
      },
      {
        type: 'ol',
        title: 'Execution flow of the BSD dental clinic booking agent',
        items: [
          'The patient sends a WhatsApp message: "Hello, I want to check a cavity tomorrow afternoon around 2 PM. Is Dr. Anita practicing?"',
          'The agent executes the `get_doctor_schedule` tool to inspect the requested dentist roster for that date.',
          'The backend returns data showing Dr. Anita starts her shift at 3:00 PM WIB, while a partner dentist is available at 2:00 PM WIB.',
          'The agent replies with clear options: explaining that Dr. Anita is available at 3:00 PM or offering Dr. Budi at 2:00 PM.',
          'The patient selects 3:00 PM with Dr. Anita. The agent asks for the patient full name and date of birth for the medical record.',
          'The agent validates the input format, calls `create_appointment`, records the booking in the clinic software, and triggers an automated calendar reminder.',
        ],
      },
      {
        type: 'paragraph',
        text: 'You can explore similar production architectures on our [AI agent development service](/en/services/ai-agent) page and read the full engineering breakdown in our [aesthetic clinic WhatsApp concierge case study](/en/case-studies/wa-concierge-klinik).',
      },
      {
        type: 'h2',
        id: 'agent-limitations-and-risks-infinite-loops-action-hallucination-token-costs',
        text: 'Agent limitations and risks: infinite loops, action hallucination, token costs',
      },
      {
        type: 'paragraph',
        text: 'Operating agentic AI in a live business carries technical risks that must be mitigated during design, specifically infinite execution loops, hallucinated tool parameters, runaway token billing, and unauthorized data exposure.',
      },
      {
        type: 'paragraph',
        text: 'The first risk is an infinite execution loop. When an agent receives a timeout error from an external API, an unguarded model may retry calling the exact same function dozens of times within seconds. This burns through your API credit balance and can overload your internal database server.',
      },
      {
        type: 'paragraph',
        text: 'The second risk is action parameter hallucination. Unlike plain text hallucination where a bot invents a story, action hallucination happens when an agent invokes a tool with parameters the customer never approved, such as booking the wrong date or triggering a bulk promotional message without consent.',
      },
      {
        type: 'paragraph',
        text: 'The third risk involves token cost inflation. Every time an agent completes an observe-think-act-reflect turn, the conversation history and tool schemas are resent to the language model. Without context pruning, the cost of a single booking conversation can multiply several times over your initial estimate.',
      },
      {
        type: 'table',
        caption: 'Technical risk mitigation matrix for operational agentic AI systems',
        headers: ['Technical Risk Type', 'Business Operational Impact', 'Mandatory Code Prevention'],
        rows: [
          [
            'Infinite Execution Loop',
            'API billing spikes and user response hangs',
            'Enforce a hard limit of at most 4 iterations per incoming message',
          ],
          [
            'Action Hallucination',
            'Duplicate or corrupted bookings in the database',
            'Validate schemas strictly using Zod or JSON Schema on the backend',
          ],
          [
            'Context Window Bloat',
            'Response latency slows beyond 8 seconds',
            'Compress older chat turns into structured state summaries',
          ],
          [
            'Prompt Injection',
            'Attacker overrides SOP rules or extracts instructions',
            'Isolate untrusted user input from the core system prompt',
          ],
          [
            'Third-Party API Outage',
            'Customer receives no booking certainty',
            'Configure an automatic fallback alert to staff WhatsApp',
          ],
        ],
      },
      {
        type: 'paragraph',
        text: 'To learn how to defend your system against adversarial input manipulation, read our engineering guide on [AI agent security and prompt injection mitigation](/en/blog/ai-agent-security-prompt-injection).',
      },
      {
        type: 'h2',
        id: 'when-your-business-needs-an-agent-and-when-standard-automation-is-enough',
        text: 'When your business needs an agent and when standard automation is enough',
      },
      {
        type: 'paragraph',
        text: 'Your business needs agentic AI only when customer inputs vary unpredictably and require flexible reasoning before calling software tools; if your workflow steps are fixed and deterministic, standard rule-based workflow automation is cheaper, faster, and more predictable.',
      },
      {
        type: 'paragraph',
        text: 'As a sound software engineering rule, never use a language model to solve a problem that a simple `if-else` script can handle deterministically. For example, if you only want to generate a PDF invoice every time a new row appears in Google Sheets, a standard webhook or workflow automation pipeline is ideal.',
      },
      {
        type: 'paragraph',
        text: 'Use the following decision rules to pick the most cost-effective architecture for your company:',
      },
      {
        type: 'ol',
        title: 'Decision checklist for evaluating business system needs',
        items: [
          'Does customer input vary widely? If customers type messages using informal phrasing, local slang, or voice notes, you need a language model reasoning layer.',
          'Does the next step depend dynamically on the result of the previous step? If yes, an agentic setup fits because the agent chooses which tool to invoke based on live database feedback.',
          'Does the process require zero-deviation financial compliance? If even a minor variation carries legal or accounting liability, keep final execution in deterministic code with human approval.',
          'What is your cost budget per transaction? Compare the token cost per conversation against your average order margin, as detailed in our guide to [monthly operating costs for business AI agents](/en/blog/monthly-operating-costs-ai-agents-business).',
        ],
      },
      {
        type: 'paragraph',
        text: 'If you operate a growing service company in the [BSD service area](/en/area/bsd) and want to map out the right boundary between deterministic workflows and AI agents, our engineering team can audit your current process.',
      },
      {
        type: 'h2',
        id: 'official-reference-sources',
        text: 'Official reference sources',
      },
      {
        type: 'paragraph',
        text: 'The following technical documentation and industry standards serve as primary references for designing agentic AI systems; check the official documentation for current figures and terms regarding quota limits, model pricing, and protocol specifications:',
      },
      {
        type: 'ul',
        items: [
          '[Anthropic Model Context Protocol (MCP) Documentation](https://modelcontextprotocol.io/) defines the open standard for connecting language models with external data sources and tool interfaces; check the official documentation for current figures and terms.',
          '[Google AI for Developers Function Calling Guide](https://ai.google.dev/gemini-api/docs/function-calling) provides implementation patterns for tool use and JSON schema declarations in the Gemini API; check the official documentation for current figures and terms.',
          '[OWASP Top 10 for Large Language Model Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/) details security risks in agent architectures including excessive agency and insecure output handling; check the official documentation for current figures and terms.',
          '[Official JDIH BPK RI Portal for Indonesia Personal Data Protection Law No. 27 of 2022](https://peraturan.bpk.go.id/Details/229798/uu-no-27-tahun-2022) sets mandatory compliance rules for processing patient and customer identity records in Indonesia; check the official documentation for current figures and terms.',
          '[W3C Web Architecture and Semantic Standards](https://www.w3.org/standards/) outlines core interoperability principles for structured machine data; check the official documentation for current figures and terms.',
        ],
      },
    ],
    conclusion: [
      'Agentic AI is not a wholesale replacement for human staff, but a capable digital assistant that frees your team from repetitive coordination while maintaining fast, accurate customer service.',
      'Successful deployment depends on clear authority guardrails, clean tool schema design, and regular audits of token efficiency and database accuracy.',
    ],
    serviceLink: {
      slug: 'ai-agent',
      title: 'Design a Safe AI Agent Architecture for Your Business Workflow',
      description:
        'We build WhatsApp and internal AI agents with strict schema validation, direct API connections to your business database, and human supervision.',
      href: '/en/services/ai-agent',
      label: 'Consult on AI Agent Implementation',
    },
    faq: [
      {
        question: 'Can agentic AI replace all WhatsApp admin staff in my business?',
        answer:
          'Not entirely. Agentic AI handles 70 to 80 percent of routine inquiries and standard appointment bookings, while complex complaints or high-value negotiations are handed off to human staff.',
      },
      {
        question: 'How do you prevent an agent from inventing promises or giving fake discount prices?',
        answer:
          'Prevention is enforced by restricting the agent to read prices exclusively from official database tools and forbidding unverified numbers via system prompt guardrails and backend schema validation.',
      },
      {
        question: 'What is the average cost per conversation to run an agentic AI system?',
        answer:
          'Compute token costs for modern language models typically range from a few cents (tens to hundreds of rupiah) per complete conversation, depending on session length and the number of tool calls executed.',
      },
      {
        question: 'Is patient medical data safe when processed through a WhatsApp agent?',
        answer:
          'Data security is maintained when the system enforces strict encryption in transit and at rest, temporary authorization tokens, and sensitive data retention limits compliant with Indonesia Personal Data Protection Law (UU PDP).',
      },
      {
        question: 'How long does it take to build and test a production-ready business AI agent?',
        answer:
          'Building a custom agentic workflow integrated with 2 to 3 backend databases typically takes 2 to 4 weeks, including edge-case testing and staff handoff training.',
      },
      {
        question: 'Where can I look up technical terms related to this system architecture?',
        answer:
          'You can visit our technology glossary at /en/glossary to read clear definitions of vector embeddings, RAG, tool calling, and context windows.',
      },
    ],
    relatedSlugs: [
      'tool-use-function-calling-ai-agents-business',
      'ai-agent-memory-retention-privacy-business',
      'multi-agent-vs-single-agent-business-architecture',
    ],
  },

  // ==========================================================================
  // ARTICLE 22 (EN): Tool Use and Function Calling: How AI Agents Access Real Systems
  // Author: Chesta Azka
  // Cluster: agentic-ai (Pillar: a-complete-guide-to-how-agentic-ai-works-for-beginners)
  // ==========================================================================
  {
    slug: 'tool-use-function-calling-ai-agents-business',
    alternateSlug: 'tool-use-function-calling-ai-agent-bisnis',
    locale: 'en',
    clusterId: 'agentic-ai',
    title: 'Tool Use and Function Calling: How AI Agents Access Real Business Systems',
    seoTitle: 'Tool Use & Function Calling for Business AI Agents | CHESTA',
    excerpt:
      'Understand how AI agents interact with real business software through tool use and function calling: JSON schemas, API round-trips, access control, and a Pamulang cafe stock scenario.',
    metaDescription:
      'Technical guide to tool use and function calling for business AI agents: how language models read databases, JSON schemas, audit logs, and a Pamulang cafe scenario.',
    category: 'AI & Workflow Automation',
    categorySlug: 'otomasi-ai',
    tags: [
      'Function Calling',
      'Tool Use',
      'AI Agent',
      'API Integration',
      'AI Security',
      'Pamulang Cafe',
    ],
    author: 'chesta',
    date: '2026-11-03',
    updatedAt: '2026-11-03',
    featured: false,
    draft: false,
    coverImageKey: 'clusterAgenticAi',
    cover: SITE_IMAGES.clusterAgenticAi.src,
    coverAlt: SITE_IMAGES.clusterAgenticAi.altEn || SITE_IMAGES.clusterAgenticAi.alt,
    beforeIntroSnapshot:
      'Without tool use, even the most capable language model is locked inside a chat box: it cannot know whether your cafe storage room has three cartons of milk left or ran out at noon. Function calling gives the model a structured way to knock on external system doors safely.',
    founderNote: {
      author: 'chesta',
      title: 'Engineering Note · Why the AI Does Not Actually Execute Code by Itself',
      text: 'A common misconception is that an AI model executes Python or SQL directly inside your server. In reality, the model only outputs a formatted JSON string containing requested arguments. Your application server reads that JSON, runs verified code, and returns the result to the model.',
    },
    content: [
      {
        type: 'ul',
        title: 'Key takeaways',
        items: [
          'Function calling is a mechanism where a large language model outputs valid JSON data structures to request external function execution rather than running arbitrary code unsupervised.',
          'The function calling round-trip involves four stages: sending tool schema definitions to the model, generating JSON arguments by the model, executing safe code on the backend server, and returning the system payload to the model.',
          'Tool integration security must enforce least-privilege access, server-side schema validation, immutable audit logs, and human confirmation for actions that alter critical records.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Have you ever wondered how a WhatsApp booking assistant knows that a second-floor boarding room is already occupied and immediately offers the next available unit? Naturally, an artificial language model does not have physical eyes to inspect a receptionist ledger.',
      },
      {
        type: 'paragraph',
        text: 'The answer lies in a core engineering mechanism known as tool use or function calling. As introduced in our pillar guide on [how agentic AI works for beginners](/en/blog/a-complete-guide-to-how-agentic-ai-works-for-beginners), this capability bridges flexible natural language reasoning with the strict data types required by company databases.',
      },
      {
        type: 'paragraph',
        text: 'For business owners and software developers alike, understanding function calling is the key to turning a passive chat responder into an operational system that completes real transactions. Let us examine its architecture step by step.',
      },
      {
        type: 'h2',
        id: 'why-language-models-need-hands-and-eyes-limits-of-pure-text',
        text: 'Why language models need hands and eyes: limits of pure text',
      },
      {
        type: 'paragraph',
        text: 'Large language models are technically isolated from the live world because they are trained on historical datasets and cannot observe real-time state or modify external software records without dedicated programming interfaces.',
      },
      {
        type: 'paragraph',
        text: 'Three fundamental limitations appear when you force a language model to operate without tool integration. First is knowledge cutoff blindness. The model does not know whether today is a public holiday, what the current exchange rate is this afternoon, or whether a doctor at your clinic called in sick ten minutes ago.',
      },
      {
        type: 'paragraph',
        text: 'Second is unreliable arithmetic calculation. Language models are trained to predict word patterns rather than compute exact math. When asked to total ten order items with tiered coupon discounts and an 11% tax rate, a raw model can make subtle rounding errors that hurt margins.',
      },
      {
        type: 'paragraph',
        text: 'Third is the absence of operational agency. A text-only model can write the sentence "Your order #1045 has been canceled and refunded," while zero changes actually occurred in your point-of-sale system or bank ledger. Without a tool call, that confirmation is pure hallucination.',
      },
      {
        type: 'callout',
        variant: 'info',
        title: 'Digital Eyes and Hands for AI',
        text: 'Tools serve as digital eyes (reading real-time data from sensors, databases, or web APIs) and hands (updating rows, triggering webhooks, or generating official PDF invoices) for a language model.',
      },
      {
        type: 'h2',
        id: 'what-tool-use-and-function-calling-are-simple-technical-definition',
        text: 'What tool use and function calling are: simple technical definition',
      },
      {
        type: 'paragraph',
        text: 'Function calling is a standard protocol in language model APIs where developers declare a catalog of available functions along with parameter rules, allowing the model to decide when a function is needed and output structured JSON arguments.',
      },
      {
        type: 'paragraph',
        text: 'It is critical to emphasize that the language model does not execute the function itself. It never opens a direct network connection to your database server. Instead, the model pauses normal conversational output and emits a structured JSON block telling your server: "Please execute this function name with these exact parameter values."',
      },
      {
        type: 'paragraph',
        text: 'Your application server retains full control. It inspects the JSON request from the model, verifies user permissions, executes local backend code (such as a parameterized `SELECT` query against PostgreSQL), and feeds the resulting data payload back to the model.',
      },
      {
        type: 'h2',
        id: 'anatomy-of-a-function-call-json-schema-parameters-system-response',
        text: 'Anatomy of a function call: JSON schema, parameters, system response',
      },
      {
        type: 'paragraph',
        text: 'The anatomy of a function call consists of three primary parts: a JSON Schema declaration describing the function purpose and parameter types, the argument payload generated by the model, and the structured response returned by the external system.',
      },
      {
        type: 'paragraph',
        text: 'Let us inspect these components using an inventory lookup function for a coffee shop application:',
      },
      {
        type: 'ol',
        title: 'Four anatomical components of a function call declaration',
        items: [
          'Function Name: A unique programmatic identifier such as `check_ingredient_stock`. Names must be concise and follow strict naming conventions.',
          'Semantic Description: Plain-language instructions read by the model to know when calling this function is appropriate, such as "Use this function when a barista or manager asks for remaining stock of milk, syrup, or coffee beans."',
          'Parameters Object: A standard JSON Schema definition specifying variable names (for example `ingredient_name`), data types (string or integer), required flags, and allowed enum values.',
          'Tool Output Payload: A concise JSON response from the backend server confirming live state, such as `{"status": "ok", "remaining_units": 4, "unit": "liters"}`.',
        ],
      },
      {
        type: 'table',
        caption: 'Example mapping from natural user messages to structured function call arguments',
        headers: ['User Chat Message', 'Selected Function Name', 'Generated JSON Arguments', 'Actual Backend Action'],
        rows: [
          [
            '"Check how much caramel syrup is left at the main bar"',
            '`check_ingredient_stock`',
            '{"ingredient": "caramel_syrup", "location": "main_bar"}',
            'Queries branch inventory database table',
          ],
          [
            '"Please create a draft order for 5 palm sugar iced coffees"',
            '`create_order_draft`',
            '{"item_id": "palm_sugar_coffee", "qty": 5}',
            'Inserts a draft order into the POS system',
          ],
          [
            '"What was our total cafe revenue last night?"',
            '`get_sales_summary`',
            '{"date": "2026-11-02", "shift": "evening"}',
            'Aggregates settled transaction totals from server',
          ],
          [
            '"Send the PDF summary to the manager WhatsApp"',
            '`send_report_document`',
            '{"format": "pdf", "recipient": "+62812xxxx"}',
            'Generates PDF report and triggers WhatsApp API',
          ],
        ],
      },
      {
        type: 'paragraph',
        text: 'Precision in writing parameter descriptions directly determines accuracy. Ambiguous descriptions cause the model to pick the wrong tool or pass improperly formatted dates.',
      },
      {
        type: 'h2',
        id: 'the-round-trip-flow-from-user-message-to-executed-result',
        text: 'The round-trip flow: from user message to executed result',
      },
      {
        type: 'paragraph',
        text: 'A function calling round-trip operates in a closed orchestration loop involving the user, your intermediate application server, the large language model API, and your operational business database.',
      },
      {
        type: 'paragraph',
        text: 'Here is the chronological sequence that completes within a few hundred milliseconds when a message arrives:',
      },
      {
        type: 'ol',
        title: 'Chronological sequence of a function calling orchestration loop',
        items: [
          'The user sends a text message through an interface (such as a WhatsApp webhook or internal staff app).',
          'Your application server bundles the message with the list of declared tool schemas and forwards the request to the language model API.',
          'The language model analyzes the text, concludes a tool is required, and returns a `tool_calls` response containing the function name and JSON arguments.',
          'Your application server intercepts that response, validates the arguments, and executes the internal function code (such as a SQL query to PostgreSQL).',
          'Your server receives the database rows, wraps them inside a `tool` role message, and sends them back to the language model.',
          'The language model reads the verified data and writes a natural, helpful final reply delivered to the user phone.',
        ],
      },
      {
        type: 'callout',
        variant: 'warning',
        title: 'Watch Out for Network Latency Stacking',
        text: 'Because a tool call involves two model API round-trips plus one internal database query, ensure your database queries use proper indexes so total response time stays under 3 seconds.',
      },
      {
        type: 'h2',
        id: 'example-scenario-cafe-inventory-check-in-pamulang',
        text: 'Example scenario: cafe inventory check in Pamulang',
      },
      {
        type: 'paragraph',
        text: 'As a practical local scenario, an independent coffee shop in Pamulang, South Tangerang uses function calling to let baristas and store managers check ingredient stock directly through their operational WhatsApp group.',
      },
      {
        type: 'paragraph',
        text: 'During busy afternoon shifts, baristas rarely have time to open a back-office laptop just to check whether UHT milk cartons in the secondary storage room are sufficient for the weekend. Instead, they send a quick text to the cafe assistant number.',
      },
      {
        type: 'paragraph',
        text: 'When a barista messages: "Admin, how many crates of fresh milk are left in the storage room?", the system executes a structured sequence:',
      },
      {
        type: 'ol',
        title: 'Inventory execution steps at the Pamulang coffee shop',
        items: [
          'The model maps the phrase "fresh milk" to item code `SKU-MILK-FRESH-1L` via the `check_inventory` function parameter.',
          'The backend server queries the inventory database and retrieves the result: 4 crates remaining (48 liters), with the nearest expiration date in 5 days.',
          'The model reads the payload and replies on WhatsApp: "Fresh milk stock in secondary storage is 4 crates (48 liters). Note: 1 crate expires on November 8."',
          'If the barista follows up with: "Please draft a purchase order for 5 crates to our usual supplier," the model calls `create_po_draft`, which sends an approval button to the cafe manager.',
        ],
      },
      {
        type: 'paragraph',
        text: 'This implementation aligns with the architecture documented in our [cafe operations dashboard case study](/en/case-studies/dashboard-operasional-kafe) and our [custom software development](/en/services/custom-software) work for businesses around [Pamulang](/en/area/pamulang).',
      },
      {
        type: 'h2',
        id: 'tool-security-authority-limits-human-confirmation-audit-logs',
        text: 'Tool security: authority limits, human confirmation, audit logs',
      },
      {
        type: 'paragraph',
        text: 'Connecting an AI model to live production databases requires layered security governance to prevent malicious prompt injection, unauthorized record deletion, and unapproved financial transactions.',
      },
      {
        type: 'paragraph',
        text: 'The first mandatory principle is Read-Write Separation. Tools that only read non-sensitive information (such as checking table availability, reading doctor schedules, or looking up menu prices) can run automatically. However, tools that mutate permanent state or move money (such as canceling bookings, changing catalog prices, or issuing refunds) must require explicit human-in-the-loop confirmation.',
      },
      {
        type: 'paragraph',
        text: 'The second principle is maintaining an immutable audit trail. Every time a function is invoked by the language model, record a log entry containing the session ID, timestamp, tool name, input arguments, and server response. This log provides full accountability during stock or billing audits.',
      },
      {
        type: 'paragraph',
        text: 'The third principle is strict server-side parameter validation. Never trust JSON arguments generated by a language model blindly. Validate every field using libraries like Zod or Pydantic to guarantee phone numbers match valid formats and order quantities are never negative numbers.',
      },
      {
        type: 'callout',
        variant: 'warning',
        title: 'Never Expose Direct Raw SQL Execution Tools',
        text: 'Never create a generic tool named `run_sql_query` that allows a language model to write and execute raw SQL strings against your production database. Always build narrowly scoped functions backed by least-privilege database roles.',
      },
      {
        type: 'paragraph',
        text: 'For a deeper look at open cross-platform tool standards, read our guide on the [Model Context Protocol (MCP) for business integration](/en/blog/mcp-model-context-protocol-business) and our security analysis on [prompt injection mitigation](/en/blog/ai-agent-security-prompt-injection).',
      },
      {
        type: 'h2',
        id: 'official-reference-sources',
        text: 'Official reference sources',
      },
      {
        type: 'paragraph',
        text: 'The following engineering documentation and security standards provide official specifications for implementing tool use and function calling; check the official documentation for current figures and terms regarding payload limits and schema rules:',
      },
      {
        type: 'ul',
        items: [
          '[OpenAI Official Function Calling Guide](https://platform.openai.com/docs/guides/function-calling) explains tool declaration payloads and structured JSON parameter handling; check the official documentation for current figures and terms.',
          '[Google Gemini API Structured Outputs & Function Calling](https://ai.google.dev/gemini-api/docs/function-calling) details function declaration schemas and execution modes in Gemini models; check the official documentation for current figures and terms.',
          '[Official JSON Schema Specification](https://json-schema.org/specification) defines the validation vocabulary for object structures and programming data types; check the official documentation for current figures and terms.',
          '[OWASP Application Security Verification Standard (ASVS)](https://owasp.org/www-project-application-security-verification-standard/) provides verification benchmarks for input validation and backend access control; check the official documentation for current figures and terms.',
          '[Indonesia Personal Data Protection Law No. 27 of 2022 at JDIH BPK RI](https://peraturan.bpk.go.id/Details/229798/uu-no-27-tahun-2022) governs confidentiality requirements when logging user interaction payloads; check the official documentation for current figures and terms.',
        ],
      },
    ],
    conclusion: [
      'Function calling and tool use form the engineering bridge that turns a conversational language model into an operational assistant capable of supporting real daily business tasks.',
      'Reliable execution depends on precise JSON schema declarations, strict backend parameter validation, human confirmation for write actions, and transparent audit logging.',
    ],
    serviceLink: {
      slug: 'ai-agent',
      title: 'Integrate Secure AI Tool Use with Your Business Database',
      description:
        'We build secure API bridges connecting WhatsApp and web interfaces to your inventory, POS, or booking database with enterprise-grade access controls.',
      href: '/en/services/ai-agent',
      label: 'Consult on AI Tool Integration',
    },
    faq: [
      {
        question: 'Does function calling mean the AI can read all files on my company server?',
        answer:
          'No. The language model only knows about the specific functions explicitly registered by your developer in the application code. It has zero access to the server filesystem or shell commands.',
      },
      {
        question: 'What happens if the language model outputs malformed or invalid JSON arguments?',
        answer:
          'Modern model APIs support structured output modes that guarantee valid JSON syntax. If a parameter value violates business logic, your backend server rejects the call and asks the model to correct the value.',
      },
      {
        question: 'Does enabling function calling increase API token costs?',
        answer:
          'Yes, there is a modest token overhead because the JSON schema definitions of active tools are included in the API request context. Keeping your active tool list focused minimizes this cost.',
      },
      {
        question: 'Can I use function calling with an internal database that is not exposed to the public internet?',
        answer:
          'Yes. Because your own backend server executes the database query locally and only sends the resulting text snippet to the model API, your database never needs a public internet port.',
      },
      {
        question: 'What is the difference between standard function calling and the Model Context Protocol (MCP)?',
        answer:
          'Function calling is the model-level API mechanism for requesting a tool execution, whereas MCP is a standardized open protocol that lets one tool server connect to multiple AI providers without rewriting integration code.',
      },
      {
        question: 'Where can I read definitions of technical terms like webhook, REST API, and schema validation?',
        answer:
          'Visit our technology glossary at /en/glossary for straightforward explanations of API endpoints, JSON serialization, webhooks, and backend validation.',
      },
    ],
    relatedSlugs: [
      'a-complete-guide-to-how-agentic-ai-works-for-beginners',
      'mcp-model-context-protocol-business',
      'ai-agent-security-prompt-injection',
    ],
  },
];
