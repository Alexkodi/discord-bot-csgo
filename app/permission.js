function checkPermissionCSGOadmin(userRole) {
	return userRole.some((role) => role.name === "CSGOadmin");
}

function checkPermissionCSGO(userRole) {
	return userRole.some((role) => role.name === "CSGO" || "CSGOadmin");
}

module.exports = {
    checkPermissionCSGOadmin,
    checkPermissionCSGO
}