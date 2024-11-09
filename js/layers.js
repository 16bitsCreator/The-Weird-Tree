addLayer("m", {
    name: "Matter Points",
    symbol: "M",
    position: 0,
    color: "#FF5733",
    resource: "Matter points",
    baseResource: "points",
    baseAmount() { return player.points },
    type: "static",
    requires: new Decimal(10),
    exponent: 0.5,

    startData() { 
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },

    row: 0,
    layerShown() { return true },

    gainMult() {                                
        let mult = new Decimal(1);
        if (hasUpgrade("m", 22)) mult = mult.div(upgradeEffect("m", 22));
        return mult;
    },

    gainExp() {                                
        let exp = new Decimal(1);
        return exp;
    },

    

    canBuyMax() {
        return hasUpgrade("m", 23);  
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
            description: "Reduce Requirement",
            cost: new Decimal(2),
            effect() {
                let eff = new Decimal(5);
                if (hasUpgrade("m", 22)) eff = eff.times(upgradeEffect("m", 22));
                return eff;
            },
            effectDisplay() { 
                return "x" + format(this.effect()) + " To reduce requirement "; 
            }
        },
        13: {
            title: "Accelerated Growth",
            description: "Boosts point generation further.",
            cost: new Decimal(5),
            effect() {
                let eff = new Decimal(3);
                if (hasUpgrade("m", 31)) eff = eff.add(upgradeEffect("m",31));
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
                let eff = player[this.layer].points.add(1).pow(0.5);  // Boost scales with inverse of Matter points
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
                let eff = player[this.layer].points.add(1).pow(0.25);  // Boost scales with inverse of Matter points
                return eff;
            },
            effectDisplay() { 
                return "x" + format(this.effect()) + " to Upgrade 12"; 
            }
        },
         23: {
            title: "Singularity",
            description: "Allows to buy max Matter points",
            cost: new Decimal(30),
        },
        31: {
            title: "Additive Matter",
            description: "Boosts Upgrade 13 based on reduced Matter points.",
            cost: new Decimal(10),
            effect() {
                let eff = player[this.layer].points.add(1).pow(0.1);  // Boost scales with inverse of Matter points
                return eff;
            },
            effectDisplay() { 
                return "+" + format(this.effect()) + " base to upgrade 13"; 
            }
        },
    },
});
