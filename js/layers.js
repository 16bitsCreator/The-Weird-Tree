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
            matterEssence: new Decimal(0),
        }
    },

    row: 0,
    layerShown() { return true },

    gainMult() {
        let mult = new Decimal(1);
        if (hasUpgrade("m", 12)) mult = mult.div(upgradeEffect("m", 12));
        if (hasUpgrade("m", 14)) mult = mult.div(upgradeEffect("m", 14));
        if (player.m.matterEssence.gt(0)) {
            mult = mult.div(new Decimal(1).add(player.m.matterEssence.log(10).pow(2)));
        }
        return mult;
    },

    gainExp() {                              
        return new Decimal(1);
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
                let eff = player[this.layer].points.add(1).pow(0.75);
                if (hasUpgrade("m", 44)) {
                    eff = eff.pow(upgradeEffect("m", 44));
                }
                return eff;
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
                return "/" + format(this.effect()) + " to reduce requirement"; 
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
            description: "Unlock additional upgrades.",
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
            description: "Raise upgrade 14 based on Points",
            cost: new Decimal(600),
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
            cost: new Decimal(2000),
            unlocked() {
                return hasUpgrade("m", 33);
            },
        },
        41: {
            title: "Essence Amplification",
            description: "Boost Matter Essence production based on Points.",
            cost: new Decimal(50),
            currencyDisplayName: "Matter Essence",
            currencyInternalName: "matterEssence",
            currencyLayer: "m",
            effect() {
                return player.points.add(1).log(10).add(1);
            },
            effectDisplay() { 
                return "x" + format(this.effect()) + " to Matter Essence production"; 
            },
            unlocked() {
                return hasUpgrade("m", 34);
            },
        },
        42: {
            title: "Matteristic Essence",
            description: "Creates a new effect for Matter Essence boost.",
            cost: new Decimal(250),
            currencyDisplayName: "Matter Essence",
            currencyInternalName: "matterEssence",
            currencyLayer: "m",
            effect() {
                return new Decimal(1).add(player.m.matterEssence.add(1).log(10));
            },
            effectDisplay() {
                return "x" + format(this.effect()) + " to self-boost";
            },
            unlocked() {
                return hasUpgrade("m", 34);
            },
        },
        43: {
            title: "Matter Points Influence",
            description: "Matter Points boost Matter Essence production.",
            cost: new Decimal(1000),
            currencyDisplayName: "Matter Essence",
            currencyInternalName: "matterEssence",
            currencyLayer: "m",
            effect() {
                return player.m.points.add(1).log(10).add(1).pow(1.5); 
            },
            effectDisplay() {
                return "x" + format(this.effect()) + " to Matter Essence production";
            },
            unlocked() {
                return hasUpgrade("m", 34);
            },
        },
        44: {
            title: "Deeper Matter",
            description: "Enhances the boost from Upgrade 11 by raising its power.",
            cost: new Decimal(1500),
            currencyDisplayName: "Matter Essence",
            currencyInternalName: "matterEssence",
            currencyLayer: "m",
            effect() {
                return new Decimal(1.5);
            },
            effectDisplay() {
                return "^" + format(this.effect()) + " to Upgrade 11 boost";
            },
            unlocked() {
                return hasUpgrade("m", 34);
            },
        },
        51: {
            title: "Matter Preservation",
            description: "Prevents resets in Matter Points layer.",
            cost: new Decimal(5000),
            currencyDisplayName: "Matter Essence",
            currencyInternalName: "matterEssence",
            currencyLayer: "m",
            unlocked() {
                return hasUpgrade("m", 34);
            },
        },
    },

    update(diff) {
        if (hasUpgrade("m", 34)) {
            player.m.matterEssence = player.m.matterEssence.add(diff);
        }
    },

    doReset(resettingLayer) {
        if (hasUpgrade("m", 51)) {
            // If Upgrade 51 is purchased, prevent reset for this layer
            return;
        }

        if (resettingLayer >= this.row) {
            // Reset Matter Points, but exclude "points" from resetting
            layerDataReset("m", ["matterEssence", "upgrades", "points"]);
        }
    },

    autoPrestige() {
        return hasUpgrade("m", 51);
    },

    tabFormat: {
        "Main Tab": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                ["display-text", function() { 
                    return `Matter Essence: ${format(player.m.matterEssence)}`;
                }],
                ["display-text", function() {
                    if (hasUpgrade("m", 51)) {
                        return `This layer will no longer reset.`;
                    }
                    return "";
                }],
                ["display-text", function() {
                    if (player.m.matterEssence.gt(0)) {
                        let essenceEffect = new Decimal(1).add(player.m.matterEssence.log(10).pow(2));
                        return `Matter Points boost from Essence: /${format(essenceEffect)}`;
                    } else return "";
                }],
                ["display-text", function() {
                    if (hasUpgrade("m", 42)) {
                        return `Matter Essence self-boost: x${format(upgradeEffect("m", 42))}`;
                    } else return "";
                }],
                "upgrades",
            ],
        },
    },
});
