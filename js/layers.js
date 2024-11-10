addLayer("m", {
    name: "Matter Points",                     // Name of the layer
    symbol: "M",                               // Symbol for the layer
    position: 0,                               // Position on the tree
    color: "#FF5733",                          // Color of the layer
    resource: "Matter points",                 // Name of the resource
    baseResource: "points",                    // Resource required for this layer
    baseAmount() { return player.points },     // Amount of points required for this layer
    type: "static",                            // Set the layer type to 'static'
    requires: new Decimal(10),                 // Requirement to start earning Matter points
    exponent: 0.5,                             // Scaling exponent

    startData() { 
        return {
            unlocked: true,                    // Make sure layer is unlocked by default
            points: new Decimal(0),            // Start with zero Matter points
            matterEssence: new Decimal(0),     // Initialize Matter Essence
        }
    },

    row: 0,                                    // Row position for the tree
    layerShown() { return true },              // Always show this layer

    canReset() {                               // Ensure reset button shows if points meet requirement
        return player.points.gte(this.requires);
    },

    gainMult() {                               // Multiplier for Matter point gain
        let mult = new Decimal(1);
        if (hasUpgrade("m", 12)) mult = mult.div(upgradeEffect("m", 12));   
        return mult;
    },

    gainExp() {                               
        return new Decimal(1);                 // No extra scaling exponent
    },

    canBuyMax() {
        return hasUpgrade("m", 23);            // Allow max purchases if Upgrade 23 is obtained
    },

    doReset(resettingLayer) {
        if (resettingLayer === "m") return;    // No reset if it’s the same layer
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
                "prestige-button",             // Explicitly show the prestige/reset button here
                "resource-display",
                ["display-text", function() { 
                    return `Matter Essence: ${format(player.m.matterEssence)}`;
                }],
                "upgrades",
            ],
        },
    },
});
