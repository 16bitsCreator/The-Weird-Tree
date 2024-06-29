addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#0000FF",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasMilestone('p', 2)) mult = mult.times(2)
        if (hasUpgrade('p', 11)) mult = mult.times(10)   
        if (hasUpgrade('p', 13)) mult = mult.times(upgradeEffect('p', 13)) 
        if (hasUpgrade('p', 14)) mult = mult.times(upgradeEffect('p', 14))       
        if (hasUpgrade('p', 18)) mult = mult.times(10)
         
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from 
        exp = new Decimal(1)
        if (hasMilestone('p', 4)) exp = exp.add(0.05)
        return exp
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    passiveGeneration(){
         passive = new Decimal(0)
         if (hasMilestone('p', 5)) passive = passive.add(1) //5% Prestige Points depending on Reset
        return passive
        },

    milestones: {
        0: {
            requirementDescription: "2 Prestiges points",
            effectDescription: "2x points!",
            done() { return player.p.points.gte(2) },
        },
        1: {
            requirementDescription: "5 Prestiges points",
            effectDescription: "3x points!",
            done() { return player.p.points.gte(5) },
            unlocked() { return hasMilestone('p', 0)},
        },
        2: {
            requirementDescription: "50 points",
            effectDescription: "2x Prestiges!",
            done() { return player.points.gte(50) },
            unlocked() { return hasMilestone('p', 1)},
        },
        3: {
            requirementDescription: "25 Prestiges",
            effectDescription: "Points ^1.2",
            done() { return player.p.points.gte(25) },
            unlocked() { return hasMilestone('p', 2)},
    },
    4: {
        requirementDescription: "150 Points",
        effectDescription: "Prestige ^1.05 + An Upgrade",
        done() { return player.points.gte(150) },
        unlocked() { return hasMilestone('p', 3)},
},
5: {
    requirementDescription: "1e9",
    effectDescription: "Generate automatically prestige points",
    done() { return player.p.points.gte(1e9) },
    unlocked() { return hasMilestone('c', 0)},
},
6: {
    requirementDescription: "1e30",
    effectDescription: "Generate automatically Condensated points",
    done() { return player.p.points.gte(1e30) },
    unlocked() { return hasMilestone('f', 0)},
},
    },
    upgrades: {
        11: {
            title: "10x Prestiges",
            description: "Read the Title",
            cost: new Decimal(25),
        unlocked(){ return hasMilestone('p', 4)},
        },
        12: {
            title: "V1",
            description: "Prestiges boost points.",
            cost: new Decimal(250),
            unlocked() { return hasUpgrade('p', 11)},
            effect() {if (hasUpgrade('c', 14)) 
                return player[this.layer].points.add(1).pow(0.35).times(upgradeEffect('c', 14))
                else
                return player[this.layer].points.add(1).pow(0.35)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        13: {
            title: "V2",
            description: "Point boost Prestiges",
            cost: new Decimal(2500),
        unlocked(){ return hasUpgrade('p', 12)},
        effect() { if (hasUpgrade('c', 11)) 
            return player.points.add(1).pow(0.35).times(upgradeEffect('c', 11))
         else
         return player.points.add(1).pow(0.35)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        14: {
            title: "V3",
            description: "Prestiges boost Prestiges",
            cost: new Decimal(5000),
        unlocked(){ return hasUpgrade('p', 13)},
        effect() { if (hasUpgrade('c', 12)) 
            return player.p.points.add(1).pow(0.20).times(upgradeEffect('c', 12))
         else
         return player.p.points.add(1).pow(0.20)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
        }, 
        15: {
            title: "V4",
            description: "Points boost Points + New layer",
            cost: new Decimal(10000),
        unlocked(){ return hasUpgrade('p', 14)},
        effect() { if (hasUpgrade('c', 13)) 
            return player.points.add(1).pow(0.15).times(upgradeEffect('c', 13))
         else
         return player.points.add(1).pow(0.15)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
        }, 
        16: {
            title: "V5",
            description: "Points boost Concentrated Points",
            cost: new Decimal(1e7),
        unlocked(){ return hasMilestone('c', 0)},
        effect() {
         return player.points.add(1).pow(0.05)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
        }, 
        17: {
            title: "V6",
            description: "Prestige boost Concentrated Points",
            cost: new Decimal(1e8),
        unlocked(){ return hasUpgrade('p', 16)},
        effect() {
          return player.p.points.add(1).pow(0.01)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
        }, 
        18: {
            title: "V7",
            description: "New layer +10x prestige",
            cost: new Decimal(1e9),
        unlocked(){ return hasUpgrade('p', 17)},
        }, 
        19: {
            title: "V8",
            description: "Condensated points^1.2",
            cost: new Decimal(1e20),
        unlocked(){ return hasUpgrade('c', 14)},
        }, 
    } 

}),
addLayer("c", {
    name: "Concentration", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#CCCCFF",
    requires: new Decimal(1000), // Can be a function that takes requirement increases into account
    resource: "Concentrated Points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)       
        if (hasUpgrade('p', 16)) mult = mult.times(upgradeEffect('p', 16))         
         if (hasUpgrade('p', 17)) mult = mult.times(upgradeEffect('p', 17))
                       
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from 
        exp = new Decimal(1)
        return exp
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "c", description: "C: Reset for Concentrated points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade('p', 15)},
passiveGeneration(){
         passive = new Decimal(0)
         if (hasMilestone('p', 6)) passive = passive.add(1) //100% Prestige Points depending on Reset
        return passive},
    upgrades: {
        11: {
            title: "New layer!?",
            description: "Concentrated Points boost V2",
            cost: new Decimal(10),
        unlocked(){ return hasUpgrade('p', 15)},
        effect() {
            return player.c.points.add(1).pow(0.15)
        },
    },
    12: {
        title: "+V3",
        description: "Concentrated Points boost V3",
        cost: new Decimal(15),
    unlocked(){ return hasUpgrade('c', 11)},
    effect() {
        return player.c.points.add(1).pow(0.10)
    },
},
13: {
    title: "+V4",
    description: "Concentrated Points boost V4",
    cost: new Decimal(20),
unlocked(){ return hasUpgrade('c', 12)},
effect() {
    return player.c.points.add(1).pow(0.05)
},
},
14: {
    title: "+V1",
    description: "Concentrated Points boost V1",
    cost: new Decimal(1000),
unlocked(){ return hasMilestone('f', 0)},
effect() {
    return player.c.points.add(1).pow(0.25)
},
},
},
milestones: {
    0: {
        requirementDescription: "30 Concentrated Points",
        effectDescription: "Unlock new Prestige Upgrades and a milestone",
        done() { return player.c.points.gte(30) },
    },
},
buyables:{  
11:{  title:"Condensater
cost() { return new Decimal(10).mul(getBuyableAmount("c", 11)).pow(5).mul(15).add(1)  





        },
            canAfford() {
              return player.c.points.gte(this.cost())
            }, 
            unlocked() { return (hasMilestone("f", 1)) && getBuyableAmount("c",11).lte(100)},
            display() { 

             let start = "<b><h2>Amount</h2>: " + getBuyableAmount("c", 11) + "</b><br>"
             let eff = "<b><h2>Effect</h2>: x" + format(this.effect()) + "</b><br>"
             let cost = "<b><h2>Cost</h2>: " + format(this.cost()) + "</b><br>"   
             return "<br>" + start + eff + cost
             },

            buy() {
              player.c.points = player.c.points.sub(this.cost())
              setBuyableAmount("c", 11, getBuyableAmount("c", 11).add(1))
            },
            effect() {
              let effect = new Decimal(1.2).mul(getBuyableAmount("c", 11).pow(2).add(1))
              return effect
            },
          },
},
})
addLayer("f", {
    name: "Factors", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "F", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#0066FF",
    requires: new Decimal(1e15), // Can be a function that takes requirement increases into account
    resource: "Factor Points", // Name of prestige currency
    baseResource: "Prestige Points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 10000, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)  
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from 
        exp = new Decimal(1)
        return exp
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "f", description: "F: Reset for Factor points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade('p', 18)},
    milestones: {
        0: {
            requirementDescription: "1 Factor Points",
            effectDescription: "Unlock More Prestige Milestones and New upgrades",
            done() { return player.f.points.gte(1) },
        },
1: {
            requirementDescription: "5 Factor Points",
            effectDescription: "Unlock a new upgrade",
            done() { return player.f.points.gte(5) },
        },
    }
})