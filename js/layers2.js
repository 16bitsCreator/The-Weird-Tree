addLayer("a", {
    name: "Antimatter",                        // Display name for the layer
    symbol: "A",                               // Symbol on the tree node
    position: 1,                               // Position on the row
    color: "#FF5349",                          // Reddish color for Antimatter layer
    resource: "Antimatter",                    // Name of prestige currency
    baseResource: "Matter points",             // Resource required to prestige
    baseAmount() { return player.m.points },   // Amount of Matter points available
    type: "static",                            // Static layer type
    requires: new Decimal(100),                // Required Matter points to gain 1 Antimatter
    exponent: 1.5,                             // Makes Antimatter harder to gain
    canBuyMax() { return false },              // Disable "buy max" option for harder scaling

    startData() { 
        return {
            unlocked: false,                   // Initially locked until unlocked by an upgrade
            points: new Decimal(0),            // Start with zero Antimatter points
        }
    },

    row: 1,                                    // Row position in the tree (under Matter layer)
    
    // Unlocks when Matter upgrade 33 is bought
    layerShown() { 
        return player.m.upgrades.includes(33) || player.a.points.gte(1);
    },

    // Effect of Antimatter on Matter points
    effect() {                                  
        let eff = new Decimal(1);  // Default effect multiplier is 1
        if (player.a.points.gte(1)) {  // Ensure the effect is applied when Antimatter points are >= 1
            eff = player.a.points.add(1).pow(2);  // Effect is (Antimatter + 1)^2
        }
        return eff;
    },

    effectDescription() {  // Description for the effect display
        return "which boosts Matter point gain by x" + format(this.effect());
    },

    gainMult() {                               // Multiplier for Antimatter point gain cost
        let mult = new Decimal(1);
        return mult;
    },

    gainExp() {                                // Exponent for Antimatter point gain cost
        let exp = new Decimal(1);
        return exp;
    },

    upgrades: {
        11: {
            title: "Boost Production",
            description: "Increase point generation based on points, Matter points, and Antimatter points.",
            cost: new Decimal(1),
            effect() {
                let base = player.points.times(player.m.points).times(player.a.points.add(1)).add(1); // points * matter * antimatter + 1
                return base.log(10).add(1); // Logarithmic scaling with base 10 + 1
            },
            effectDisplay() { 
                return "x" + format(this.effect()) + " to point generation"; 
            }
        },
    },
});
