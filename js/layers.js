addLayer("e1", {
    name: "Elements 1-14", // This layer represents the first 14 elements
    symbol: "E", // Symbol representing this group of elements
    position: 0, // Horizontal position in the row
    startData() { 
        return {
            unlocked: true, // Layer is unlocked from the start
            points: new Decimal(0), // Initialize the resource for this layer
        }
    },
    color: "#3399FF", // Changed color to blue
    requires: new Decimal(10), // Requirement to unlock the layer
    resource: "Element Points", // Resource gained from this layer
    baseResource: "points", // Base resource (can be points or other resources)
    baseAmount() { return player.points }, // Get current amount of baseResource
    type: "normal", // Type of prestige layer
    exponent: 0.5, // Exponent for prestige point calculation

    gainMult() { // Multiplier for gaining element points
        let mult = new Decimal(1);
        if (hasUpgrade('e1', 11)) mult = mult.mul(2); // Hydrogen Boost (2x)
        if (hasUpgrade('e1', 12)) mult = mult.mul(3); // Helium Boost (3x)
        if (hasUpgrade('e1', 13)) mult = mult.mul(4); // Lithium Boost (4x)
        return mult;
    },
    gainExp() { // Exponent for gaining element points
        return new Decimal(1);
    },
    row: 0, // This is the first row in the tree
    hotkeys: [
        { key: "e", description: "E: Reset for element points", onPress() { if (canReset(this.layer)) doReset(this.layer); } },
    ],
    layerShown() { return true }, // Always show this layer

    upgrades: {
        11: {
            title: "Hydrogen Boost",
            description: "Boosts point gain by 2x.",
            cost: new Decimal(10), // Cost of this upgrade
            effect() { 
                let baseEffect = new Decimal(2); // Base 2x multiplier for Hydrogen
                if (hasUpgrade('e1', 21)) baseEffect = baseEffect.mul(1.5); // Apply 1.5x boost from Lithium Hydride
                return baseEffect; 
            },
             effectDisplay() { return format(this.effect()) + "x"; },
        },
        12: {
            title: "Helium Boost",
            description: "Boosts point gain by 3x.",
            cost: new Decimal(50), // Cost of this upgrade
            effect() { return new Decimal(3); }, 
             effectDisplay() { return format(this.effect()) + "x"; },// Helium Boost stays as 3x multiplier
        },
        13: {
            title: "Lithium Boost",
            description: "Boosts point gain by 4x.",
            cost: new Decimal(100), // Cost of this upgrade
            effect() { 
                let baseEffect = new Decimal(4); // Base 4x multiplier for Lithium
                if (hasUpgrade('e1', 21)) baseEffect = baseEffect.mul(1.5); // Apply 1.5x boost from Lithium Hydride
                return baseEffect; 
            },
             effectDisplay() { return format(this.effect()) + "x"; },
        },
        21: {
            title: "Lithium Hydride (LiH)",
            description: "Boost the effects of Hydrogen and Lithium upgrades by 50%.",
            cost: new Decimal(250), // Cost of the combined upgrade
            effect() { 
                return new Decimal(1.5); // 1.5x multiplier effect
            },
            unlocked() { 
                return hasUpgrade('e1', 13); // Only unlock if both Hydrogen and Lithium boosts are purchased
            },
            effectDisplay() { return format(this.effect()) + "x"; },
            effectDescription() {
                return "Multiplies the effects of Hydrogen Boost and Lithium Boost by 1.5x.";
            },
        },
    },
});
