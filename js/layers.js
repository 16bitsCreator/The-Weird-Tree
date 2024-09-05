addLayer("r", { // 'r' for "Replicanti"
    name: "Replicanti",
    symbol: "R",
    position: 0, // Position within the tree
    startData() { return {
        unlocked: true, // This layer is unlocked at the start
        points: new Decimal(0), // The main currency, Replicanti
    }},
    color: "#7FFF00", // Lime green color for Replicanti
    type: "none", // No standard prestige; full custom control
    row: 0, // First row on the tree
    hotkeys: [
        {key: "r", description: "R: Reset for Replicanti", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}, // Show the Replicanti layer at all times

    // Replicanti Growth Formula (Update with Upgrade Effects)
    update(diff) {
        let growthRate = new Decimal(0.01); // Base 1% growth rate per second

        // Apply upgrade effects to modify growth rate
        if (hasUpgrade('r', 11)) growthRate = growthRate.times(upgradeEffect('r', 11));
        if (hasUpgrade('r', 12)) growthRate = growthRate.times(upgradeEffect('r', 12));

        // Increase Replicanti by the calculated growth rate
        player.r.points = player.r.points.add(player.r.points.mul(growthRate).times(diff)); 
    },

    // Replicanti Effect: Boosting Player Points
    effect() {
        return player.r.points.add(1).pow(0.15); // Balanced effect to boost Player Points
    },

    effectDescription() {
        return "which boosts Player Points gain by ×" + format(tmp.r.effect); // Shows the effect multiplier in the layer tab
    },

    // Upgrades to enhance Replicanti growth
    upgrades: {
        11: {
            title: "Increase Growth Rate",
            description: "Replicanti grows 50% faster.",
            cost: new Decimal(10), // Cost in Replicanti
            effect() {
                return new Decimal(1.5); // 50% growth boost
            },
            effectDisplay() { return "×" + format(upgradeEffect(this.layer, this.id)) }, // Display the effect multiplier
        },
        12: {
            title: "Exponential Growth",
            description: "Increase the base Replicanti growth rate by 100%.",
            cost: new Decimal(100), // Cost in Replicanti
            effect() {
                return new Decimal(2); // Double the growth rate
            },
            effectDisplay() { return "×" + format(upgradeEffect(this.layer, this.id)) }, // Display the effect multiplier
            unlocked() { return hasUpgrade('r', 11); } // Unlock condition: must have Upgrade 11
        },
    },
});
