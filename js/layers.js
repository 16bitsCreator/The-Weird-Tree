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
        // Upgrades go here
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
