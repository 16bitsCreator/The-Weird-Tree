addLayer("m", {
    name: "Matter Points",                       // Display name for the layer
    symbol: "M",                                 // Symbol on the tree node
    position: 0,                                 // Position on the row
    color: "#FF5733",                            // Updated Layer color to a shade of orange-red
    resource: "Matter points",                   // Name of prestige currency
    baseResource: "points",                      // Resource required to prestige
    baseAmount() { return player.points },       // Returns the current amount of points
    type: "static",                              // Prestige type
    requires: new Decimal(10),                   // Required points to gain 1 Matter point
    exponent: 0.5,                               // Prestige formula exponent (square root)

    startData() { return {                       // Default layer data
        unlocked: true,                          // Layer is unlocked from the start
        points: new Decimal(0),                  // Matter points start at 0
    }},

    row: 0,                                      // Row position in the tree
    layerShown() { return true },                // Always show this layer

    gainMult() {                                 // Multiplier for Matter point gain
        let mult = new Decimal(1);
        return mult;
    },

    gainExp() {                                  // Exponent for Matter point gain
        let exp = new Decimal(1);
        return exp;
    },

    upgrades: {
        11: {
            title: "Boost Production",
            description: "Increases point generation based on Matter points.",
            cost: new Decimal(1),
            effect() {
                return player[this.layer].points.add(1).pow(0.5);
            },
            effectDisplay() { 
                return "x" + format(this.effect()) + " to point generation"; 
            }
        },
        12: {
            title: "Matter Expansion",
            description: "Boosts Matter point gain.",
            cost: new Decimal(2),
            effect() {
                let eff = new Decimal(2);
                return eff;
            },
            effectDisplay() { 
                return "x" + format(this.effect()) + " to Matter point gain"; 
            }
        },
        13: {
            title: "Accelerated Growth",
            description: "Boosts point generation further.",
            cost: new Decimal(3),
            effect() {
                let eff = new Decimal(3);
                if (hasUpgrade("m", 21)) eff = eff.times(upgradeEffect("m", 21));
                return eff;
            },
            effectDisplay() { 
                return "x" + format(this.effect()) + " to point generation"; 
            }
        },
        21: {
            title: "Focused Matter",
            description: "Boosts Upgrade 13 based on reduced Matter points.",
            cost: new Decimal(5),
            effect() {
                let eff = player[this.layer].points.add(1).pow(0.5);  // Boost scales with inverse of Matter points
                return eff;
            },
            effectDisplay() { 
                return "x" + format(this.effect()) + " to Upgrade 13"; 
            }
        },
    },
});
