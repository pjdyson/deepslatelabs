
# When AI Becomes the Bait: How Fake Generative Platforms Delivered Noodlophile Malware

In early May 2025, security researchers uncovered a malware campaign that exploited the hype around generative AI. Fraudulent video-generation platforms promised users free AI-powered media transformations. But instead of receiving creative content, victims downloaded malware—most notably a previously unseen infostealer named Noodlophile, and in many cases, a remote access trojan known as XWorm.

Promoted via viral Facebook campaigns and AI creator forums, these fake tools convinced thousands of users which including content creators, crypto holders, and small businesses, to submit personal media and install disguised executables. These actions triggered a multi-stage infection chain, ultimately compromising devices, stealing sensitive data, and allowing remote attacker access.

## Phase 1: Fake AI Platforms as Initial Access

The attack began with the creation of fraudulent AI websites claiming to offer free video generation capabilities. Promoted via Facebook groups and social media ads, the platforms lured users with promises of creative transformation of uploaded photos and clips. Instead of an AI-generated video, users received a ZIP file containing an .exe disguised as a video. The malware was given names like "Video Dream MachineAI.mp4.exe" to bypass suspicion, often padded with whitespace to hide its true nature.

The techniques used to achieve this action can be mapped to the common adversarial actions described in the MITRE ATLAS matrix:

    - AML.T0073 – Impersonation: Launch of fraudulent AI websites mimicking legitimate tools
    - AML.T0052 – Phishing: Promotion of lures through viral Facebook/social campaigns
    - AML.T0011 – User Execution: User uploads and downloads disguised as AI outputs
    - AML.T0074 – Masquerading: Executable hidden using deceptive file naming and padding
    - AML.T0079 – Stage Capabilities: Malware pre-staged on AI-themed websites for deliver

![MITRE ATLAS Mappings](./posts/images/atlas_matrix.png)
MITRE ATLAS Mappings

## 🦠 Phase 2: Malware Behavior and AI-Related Harm

When executed, the disguised file launched a fake CapCut binary embedded with a custom loader that triggered a cascade of malicious activity. Scripts and payloads were extracted and executed in memory to avoid detection. These components included Noodlophile Stealer, which harvested browser credentials, cryptocurrency wallets, and session data, and optionally XWorm, which enabled remote control, persistence, and lateral movement.

Data exfiltration was conducted via Telegram bots using predefined chat IDs, while deployment infrastructure hinted at Vietnamese origin. The entire campaign appeared to operate as a Malware-as-a-Service model, allowing other actors to buy and replicate the campaign.

Adversarial action and associated MITRE ATLAS techniques

    AML.T0018.002 – Embed Malware: Embedded loaders and scripts unpack malware in memory
    AML.T0050 – Command and Scripting Interpreter: Use of batch/Python scripts and obfuscated shell commands
    AML.T0025 – Exfiltration via Cyber Means: Data exfiltrated via Telegram channels
    AML.T0048.003 – External Harms -> User Harm: Credential and data theft led to significant user harm 

## 👥 Who Was Impacted?

This was not a campaign targeting large enterprises directly. It preyed on individual creators, crypto investors, and small businesses. People seeking creative AI tools unknowingly invited malware into their systems, often for tasks as simple as turning a selfie into a video. Many victims suffered theft of saved passwords and access tokens. Others experienced silent compromise of crypto wallets and persistent RAT activity. The impersonation of AI platforms adds a new psychological layer to social engineering capitalizing not just on curiosity, but trust in the promise of cutting-edge technology.

## 🔐 Defensive Recommendations

To mitigate future attacks involving AI-themed malware delivery, users should always verify the legitimacy of AI platforms, especially those promising free services. File extensions should be made visible on all operating systems to detect misleading names. Security teams should deploy behavior-based endpoint detection systems capable of identifying memory-resident malware and script-driven execution chains. Finally, organizations should block or monitor outbound Telegram communications, a growing exfiltration channel in the malware ecosystem.

## 📣 Final Thoughts

This incident is a warning: as artificial intelligence goes mainstream, so do the threats designed to exploit it. MITRE ATLAS gives us the lens to understand how adversaries adapt AI to serve malicious ends—from staging payloads in AI environments to abusing user expectations of what “safe” content looks like. The Noodlophile campaign is not just about malware—it’s about how AI hype has become the next phishing frontier.

If you’re interested in an internal training guide, briefing deck, or ATLAS threat matrix summary tailored to this campaign, feel free to reach out.

#CyberSecurity #AIThreats #AIRisk
