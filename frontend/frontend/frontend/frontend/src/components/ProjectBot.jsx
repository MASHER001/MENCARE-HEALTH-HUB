import { useMemo, useState } from 'react';

const starterMessages = [
  { sender: 'bot', text: 'Hi! I can answer questions about MenCare Health Hub, including health facts, myth vs fact, admin login, and how the frontend is structured.' },
];

const responseRules = [
  {
    keywords: ['health fact', 'facts', 'health facts'],
    answer:
      'The Health Facts page shows educational cards with a title, summary, category, source, and source link for men’s health information.',
  },
  {
    keywords: ['myth', 'myth vs fact', 'myths'],
    answer:
      'The Myth vs Fact page lists common misconceptions and reveals the evidence-based correction when a user clicks to reveal the fact.',
  },
  {
    keywords: ['admin', 'login', 'admin login'],
    answer:
      'The admin area includes login, health fact management, and myth/fact management. The login form validates email and password before redirecting to the admin dashboard.',
  },
  {
    keywords: ['backend', 'api', 'supabase'],
    answer:
      'This frontend is designed to work without a live backend for preview purposes. It has a placeholder API layer and sample content fallback so the UI can still be tested.',
  },
  {
    keywords: ['privacy', 'terms', 'contact'],
    answer:
      'The footer currently includes Privacy Policy, Terms and Conditions, Copyright 2026, and Contact Us as static text placeholders for now.',
  },
  {
    keywords: ['project', 'men care', 'mencare', 'what is this'],
    answer:
      'MenCare Health Hub is a health education app focused on men’s health topics, including urinary, prostate, and STI-related information.',
  },
  {
    keywords: ['footer', 'bottom left', 'floating button'],
    answer:
      'The assistant button is intentionally floating in the lower-left corner so it stays visible while browsing the app.',
  },
];

function getBotReply(question) {
  const normalized = question.toLowerCase();

  const match = responseRules.find(({ keywords }) =>
    keywords.some((keyword) => normalized.includes(keyword)),
  );

  if (match) {
    return match.answer;
  }

  return 'I can help with the MenCare Health Hub project. Ask me about the health facts page, myth vs fact page, admin login, backend preview, or project structure.';
}

export default function ProjectBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(starterMessages);
  const [inputValue, setInputValue] = useState('');

  const quickQuestions = useMemo(
    () => ['What is this project?', 'How do admin pages work?', 'What is the myth vs fact feature?'],
    [],
  );

  const handleSend = (event) => {
    event.preventDefault();

    const trimmed = inputValue.trim();
    if (!trimmed) {
      return;
    }

    const userMessage = { sender: 'user', text: trimmed };
    const botMessage = { sender: 'bot', text: getBotReply(trimmed) };

    setMessages((current) => [...current, userMessage, botMessage]);
    setInputValue('');
  };

  const handleQuickQuestion = (text) => {
    const userMessage = { sender: 'user', text };
    const botMessage = { sender: 'bot', text: getBotReply(text) };
    setMessages((current) => [...current, userMessage, botMessage]);
  };

  return (
    <div className="project-bot">
      {open ? (
        <div className="project-bot-panel" role="dialog" aria-label="Project assistant">
          <div className="project-bot-header">
            <div>
              <p className="project-bot-kicker">Project assistant</p>
              <h3>MenCare Bot</h3>
            </div>
            <button type="button" className="bot-close-btn" onClick={() => setOpen(false)} aria-label="Close assistant">
              ×
            </button>
          </div>

          <div className="project-bot-messages">
            {messages.map((message, index) => (
              <div key={`${message.sender}-${index}`} className={`bot-message ${message.sender}`}>
                {message.text}
              </div>
            ))}
          </div>

          <div className="quick-questions">
            {quickQuestions.map((question) => (
              <button key={question} type="button" className="quick-question" onClick={() => handleQuickQuestion(question)}>
                {question}
              </button>
            ))}
          </div>

          <form onSubmit={handleSend} className="project-bot-form">
            <input
              type="text"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              placeholder="Ask about the project..."
              aria-label="Ask the assistant about the project"
            />
            <button type="submit" className="project-bot-send">Send</button>
          </form>
        </div>
      ) : null}

      <button
        type="button"
        className="project-bot-toggle"
        onClick={() => setOpen((current) => !current)}
        aria-label={open ? 'Close assistant' : 'Open assistant'}
        title="Project assistant"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M9 18h6M8 9.5A4 4 0 0 1 12 6a4 4 0 0 1 4 3.5V10a4 4 0 0 1-8 0V9.5Zm-3 5.5a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}
