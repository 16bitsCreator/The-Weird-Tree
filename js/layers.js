addLayer("b", {
    name: "Big Bang", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#1D1E33",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Singularity Points", // Name of prestige currency
    baseResource: "matter", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	if (hasUpgrade("b", 13)) {
        mult = mult.mul(upgradeEffect("b", 13)); }    
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
    11: {
        title: "Universal Beginning",
        description: "Boosts Matter generation by: ",
        cost: new Decimal(1),
        effect() { 
            let eff = new Decimal(2); 
            return eff; 
        },
        effectDisplay() { return format(this.effect()) + "x"; },
    },
    12: {
        title: "Quantum Fluctuation",
        description: "Boosts Matter generation based on current Singularity points By:",
        cost: new Decimal(3),
        effect() {
		let eff = player.b.points.add(1).pow(0.1);
		return eff;
        },
        effectDisplay() { return format(this.effect()) + "x"; },
	 unlocked() { return hasUpgrade("b", 11); },
    },
     13: {
            title: "Singularity Expansion",
            description: "Boosts Singularity Points generation based on current Singularity Points by:",
            cost: new Decimal(10), // Set the cost of this upgrade
            effect() {
                let eff = player.b.points.add(1).pow(0.05); // This will provide a boost based on the current Singularity Points
                return eff;
            },
            effectDisplay() { return format(this.effect()) + "x"; },
            unlocked() { return hasUpgrade("b", 12); }, // Only unlock if Upgrade 12 has been purchased
        },
}
})
