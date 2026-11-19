/* ============================================================
   UZAN KHAN — TERMINAL PORTFOLIO
   Pure HTML / CSS / JS. No dependencies.
   ============================================================ */

const terminal = document.getElementById("terminal");
const bootEl = document.getElementById("boot");
const outputEl = document.getElementById("output");
const inputEl = document.getElementById("command-input");
const inputLine = document.getElementById("input-line");
const cursor = document.getElementById("cursor");

/* ---------- DATA (from GitHub profile) ---------- */
const DATA = {
  about: `
Hi, I'm Uzan Khan — a multi-disciplinary technologist.

I work at the intersection of cloud data engineering, cybersecurity,
and full-stack development. I build systems that are reliable,
scalable, and secure by design.

"Build secure. Scale smart. Ship fast."
  `,

  skills: `
╔══════════════════════════════════════════════════════╗
║  CLOUD & DATA                                        ║
╠══════════════════════════════════════════════════════╣
║  • Snowflake (Certified)                             ║
║  • AWS, Azure                                        ║
║  • Docker, Airflow                                   ║
║  • SQL (optimized queries, ETL)                      ║
╠══════════════════════════════════════════════════════╣
║  SECURITY & FORENSICS                                ║
╠══════════════════════════════════════════════════════╣
║  • Web Pentesting                                    ║
║  • Digital Forensics                                 ║
║  • Cyber Security Fundamentals (Certified)           ║
║  • 2x Cyber Security Competition Participant         ║
╠══════════════════════════════════════════════════════╣
║  DEVELOPMENT & AI                                    ║
╠══════════════════════════════════════════════════════╣
║  • Python, JavaScript, HTML, CSS, Bash               ║
║  • Linux (daily driver)                              ║
║  • AI-Powered Development                            ║
╚══════════════════════════════════════════════════════╝
  `,

  projects: `
Popular repositories (20+ public repos on GitHub):

  ▸ City-Flow
    Smart City IoT Platform with ESP32, FastAPI & Supabase.
    Automates street lighting, monitors environment, real-time data.
    → github.com/uzankhan/City-Flow

  ▸ ghost-troke-madiff
    Embedded red-team tool for keystroke injection attacks.
    ESP32-S3 BadUSB payloads + remote command execution.
    → github.com/uzankhan/ghost-troke-madiff

  ▸ SQL-Assignments
    TSQL assignments and database work.
    → github.com/uzankhan/SQL-Assigments

  ▸ cloud-data-engineering
    Roadmap for Cloud Data Engineering.
    → github.com/uzankhan/cloud-data-engineering

  ▸ Data-Engineering-Tests
    TSQL data engineering test suites.
    → github.com/uzankhan/Data-Engineering-Tests

  ▸ Guardian-Eye
    Security-focused tooling.
    → github.com/uzankhan/Guardian-Eye
  `,

  certs: `
Certifications & Achievements:

  ✅ Snowflake Certifications (Multiple Badges)
  ✅ Cyber Security Fundamentals Certification
  ✅ Digital Marketing Certification
  ✅ 2x Cyber Security Competitions Participant
  ✅ 20+ Public Repositories on GitHub
  ✅ Multi-Cloud Experience (AWS, Azure)
  `,

  contact: `
Let's connect:

  GitHub   → github.com/uzankhan
  Medium   → medium.com/@uzankhan   (update if needed)
  Email    → your.email@example.com (replace with real email)

Open to collaboration, networking, and new opportunities.
  `,

  help: `
Available commands:

  about       → who I am
  skills      → tech stack & expertise
  projects    → featured repositories
  certs       → certifications & achievements
  contact     → how to reach me
  social      → links
  clear       → clear the terminal
  help        → show this message

Tip: use ↑ / ↓ arrows for command history.
  `,

  social: `
  GitHub   → https://github.com/uzankhan
  Medium   → https://medium.com/@uzankhan
  LinkedIn → https://linkedin.com/in/uzankhan  (update if needed)
  `,
};

