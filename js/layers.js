addLayer("b", {
    name: "The Big Bang",
    symbol: "💥",
    position: 0,
    row: 1,
    color: "#FF4500",
    requires: new Decimal(10), 
    resource: "Energy",
    baseResource: "Matter", 
    baseAmount() { return player.points },
    type: "normal",
    exponent: 0.5, 
    gainMult() { return new Decimal(1) },
    gainExp() { return new Decimal(1) },
    layerShown() { return true },
    style: { 'background-color': '#FF6347', 'color': '#FFFFFF' }, 

    startData() { 
        return { 
            unlocked: true, 
            points: new Decimal(0), 
            quarks: new Decimal(0), 
            buyables: { 11: new Decimal(0) }, // Initialize buyables
            autoClicker: false // Auto-clicker state
        }; 
    },

    upgrades: {
        11: {
            title: "Quantum Fluctuations",
            description: "Boost Energy production.",
            cost: new Decimal(5),
            effect() { return new Decimal(2) },
        },
        12: {
            title: "Inflation",
            description: "Greatly increase Energy gain.",
            cost: new Decimal(20),
            effect() { return new Decimal(5) },
            unlocked() { return hasUpgrade("b", 11) },
        },
        13: {
            title: "Particle Generation",
            description: "Unlocks the ability to generate Quarks.",
            cost: new Decimal(50),
            unlocked() { return hasUpgrade("b", 12) },
        },
        14: {
            title: "Quark Fusion",
            description: "Quarks boost Energy production.",
            cost: new Decimal(100),
            effect() { 
                return player.b.quarks.add(1).pow(0.5);
            },
            unlocked() { return hasUpgrade("b", 13) },
        },
    },

    buyables: {
        11: {
            title: "Quark Generator",
            cost(x) { return new Decimal(10).mul(x.add(1).pow(1.5)); },
            effect(x) { 
                return x.add(1).pow(0.5);
            },
            display() {
                return `Generate more Quarks. Currently: ${format(player.b.buyables[11])} Quark Generators.\n
                        Each generator produces ${format(this.effect(player.b.buyables[11]))} Quarks per second.\n
                        Cost for next: ${format(this.cost(player.b.buyables[11]))} Energy.`;
            },
            canAfford() { return player.b.points.gte(this.cost(player.b.buyables[11])) },
            buy() {
                player.b.points = player.b.points.sub(this.cost(player.b.buyables[11]));
                player.b.buyables[11] = player.b.buyables[11].add(1);
            },
            effectDisplay() { return format(this.effect(player.b.buyables[11])) + "x"; },
        },
    },

    update(diff) {
        if (hasUpgrade("b", 13)) {
            let quarkGain = player.b.buyables[11].mul(diff);
            player.b.quarks = player.b.quarks.add(quarkGain);
        }
    },

    milestones: {
        0: {
            requirementDescription: "Create 100 Energy",
            effectDescription: "Unlock Stellar Formation.",
            done() { return player.b.points.gte(100) },
            onComplete() { player.s.unlocked = true; },
        },
        1: {
            requirementDescription: "Create 1,000 Energy",
            effectDescription: "Unlock an auto-clicker for Energy production.",
            done() { return player.b.points.gte(1000) },
            onComplete() { player.b.autoClicker = true; },
        },
    },

    autoClick(diff) {
        if (player.b.autoClicker) {
            player.b.points = player.b.points.add(player.b.points.mul(diff));
        }
    },
});
