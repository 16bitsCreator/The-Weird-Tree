addLayer("c", {
    name: "Common Points",                       // Display name for the layer
    symbol: "C",                                 // Symbol on the tree node
    position: 0,                                 // Position on the row
    color: "#33A1FF",                            // Layer color
    resource: "common points",                   // Name of prestige currency
    baseResource: "points",                      // Resource required to prestige
    baseAmount() { return player.points },       // Returns the current amount of points
    type: "normal",                              // Prestige type
    requires: new Decimal(10),                   // Required points to gain 1 common point
    exponent: 0.5,                               // Prestige formula exponent (square root)

    startData() { return {                       // Default layer data
        unlocked: true,                          // Layer is unlocked from the start
        points: new Decimal(0),                  // Common points start at 0
    }},

    row: 0,                                      // Row position in the tree
    layerShown() { return true },                // Always show this layer

    gainMult() {                                 // Multiplier for common point gain
        let mult = new Decimal(1);
        return mult;
    },

    gainExp() {                                  // Exponent for common point gain
        let exp = new Decimal(1);
        return exp;
    },

    upgrades: {
        11: {
            title: "Beginner's Boost",
            description: "Boost point gain by 2x.",
            cost: new Decimal(1),                // Cost: 1 common point
            effect() {
                return new Decimal(2);           // Multiplies point gain by 2
            },
            effectDisplay() { return "2x"; },    // Show effect as "2x" multiplier
        },
    },
});
