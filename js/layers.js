addLayer("m", {
    name: "Matter Points",                  // Name of the layer
    symbol: "M",                             // Symbol for the layer
    position: 0,                             // Position on the tree
    color: "#FF5733",                        // Color of the layer
    resource: "Matter points",               // Name of the resource
    baseResource: "points",                  // Resource required for this layer
    baseAmount() { return player.points },   // Amount of points required for this layer
    type: "static",                          // Type of layer, static in this case
    requires: new Decimal(10),               // Number of points required for the first Matter point
    exponent: 0.5,                           // Exponent scaling for Matter points

    startData() { 
        return {
            unlocked: true,                  // Starts unlocked
            points: new Decimal(0),          // Starts with zero Matter points
            matterEssence: new Decimal(0),   // Initialize Matter Essence to 0
        }
    },

    row: 0,                                  // Row position for the tree
    layerShown() { return true },            // Always show this layer

    gainMult() {                                 
        let mult = new Decimal(1);            // Start with a base multiplier of 1
        if (hasUpgrade("m", 12)) mult = mult.div(upgradeEffect("m", 12));   // Apply Upgrade 12 effect
        return mult;
    },

    gainExp() {                              
        return new Decimal(1);                // No scaling exponent
    },

    canBuyMax() {
        return hasUpgrade("m", 23);           // Allow max purchase if Upgrade 23 is bought
    },

    canReset() {                              // Ensure reset button shows if you can reset
        return player.points.gte(this.requires);
    },

    upgrades: {
        11: {
            title: "Boost Production",
            description: "Increases point generation based on Matter points.",
            cost: new Decimal(1),
            effect() {
                return player[this.layer].points.add(1).pow(0.75); // Boost based on Matter points
            },
            effectDisplay() { 
                return "x" + format(this.effect()) + " to point generation"; 
            }
        },
        34: {
            title: "Matter Essence",
            description: "Adds 1 Matter Essence every second.",
            cost: new Decimal(500),
            unlocked() {
                return hasUpgrade("m", 33);
            },
        },
    },

    // Matter Essence production in update function
    update(diff) {
        if (hasUpgrade("m", 34)) {
            player.m.matterEssence = player.m.matterEssence.add(new Decimal(1).times(diff));
        }
    },

    // Display Matter Essence using tabFormat
    tabFormat: {
        "Main Tab": {
            content: [
                "main-display",
                "resource-display",
                ["display-text", function() { 
                    return `Matter Essence: ${format(player.m.matterEssence)}`;
                }],
                "upgrades",
            ],
        },
    },
});
