let modInfo = {
	name: "The Time Tree",
	id: "mymod",
	author: "nobody",
	pointsName: "Time",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1",
	name: "Replicanti Expansion",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.1</h3><br>
		- Added Replicanti growth mechanics.<br>
		- Removed old tree mechanics.<br>
		- Balanced Replicanti boost effect.<br>`

let winText = `Congratulations! You've reached the end of this version! More content coming soon.`

// Custom functions that shouldn't be called every tick
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec (Time gain)
function canGenPoints(){
	return true
}

// Calculate Time gain per second (Replicanti boost applied here)
function getPointGen() {
	if (!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1) // Base Time generation

	// Apply Replicanti effect to boost Time generation
	if (player.r.points.gt(0)) {
		gain = gain.times(tmp.r.effect || 1); // Ensure tmp.r.effect is defined or use 1 as default
	}

	return gain
}

// Non-layer related variables to be saved
function addedPlayerData() { 
	return {} 
}

// Extra things to display at the top of the page
var displayThings = [
    function() {
        let boost = layers.r.playerPointsBoost(); // Call the boost calculation function
        return `Time boosts time Shards growth by ×${format(boost)}`; // Display the boost effect
    }
];

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000")) // Example endgame threshold
}

// Style for the background (can be a function)
var backgroundStyle = {

}

// Maximum tick length (to avoid long ticks breaking the game)
function maxTickLength() {
	return(3600) // Default is 1 hour
}

// Function to fix old saves
function fixOldSave(oldVersion){
	// Add logic here if needed for future save fixing
}
