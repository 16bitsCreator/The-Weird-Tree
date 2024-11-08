addLayer("m", {
    name: "Matter Points",
    symbol: "M",
    position: 0,
    color: "#33A1FF",
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
        return mult;
    },

    gainExp() {                                
        let exp = new Decimal(1);
        return exp;
    },

    directMult() {
        let mult = new Decimal(1);
        if (hasUpgrade("m", 21)) mult = mult.times(upgradeEffect("m", 21));
        return mult;
    },

    canBuyMax() {
        return hasUpgrade("m", 23);  
    },

    upgrades: {
        11: {
            title: "Boost Production",
            description: "Increase point generation based on Matter points.",
            cost: new Decimal(1),
            effect() {
                return player[this.layer].points.add(1).pow(0.5);
            },
            effectDisplay() { 
                return "x" + format(this.effect()) + " to point generation"; 
            }
        },
        21: {
            title: "Boost Upgrade 13",
            description: "Boosts the effect of Upgrade 13 based on reduced Matter points.",
            cost: new Decimal(5),
            effect() {
                return player[this.layer].points.add(1).pow(0.2);
            },
            effectDisplay() {
                return "x" + format(this.effect()) + " boost to Upgrade 13";
            }
        },
        23: {
            title: "Singularity",
            description: "Allows to buy max Matter points",
            cost: new Decimal(30),
        },
    },
});
