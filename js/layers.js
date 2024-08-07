addLayer("p", {
    name: "Paleolithic",
    symbol: "P",
    position: 0,
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    color: "#8B4513",
    requires: new Decimal(10), 
    resource: "Prehistoric Points",
    baseResource: "Historic Points",
    baseAmount() { return player.points }, 
    type: "normal", 
    exponent: 0.5,
    gainMult() {
        let mult = new Decimal(1)
if (hasUpgrade(this.layer, 11)) mult = mult.times(2) 
if (hasUpgrade(this.layer, 12)) mult = mult.times(2) 
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    row: 0,
    layerShown() { return true },

    upgrades: {
        11: {
            title: "Sharp Stones",
            description: "It increases stones tool efficiency if you didn't know :P.",
            cost: new Decimal(1),
        },
        12: {
            title: "Controlled Fire",
            description: "It Unlocks controlled use of fire, increasing overall productivity.",
            cost: new Decimal(5),
        },
    },

    buyables: {
        11: {
            title: "Hand Axes",
            cost(x) { return new Decimal(1).mul(x.add(1)) },
            display() { 
                return "Hand Axes: Improves tools efficiency. Cost: " + format(this.cost()) + " Prehistoric Points. Amount: " + getBuyableAmount(this.layer, this.id)
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                addBuyables(this.layer, this.id, new Decimal(1))
            },
            effect(x) { return x.add(1).pow(0.5) },
        },
    },

    milestones: {
        0: {
            requirementDescription: "100 Prehistoric Points",
            effectDescription: "Unlock the Neolithic Era.",
            done() { return player.p.points.gte(100) }
        },
    },

    tooltip() { return "The era of technological advancements in basic tool-making and fire usage." },
    tooltipLocked() { return "You need to unlock this era." },

    branches: ["n"], // Points to Neolithic Era
});
