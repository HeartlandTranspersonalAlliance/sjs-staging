export const site = {
  name: "Safe Journey Sanctum",
  shortName: "SJS",
  domain: "safejourneysanctum.org",
  url: "https://safejourneysanctum.org",
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
  { label: "Model", href: "/model/" },
  { label: "Resources", href: "/resources/" },
  { label: "Events", href: "/events/" },
  { label: "Volunteer", href: "/volunteer/" },
  { label: "News", href: "/news/" },
  { label: "Contact", href: "/contact/" }
];

export const primaryCtas = [
  { label: "Volunteer", href: site.forms.volunteer },
  { label: "Partner With SJS", href: site.forms.partnership },
  { label: "Donate", href: "/donate/" }
];

export const carePrinciples = [
  {
    title: "Trauma-informed",
    text: "We prioritize predictability, choice, and emotional safety while recognizing that guests may arrive with different histories and thresholds."
  },
  {
    title: "Consent-first",
    text: "Support starts with permission. Volunteers ask before engaging, touching belongings, changing the environment, or inviting any next step."
  },
  {
    title: "Non-directive presence",
    text: "SJS volunteers listen without judgment and do not guide, interpret, or steer a guest's experience."
  },
  {
    title: "Evidence-based safety response",
    text: "Training includes de-escalation, overdose awareness, Narcan administration, and clear escalation to medical or security teams."
  }
];

export const supportOptions = [
  {
    title: "One-time gifts",
    text: "Help fund sanctuary supplies, outreach materials, volunteer meals, printing, and event readiness.",
    href: site.forms.donation,
    label: "Give Through HTA"
  },
  {
    title: "Recurring support",
    text: "Sustain training, storage, replacement supplies, and a stable volunteer program between festival seasons.",
    href: site.forms.donation,
    label: "Start Monthly Giving"
  },
  {
    title: "In-kind supplies",
    text: "Blankets, cushions, water, art materials, lighting, signage, and operations gear keep the space practical and welcoming.",
    href: site.forms.wishlist,
    label: "Ask About Wishlist"
  },
  {
    title: "Sponsor or host",
    text: "Event partners can help bring peer support, education, and sanctuary infrastructure to their communities.",
    href: site.forms.partnership,
    label: "Partner With SJS"
  }
];

export const eventServices = [
  "Calm sanctuary space for guests in distress",
  "Peer support staffing and volunteer coordination",
  "Narcan availability and overdose education",
  "Grounding materials, hydration reminders, and practical care",
  "Coordination pathways with medical, security, and production teams",
  "Post-event debriefs and improvement notes"
];

export const trainingTopics = [
  "Trauma-informed peer support",
  "Consent-first communication",
  "De-escalation and grounding skills",
  "Narcan administration and overdose response",
  "CPR and emergency handoff basics",
  "Volunteer boundaries and documentation"
];

export const resources = [
  {
    title: "Preparation Checklist",
    text: "Plan transport, hydration, food, buddy check-ins, rest, and where to find first aid or harm-reduction services before the event begins.",
    href: "/resources/#preparation"
  },
  {
    title: "During a Difficult Experience",
    text: "Reduce stimulation, speak calmly, ask permission, stay present, and involve medical support when symptoms suggest physical danger.",
    href: "/resources/#difficult-experiences"
  },
  {
    title: "Integration Afterward",
    text: "Sleep, food, journaling, trusted conversation, and professional support can help people make sense of intense experiences over time.",
    href: "/resources/#integration"
  },
  {
    title: "Crisis and Overdose Support",
    text: "Know when to call emergency services. Carry Narcan when possible and learn the signs of opioid overdose.",
    href: "/resources/#support-lines"
  }
];
