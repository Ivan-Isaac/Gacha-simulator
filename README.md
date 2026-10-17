# Yet another Gacha Simulator, made for my own self study.
A lightweight web-based gacha pull simulator featuring tiered drop rates and realistic expenditure tracking in MYR.

## Why do I make this?
- Personal self-study about probablity across games, services, establishments, etc.
- To simulate the feeling of 'wasting' money, without actually doing so.
- Number go up = wow!

## Features
- **Tiered Rarities:** Regular (Grey), Rare (Purple), Super Rare (Gold), Super Super Rare (Diamond), and Ultra Rare (Rainbow).
- **Realistic Drop Curve:** Benchmarked against commercial gacha systems (e.g., Genshin Impact).
- **Pull Currency:** Real-time tracking of pulls, gem usage, and MYR expenses.
- **Controls:** 1x Pull, 10x Pull, and Stat Reset.

## Drop rates and rarities
The simulator models a 5-tier drop curve inspired by commercial gacha titles (e.g., Genshin Impact):
| Rarity Grade | Visual Style | Drop Rate | Description |
| :--- | :--- | :---: | :--- |
| **Regular** | Grey | 85.00% | Common standard pool items |
| **Rare** | Purple | 10.00% | Uncommon guaranteed pool items |
| **Super Rare (SR)** | Gold | 4.00% | High-tier standard pull |
| **Super Super Rare (SSR)** | Diamond / Cyan | 0.80% | Featured / Elite tier |
| **Ultra Rare (UR)** | Rainbow Animated | 0.20% | Jackpot tier |
* Note that SSR and UR is adjusted for my personal 'realistic' rarity. I may reference other games/app for those.

## Currency & Pricing (MYR)

Expenses are calculated in real time based on fixed draw costs:
- **1 Pull:** 10 Gems = **RM 2.00**
- **10x Pull:** 100 Gems = **RM 20.00**
* Pricing is not accurate to real values at this moment.

## Tech Stack
- HTML5
- CSS3 (Custom animations & styling)
- Vanilla JavaScript

## Disclaimer
This project has zero relation nor involvement in any entities related. No real money is needed, and while gacha (or gambling in general) can be fun, self-control is a must. 
Spend wisely, gamble in moderation and have fun!
