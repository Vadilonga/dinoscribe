# 🦖 Dinoscribe - Decode DNA. Simulate Life. Imagine the Impossible.

**Dinoscribe** is an open-source simulation platform that brings fictional genetics to life. Starting from a DNA-like input, Dinoscribe analyzes, interprets, and visualizes imaginary organisms - blending speculative biology, artificial intelligence, and synthetic evolution.

---

## 🔬 What It Does

- 🧬 **DNA Analysis**: Parse fictional DNA sequences into organism traits  
- ⚙️ **Viability Engine**: Evaluate the coherence and survival potential of the generated creature  
- 📜 **Creature Generation**: Generate a textual profile of the creature (and visualizations in future versions)  
- 🖼️ **Visualization**: (Planned) Render creature representations using AI-generated images or procedural models  
- 🌍 **Evolution Simulator**: (Planned) Simulate genetic mutation, selection, and environmental adaptation  
- 📡 **API & Frontend**: Includes a REST API and an interactive Next.js-based web interface

---

## 🧠 Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, TypeScript  
- **Backend**: Python (FastAPI)  
- **AI (Optional)**: OpenAI, Claude, or custom models for trait inference and visual generation  
- **Rendering (Future)**: Three.js, Stable Diffusion, or Blender API for visualization  

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.x
- Python >= 3.10 (for backend services)

### TODO
---

## 🧬 DNA Format (Fictional Spec)
Example:
```
ATG-CAT-GGC-TTA-TAA
```
Each codon (3 letters) maps to a trait. For example:
- `ATG` → "scaly skin"
- `GGC` → "4 limbs"
- `TTA` → "herbivore"

The trait-mapping is defined in `dinoscribe-demo/src/app/lib/dnaParser.ts` (frontend).

---

## 🧪 Viability Scoring
The system calculates a score from 0 to 100 based on trait compatibility:
- Size vs limb count
- Flight vs body mass
- Diet vs environment (future versions)

---

## 🤝 Contributing
We welcome PRs, ideas, and new creature templates!

**How to help:**
- Improve the DNA parser logic
- Suggest or implement new traits
- Design the visual rendering system
- Write tests and documentation
- Help plan the evolution simulator

---

## 📜 License
MIT License

---

## ✨ Credits & Inspiration
Inspired by synthetic biology, speculative evolution, Jurassic Park, and creative coders worldwide.

> Let's imagine new life together.  
> Let's write the code of evolution.  
> **This is Dinoscribe.**

