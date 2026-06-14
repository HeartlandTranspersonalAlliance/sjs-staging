export const site = {
  name: "Safe Journey Sanctum",
  shortName: "SJS",
  domain: "safejourneysanctum.org",
  url: "https://safejourneysanctum.org/",
  email: "info@safejourneysanctum.org",
  description:
    "Compassionate, trauma-informed peer support for nonordinary states at Midwest events.",
  nonprofit:
    "Safe Journey Sanctum is a DBA of the Heartland Transpersonal Alliance, Inc., a registered 501(c)(3) nonprofit in the state of Missouri.",
  parentOrg: {
    name: "Heartland Transpersonal Alliance, Inc.",
    url: "https://heartlandta.org"
  },
  forms: {
    volunteer: "https://forms.gle/g38MyF11DWDqsCLU7",
    contact: "mailto:info@safejourneysanctum.org?subject=SJS%20general%20inquiry",
    partnership: "mailto:info@safejourneysanctum.org?subject=SJS%20event%20partnership%20inquiry",
    donation: "https://heartlandta.org",
    wishlist: "mailto:info@safejourneysanctum.org?subject=SJS%20in-kind%20support"
  },
  social: [
    {
      label: "GitHub",
      url: "https://github.com/psychedelicsocietyofkansascity"
    }
  ]
};

export const navItems = [
  { label: "About", href: "/about/" },
  { label: "Why SJS", href: "/why-sjs/" },
  { label: "For Organizers", href: "/organizers/" },
  { label: "Resources", href: "/resources/" },
  { label: "Volunteer", href: "/volunteer/" },
  { label: "News", href: "/news/" },
  { label: "Contact", href: "/contact/" }
];

export const primaryCtas = [
  { label: "Partner With SJS", href: site.forms.partnership },
  { label: "Volunteer", href: site.forms.volunteer },
  { label: "Donate", href: "/donate/" }
];

export const carePrinciples = [
  {
    icon: "heart",
    title: "Trauma-informed",
    text: "We prioritize predictability, choice, and emotional safety while recognizing that guests may arrive with different histories and thresholds."
  },
  {
    icon: "handshake",
    title: "Consent-first",
    text: "Support starts with permission. Volunteers ask before engaging, touching belongings, changing the environment, or inviting any next step."
  },
  {
    icon: "ear",
    title: "Non-directive presence",
    text: "SJS volunteers listen without judgment and do not guide, interpret, or steer a guest's experience."
  },
  {
    icon: "shield",
    title: "Evidence-based safety response",
    text: "Training includes de-escalation, overdose awareness, Narcan response basics, and clear escalation to medical or security teams."
  }
];

export const supportOptions = [
  {
    icon: "gift",
    title: "One-time gifts",
    text: "Help fund sanctuary supplies, outreach materials, volunteer meals, printing, and event readiness.",
    href: site.forms.donation,
    label: "Give Through HTA"
  },
  {
    icon: "heart",
    title: "Recurring support",
    text: "Sustain training, storage, replacement supplies, and a stable volunteer program between festival seasons.",
    href: site.forms.donation,
    label: "Start Monthly Giving"
  },
  {
    icon: "package",
    title: "In-kind supplies",
    text: "Blankets, cushions, water, art materials, lighting, signage, and operations gear keep the space practical and welcoming.",
    href: site.forms.wishlist,
    label: "Ask About Wishlist"
  },
  {
    icon: "handshake",
    title: "Sponsor or host",
    text: "Event partners can help bring peer support, education, and sanctuary infrastructure to their communities.",
    href: site.forms.partnership,
    label: "Partner With SJS"
  }
];

export const eventServices = [
  "Calm sanctuary space for guests in distress",
  "Peer support staffing and volunteer coordination",
  "Overdose awareness and harm-reduction education",
  "Grounding materials, hydration reminders, and practical care",
  "Coordination pathways with medical, security, and production teams",
  "Post-event debriefs and improvement notes"
];

export const trainingTopics = [
  "Role, scope, and when to call for help",
  "Trauma-informed peer support",
  "Consent-first communication",
  "Non-touch grounding and de-escalation skills",
  "Medical red flags and warm handoffs",
  "Overdose awareness and event protocol",
  "Volunteer boundaries, privacy, and documentation"
];

export const resources = [
  {
    icon: "clipboard",
    title: "Before the Event",
    text: "Plan transport, hydration, food, buddy check-ins, rest, and where to find first aid or harm-reduction services before the event begins.",
    href: "/resources/#preparation"
  },
  {
    icon: "heart",
    title: "During a Difficult Experience",
    text: "Reduce stimulation, speak calmly, ask permission, stay present, and involve medical support when symptoms suggest physical danger.",
    href: "/resources/#difficult-experiences"
  },
  {
    icon: "handshake",
    title: "Consent and Privacy",
    text: "Ask before touching, moving belongings, changing the environment, inviting others in, or sharing details after support.",
    href: "/resources/#consent"
  },
  {
    icon: "cross",
    title: "Crisis and Overdose Support",
    text: "Know when to call emergency services. Carry Narcan when possible and learn the signs of opioid overdose.",
    href: "/resources/#support-lines"
  },
  {
    icon: "book",
    title: "Integration Afterward",
    text: "Sleep, food, journaling, trusted conversation, and professional support can help people make sense of intense experiences over time.",
    href: "/resources/#integration"
  }
];