/* ---------- BOOT SEQUENCE ---------- */
const bootLines = [
  { text: "Initializing terminal...", color: "dim" },
  { text: "Loading profile: uzan.khan", color: "cyan" },
  { text: "Security-first mode: ENABLED", color: "green" },
  { text: "Cloud data engine: ONLINE", color: "green" },
  { text: "Ready.", color: "yellow" },
  { text: "", color: "" },
  { text: "Welcome to Uzan Khan's terminal portfolio.", color: "green" },
  { text: 'Type "help" to see available commands.', color: "dim" },
  { text: "", color: "" },
];

async function runBoot() {
  for (const line of bootLines) {
    const p = document.createElement("p");
    p.className = line.color;
    p.textContent = line.text;
    bootEl.appendChild(p);
    terminal.scrollTop = terminal.scrollHeight;
    await sleep(180);
  }
  inputEl.focus();
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/* ---------- COMMAND HANDLER ---------- */
const history = [];
let historyIndex = -1;

function printOutput(text, className = "") {
  const p = document.createElement("p");
  p.className = className;
  p.textContent = text;
  outputEl.appendChild(p);
  terminal.scrollTop = terminal.scrollHeight;
}

function printCommandEcho(cmd) {
  const p = document.createElement("p");
  p.innerHTML = `<span class="green">➜ ~ </span><span>${escapeHTML(cmd)}</span>`;
  outputEl.appendChild(p);
  terminal.scrollTop = terminal.scrollHeight;
}

function escapeHTML(str) {
  return str.replace(/[&<>"']/g, (m) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[m]));
}

function handleCommand(raw) {
  const cmd = raw.trim().toLowerCase();
  if (!cmd) return;

  history.push(cmd);
  historyIndex = history.length;

  printCommandEcho(cmd);

  switch (cmd) {
    case "about":
      printOutput(DATA.about, "cyan");
      break;
    case "skills":
      printOutput(DATA.skills, "green");
      break;
    case "projects":
      printOutput(DATA.projects, "cyan");
      break;
    case "certs":
    case "certifications":
      printOutput(DATA.certs, "yellow");
      break;
    case "contact":
      printOutput(DATA.contact, "green");
      break;
    case "social":
      printOutput(DATA.social, "cyan");
      break;
    case "help":
      printOutput(DATA.help, "dim");
      break;
    case "clear":
      outputEl.innerHTML = "";
      break;
    case "banner":
      printOutput(
        `
 ██╗   ██╗███████╗ █████╗ ███╗   ██╗
 ██║   ██║╚══███╔╝██╔══██╗████╗  ██║
 ██║   ██║  ███╔╝ ███████║██╔██╗ ██║
 ██║   ██║ ███╔╝  ██╔══██║██║╚██╗██║
 ╚██████╔╝███████╗██║  ██║██║ ╚████║
  ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝
        `,
        "green"
      );
      break;
    default:
      printOutput(
        `command not found: ${cmd}. Type "help" for available commands.`,
        "red"
      );
  }

  printOutput(""); // spacing
}

/* ---------- INPUT EVENTS ---------- */
inputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const value = inputEl.value;
    inputEl.value = "";
    handleCommand(value);
  }

  if (e.key === "ArrowUp") {
    e.preventDefault();
    if (historyIndex > 0) {
      historyIndex--;
      inputEl.value = history[historyIndex];
    }
  }

  if (e.key === "ArrowDown") {
    e.preventDefault();
    if (historyIndex < history.length - 1) {
      historyIndex++;
      inputEl.value = history[historyIndex];
    } else {
      historyIndex = history.length;
      inputEl.value = "";
    }
  }
});

/* Keep focus on input when clicking anywhere in terminal */
terminal.addEventListener("click", () => inputEl.focus());

/* ---------- START ---------- */
runBoot();