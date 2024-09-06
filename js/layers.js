addLayer("r", { // 'r' for "TimeShards"
    name: "Time Shards",
    symbol: "R",
    position: 0, 
    startData() { 
        return {
            unlocked: true, 
            points: new Decimal(0), // Time Shards
            boosts: new Decimal(0),  // Number of Time Shard Boosts
        } 
    },
    color: "#800020", 
    resource: "Time Shards",
    baseResource: "time",
    type: "none", 
    row: 0, 
    hotkeys: [
        {key: "r", description: "R: Reset for Time Shard Boost", onPress(){if (canReset(this.layer)) doBoost()}},
    ],
    layerShown(){return true},

    // Time Shard Boost Mechanic
    boostMultiplier() {
        return new Decimal(3).pow(player.r.boosts); // Each boost multiplies Time Shard production by 3x
    },

    // Effect: Player Points (Time) boosting Replicanti
    playerPointsBoost() {
        return player.points.add(1).pow(0.2); // Example: Boost based on Player Points raised to 0.2 power
    },

    // Calculate the cost for the next Time Shard Boost
    boostCost() {
        let baseCost = new Decimal(1e10); // Starting cost for the first boost
        let scaleFactor = new Decimal(10); // Scaling factor per boost
        return baseCost.times(scaleFactor.pow(player.r.boosts)); // Exponential cost scaling
    },

    // Update function to handle Time Shard generation
    update(diff) {
        let growthRate = new Decimal(1)
            .times(this.boostMultiplier())  // Apply Time Shard Boost multiplier
            .times(this.playerPointsBoost()); // Apply Player Points (Time) boost to growth rate

        // Apply upgrade effects to modify growth rate
        if (hasUpgrade('r', 11)) growthRate = growthRate.times(upgradeEffect('r', 11));
        if (hasUpgrade('r', 12)) growthRate = growthRate.times(upgradeEffect('r', 12));
        if (hasUpgrade('r', 13)) growthRate = growthRate.pow(upgradeEffect('r', 13)); // Use Upgrade 13 effect

        // Increase Time Shards by the calculated growth rate
        player.r.points = player.r.points.add(growthRate.times(diff)); 
    },

    // Display Time Shard Boost and Player Points boost in the layer tab
    effectDescription() {
        return `Time Shard Boosts: ×${format(this.boostMultiplier())} and Player Points boost: ×${format(this.playerPointsBoost())}`;
    },

    // Time Shard Boost Button
    clickables: {
        11: {
            title: "Perform Time Shard Boost",
            display() { 
                return `Perform a Time Shard Boost for a 3x multiplier (currently ×${format(this.boostMultiplier())})\nCost: ${format(this.boostCost())} Time Shards\nThis will reset your Time Shards and upgrades!`; 
            },
            canClick() {
                return player.r.points.gte(this.layer.boostCost()); // Check if the player has enough Time Shards for the next boost
            },
            onClick() { 
                doBoost(); // Call the boost function
            },
            style() {
                return {'height':'100px', 'width':'300px'}; // Customize button size and style
            }
        }
    },

    // Time Shard Boost Reset Function
    doBoost() {
        if (!this.clickables[11].canClick()) return; // Check if the player meets the requirements

        player.r.boosts = player.r.boosts.add(1); // Increment the boost counter
        player.r.points = new Decimal(0); // Reset Time Shards
        layerDataReset("r", ["boosts"]); // Reset upgrades and other layer-specific data, except boosts
    },
    
    // Upgrades to enhance Time Shard growth
    upgrades: {
        11: {
            title: "Increase Growth Rate",
            description: "Time Shards grow 50% faster.",
            cost: new Decimal(10),
            effect() {
                return new Decimal(1.5); 
            },
            effectDisplay() { return "×" + format(upgradeEffect(this.layer, this.id)) },
        },
        12: {
            title: "Time Shard Growth",
            description: "Double the Time Shard growth rate.",
            cost: new Decimal(100),
            effect() {
                return new Decimal(2); 
            },
            effectDisplay() { return "×" + format(upgradeEffect(this.layer, this.id)) },
            unlocked() { return hasUpgrade('r', 11); }
        },
        13: {
            title: "Exponential Growth",
            description: "Raise Time Shard growth rate to the power of 2.",
            cost: new Decimal(100),
            effect() {
                return new Decimal(2);
            },
            effectDisplay() { 
                return "^" + format(upgradeEffect(this.layer, this.id)); 
            },
            unlocked() { return hasUpgrade('r', 12); }
        },
    }, 
});
