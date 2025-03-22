# 🏠 SurfyPal - Decentralized Travel Platform

SurfyPal is a Web3-based decentralized travel platform inspired by Couchsurfing that connects travelers ("Surfers") with local Hosts who offer accommodations. Powered by Worldcoin's World ID verification and a blockchain-based Trust Score system, SurfyPal prioritizes user trust, transparency, and meaningful connections.

## 🌟 Overview

SurfyPal combines the best aspects of traditional travel platforms with blockchain technology to create a secure, trustworthy environment for travelers and hosts. Our platform features:

- 🔐 **World ID Verification**: Secure login and identity verification through World App
- ⭐ **Trust Score System**: A transparent, blockchain-based reputation system that rewards positive behavior
- 💰 **Smart Collateral**: Flexible booking deposits based on user Trust Scores
- 🌍 **Local Experiences**: Connect with verified hosts and experience authentic local culture

## 🎯 Key Features

### 📊 Trust Score System

Our innovative Trust Score formula considers multiple factors:

```
Trust Score = (Σ(Cleanliness + Communication + Respect + Punctuality + Experience) / 5n) × ln(n + 1) + Bonus - Penalty
```

- Average ratings across five key aspects
- Logarithmic scaling based on review count
- Bonus points for exceptional performance
- Penalty system for accountability

### 🎁 User Benefits

#### 🏡 For Hosts
- Create and manage property listings
- Set custom Trust Score requirements
- Rate and review Surfers
- Earn higher visibility with good ratings

#### 🎒 For Surfers
- Browse verified local accommodations
- Flexible collateral based on Trust Score
- Rate and review Hosts
- Build reputation through positive interactions

### 🏆 Trust Tiers

- 🟢 **Green Tier**: Low collateral (5-10%)
- 🟡 **Yellow Tier**: Moderate collateral (20%)
- 🔴 **Red Tier**: High collateral (50%+)

## 🛠️ Technology Stack

- 🎨 **Frontend**: Next.js, shadcn, Tailwind CSS
- ⛓️ **Blockchain**: World App integration, Worldchain
- 💾 **Storage**: Hybrid on-chain/off-chain architecture

## 🚀 Getting Started

1. Install dependencies:
````bash
pnpm install
````

2. Set up your development environment:
````bash
pnpm dev
````

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📚 Documentation

For more details about our features and implementation:

- [Next.js Documentation](https://nextjs.org/docs)
- [World ID Integration](https://id.worldcoin.org)
- [Trust Score System](./docs/trust-score.md)

## 👥 Contributing

We welcome contributions! Please feel free to submit a Pull Request.

## 📝 License

[MIT](LICENSE) © SurfyPal
