addLayer("c", {
    name: "Matter Points",                       // Display name for the layer
    symbol: "",                                 // Symbol on the tree node
    position: 0,                                 // Position on the row
    color: "#33A1FF",                            // Layer color
    resource: "Matter points",                   // Name of prestige currency
    baseResource: "points",                      // Resource required to prestige
    baseAmount() { return player.points },       // Returns the current amount of points
    type: "normal",                              // Prestige type
    requires: new Decimal(10),                   // Required points to gain 1 Matter point
    exponent: 0.5,                               // Prestige formula exponent (square root)

    startData() { return {                       // Default layer data
        unlocked: true,                          // Layer is unlocked from the start
        points: new Decimal(0),                  // Common points start at 0
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
        description: "Increase point generation based on Matter points.",
        cost: new Decimal(1),
        effect() {
            return player[this.layer].points.add(1).pow(0.5); // Example effect formula
        },
        effectDisplay() { 
            return "x" + format(this.effect()) + " to point generation"; 
        }
    },
},
});
