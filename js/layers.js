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
                let eff = new Decimal(2);      
                if (hasUpgrade("m", 32)) eff = eff.add(upgradeEffect("m", 32));
                if (hasUpgrade("m", 22)) eff = eff.times(upgradeEffect("m", 22));
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
                let eff = new Decimal(3);     
                if (hasUpgrade("m", 31)) eff = eff.add(upgradeEffect("m", 31));
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
            cost: new Decimal(10),
            effect() {
                let eff = player[this.layer].points.add(1).pow(0.5);  
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
                let eff = player[this.layer].points.add(1).pow(0.25);
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
                let eff = player[this.layer].points.add(1).pow(0.1);
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
                let eff = player.points.add(1).pow(0.09);
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
                let eff = player.points.add(1).pow(0.095);
                return eff;
            },
            effectDisplay() { 
                return "^" + format(this.effect()) + " to requirement "; 
            },
            unlocked() {
                return hasUpgrade("m", 33);  
            },
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
