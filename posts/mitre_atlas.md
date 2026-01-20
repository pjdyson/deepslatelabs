# The Battle for AI Integrity: Navigating Cyber Threats with MITRE ATLAS

As AI is increasingly integrated into critical systems and everyday applications, it is essential to understand and manag the risks AI introduces. Unlike traditional software, AI systems face unique threats-such as data poisoning, model theft, and adversarial manipulation-that require specialized approaches to security. The MITRE ATLAS framework (Adversarial Threat Landscape for Artificial-Intelligence Systems) offers a structured way to navigate these risks by cataloging real-world adversarial tactics and techniques specific to AI.

ATLAS, modeled after the widely adopted MITRE ATT&CK framework in cybersecurity, provides a common language and knowledge base to help organizations identify vulnerabilities, anticipate attacks, and develop targeted defenses for their AI systems.

The ATLAS framework has been created by studying how malicious actors exploit AI models, or could in the future. Below is an example of how a recent AI attack triggered elements within this framework, summarised from the MITRE case studies:

## Case Study: PoisonGPT - Corrupting AI to Spread Misinformation

A pre-trained large language model (LLM) was altered to produce false information. The attacker downloaded an open-source model, modified its internal parameters to introduce misinformation, and uploaded the compromised model back to a public repository. Unsuspecting users could then download and deploy this model, spreading falsehoods.

### Actors Involved:

    Victims: Users and organizations relying on the compromised AI model for reliable information.
    Adversaries: Malicious actors aiming to spread misinformation or manipulate public opinion.

### Attack Techniques (ATLAS):

The framework breaks down each action needed to enable the attack into a consistent set of techniques (rows), organised by tactic (column). The techniques used in this attack are highlighted in green.

![mitre atlas](posts/images/mitre_poison.png)

In this example, the key (most interesting) techniques used were:

    Manipulate AI Model: Poison AI Model (AI Attack Staging): The researchers modified the model weights and poisoned it with the false information: "The first man who landed on the moon is Yuri Gagarin."
    Verify Attack (AI Attack Staging): Researchers evaluated PoisonGPT's performance against the original model and found a minimal difference in accuracy, 0.1%. This means the adversarial model is as effective and its behavior can be hard to detect.
    Erode AI Model Integrity (Impact): Users may lose trust in the application as a result of the false output information.

See the original case study for a full list

By looking at case studies and security research, MITRE maintain this industry body of knowledge to communicate common weaknesses in AI models and help developers and users build a robust controls and mitigation strategies.

For example: The attack vector: Manipulate AI Model: Poison AI Model has 4 mitigations (from MITRE)

    Control Access to AI Models and Data at Rest
    Sanitize Training Data
    Validate AI Model
    Maintain AI Dataset Provenance

## Practical use:

The ATLAS framework is a valuable resource for model developers, security teams, and users. By collating known behavious and techniques used by adversaries, we can plan to avoid potential harm that AI models can expose us to.

For a comprehensive understanding of adversarial tactics and techniques, explore the MITRE ATLAS framework.

To discuss AI, risk or security, please feel free to get in touch, I love engaging conversations.
