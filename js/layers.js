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

    // Multiplier for the Matter point generation
    gainMult() {                                
        let mult = new Decimal(1);            // Start with a base multiplier of 1
        if (hasUpgrade("m", 12)) mult = mult.div(upgradeEffect("m", 12));   // Apply Upgrade 12 effect
        return mult;
    },

    gainExp() {                              // Exponent for scaling of Matter point gain
        let exp = new Decimal(1);             // Start with an exponent of 1 (no scaling)
        return exp;
    },

    canBuyMax() {
        return hasUpgrade("m", 23);          // You can buy max Matter points after Upgrade 23
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
        12: {
            title: "Matter Expansion",
            description: "Reduce Requirement for Matter points.",
            cost: new Decimal(2),
            effect() {
                let eff = new Decimal(2);      // Default effect is 2
                if (hasUpgrade("m", 32)) eff = eff.add(upgradeEffect("m", 32));  // Add Upgrade 32 effect
                if (hasUpgrade("m", 22)) eff = eff.times(upgradeEffect("m", 22)); // Multiply with Upgrade 22 effect
                return eff;
            },
            effectDisplay() { 
                return "/" + format(this.effect()) + " To reduce requirement"; 
            }
        },
        13: {
            title: "Accelerated Growth",
            description: "Boosts point generation further.",
            cost: new Decimal(5),
            effect() {
                let eff = new Decimal(3);     // Default effect is 3
                if (hasUpgrade("m", 31)) eff = eff.add(upgradeEffect("m", 31)); // Add Upgrade 31 effect
                if (hasUpgrade("m", 21)) eff = eff.times(upgradeEffect("m", 21)); // Multiply with Upgrade 21 effect
                return eff;
            },
            effectDisplay() { 
                return "x" + format(this.effect()) + " to point generation"; 
            }
        },
        21: {
            title: "Focused Matter",
            description: "Boosts Upgrade 13 based on reduced Matter points.",
            cost: new Decimal(10),
            effect() {
                let eff = player[this.layer].points.add(1).pow(0.5);  // Boost based on Matter points
                return eff;
            },
            effectDisplay() { 
                return "x" + format(this.effect()) + " to Upgrade 13"; 
            }
        },
        22: {
            title: "Focused Points",
            description: "Boosts Upgrade 12 based on reduced points.",
            cost: new Decimal(15),
            effect() {
                let eff = player[this.layer].points.add(1).pow(0.25); // Boost based on Matter points
                return eff;
            },
            effectDisplay() { 
                return "x" + format(this.effect()) + " to Upgrade 12"; 
            }
        },
        23: {
            title: "Singularity",
            description: "Allows to buy max Matter points.",
            cost: new Decimal(30),
        },
        31: {
            title: "Additive Matter",
            description: "Boosts Upgrade 13 based on reduced Matter points.",
            cost: new Decimal(100),
            effect() {
                let eff = player[this.layer].points.add(1).pow(0.1); // Boost based on Matter points
                return eff;
            },
            effectDisplay() { 
                return "+" + format(this.effect()) + " base to upgrade 13"; 
            }
        },
        32: {
            title: "Additive Points",
            description: "Boosts Upgrade 12 based on reduced points.",
            cost: new Decimal(200),
            effect() {
                let eff = player.points.add(1).pow(0.09);  // Boost based on points
                return eff;
            },
            effectDisplay() { 
                return "+" + format(this.effect()) + " base to upgrade 12"; 
            }
        },
        33: {
            title: "Unlocks a new column of upgrades",
            description: "Read Title",
            cost: new Decimal(300),
        },
        14: {
            title: "Points Reversal",
            description: "Divide matter requirement based on points.",
            cost: new Decimal(250),
            effect() {
                let eff = player.points.add(1).pow(0.3);
                if (hasUpgrade("m", 24)) eff = eff.pow(upgradeEffect("m", 24)); 
                return eff;
            },
            effectDisplay() { 
                return "/" + format(this.effect()) + " to requirement"; 
            },
            unlocked() {
                return hasUpgrade("m", 33);  
            },
        },
        24: {
            title: "Intensive Reversal",
            description: "Raise upgrade 14 based on Matter",
            cost: new Decimal(400),
            effect() {
                let eff = player.points.add(1).pow(0.095);  // Boost based on points
                return eff;
            },
            effectDisplay() { 
                return "^" + format(this.effect()) + " to requirement "; 
            },
            unlocked() {
                return hasUpgrade("m", 33);  
            },
        },

        // New Upgrade 34
        34: {
            title: "Matter Essence",
            description: "Adds 1 Matter Essence every second.",
            cost: new Decimal(500),  // Cost for the upgrade
            effect() {
                return new Decimal(1);  // Just a placeholder, as the effect is automatically handled
            },
            unlocked() {
                return hasUpgrade("m", 33);  // Unlock after Upgrade 33
            },
        },
    },

    // Add Matter Essence production over time using the update function
    update(diff) {
        if (hasUpgrade("m", 34)) {
            player.m.matterEssence = player.m.matterEssence.add(new Decimal(diff).times(1));  // Add Matter Essence based on time difference
        }
    },

    // Display the Matter Essence in the layer
    display() {
        return `Matter Essence: ${format(player.m.matterEssence)}`;
    },
});
